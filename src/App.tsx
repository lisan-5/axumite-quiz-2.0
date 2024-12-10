import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizCard } from './components/QuizCard';
import { ProgressBar } from './components/ProgressBar';
import { ResultScreen } from './components/ResultScreen';
import { DifficultySelector } from './components/DifficultySelector';
import { Timer } from './components/Timer';
import { Logo } from './components/Logo';
import { Footer } from './components/Footer';
import { ContactInfo } from './components/ContactInfo';
import { useQuizStore } from './store/quizStore';
import { useQuizProgress } from './hooks/useQuizProgress';

function App() {
  const { isCompleted, difficulty, setAnswer, nextQuestion, resetQuiz, completeQuiz } = useQuizStore();
  const { currentQuestionData, totalQuestions, calculateScore, selectedQuestions } = useQuizProgress();

  const handleAnswer = (answer: string) => {
    if (!currentQuestionData) return;
    setAnswer(currentQuestionData.id, answer);
    if (selectedQuestions.indexOf(currentQuestionData) < totalQuestions - 1) {
      setTimeout(() => nextQuestion(), 500);
    } else {
      completeQuiz();
    }
  };

  const handleTimeUp = () => {
    if (selectedQuestions.indexOf(currentQuestionData) < totalQuestions - 1) {
      nextQuestion();
    } else {
      completeQuiz();
    }
  };

  const backgroundVariants = {
    animate: {
      background: [
        'linear-gradient(135deg, #1a365d 0%, #2563eb 50%, #1e40af 100%)',
        'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #1a365d 100%)',
        'linear-gradient(135deg, #2563eb 0%, #1a365d 50%, #3b82f6 100%)',
        'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)',
        'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)'
      ],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col h-screen overflow-hidden"
      variants={backgroundVariants}
      animate="animate"
      initial="initial"
    >
      <ContactInfo />
      <div className="flex-grow flex flex-col max-w-4xl mx-auto w-full p-4 justify-center">
        <Logo />
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-4"
        >
          <h1 className="text-2xl font-bold text-amber-100">
            Axumite Kingdom Quiz
          </h1>
          <p className="text-sm text-amber-200/80">
            Test your knowledge about one of the world's greatest ancient civilizations
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!difficulty ? (
            <DifficultySelector />
          ) : !isCompleted && currentQuestionData ? (
            <div className="space-y-4">
              <Timer onTimeUp={handleTimeUp} />
              <ProgressBar
                current={selectedQuestions.indexOf(currentQuestionData) + 1}
                total={totalQuestions}
              />
              <QuizCard
                key={currentQuestionData.id}
                question={currentQuestionData}
                onAnswer={handleAnswer}
              />
            </div>
          ) : isCompleted ? (
            <ResultScreen
              score={calculateScore()}
              totalQuestions={totalQuestions}
              onRestart={resetQuiz}
            />
          ) : null}
        </AnimatePresence>
      </div>
      <Footer />
    </motion.div>
  );
}

export default App;