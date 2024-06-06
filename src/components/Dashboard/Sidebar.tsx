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

const Sidebar = () => {
  const userInfo = useSelector(selectUserInfo);
  const constestInfo = useSelector(selectContestData);
  const questionMap = useSelector(selectQuestionMap);
  const contestStats = getContestStats(constestInfo);
  const questionStats = getQuestionStats(questionMap);
  return (
    <div className="flex flex-col">
      <img
        alt="profile_picture"
        src={userInfo.avatar}
        className={`border-[${
          colorScheme[userInfo.rank]
        }] border-[6px] mt-2 mb-0.5 w-[150px] h-[150px] mx-auto rounded-full`}
      ></img>
      <h6>{`${userInfo.firstName}  ${userInfo.lastName}`}</h6>
      <h6>{`@${userInfo.handle}`}</h6>
      <div
        className={`border-l-4 border-[${
          colorScheme[userInfo.rank]
        }] align-middle`}
      >
        <h1>{userInfo.rating}</h1>
        <h6>{userInfo.rank}</h6>
      </div>
      <Separator />
      <div className="grid grid-cols-2">
        <div>
          <h6>Contest</h6>
          <h6>{contestStats["Contest Given"]}</h6>
        </div>
        <div>
          <h6> Question</h6>
          <h6>{questionStats.QuestionsSolved}</h6>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1">
        <a href={`${URL}/profile/${userInfo.handle}`} target="_blank">
          Codeforces Handle
        </a>
      </div>
      <Separator />
      <div className={`w-[${drawerWidth}px]`}>
        Made with &#9829; by Tushar Sharma •{" "}
        <a href="https://github.com/Tushars815" target="__blank">
          Github
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
