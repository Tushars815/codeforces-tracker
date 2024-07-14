import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectApiFetched,
  selectSubmissionList,
} from "../../reducers/slices/FetchedDataSlice";
import Sidebar from "./Sidebar";
import Heatmap from "./Heatmap";
import Radar from "./Radar";
import Pie from "./Pie";
import Statistics from "./Statistics";
import UnsolvedQuestions from "./UnsolvedQuestions";
import Graph from "./Graph";
import img from "../../assets/CodeforcesLogo.svg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Dashboard:FC = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="relative flex flex-col space-y-24 bg-hero">
        <nav className="fixed z-20 top-0 left-0 right-0 flex flex-row justify-between p-2 pb-4 bg-[#F5F5F5] shadow-md mb-5 px-6">
          <img className="max-w-[300px] ml-2" src={img} alt="" />
          <div className="flex flex-row space-x-6">
            <Button variant="outline" asChild className="my-auto">
              <Link to="/">Home</Link>
            </Button>
            <Sidebar />
          </div>
        </nav>
        <div className="grid grid-cols-1 z-1 justify-center items-center space-y-8 ">
          <div className="z-0">
            <Graph />
          </div>
          <div className="m-auto p-4 w-9/12 bg-white transition-shadow shadow-lg hover:shadow-2xl">
            <Heatmap drawerOpen={true} />
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1">
            <Radar />
            <Pie />
          </div>
          <div className="mx-auto">
            <Statistics />
          </div>
          <UnsolvedQuestions />
        </div>
      </div>
    </>
  );
};

const DashboardWrapper = () => {
  const apiFetched = useSelector(selectApiFetched);
  const SubmissionList = useSelector(selectSubmissionList);
  return (
    <>
      {apiFetched === false || SubmissionList.length === 0 ? (
        <Navigate to="/" />
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default DashboardWrapper;
