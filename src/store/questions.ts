import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestion: (limit: number) => void;
  selectAnswer: (questionId: number, answeIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
}

export const useQuestionStore = create<State>()(
  persist(
    (set, get) => {
      return {
        loading: false,
        questions: [],
        currentQuestion: 0,

        fetchQuestion: async (limit: number) => {
          const res = await fetch("http://localhost:5173/data.json");
          const json = await res.json();

          const questions = json
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
          set({ questions });
        },

        selectAnswer: (questionId: number, answeIndex: number) => {
          const { questions } = get();

          // structuredClone -> clonacion de objeto de fornma profunda
          const newQuestion = structuredClone(questions);
          // encontramos el indice de la pregunta
          const questionIndex = newQuestion.findIndex(
            (q) => q.id == questionId
          );
          const questionInfo = newQuestion[questionIndex];
          // averiguamos si usuario seleciono la respuesta correcta
          const isCorrectUserAnswer = questionInfo.correctAnswer == answeIndex;

          if (isCorrectUserAnswer) confetti();

          //cambiar informaicon en la copai de la pregunta
          newQuestion[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answeIndex,
          };

          //actualizar estado
          set({ questions: newQuestion });
        },

        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;

          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion });
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previoudQuestion = currentQuestion - 1;

          if (previoudQuestion > 0) {
            set({ currentQuestion: previoudQuestion });
          }
        },
        reset: () => {
          set({ currentQuestion: 0, questions: [] });
        },
      };
    },
    {
      name: "questions",
    }
  )
);
