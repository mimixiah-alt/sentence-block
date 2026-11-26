import { useState } from 'react';
import { SENTENCES, type LanguageCode } from './data/sentences';
import { StartScreen } from './components/StartScreen';
import {
  SentenceBuilder,
  type PracticeResult,
} from './components/SentenceBuilder';
import { ResultScreen } from './components/ResultScreen';
import './App.css';

type Screen = 'start' | 'practice' | 'result';

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [result, setResult] = useState<PracticeResult>({
    correctCount: 0,
    questionsWithMistakeCount: 0,
  });

  const handleStart = () => {
    setScreen('practice');
  };

  const handleFinish = (practiceResult: PracticeResult) => {
    setResult(practiceResult);
    setScreen('result');
  };

  const handleRestart = () => {
    setScreen('start');
  };

  return (
    <div className="app-shell">
      {screen === 'start' && (
        <StartScreen
          language={language}
          onLanguageChange={setLanguage}
          onStart={handleStart}
        />
      )}
      {screen === 'practice' && (
        <SentenceBuilder
          questions={SENTENCES}
          language={language}
          onLanguageChange={setLanguage}
          onFinish={handleFinish}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          totalQuestions={SENTENCES.length}
          correctCount={result.correctCount}
          questionsWithMistakeCount={result.questionsWithMistakeCount}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
