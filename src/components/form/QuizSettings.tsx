import React, { useContext, useState } from "react";
import { categories, difficulties, numberOfQuestions } from "@/data/constants";
import { QuizContext } from "@/context/QuizContext";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function QuizSettings() {
  const { handleNext, handleSetQuestions } = useContext(QuizContext);
  const [numOfQuestions, setNumOfQuestions] = useState<string | number>(10);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");

  const getQuestions = async () => {
    const validParams: string[] = [];
    const params = [
      { key: "category", value: category },
      { key: "difficulty", value: difficulty },
    ];
    params.forEach((item) => {
      if (item.value !== "any") {
        validParams.push(`${item.key}=${item.value}`);
      }
    });
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz?amount=${numOfQuestions}`;
    if (validParams.length) url = url.concat("&" + validParams.join("&"));
    try {
      const questions = await fetch(url);
      const questionsParsed = await questions.json();
      handleSetQuestions(questionsParsed.results);
      handleNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: "50%" }} size="small">
        <InputLabel id="num-of-questions-label">Number of questions</InputLabel>
        <Select
          fullWidth
          labelId="num-of-questions-label"
          id="num-of-questions"
          value={numOfQuestions}
          label="Number of questions"
          onChange={(e) => {
            setNumOfQuestions(e.target.value);
          }}
        >
          {numberOfQuestions.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: "50%" }} size="small">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          fullWidth
          labelId="category-label"
          id="category"
          value={category}
          label="Category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {categories.map((category, index) => {
            return (
              <MenuItem key={index} value={category.value}>
                {category.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: "50%" }} size="small">
        <InputLabel id="difficulty-label">Difficulty</InputLabel>
        <Select
          fullWidth
          labelId="difficulty-label"
          id="difficulty"
          value={difficulty}
          label="Difficulty"
          onChange={(e) => {
            setDifficulty(e.target.value);
          }}
        >
          {difficulties.map((difficulty, index) => {
            return (
              <MenuItem key={index} value={difficulty.value}>
                {difficulty.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Box sx={{ mb: 2, ml: 1 }}>
        <div>
          <Button
            variant="contained"
            onClick={getQuestions}
            sx={{ mt: 1, mr: 1 }}
            size="small"
          >
            Continue
          </Button>
        </div>
      </Box>
    </>
  );
}
