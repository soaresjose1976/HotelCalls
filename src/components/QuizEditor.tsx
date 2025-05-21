import React, { useState } from 'react';
import { TrainingQuiz, QuizQuestion } from '../types/training';
import { trainingService } from '../lib/trainingService';

interface Props {
  materialId: string;
  onQuizCreated?: (quiz: TrainingQuiz) => void;
}

export default function QuizEditor({ materialId, onQuizCreated }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [passingScore, setPassingScore] = useState(70);
  const [questions, setQuestions] = useState<Partial<QuizQuestion>[]>([]);

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      options: ['', '', '', ''],
      correct_answer: '',
      points: 1
    }]);
  };

  const updateQuestion = (index: number, updates: Partial<QuizQuestion>) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], ...updates };
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Créer le quiz
      const quiz = await trainingService.createQuiz({
        material_id: materialId,
        title,
        description,
        passing_score: passingScore
      });

      // Ajouter les questions
      await Promise.all(questions.map(question =>
        trainingService.addQuizQuestion({
          ...question,
          quiz_id: quiz.id
        })
      ));

      onQuizCreated?.(quiz);
    } catch (error) {
      console.error('Erreur lors de la création du quiz:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Score minimum (%)
        </label>
        <input
          type="number"
          value={passingScore}
          onChange={(e) => setPassingScore(Number(e.target.value))}
          min="0"
          max="100"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Questions</h3>
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Ajouter une question
          </button>
        </div>

        {questions.map((question, index) => (
          <div key={index} className="border rounded-lg p-4">
            <input
              type="text"
              value={question.question}
              onChange={(e) => updateQuestion(index, { question: e.target.value })}
              placeholder="Question"
              className="block w-full mb-2"
            />
            
            {question.options?.map((option, optIndex) => (
              <div key={optIndex} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[optIndex] = e.target.value;
                    updateQuestion(index, { options: newOptions });
                  }}
                  placeholder={`Option ${optIndex + 1}`}
                  className="block w-full my-1"
                />
                <input
                  type="radio"
                  name={`correct-${index}`}
                  checked={question.correct_answer === option}
                  onChange={() => updateQuestion(index, { correct_answer: option })}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-2 rounded-md"
      >
        Créer le quiz
      </button>
    </form>
  );
}
