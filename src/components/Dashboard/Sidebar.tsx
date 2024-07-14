import React from "react";
import { useSelector } from "react-redux";
import {
  selectContestData,
  selectUserInfo,
  selectQuestionMap,
} from "../../reducers/slices/FetchedDataSlice";
import { drawerWidth, colorScheme } from "../../theme";
import { Separator } from "../ui/separator";
import getContestStats from "../../utils/getContestStats";
import getQuestionStats from "../../utils/getQuestionStats";
import { URL } from "../../API";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import img from "../../assets/Codeforces.svg";
import clsx from "clsx";

const Sidebar = () => {
  const userInfo = useSelector(selectUserInfo);
  const constestInfo = useSelector(selectContestData);
  const questionMap = useSelector(selectQuestionMap);
  const contestStats = getContestStats(constestInfo);
  const questionStats = getQuestionStats(questionMap);

  return (
    <Sheet>
      <SheetTrigger>
        <img
          alt="profile_picture"
          src={userInfo.avatar}
          className={clsx(
            "w-[50px] h-[50px] mx-auto rounded-full align-middle"
          )}
          style={{ border: `4px solid ${colorScheme[userInfo.rank]}` }}
        ></img>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="h-full grid grid-cols-1 justify-center space-y-5 ">
          <img
            alt="profile_picture"
            src={userInfo.avatar}
            className={`mt-6 mb-0.5 w-[200px] h-[200px] mx-auto rounded-full`}
            style={{ border: `6px solid ${colorScheme[userInfo.rank]}` }}
          ></img>
          <h6 className="font-Roboto font-bold text-3xl text-center">{`${userInfo.firstName}  ${userInfo.lastName}`}</h6>
          <h6 className="font-Roboto text-xl text-gray-400 text-center">{`@${userInfo.handle}`}</h6>
          <div
            className={`w-full align-middle`}
            style={{ borderLeft: `4px solid ${colorScheme[userInfo.rank]}` }}
          >
            <h1 className="font-Roboto font-extrabold text-7xl text-center my-4">
              {userInfo.rating}
            </h1>
            <h6
              className={`font-Roboto font-semibold text-xl text-center mb-2 capitalize`}
              style={{ color: colorScheme[userInfo.rank] }}
            >
              {userInfo.rank}
            </h6>
          </div>
          <Separator />
          <div className="w-full flex justify-around ">
            <div className="text-lg text-center">
              <h6>Contest</h6>
              <h6>{contestStats["Contest Given"]}</h6>
            </div>
            <Separator orientation="vertical" />
            <div className="text-lg text-center">
              <h6> Question</h6>
              <h6>{questionStats.QuestionsSolved}</h6>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1">
            <Button variant="link" className="flex flex-row justify-start">
              <img className="max-h-6 mr-4" src={img} alt="" />
              <a
                className="text-lg"
                href={`${URL}/profile/${userInfo.handle}`}
                target="_blank"
              >
                Codeforces Handle
              </a>
            </Button>
          </div>
          <Separator />
          <div
            className={`w-[${drawerWidth}px] w-full text-center p-4 text-gray-400 text-xs bottom-0`}
          >
            Made with &#9829; by Tushar Sharma •{" "}
            <a
              href="https://github.com/Tushars815/codeforces-tracker"
              target="__blank"
              className="underline underline-offset-4"
            >
              Github
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
