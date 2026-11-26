import { useEffect } from 'react';
import type { Lesson } from '../data/lessons';
import { speakKorean, stopSpeaking } from '../utils/speak';

interface GrammarScreenProps {
  lesson: Lesson;
  onBack: () => void;
  onStart: () => void;
}

export function GrammarScreen({ lesson, onBack, onStart }: GrammarScreenProps) {
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  return (
    <main className="screen grammar-screen">
      <div className="grammar-header-card card">
        <div className="badge-pill">
          {lesson.label} · {lesson.title}
        </div>
        <h1 className="grammar-screen-title">오늘 배울 문법</h1>
      </div>

      <div className="grammar-cards-list">
        {lesson.grammarPoints.map((grammar) => (
          <section
            key={grammar.name}
            className="card grammar-detail-card"
            aria-label={grammar.name}
          >
            <h2 className="grammar-point-name">{grammar.name}</h2>

            <div className="grammar-detail-row">
              <span className="grammar-detail-label">의미</span>
              <p className="grammar-detail-text">{grammar.meaning}</p>
            </div>

            <div className="grammar-detail-row">
              <span className="grammar-detail-label">형태</span>
              <table className="grammar-form-table">
                <tbody>
                  {grammar.forms.map((form) => (
                    <tr key={`${form.condition}-${form.example}`}>
                      <th>{form.condition}</th>
                      <td>{form.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grammar-detail-row">
              <span className="grammar-detail-label">본문 예문</span>
              <ul className="grammar-example-list">
                {grammar.mainExamples.map((example) => (
                  <li key={example} className="grammar-example-item is-main">
                    <span className="grammar-example-text">{example}</span>
                    <button
                      type="button"
                      className="btn-example-listen"
                      aria-label={`${example} 듣기`}
                      onClick={() => speakKorean(example)}
                    >
                      🔊
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grammar-detail-row">
              <span className="grammar-detail-label">추가 예문</span>
              <ul className="grammar-example-list">
                {grammar.extraExamples.map((example) => (
                  <li key={example} className="grammar-example-item">
                    <span className="grammar-example-text">{example}</span>
                    <button
                      type="button"
                      className="btn-example-listen"
                      aria-label={`${example} 듣기`}
                      onClick={() => speakKorean(example)}
                    >
                      🔊
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <div className="guide-actions">
        <button
          type="button"
          className="btn btn-secondary btn-large"
          onClick={() => {
            stopSpeaking();
            onBack();
          }}
        >
          ← 과 다시 고르기
        </button>
        <button
          type="button"
          className="btn btn-primary btn-large start-button"
          onClick={() => {
            stopSpeaking();
            onStart();
          }}
        >
          문제 풀기 →
        </button>
      </div>

      <footer className="attribution">
        출처: 세종학당재단 『바로 배워 바로 쓰는 세종학당 한국어 1』 (공공누리
        제4유형)
      </footer>
    </main>
  );
}
