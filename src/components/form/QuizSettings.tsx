import { categories, difficulties } from "@/data/constants";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

export default function QuizSettings() {
  const [numOfQuestions, setNumOfQuestions] = useState<string | number>(10);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");

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
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
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
    </>
  );
}
