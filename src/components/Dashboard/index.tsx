import React from "react";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import {
  selectApiFetched,
  selectSubmissionList,
} from "../../reducers/slices/FetchedDataSlice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Sidebar from "./Sidebar";
import { drawerWidth } from "@/src/theme";

const Dashboard = () => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <button>right</button>
        </SheetTrigger>
        <SheetContent side="right">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <div className={`w-${100% - ${drawerWidth}px} mx-auto`}>
        <h1 className="text-center text-lg">
          uwb,sdcaoispc'aisxasckdc dcioelbukneddwecderg4wttvwrtweucebiucdwodiucn
          cwuidjknscbdsoc9uibwdveiuvbqpwscbasdfghjkwertyuisdfghjkxcvbnsertyurdftvgybhunvw
        </h1>
      </div>
    </div>
  );
};

const DashboardWrapper = () => {
  const apiFetched = useSelector(selectApiFetched);
  const SubmissionList = useSelector(selectSubmissionList);
  return (
    <>
      {apiFetched === false || SubmissionList.length === 0 ? (
        redirect("/")
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default DashboardWrapper;
