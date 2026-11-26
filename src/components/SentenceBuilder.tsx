import { useEffect, useRef, useState } from 'react';
import type { DragEvent } from 'react';
import {
  formatBlocksToSentence,
  LANGUAGE_OPTIONS,
  type LanguageCode,
  type SentenceQuestion,
  type WordBlock,
} from '../data/sentences';
import { speakKorean, stopSpeaking } from '../utils/speak';
import { FeedbackBubble, type FeedbackStatus } from './FeedbackBubble';

interface BlockInstance extends WordBlock {
  uid: string;
}

interface DragState {
  uid: string;
  source: 'tray' | 'assembled';
}

export interface PracticeResult {
  correctCount: number;
  questionsWithMistakeCount: number;
}

interface SentenceBuilderProps {
  questions: readonly SentenceQuestion[];
  language: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
  onFinish: (result: PracticeResult) => void;
}

const BLOCK_TYPE_LABEL: Record<WordBlock['type'], string> = {
  N: '명사',
  P: '조사',
  V: '동사',
};

function createShuffledBlocks(question: SentenceQuestion): BlockInstance[] {
  const items: BlockInstance[] = [
    ...question.answerBlocks.map((block, index) => ({
      ...block,
      uid: `q${question.id}-ans-${index}`,
    })),
    {
      ...question.decoyBlock,
      uid: `q${question.id}-decoy`,
    },
  ];

  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  // Avoid starting in an order where the first N blocks already form the exact answer
  const startsAsAnswer = question.answerBlocks.every(
    (ans, idx) =>
      items[idx]?.text === ans.text && items[idx]?.type === ans.type,
  );
  if (startsAsAnswer && items.length > 1) {
    [items[0], items[items.length - 1]] = [items[items.length - 1], items[0]];
  }

  return items;
}

export function SentenceBuilder({
  questions,
  language,
  onLanguageChange,
  onFinish,
}: SentenceBuilderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];

  const [trayBlocks, setTrayBlocks] = useState<BlockInstance[]>(() =>
    createShuffledBlocks(questions[0]),
  );
  const [assembledBlocks, setAssembledBlocks] = useState<BlockInstance[]>([]);
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>('idle');
  const [wrongCount, setWrongCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [solvedCount, setSolvedCount] = useState(0);
  const [hadMistakeOnCurrent, setHadMistakeOnCurrent] = useState(false);
  const [questionsWithMistakeCount, setQuestionsWithMistakeCount] = useState(0);

  const [dragState, setDragState] = useState<DragState | null>(null);
  const [dragOverZone, setDragOverZone] = useState<'assembly' | 'tray' | null>(
    null,
  );
  const [dragOverBlockUid, setDragOverBlockUid] = useState<string | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  useEffect(() => {
    if (feedbackStatus !== 'idle' || showAnswer) {
      feedbackRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [feedbackStatus, wrongCount, showAnswer]);

  const isSolved = feedbackStatus === 'correct';
  const isLastQuestion = currentIndex + 1 >= questions.length;
  const formedSentence = formatBlocksToSentence(assembledBlocks);

  const clearDragState = () => {
    setDragState(null);
    setDragOverZone(null);
    setDragOverBlockUid(null);
  };

  const resetFeedbackAfterEdit = () => {
    if (feedbackStatus === 'wrong') {
      setFeedbackStatus('idle');
    }
  };

  const moveBlockToAssembly = (
    uid: string,
    source: 'tray' | 'assembled',
    targetIndex?: number,
  ) => {
    if (isSolved) return;

    if (source === 'tray') {
      const target = trayBlocks.find((block) => block.uid === uid);
      if (!target) return;

      setTrayBlocks((prev) => prev.filter((block) => block.uid !== uid));
      setAssembledBlocks((prev) => {
        if (targetIndex === undefined || targetIndex < 0 || targetIndex > prev.length) {
          return [...prev, target];
        }
        const next = [...prev];
        next.splice(targetIndex, 0, target);
        return next;
      });
      resetFeedbackAfterEdit();
      return;
    }

    const fromIndex = assembledBlocks.findIndex((block) => block.uid === uid);
    if (fromIndex === -1) return;

    setAssembledBlocks((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      if (targetIndex === undefined) {
        next.push(moved);
      } else {
        const adjustedIndex =
          fromIndex < targetIndex ? targetIndex - 1 : targetIndex;
        next.splice(Math.max(0, adjustedIndex), 0, moved);
      }
      return next;
    });
    resetFeedbackAfterEdit();
  };

  const moveBlockToTray = (uid: string) => {
    if (isSolved) return;
    const target = assembledBlocks.find((block) => block.uid === uid);
    if (!target) return;

    setAssembledBlocks((prev) => prev.filter((block) => block.uid !== uid));
    setTrayBlocks((prev) => [...prev, target]);
    resetFeedbackAfterEdit();
  };

  const handleDragStart = (
    event: DragEvent<HTMLButtonElement>,
    uid: string,
    source: 'tray' | 'assembled',
  ) => {
    if (isSolved) {
      event.preventDefault();
      return;
    }
    const payload: DragState = { uid, source };
    setDragState(payload);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', JSON.stringify(payload));
  };

  const getDragPayload = (event: DragEvent): DragState | null => {
    if (dragState) return dragState;
    const raw = event.dataTransfer.getData('text/plain');
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as DragState;
      if (
        parsed &&
        typeof parsed.uid === 'string' &&
        (parsed.source === 'tray' || parsed.source === 'assembled')
      ) {
        return parsed;
      }
    } catch {
      return null;
    }
    return null;
  };

  const handleAssemblyDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const payload = getDragPayload(event);
    if (payload) {
      moveBlockToAssembly(payload.uid, payload.source);
    }
    clearDragState();
  };

  const handleAssembledBlockDrop = (
    event: DragEvent<HTMLButtonElement>,
    targetIndex: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const payload = getDragPayload(event);
    if (payload) {
      moveBlockToAssembly(payload.uid, payload.source, targetIndex);
    }
    clearDragState();
  };

  const handleTrayDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const payload = getDragPayload(event);
    if (payload && payload.source === 'assembled') {
      moveBlockToTray(payload.uid);
    }
    clearDragState();
  };

  const handleListen = () => {
    if (!formedSentence) return;
    speakKorean(formedSentence);
  };

  const handleCheck = () => {
    if (assembledBlocks.length === 0 || isSolved) return;

    const isMatch =
      assembledBlocks.length === currentQuestion.answerBlocks.length &&
      assembledBlocks.every((block, idx) => {
        const expected = currentQuestion.answerBlocks[idx];
        return block.text === expected.text && block.type === expected.type;
      });

    if (isMatch) {
      setFeedbackStatus('correct');
      speakKorean(currentQuestion.sentence);
      return;
    }

    setFeedbackStatus('wrong');
    setWrongCount((prev) => prev + 1);
    setHadMistakeOnCurrent(true);
  };

  const handleResetBlocks = () => {
    if (isSolved) return;
    stopSpeaking();
    setTrayBlocks((prev) => [...prev, ...assembledBlocks]);
    setAssembledBlocks([]);
    resetFeedbackAfterEdit();
  };

  const handleNextQuestion = () => {
    stopSpeaking();

    const nextSolvedCount = solvedCount + (isSolved ? 1 : 0);
    const nextMistakeCount =
      questionsWithMistakeCount + (hadMistakeOnCurrent ? 1 : 0);

    if (currentIndex + 1 >= questions.length) {
      onFinish({
        correctCount: nextSolvedCount,
        questionsWithMistakeCount: nextMistakeCount,
      });
      return;
    }

    const nextIndex = currentIndex + 1;
    setSolvedCount(nextSolvedCount);
    setQuestionsWithMistakeCount(nextMistakeCount);
    setCurrentIndex(nextIndex);
    setTrayBlocks(createShuffledBlocks(questions[nextIndex]));
    setAssembledBlocks([]);
    setFeedbackStatus('idle');
    setWrongCount(0);
    setShowAnswer(false);
    setHadMistakeOnCurrent(false);
    clearDragState();
  };

  return (
    <main className="screen builder-screen">
      <header className="builder-header">
        <span className="progress-badge" aria-label="진행 상황">
          {currentIndex + 1} / {questions.length}
        </span>
        <div className="progress-track" aria-hidden="true">
          <div
            className="progress-fill"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <select
          className="language-select"
          aria-label="뜻 언어 선택"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <option key={option.code} value={option.code}>
              {option.flag} {option.label}
            </option>
          ))}
        </select>
      </header>

      <section className="card prompt-card" aria-label="문제">
        <div className="prompt-emoji" aria-hidden="true">
          {currentQuestion.emoji}
        </div>
        <p className="prompt-english">{currentQuestion.meanings[language]}</p>
      </section>

      <section className="zone-section" aria-label="문장 조립 칸">
        <div className="zone-header">
          <h2 className="zone-title">조립 칸</h2>
          <span className="zone-helper">
            블록을 드래그하거나 눌러서 놓아 보세요 (놓인 블록을 누르면 돌아가요)
          </span>
        </div>

        <div
          className={`drop-zone assembly-zone ${
            dragOverZone === 'assembly' ? 'is-drag-over' : ''
          } ${isSolved ? 'is-solved' : ''}`}
          onDragOver={(e) => {
            if (isSolved) return;
            e.preventDefault();
            setDragOverZone('assembly');
          }}
          onDragLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setDragOverZone(null);
            }
          }}
          onDrop={handleAssemblyDrop}
        >
          {assembledBlocks.length === 0 ? (
            <p className="zone-placeholder">
              아래 보관함에서 블록을 여기에 놓아 문장을 완성해 보세요.
            </p>
          ) : (
            <div className="block-list">
              {assembledBlocks.map((block, index) => (
                <button
                  key={block.uid}
                  type="button"
                  draggable={!isSolved}
                  disabled={isSolved}
                  onClick={() => moveBlockToTray(block.uid)}
                  onDragStart={(e) => handleDragStart(e, block.uid, 'assembled')}
                  onDragOver={(e) => {
                    if (isSolved) return;
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOverZone('assembly');
                    setDragOverBlockUid(block.uid);
                  }}
                  onDragLeave={() => {
                    if (dragOverBlockUid === block.uid) {
                      setDragOverBlockUid(null);
                    }
                  }}
                  onDrop={(e) => handleAssembledBlockDrop(e, index)}
                  onDragEnd={clearDragState}
                  className={`word-block block-${block.type} ${
                    dragState?.uid === block.uid ? 'is-dragging' : ''
                  } ${dragOverBlockUid === block.uid ? 'is-insert-target' : ''}`}
                  aria-label={`${block.text} (${BLOCK_TYPE_LABEL[block.type]}), 누르면 보관함으로 돌아갑니다`}
                >
                  <span className="block-text">{block.text}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="sentence-preview" aria-live="polite">
          <span className="preview-label">만든 문장</span>
          <span className="preview-text">
            {formedSentence || '아직 놓인 블록이 없어요.'}
          </span>
        </div>
      </section>

      <FeedbackBubble
        containerRef={feedbackRef}
        status={feedbackStatus}
        wrongCount={wrongCount}
        showAnswer={showAnswer}
        correctSentence={currentQuestion.sentence}
        isLastQuestion={isLastQuestion}
        onShowAnswer={() => setShowAnswer(true)}
        onNext={handleNextQuestion}
      />

      <section className="zone-section" aria-label="블록 보관함">
        <div className="zone-header">
          <h2 className="zone-title">블록 보관함</h2>
          <div className="legend-row compact">
            <span className="legend-chip legend-N">명사</span>
            <span className="legend-chip legend-P">조사</span>
            <span className="legend-chip legend-V">동사</span>
          </div>
        </div>

        <div
          className={`drop-zone tray-zone ${
            dragOverZone === 'tray' ? 'is-drag-over' : ''
          } ${isSolved ? 'is-disabled' : ''}`}
          aria-disabled={isSolved}
          onDragOver={(e) => {
            if (isSolved) return;
            e.preventDefault();
            setDragOverZone('tray');
          }}
          onDragLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setDragOverZone(null);
            }
          }}
          onDrop={handleTrayDrop}
        >
          {trayBlocks.length === 0 ? (
            <p className="zone-placeholder">모든 블록을 사용했어요!</p>
          ) : (
            <div className="block-list">
              {trayBlocks.map((block) => (
                <button
                  key={block.uid}
                  type="button"
                  draggable={!isSolved}
                  disabled={isSolved}
                  onClick={() => moveBlockToAssembly(block.uid, 'tray')}
                  onDragStart={(e) => handleDragStart(e, block.uid, 'tray')}
                  onDragEnd={clearDragState}
                  className={`word-block block-${block.type} ${
                    dragState?.uid === block.uid ? 'is-dragging' : ''
                  }`}
                  aria-label={`${block.text} (${BLOCK_TYPE_LABEL[block.type]}), 누르면 조립 칸에 추가됩니다`}
                >
                  <span className="block-text">{block.text}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="action-bar">
        <button
          type="button"
          className="btn btn-listen"
          onClick={handleListen}
          disabled={assembledBlocks.length === 0}
        >
          🔊 듣기
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCheck}
          disabled={assembledBlocks.length === 0 || isSolved}
        >
          확인하기
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleResetBlocks}
          disabled={assembledBlocks.length === 0 || isSolved}
        >
          처음부터
        </button>
      </div>
    </main>
  );
}

