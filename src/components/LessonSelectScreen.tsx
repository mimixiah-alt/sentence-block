import { LESSONS } from '../data/lessons';

interface LessonSelectScreenProps {
  selectedLessonId: number | null;
  onSelectLesson: (lessonId: number) => void;
  onBack: () => void;
  onNext: () => void;
}

export function LessonSelectScreen({
  selectedLessonId,
  onSelectLesson,
  onBack,
  onNext,
}: LessonSelectScreenProps) {
  return (
    <main className="screen start-screen">
      <div className="card start-card">
        <div className="badge-pill">세종학당 한국어 1 · 1과~7과 복습</div>
        <h1 className="lesson-select-title">과를 고르세요</h1>

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

        <div className="guide-actions">
          <button
            type="button"
            className="btn btn-secondary btn-large"
            onClick={onBack}
          >
            ← 처음으로
          </button>
          <button
            type="button"
            className="btn btn-primary btn-large"
            disabled={selectedLessonId === null}
            onClick={onNext}
          >
            다음 →
          </button>
        </div>
      </div>
    </main>
  );
}

