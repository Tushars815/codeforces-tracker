import React, { useState } from "react";
import { QuestionMapType } from "@/src/types";
import { selectQuestionMap } from "../../reducers/slices/FetchedDataSlice";
import { GYM_QUESTION_URL, QUESTION_URL } from "../../API";
import { useSelector } from "react-redux";
import { Separator } from "../ui/separator";

const prepareData = (questionMap: QuestionMapType) => {
  const dataFiltered = Object.entries(questionMap).filter(([key, value]) => {
    return value.solved === false && value.contestId;
  });
  const data = dataFiltered.map((element) => {
    const key = element[0];
    const value = element[1];

    const URL = value.contestId > 10000 ? GYM_QUESTION_URL : QUESTION_URL;

    return {
      id: key,
      url: `${URL}/${value.contestId}/${value.index}`,
      rating: value.rating,
    };
  });
  return data;
};

const UnsolvedQuestions = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const questionList = prepareData(useSelector(selectQuestionMap));
  if (toggle) questionList.sort((a, b) => (a.rating > b.rating ? 1 : -1));
  return (
    <div className="grid grid-cols-1 p-4">
      <h1>Unsolved Questions</h1>
      <Separator />
      <div className="flex flex-wrap gap-2">
        {questionList.map((question) => {
          return (
            <h6 key={question.id}>
              <a href={question!.url} target="_blank" key={question!.id}>
                {question!.id}
              </a>
            </h6>
          );
        })}
      </div>
    </div>
  );
};

export default UnsolvedQuestions;
