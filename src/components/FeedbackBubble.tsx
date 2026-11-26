export type FeedbackStatus = 'idle' | 'correct' | 'wrong';

interface FeedbackBubbleProps {
  status: FeedbackStatus;
  wrongCount: number;
  showAnswer: boolean;
  correctSentence: string;
  onShowAnswer: () => void;
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
  onShowAnswer,
}: FeedbackBubbleProps) {
  const canShowAnswerButton =
    status !== 'correct' && wrongCount >= 3 && !showAnswer;

  if (status === 'idle' && !showAnswer && !canShowAnswerButton) {
    return null;
  }

  return (
    <div
      className={`feedback-bubble feedback-${status}`}
      role="status"
      aria-live="polite"
    >
      {status === 'correct' && (
        <div className="feedback-content">
          <span className="feedback-icon" aria-hidden="true">
            🎉
          </span>
          <div>
            <p className="feedback-title">잘했어요!</p>
            <p className="feedback-sub">{correctSentence}</p>
          </div>
        </div>
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
        <div className="revealed-answer">
          <span className="revealed-answer-label">정답 문장</span>
          <strong className="revealed-answer-text">{correctSentence}</strong>
        </div>
      )}
    </div>
  );
}

