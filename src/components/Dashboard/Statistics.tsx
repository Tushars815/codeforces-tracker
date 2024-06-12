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
import { Separator } from "../ui/separator";

const Statistics = () => {
  const QuestionData = getQuestionStats(useSelector(selectQuestionMap));
  const ContestData = getContestStats(useSelector(selectContestData));
  const { handle } = useSelector(selectUserInfo);
  return (
    <div className=" grid lg:grid-cols-2 grid-cols-1 lg:space-x-5 lg:space-y-0 sm:space-y-5 ">
      <Card className="min-w-[250px] mx-auto h-full shadow-lg">
        <CardHeader>
          <CardTitle>QUESTION STATS</CardTitle>
          <CardDescription>@{handle}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <ul className="grid grid-cols-1 space-y-5 mt-5 text-lg">
            <li className="flex flex-row justify-between space-x-5">
              <h6>Number of Questions Attempted</h6>
              <h6>{QuestionData.QuestionsAttempted}</h6>
            </li>
            <li className="flex flex-row justify-between space-x-5">
              <h6>Number of Questions Solved</h6>
              <h6>{QuestionData.QuestionsSolved}</h6>
            </li>
            <li className="flex flex-row justify-between space-x-5">
              <h6>Number of Questions Unsolved</h6>
              <h6 className="font-Roboto">{QuestionData.QuestionsUnsolved}</h6>
            </li>
            <li className="flex flex-row justify-between space-x-5">
              <h6>Average Attempts to be AC </h6>
              <h6>{QuestionData.AverageAttempts}</h6>
            </li>
            <li className="flex flex-row justify-between space-x-5">
              <h6>Hardest Question Solved </h6>
              <h6>
                <a
                  className="text-blue-600"
                  href={QuestionData.bestQuestionByRating.url}
                  target="_blank"
                >
                  {QuestionData.bestQuestionByRating.id}{" "}
                  {`(${QuestionData.bestQuestionByRating.rating})`}
                </a>
              </h6>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="min-w-[250px] mx-auto h-full shadow-lg text-lg">
        <CardHeader>
          <CardTitle>CONTEST STATS</CardTitle>
          <CardDescription>@{handle}</CardDescription>
        </CardHeader>
        <Separator />

        <CardContent>
          <ul className="grid grid-cols-1 space-y-5 mt-5">
            {Object.entries(ContestData).map(([key, value]) => {
              return (
                <li
                  key={key}
                  className="flex flex-row justify-between space-x-5"
                >
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
