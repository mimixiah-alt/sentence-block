import { LANGUAGE_OPTIONS, type LanguageCode } from '../data/sentences';

interface StartScreenProps {
  language: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
  onStart: () => void;
}

export function StartScreen({
  language,
  onLanguageChange,
  onStart,
}: StartScreenProps) {
  return (
    <main className="screen start-screen">
      <div className="card start-card">
        <div className="badge-pill">세종학당 한국어 1 · 7과</div>
        <h1 className="app-title">문장 블록</h1>
        <p className="app-subtitle">
          블록을 놓아 한국어 문장을 만들어 보세요.
        </p>

        <section className="grammar-box" aria-label="오늘 배울 문법">
          <div className="grammar-label">오늘 배울 문법</div>
          <div className="grammar-topic">(장소)에 / 에서</div>

          <div className="examples-list">
            <div className="example-item">
              <span className="example-dot" aria-hidden="true">
                •
              </span>
              <span>휴대 전화가 책상 위에 있어요.</span>
            </div>
            <div className="example-item">
              <span className="example-dot" aria-hidden="true">
                •
              </span>
              <span>방에서 쉬어요.</span>
            </div>
          </div>
        </section>

        <div className="legend-row" aria-label="블록 색깔 안내">
          <span className="legend-chip legend-N">명사</span>
          <span className="legend-chip legend-P">조사</span>
          <span className="legend-chip legend-V">동사</span>
        </div>

        <section className="language-picker" aria-label="뜻을 볼 언어 선택">
          <p className="language-picker-label">뜻을 볼 언어를 고르세요</p>
          <div className="language-grid" role="group" aria-label="언어 목록">
            {LANGUAGE_OPTIONS.map((option) => (
              <button
                key={option.code}
                type="button"
                className={`language-option-btn ${
                  language === option.code ? 'is-selected' : ''
                }`}
                aria-pressed={language === option.code}
                onClick={() => onLanguageChange(option.code)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          className="btn btn-primary btn-large start-button"
          onClick={onStart}
        >
          시작하기
        </button>
      </div>

      <footer className="attribution">
        출처: 세종학당재단 『바로 배워 바로 쓰는 세종학당 한국어 1』 (공공누리
        제4유형)
      </footer>
    </main>
  );
}

