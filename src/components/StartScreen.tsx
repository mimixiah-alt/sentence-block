import {
  LANGUAGE_OPTIONS,
  LESSONS,
  type LanguageCode,
} from '../data/lessons';

interface StartScreenProps {
  selectedLessonId: number | null;
  onSelectLesson: (lessonId: number) => void;
  language: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
  onNext: () => void;
}

export function StartScreen({
  selectedLessonId,
  onSelectLesson,
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
        <p className="app-subtitle">
          연습할 과를 고르고 블록을 놓아 한국어 문장을 만들어 보세요.
        </p>

        <section className="lesson-section" aria-label="과 선택">
          <div className="lesson-grid" role="group" aria-label="과 목록">
            {LESSONS.map((lesson) => {
              const isSelected = selectedLessonId === lesson.id;
              return (
                <button
                  key={lesson.id}
                  type="button"
                  className={`lesson-card ${isSelected ? 'is-selected' : ''}`}
                  aria-pressed={isSelected}
                  onClick={() => onSelectLesson(lesson.id)}
                >
                  <div className="lesson-card-top">
                    <span className="lesson-badge">{lesson.label}</span>
                    {isSelected && (
                      <span className="lesson-check" aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </div>
                  <strong className="lesson-title">{lesson.title}</strong>
                  <div className="lesson-grammar-tags">
                    {lesson.grammarPoints.map((grammar) => (
                      <span key={grammar.name} className="lesson-grammar-tag">
                        {grammar.name}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

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
          disabled={selectedLessonId === null}
          onClick={onNext}
        >
          다음
        </button>
      </div>

      <footer className="attribution">
        출처: 세종학당재단 『바로 배워 바로 쓰는 세종학당 한국어 1』 (공공누리
        제4유형)
      </footer>
    </main>
  );
}
