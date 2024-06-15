import React from "react";
import { useRouteError } from "react-router-dom";
import gandalf from "../assets/gandalf.svg"
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ErrorPage = () => {
  const error: any = useRouteError();
  return (
    <div
      id="error-page"
      className="h-[100vh] w-full bg-fixed bg-cover bg-center bg-gandalf"
    >
      <div className="h-full flex flex-col justify-center text-center align-middle ">
        <img src={gandalf} alt="" className="max-h-[45vh] mb-10" />
        <p className="font-Roboto text-xl font-bold mb-3">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="font-Roboto text-xl font-semibold">
          <i>{error.data}</i>
        </p>
        <Button
          className=" max-w-24 m-5 font-medium text-lg"
          asChild
        >
          <Link className="mx-auto" to={"/"}>
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
