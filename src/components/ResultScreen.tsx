interface ResultScreenProps {
  lessonLabel: string;
  lessonTitle: string;
  totalQuestions: number;
  correctCount: number;
  questionsWithMistakeCount: number;
  mistakeCountForReview: number;
  isReviewMode: boolean;
  onRetryMistakes: () => void;
  onRetryLesson: () => void;
  onSelectOtherLesson: () => void;
}

export function ResultScreen({
  lessonLabel,
  lessonTitle,
  totalQuestions,
  correctCount,
  questionsWithMistakeCount,
  mistakeCountForReview,
  isReviewMode,
  onRetryMistakes,
  onRetryLesson,
  onSelectOtherLesson,
}: ResultScreenProps) {
  const hasMistakes = mistakeCountForReview > 0;

  return (
    <main className="screen result-screen">
      <div className="card result-card">
        <div className="badge-pill">
          {lessonLabel} · {lessonTitle}
        </div>
        <div className="result-emoji" aria-hidden="true">
          {hasMistakes ? '💪' : '🌟'}
        </div>
        <h1 className="result-title">
          {isReviewMode ? '복습을 마쳤어요!' : '학습을 마쳤어요!'}
        </h1>
        <p className="result-subtitle">
          {isReviewMode
            ? '틀렸던 문장을 다시 연습한 결과입니다.'
            : `${lessonLabel} 문장 만들기 연습 결과입니다.`}
        </p>

        <div className="result-stats">
          <div className="stat-box stat-correct">
            <span className="stat-label">맞힌 문제 수</span>
            <strong className="stat-value">
              {correctCount} / {totalQuestions}개
            </strong>
          </div>

          <div className="stat-box stat-mistake">
            <span className="stat-label">틀린 적이 있는 문제 수</span>
            <strong className="stat-value">{questionsWithMistakeCount}개</strong>
          </div>
        </div>

        {hasMistakes ? (
          <div className="review-callout">
            <p className="review-callout-text">
              틀린 문장 {mistakeCountForReview}개를 모아서 다시 한 번 연습해
              보세요!
            </p>
            <button
              type="button"
              className="btn btn-primary btn-large"
              onClick={onRetryMistakes}
            >
              틀린 문장 다시 풀기 ({mistakeCountForReview}문제)
            </button>
          </div>
        ) : (
          <p className="perfect-message">
            {isReviewMode
              ? '틀린 문장까지 모두 완벽하게 맞혔어요!'
              : '모든 문장을 한 번에 맞혔어요!'}
          </p>
        )}

        <div className="result-actions">
          <button
            type="button"
            className={
              hasMistakes
                ? 'btn btn-secondary btn-large'
                : 'btn btn-primary btn-large'
            }
            onClick={onRetryLesson}
          >
            같은 과 다시 하기
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-large"
            onClick={onSelectOtherLesson}
          >
            다른 과 고르기
          </button>
        </div>
      </div>
    </main>
  );
}
