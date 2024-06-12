import React from "react";
import img from "../assets/CodeforcesLogo.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import makeRequest from "../utils/fetchData";
import ForkMeOnGithubRibbon from "./ForkRibbon";
import peeps from "../assets/peep-crowd.svg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronRight } from "lucide-react";
import { Loader2 } from "lucide-react";

type NextButtonProps = {
  handle: string;
  setErrorText: React.Dispatch<
    React.SetStateAction<{
      error: boolean;
      comment: string;
    }>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const NextButton: React.FC<NextButtonProps> = ({
  handle,
  setErrorText,
  loading,
  setLoading,
}) => {
  const dispatch = useDispatch();
  //   const history = useHistory();
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    const response = await makeRequest(handle, dispatch, navigate);
    if (response !== undefined) {
      setErrorText(response);
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="h-lg border-2"
      onClick={() => handleClick()}
    >
      {!loading ? <ChevronRight /> : <Loader2 className="animate-spin" />}
    </Button>
  );
};

const handles = ["Tourist", "Errichto", "SecondThread"];

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState({ error: false, comment: "" });
  const [handle, setHandle] = useState<string>(
    handles[Math.floor(Math.random() * handles.length)]
  );
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHandle(event.target.value as string);
  };
  return (
    <>
      <ForkMeOnGithubRibbon />
      <div className="h-[100vh] flex flex-col justify-between content-stretch bg-hero">
        <span className="p-2 flex flex-col justify-center">
          <img className="max-h-[90px]" src={img} alt="Codeforces Logo" />
        </span>
        <div className="text-center items-center">
          <h1 className="text-4xl font-Roboto font-semibold mb-2">
            Enter Codeforces Handle
          </h1>
          <div className="w-full flex flex-row justify-center">
            <div className="w-full flex flex-row max-w-sm space-x-2">
              <Input
                type="text"
                className="border-2 h-lg"
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => handleChange(e)}
                value={handle}
              />
              <NextButton
                handle={handle}
                setErrorText={setErrorText}
                loading={loading}
                setLoading={setLoading}
              />
            </div>
          </div>
        </div>
        <div className="h-[35vh] content-end">
          <div className="flex flex-row justify-center">
            <img className="w-[80%] h-auto" src={peeps} alt="hero_image" />
          </div>
          <div className="w-full text-center p-4 bg-[#3a3939] text-neutral-50/[0.6] text-xs">
            Made with &#9829; by Tushar Sharma{"  "}•{"  "}
            <a
              href="https://github.com/Tushars815/codeforces-tracker"
              target="__blank"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
