import React from "react";
import img from "../assets/CodeforcesLogo.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import makeRequest from "../utils/fetchData";

type NextButtonProps = {
  handle: string;
  setErrorText: React.Dispatch<
    React.SetStateAction<{
      error: boolean;
      comment: string;
    }>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const NextButton: React.FC<NextButtonProps> = ({
  handle,
  setErrorText,
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

  return <button onClick={() => handleClick()}>Submit</button>;
};

const handles = ["Errichto", "SecondThread"];

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
    <div className="flex flex-col justify-between h-full content-stretch">
      <div className="justify-center w-full ">
        <img className="max-h-[90px]" src={img} alt="" />
      </div>
      <div className="text-center">
        <h1>Enter Codeforces Handle</h1>
        <input
          type="text"
          className="border-2"
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleChange(e)}
          value={handle}
        />
        <NextButton
          handle={handle}
          setErrorText={setErrorText}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default LandingPage;
