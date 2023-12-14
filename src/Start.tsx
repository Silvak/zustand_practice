import { Button } from "@mui/material";
import { useQuestionStore } from "./store/questions";

const LIMIT_QUESTIONS = 10;

export const Start = () => {
  const fetchQuestion = useQuestionStore((state) => state.fetchQuestion);

  const handleClick = () => {
    fetchQuestion(LIMIT_QUESTIONS);
  };

  return (
    <Button onClick={handleClick} variant="contained">
      ¡Empezar!
    </Button>
  );
};
