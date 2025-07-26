import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, HelpCircle, Check, X, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const quizQuestions = [
  {
    question: 'What does "Glioblastoma" refer to?',
    options: ['A type of benign tumor', 'An aggressive type of brain cancer', 'A treatment for brain tumors', 'A part of the brain'],
    answer: 'An aggressive type of brain cancer',
    explanation: 'Glioblastoma is the most common and most aggressive type of primary brain tumor in adults. It arises from astrocytes, a type of glial cell in the brain.',
  },
  {
    question: 'What is the role of a "Neuro-Oncologist"?',
    options: ['A surgeon who removes brain tumors', 'A specialist in brain imaging', 'A doctor specializing in cancers of the brain and nervous system', 'A type of radiation therapy'],
    answer: 'A doctor specializing in cancers of the brain and nervous system',
    explanation: 'A neuro-oncologist is a physician who has specialized training in diagnosing and treating cancers of the brain and spinal cord. They manage the overall treatment plan, including chemotherapy and targeted therapies.',
  },
  {
    question: 'What does "Metastasis" mean in the context of cancer?',
    options: ['The original tumor location', 'The shrinking of a tumor', 'The spread of cancer from one part of the body to another', 'A type of cancer screening'],
    answer: 'The spread of cancer from one part of the body to another',
    explanation: 'Metastasis is the process by which cancer cells break away from the primary tumor and travel through the bloodstream or lymph system to form new tumors in other parts of the body.',
  },
  {
    question: 'What is "Palliative Care"?',
    options: ['Care that aims to cure cancer', 'Care focused on improving quality of life and providing relief from symptoms', 'A type of physical therapy', 'End-of-life care only'],
    answer: 'Care focused on improving quality of life and providing relief from symptoms',
    explanation: 'Palliative care is specialized medical care for people living with a serious illness. It focuses on providing relief from the symptoms and stress of the illness, and can be provided alongside curative treatment.',
  },
];

const EducationalHub = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.answer;

  const handleOptionSelect = (option) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // End of quiz
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
  };

  return (
    <>
      <Helmet>
        <title>Educational Hub - Living Oncology</title>
        <meta name="description" content="Enhance your health literacy with Living Oncology's Educational Hub. Test your knowledge with our interactive brain tumor terminology quiz and access key resources." />
      </Helmet>

      <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Educational Community Hub</h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">A knowledge-sharing platform bridging medical complexity and patient understanding.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl">Brain Tumor Terminology Quiz</CardTitle>
              <CardDescription className="text-lg">Test your knowledge and improve your health literacy with this interactive tool.</CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {currentQuestionIndex < quizQuestions.length && !showResult && (
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <p className="text-lg font-semibold text-gray-600 mb-2">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
                      <p className="text-2xl font-bold text-primary">{currentQuestion.question}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="lg"
                          className="justify-start text-left h-auto py-4"
                          onClick={() => handleOptionSelect(option)}
                        >
                          <HelpCircle className="mr-3 h-5 w-5 flex-shrink-0" />
                          {option}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {showResult && currentQuestionIndex < quizQuestions.length && (
                   <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <p className="text-2xl font-bold text-primary">{currentQuestion.question}</p>
                    </div>
                    <div className="space-y-4 mb-6">
                      {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedOption === option;
                        const isAnswer = currentQuestion.answer === option;
                        let variant = "outline";
                        if (isSelected && !isCorrect) variant = "destructive";
                        if (isAnswer) variant = "default";
                        
                        return (
                          <Button
                            key={index}
                            variant={variant}
                            size="lg"
                            className="w-full justify-start text-left h-auto py-4 pointer-events-none"
                          >
                             {isAnswer ? <Check className="mr-3 h-5 w-5"/> : isSelected ? <X className="mr-3 h-5 w-5"/> : <div className="w-8"></div>}
                            {option}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="p-4 bg-green-50 border-l-4 border-primary rounded-r-lg"
                    >
                      <p className="font-semibold text-primary mb-2">Explanation:</p>
                      <p className="text-gray-700">{currentQuestion.explanation}</p>
                    </motion.div>
                    
                    <div className="mt-8 text-center">
                      <Button onClick={handleNextQuestion} size="lg">
                        {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Show Final Score'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                )}
                
                {showResult && currentQuestionIndex === quizQuestions.length-1 && (
                     <motion.div
                        key="final-score"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center p-8"
                    >
                        <h2 className="text-3xl font-bold text-primary mb-4">Quiz Complete!</h2>
                        <p className="text-xl text-gray-700 mb-6">You scored {score} out of {quizQuestions.length}</p>
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-100 to-yellow-100 rounded-full flex items-center justify-center mb-8">
                            <span className="text-4xl font-bold text-primary">{Math.round((score/quizQuestions.length)*100)}%</span>
                        </div>
                        <Button onClick={handleRestartQuiz} size="lg">
                            <RefreshCw className="mr-2 h-5 w-5" />
                            Restart Quiz
                        </Button>
                    </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default EducationalHub;