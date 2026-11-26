interface ResultScreenProps {
  totalQuestions: number;
  correctCount: number;
  questionsWithMistakeCount: number;
  onRestart: () => void;
}

export function ResultScreen({
  totalQuestions,
  correctCount,
  questionsWithMistakeCount,
  onRestart,
}: ResultScreenProps) {
  return (
    <main className="screen result-screen">
      <div className="card result-card">
        <div className="result-emoji" aria-hidden="true">
          🌟
        </div>
        <h1 className="result-title">학습을 마쳤어요!</h1>
        <p className="result-subtitle">
          (장소)에 / 에서 문장 만들기 연습 결과입니다.
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

        <button
          type="button"
          className="btn btn-primary btn-large"
          onClick={onRestart}
        >
          다시 하기
        </button>
      </div>
    </main>
  );
}

