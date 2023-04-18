import QuizFill from "@/components/form/QuizFill";
import QuizSettings from "@/components/form/QuizSettings";

export const steps = [
  {
    label: "Select quiz settings",
    content: <QuizSettings />,
  },
  {
    label: "Complete quiz",
    content: <QuizFill />,
  },
  {
    label: "Submit quiz",
    content: <></>,
  },
];

export const categories = [
  {
    value: "any",
    label: "Any category",
  },
  {
    value: "9",
    label: "General Knowledge",
  },
  {
    value: "10",
    label: "Books",
  },
  {
    value: "11",
    label: "Film",
  },
  {
    value: "12",
    label: "Music",
  },
  {
    value: "13",
    label: "Musicals & Theatres",
  },
  {
    value: "14",
    label: "Television",
  },
  {
    value: "15",
    label: "Video Games",
  },
  {
    value: "16",
    label: "Board Games",
  },
  {
    value: "17",
    label: "Science & Nature",
  },
  {
    value: "18",
    label: "Computers",
  },
  {
    value: "19",
    label: "Mathematics",
  },
  {
    value: "20",
    label: "Mythology",
  },
];

export const difficulties = [
  {
    value: "any",
    label: "Any difficulty",
  },
  {
    value: "easy",
    label: "Easy",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "hard",
    label: "Hard",
  },
];

export const numberOfQuestions = [10, 20, 30];
