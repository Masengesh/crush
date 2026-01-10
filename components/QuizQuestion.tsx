import React from 'react';

interface QuizQuestionProps {
  question: string;
  options: string[];
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
}) => {
  return (
    <div className="quiz-question">
      <h3>{question}</h3>
      <div className="quiz-options">
        {options.map((option, index) => (
          <button
            key={index}
            type="button"
            className={`quiz-option ${selectedAnswer === option ? 'selected' : ''}`}
            onClick={() => onAnswerSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;