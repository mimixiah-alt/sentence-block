import { useState } from 'react';
import {
  LESSONS,
  type LanguageCode,
  type SentenceQuestion,
} from './data/lessons';
import { StartScreen } from './components/StartScreen';
import { GrammarScreen } from './components/GrammarScreen';
import {
  SentenceBuilder,
  type PracticeResult,
} from './components/SentenceBuilder';
import { ResultScreen } from './components/ResultScreen';
import './App.css';

type Screen = 'start' | 'grammar' | 'practice' | 'result';

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [activeQuestions, setActiveQuestions] = useState<
    readonly SentenceQuestion[]
  >([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const [result, setResult] = useState<PracticeResult>({
    correctCount: 0,
    questionsWithMistakeCount: 0,
    mistakeQuestions: [],
  });

  const selectedLesson =
    LESSONS.find((lesson) => lesson.id === selectedLessonId) ?? LESSONS[0];

  const handleToGrammar = () => {
    if (selectedLessonId === null) return;
    setScreen('grammar');
  };

  const handleBackToStart = () => {
    setScreen('start');
  };

  const handleStartLesson = () => {
    if (selectedLessonId === null) return;
    setActiveQuestions(selectedLesson.questions);
    setIsReviewMode(false);
    setSessionKey((prev) => prev + 1);
    setScreen('practice');
  };

  const handleFinish = (practiceResult: PracticeResult) => {
    setResult(practiceResult);
    setScreen('result');
  };

  const handleRetryMistakes = () => {
    if (result.mistakeQuestions.length === 0) return;
    setActiveQuestions(result.mistakeQuestions);
    setIsReviewMode(true);
    setSessionKey((prev) => prev + 1);
    setScreen('practice');
  };

  const handleSelectOtherLesson = () => {
    setIsReviewMode(false);
    setScreen('start');
  };

  return (
    <div className="app-shell">
      {screen === 'start' && (
        <StartScreen
          selectedLessonId={selectedLessonId}
          onSelectLesson={setSelectedLessonId}
          language={language}
          onLanguageChange={setLanguage}
          onNext={handleToGrammar}
        />
      )}
      {screen === 'grammar' && (
        <GrammarScreen
          lesson={selectedLesson}
          onBack={handleBackToStart}
          onStart={handleStartLesson}
        />
      )}
      {screen === 'practice' && (
        <SentenceBuilder
          key={sessionKey}
          lessonLabel={selectedLesson.label}
          questions={activeQuestions}
          language={language}
          isReviewMode={isReviewMode}
          onLanguageChange={setLanguage}
          onHome={handleBackToStart}
          onFinish={handleFinish}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          lessonLabel={selectedLesson.label}
          lessonTitle={selectedLesson.title}
          totalQuestions={activeQuestions.length}
          correctCount={result.correctCount}
          questionsWithMistakeCount={result.questionsWithMistakeCount}
          mistakeCountForReview={result.mistakeQuestions.length}
          isReviewMode={isReviewMode}
          onRetryMistakes={handleRetryMistakes}
          onRetryLesson={handleStartLesson}
          onSelectOtherLesson={handleSelectOtherLesson}
        />
      )}
    </div>
  );
}

export default App;
