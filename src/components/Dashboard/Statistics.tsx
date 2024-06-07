import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import getQuestionStats from "../../utils/getQuestionStats";
import getContestStats from "../../utils/getContestStats";
import {
  selectUserInfo,
  selectQuestionMap,
  selectContestData,
} from "../../reducers/slices/FetchedDataSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Statistics = () => {
  const QuestionData = getQuestionStats(useSelector(selectQuestionMap));
  const ContestData = getContestStats(useSelector(selectContestData));
  const { handle } = useSelector(selectUserInfo);
  return (
    <div className="md:flex md:flex-row md:justify-around mx-auto">
      <Card className="w-[30vw] mx-auto">
        <CardHeader>
          <CardTitle>QUESTION STATS</CardTitle>
          <CardDescription>@{handle}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li className="flex flex-row justify-between">
              <h6>Number of Questions Attempted</h6>
              <h6>{QuestionData.QuestionsAttempted}</h6>
            </li>
            <li className="flex flex-row justify-between">
              <h6>Number of Questions Solved</h6>
              <h6>{QuestionData.QuestionsSolved}</h6>
            </li>
            <li className="flex flex-row justify-between">
              <h6>Number of Questions Unsolved</h6>
              <h6>{QuestionData.QuestionsUnsolved}</h6>
            </li>
            <li className="flex flex-row justify-between">
              <h6>Average Attempts to be AC </h6>
              <h6>{QuestionData.AverageAttempts}</h6>
            </li>
            <li className="flex flex-row justify-between">
              <h6>Hardest Question Solved </h6>
              <h6>
                <a href={QuestionData.bestQuestionByRating.url} target="_blank">
                  {QuestionData.bestQuestionByRating.id}{" "}
                  {`(${QuestionData.bestQuestionByRating.rating})`}
                </a>
              </h6>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="w-[30vw] mx-auto">
        <CardHeader>
          <CardTitle>CONTEST STATS</CardTitle>
          <CardDescription>@{handle}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            {Object.entries(ContestData).map(([key, value]) => {
              return (
                <li key={key} className="flex flex-row justify-between">
                  <h6>{key}</h6>
                  <h6>{value}</h6>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
