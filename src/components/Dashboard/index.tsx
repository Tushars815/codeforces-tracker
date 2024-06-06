import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
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
import Heatmap from "../ui/Heatmap";

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
      <nav className="flex flex-row justify-end">
        <Sheet>
          <SheetTrigger>right</SheetTrigger>
          <SheetContent side="right">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </nav>

      <div className="m-auto p-2 w-9/12">
        <Heatmap drawerOpen={true} />
      </div>
    </div>
  );
};

const DashboardWrapper = () => {
  const apiFetched = useSelector(selectApiFetched);
  const SubmissionList = useSelector(selectSubmissionList);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (apiFetched === false || SubmissionList.length === 0) {
  //     navigate("/");
  //   }
  // }, [apiFetched, SubmissionList]);

  // if (apiFetched === false || SubmissionList.length === 0) {
  //   return null;
  // }
  // return <Dashboard />;
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
