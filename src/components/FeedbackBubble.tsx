import type { RefObject } from 'react';

export type FeedbackStatus = 'idle' | 'correct' | 'wrong';

interface FeedbackBubbleProps {
  status: FeedbackStatus;
  wrongCount: number;
  showAnswer: boolean;
  correctSentence: string;
  isLastQuestion: boolean;
  onShowAnswer: () => void;
  onListenAnswer: () => void;
  onNext: () => void;
  containerRef?: RefObject<HTMLDivElement | null>;
}

/**
 * Feedback display area for answer checks.
 * Kept as a dedicated component so it can be replaced by an AI hint bubble in Step 2.
 */
export function FeedbackBubble({
  status,
  wrongCount,
  showAnswer,
  correctSentence,
  isLastQuestion,
  onShowAnswer,
  onListenAnswer,
  onNext,
  containerRef,
}: FeedbackBubbleProps) {
  const canShowAnswerButton =
    status !== 'correct' && wrongCount >= 3 && !showAnswer;

  if (status === 'idle' && !showAnswer && !canShowAnswerButton) {
    return null;
  }

  const nextLabel = isLastQuestion ? '결과 보기' : '다음 문제 →';

  return (
    <div
      ref={containerRef}
      className={`feedback-bubble feedback-${status}`}
      role="status"
      aria-live="polite"
    >
      {status === 'correct' && (
        <>
          <div className="feedback-content">
            <span className="feedback-icon" aria-hidden="true">
              🎉
            </span>
            <div>
              <p className="feedback-title">잘했어요!</p>
              <p className="feedback-sub">{correctSentence}</p>
            </div>
          </div>
          <div className="feedback-actions">
            <button
              type="button"
              className="btn btn-listen"
              onClick={onListenAnswer}
            >
              🔊 정답 듣기
            </button>
            <button
              type="button"
              className="btn btn-next btn-large"
              onClick={onNext}
            >
              {nextLabel}
            </button>
          </div>
        </>
      )}

      {status === 'wrong' && (
        <div className="feedback-content">
          <span className="feedback-icon" aria-hidden="true">
            💭
          </span>
          <div className="feedback-text-group">
            <p className="feedback-title">다시 생각해 보세요.</p>
            <p className="feedback-count">틀린 횟수: {wrongCount}번</p>
          </div>
        </div>
      )}

      {canShowAnswerButton && (
        <button
          type="button"
          className="btn btn-hint"
          onClick={onShowAnswer}
        >
          정답 보기
        </button>
      )}

      {showAnswer && status !== 'correct' && (
        <>
          <div className="revealed-answer">
            <span className="revealed-answer-label">정답 문장</span>
            <strong className="revealed-answer-text">{correctSentence}</strong>
          </div>
          <div className="feedback-actions">
            <button
              type="button"
              className="btn btn-listen"
              onClick={onListenAnswer}
            >
              🔊 정답 듣기
            </button>
            <button
              type="button"
              className="btn btn-next btn-large"
              onClick={onNext}
            >
              {nextLabel}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
