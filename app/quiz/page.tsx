'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Shield, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Question type definition
interface QuizQuestion {
  id: string;
  title: string;
  options: string[];
  correctAnswer: string;
  style: 'pastel-pink' | 'pastel-white';
}

// Large question pool to randomly select from
const FULL_QUESTION_POOL: QuizQuestion[] = [
  {
    id: 'q1',
    title: 'When was our first kiss?',
    options: ['24th june', '13th june', '4th july', '26th october'],
    correctAnswer: '24th june',
    style: 'pastel-pink'
  },
  {
    id: 'q2',
    title: 'How old was I when we first started dating?',
    options: ['Legal age', 'Old enough', 'A minor', 'An adult'],
    correctAnswer: 'A minor',
    style: 'pastel-white'
  },
];

// Fisher-Yates shuffle algorithm for randomizing array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Select N unique random questions from the pool
function selectRandomQuestions(pool: QuizQuestion[], count: number): QuizQuestion[] {
  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, count);
}

export default function QuizPage() {
  const [questionBank, setQuestionBank] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [answerStatus, setAnswerStatus] = useState<Record<string, boolean>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);
  const router = useRouter();

  // Initialize quiz with random questions on mount
  useEffect(() => {
    const randomQuestions = selectRandomQuestions(FULL_QUESTION_POOL, 2);
    setQuestionBank(randomQuestions);
  }, []);

  const handleSelectOption = (questionId: string, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
    setShowFeedback(false);
  };

  const handleNext = () => {
    const question = questionBank[currentQuestion];
    const selectedAnswer = selectedAnswers[question.id];
    const isCorrect = selectedAnswer === question.correctAnswer;

    // Store answer correctness
    const updatedStatus = { ...answerStatus, [question.id]: isCorrect };
    setAnswerStatus(updatedStatus);
    setShowFeedback(true);

    // Wait for feedback animation before moving to next question
    setTimeout(() => {
      if (currentQuestion < questionBank.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowFeedback(false);
      } else {
        // Quiz completed - check if all answers are correct
        const allAnswersCorrect = Object.values(updatedStatus).every(status => status === true);
        setQuizCompleted(true);
        setAllCorrect(allAnswersCorrect);
        
        if (allAnswersCorrect) {
          // All correct - proceed to coordinates after a brief delay
          setTimeout(() => {
            router.push('/coordinates');
          }, 2000);
        }
      }
    }, 1500);
  };

  const handleRetry = () => {
    // Reset all state and select new random questions
    const randomQuestions = selectRandomQuestions(FULL_QUESTION_POOL, 2);
    setQuestionBank(randomQuestions);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setAnswerStatus({});
    setShowFeedback(false);
    setQuizCompleted(false);
    setAllCorrect(false);
  };

  // Don't render until questions are loaded
  if (questionBank.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ffecf2] via-[#fff5fa] to-[#ffd6e8] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-semibold text-[#d946a6]"
        >
          Loading Quiz...
        </motion.div>
      </div>
    );
  }

  const question = questionBank[currentQuestion];
  const isAnswered = selectedAnswers[question.id] !== undefined && selectedAnswers[question.id].trim() !== '';
  const currentAnswerCorrect = selectedAnswers[question.id] === question.correctAnswer;

  // Calculate score for display
  const correctCount = Object.values(answerStatus).filter(Boolean).length;
  const totalQuestions = questionBank.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffecf2] via-[#fff5fa] to-[#ffd6e8] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ y: -20, x: Math.random() * 1000, opacity: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 0.4, 0],
              rotate: Math.random() * 360
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
          >
            {question.style === 'pastel-pink' ? (
              <Heart className="w-6 h-6 text-[#ffd6e8] fill-[#ffd6e8]" />
            ) : (
              <span className="text-2xl">🌸</span>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {!quizCompleted ? (
          <>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full mb-4 border-2 border-[#ffe6f0]"
              >
                <Shield className="w-5 h-5 text-[#d946a6]" />
                <span className="font-semibold text-[#d946a6]">
                  Two-Step Authentication
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-5xl font-bold cursive text-[#d946a6] mb-2">
                  Step {currentQuestion + 1} of {questionBank.length}
                </h2>
                <div className="flex justify-center gap-2 mt-4">
                  {questionBank.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentQuestion
                          ? 'w-12 bg-gradient-to-r from-[#ffd6e8] to-[#ffb6d9]'
                          : index < currentQuestion
                          ? 'w-2 bg-[#d946a6]'
                          : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <div
                  className={`${
                    question.style === 'pastel-pink'
                      ? 'bg-gradient-to-br from-[#ffd6e8]/40 to-[#ffb6d9]/30'
                      : 'bg-white/70'
                  } backdrop-blur-lg rounded-3xl p-10 border-2 border-[#ffe6f0]`}
                  style={{ boxShadow: '0 20px 60px rgba(255, 182, 215, 0.3)' }}
                >
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-semibold text-center mb-8 text-gray-800"
                  >
                    {question.title}
                  </motion.h3>

                  <div className="space-y-4 mb-8">
                    {question.options.map((option, index) => {
                      const isSelected = selectedAnswers[question.id] === option;
                      const isCorrectOption = option === question.correctAnswer;
                      const showCorrectAnswer = showFeedback && isCorrectOption;
                      const showWrongAnswer = showFeedback && isSelected && !isCorrectOption;

                      return (
                        <motion.button
                          key={option}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          onClick={() => handleSelectOption(question.id, option)}
                          disabled={showFeedback}
                          whileHover={!showFeedback ? { scale: 1.02, x: 5 } : {}}
                          whileTap={!showFeedback ? { scale: 0.98 } : {}}
                          className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                            showCorrectAnswer
                              ? 'bg-gradient-to-r from-green-400 to-green-500 border-green-600 text-white shadow-lg'
                              : showWrongAnswer
                              ? 'bg-gradient-to-r from-red-400 to-red-500 border-red-600 text-white shadow-lg'
                              : isSelected
                              ? 'bg-gradient-to-r from-[#ffd6e8] to-[#ffb6d9] border-[#d946a6] text-white shadow-lg'
                              : 'bg-white/80 border-[#ffe6f0] hover:border-[#ffd6e8] text-gray-800'
                          } ${showFeedback ? 'cursor-not-allowed' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-lg">{option}</span>
                            {showCorrectAnswer && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', duration: 0.4 }}
                              >
                                <CheckCircle className="w-6 h-6" />
                              </motion.div>
                            )}
                            {showWrongAnswer && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', duration: 0.4 }}
                              >
                                <XCircle className="w-6 h-6" />
                              </motion.div>
                            )}
                            {isSelected && !showFeedback && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', duration: 0.4 }}
                              >
                                <Heart className="w-6 h-6 fill-white" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-6 p-4 rounded-xl text-center font-semibold ${
                        currentAnswerCorrect
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {currentAnswerCorrect ? '✨ Correct! Well done!' : '❌ Incorrect. The correct answer is highlighted.'}
                    </motion.div>
                  )}

                  <motion.button
                    onClick={handleNext}
                    disabled={!isAnswered || showFeedback}
                    whileHover={isAnswered && !showFeedback ? { scale: 1.02 } : {}}
                    whileTap={isAnswered && !showFeedback ? { scale: 0.98 } : {}}
                    className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      isAnswered && !showFeedback
                        ? 'bg-gradient-to-r from-[#ffd6e8] to-[#ffb6d9] text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {currentQuestion < questionBank.length - 1 ? 'Check Answer' : 'Submit Quiz'}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-6 text-sm text-gray-600"
            >
              <p className="italic">Answer both questions correctly to unlock coordinates</p>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 border-2 border-[#ffe6f0] text-center"
            style={{ boxShadow: '0 20px 60px rgba(255, 182, 215, 0.3)' }}
          >
            {allCorrect ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: 'spring', duration: 0.8 }}
                  className="inline-block mb-6"
                >
                  <CheckCircle className="w-24 h-24 text-green-500" />
                </motion.div>
                <h2 className="text-4xl font-bold text-[#d946a6] mb-4">Perfect Score! 🎉</h2>
                <p className="text-xl text-gray-700 mb-6">
                  You got {correctCount} out of {totalQuestions} questions correct!
                </p>
                <p className="text-lg text-gray-600">
                  Redirecting to coordinates page...
                </p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="inline-block mb-6"
                >
                  <XCircle className="w-24 h-24 text-red-500" />
                </motion.div>
                <h2 className="text-4xl font-bold text-[#d946a6] mb-4">Not Quite There</h2>
                <p className="text-xl text-gray-700 mb-6">
                  You got {correctCount} out of {totalQuestions} questions correct.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  You need to answer all questions correctly to proceed!
                </p>
                <motion.button
                  onClick={handleRetry}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#ffd6e8] to-[#ffb6d9] text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  Try Again with New Questions
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
