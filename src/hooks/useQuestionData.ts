import { useQuestionStore } from "../store/questions";

export const useQuestionData = () => {
  const questions = useQuestionStore((state) => state.questions);

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((questions) => {
    const { userSelectedAnswer, correctAnswer } = questions;
    if (userSelectedAnswer == null) unanswered++;
    else if (userSelectedAnswer == correctAnswer) correct++;
    else incorrect++;
  });

  return { correct, incorrect, unanswered };
};
