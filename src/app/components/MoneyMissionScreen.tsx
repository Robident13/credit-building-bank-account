import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Star, ChevronRight, Sparkles } from 'lucide-react';
import { Progress } from './ui/progress';
import { LEARNING_MODULES } from '../data/mockData';

export default function MoneyMissionScreen() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const module = LEARNING_MODULES.find(m => m.id === Number(moduleId));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  if (!module || !module.quiz || module.quiz.length === 0) {
    return (
      <div className="h-full flex flex-col bg-white">
        <header className="px-6 pt-8 pb-4">
          <button onClick={() => navigate('/learn')} className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
            <ArrowLeft size={18} />
            Back to Learn
          </button>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="text-6xl mb-4" aria-hidden="true">{module?.icon || '📚'}</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{module?.title || 'Module Not Found'}</h1>
          <p className="text-slate-600 text-center mb-6">{module?.description || 'This module is not available.'}</p>
          {module && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center w-full">
              <p className="text-sm text-amber-800">Quiz coming soon! This module's interactive content is being prepared.</p>
            </div>
          )}
          <button onClick={() => navigate('/learn')} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Back to Modules
          </button>
        </main>
      </div>
    );
  }

  const quiz = module.quiz;
  const question = quiz[currentQuestion];
  const totalQuestions = quiz.length;
  const progressPercent = ((currentQuestion + (showResult ? 1 : 0)) / totalQuestions) * 100;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === question.correctIndex;
    if (isCorrect) setScore(prev => prev + 1);
    setAnsweredQuestions(prev => [...prev, isCorrect]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 60;
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-amber-50 to-orange-50">
        <main className="flex-1 flex flex-col items-center justify-center px-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
            passed ? 'bg-green-100' : 'bg-amber-100'
          }`}>
            {passed ? <Trophy size={48} className="text-green-600" /> : <Star size={48} className="text-amber-600" />}
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {passed ? 'Mission Complete!' : 'Keep Learning!'}
          </h1>
          <p className="text-slate-600 text-center mb-6">
            {passed
              ? `Great job! You scored ${score}/${totalQuestions} on "${module.title}"`
              : `You scored ${score}/${totalQuestions}. Try again to master this topic!`}
          </p>

          {/* Score Breakdown */}
          <div className="w-full bg-white rounded-2xl p-5 border border-slate-200 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-600">Score</span>
              <span className="text-2xl font-bold text-slate-900">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-3 bg-slate-100 mb-4" />
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{score}</p>
                <p className="text-xs text-slate-500">Correct</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-500">{totalQuestions - score}</p>
                <p className="text-xs text-slate-500">Wrong</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">+{module.xp}</p>
                <p className="text-xs text-slate-500">XP Earned</p>
              </div>
            </div>
          </div>

          {/* Badges */}
          {passed && (
            <div className="w-full bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4 border border-amber-200 mb-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-amber-200 flex items-center justify-center">
                <Sparkles size={24} className="text-amber-700" />
              </div>
              <div>
                <p className="font-semibold text-amber-900">Badge Earned!</p>
                <p className="text-sm text-amber-700">{module.title} Master</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 w-full">
            <button
              onClick={() => navigate('/learn')}
              className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              Back to Modules
            </button>
            {!passed && (
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setShowResult(false);
                  setScore(0);
                  setCompleted(false);
                  setAnsweredQuestions([]);
                }}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <button onClick={() => navigate('/learn')} className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3" aria-label="Back to Learn">
          <ArrowLeft size={18} />
          Back
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl" aria-hidden="true">
            {module.icon}
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">{module.title}</h1>
            <p className="text-xs text-slate-500">Question {currentQuestion + 1} of {totalQuestions}</p>
          </div>
        </div>
        <Progress value={progressPercent} className="h-2 bg-slate-100" />
      </header>

      {/* Question */}
      <main className="flex-1 overflow-y-auto px-6 pb-8">
        {/* Question Indicators */}
        <div className="flex gap-1.5 mb-6">
          {quiz.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i < answeredQuestions.length
                  ? answeredQuestions[i] ? 'bg-green-500' : 'bg-red-400'
                  : i === currentQuestion ? 'bg-blue-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-6">{question.question}</h2>

        {/* Answer Options */}
        <div className="space-y-3 mb-6" role="radiogroup" aria-label="Answer options">
          {question.options.map((option, index) => {
            let style = 'bg-white border-slate-200 hover:border-blue-300';
            if (selectedAnswer === index && !showResult) {
              style = 'bg-blue-50 border-blue-500 ring-2 ring-blue-200';
            }
            if (showResult) {
              if (index === question.correctIndex) {
                style = 'bg-green-50 border-green-500';
              } else if (index === selectedAnswer && index !== question.correctIndex) {
                style = 'bg-red-50 border-red-400';
              } else {
                style = 'bg-slate-50 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                role="radio"
                aria-checked={selectedAnswer === index}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${style}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  showResult && index === question.correctIndex
                    ? 'bg-green-500 text-white'
                    : showResult && index === selectedAnswer
                    ? 'bg-red-400 text-white'
                    : selectedAnswer === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {showResult && index === question.correctIndex ? <CheckCircle2 size={18} /> :
                   showResult && index === selectedAnswer ? <XCircle size={18} /> :
                   String.fromCharCode(65 + index)}
                </div>
                <span className={`text-sm font-medium ${
                  showResult && index === question.correctIndex ? 'text-green-800' :
                  showResult && index === selectedAnswer ? 'text-red-800' :
                  'text-slate-800'
                }`}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`rounded-xl p-4 mb-6 ${
            selectedAnswer === question.correctIndex
              ? 'bg-green-50 border border-green-200'
              : 'bg-amber-50 border border-amber-200'
          }`}>
            <p className={`text-sm font-semibold mb-1 ${
              selectedAnswer === question.correctIndex ? 'text-green-800' : 'text-amber-800'
            }`}>
              {selectedAnswer === question.correctIndex ? 'Correct!' : 'Not quite right'}
            </p>
            <p className="text-sm text-slate-700">{question.explanation}</p>
          </div>
        )}

        {/* Action Button */}
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
            <ChevronRight size={18} />
          </button>
        )}
      </main>
    </div>
  );
}
