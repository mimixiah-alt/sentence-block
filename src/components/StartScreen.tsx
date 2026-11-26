import {
  LANGUAGE_OPTIONS,
  type LanguageCode,
} from '../data/lessons';

interface StartScreenProps {
  language: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
  onNext: () => void;
}

export function StartScreen({
  language,
  onLanguageChange,
  onNext,
}: StartScreenProps) {
  return (
    <main className="screen start-screen">
      <div className="card start-card">
        <div className="badge-pill">세종학당 한국어 1 · 1과~7과 복습</div>
        <h1 className="app-title title-blocks" aria-label="문장 블록">
          <span className="title-block title-block-blue" aria-hidden="true">
            문
          </span>
          <span className="title-block title-block-orange" aria-hidden="true">
            장
          </span>
          <span className="title-block-gap" aria-hidden="true" />
          <span className="title-block title-block-green" aria-hidden="true">
            블
          </span>
          <span className="title-block title-block-yellow" aria-hidden="true">
            록
          </span>
        </h1>
        <p className="app-subtitle">블록을 놓아 한국어 문장을 만들어 보세요.</p>

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
                {option.flag} {option.label}
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          className="btn btn-primary btn-large start-button"
          onClick={onNext}
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
