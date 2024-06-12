import React from "react";
import { SubmissionType, QuestionMapDateType } from "@/src/types";
import { GYM_QUESTION_URL, QUESTION_URL } from "../../API";
import dateFormat from "dateformat";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { relativeDate } from "../../utils/getDate";
import { Separator } from "../ui/separator";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
interface AppProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogData: QuestionMapDateType;
}

const prepareURL = (question: SubmissionType) => {
  const URL =
    question.problem.contestId > 10000 ? GYM_QUESTION_URL : QUESTION_URL;

  const url = `${URL}/${question.problem.contestId}/${question.problem.index}`;
  return url;
};


const getStringFromArray = (tags: string[]) => {
  let tagString = "  ";
  tags.forEach((tag) => {
    tagString += tag + ",  ";
  });
  return tagString.slice(0, tagString.length - 3).trim();
};

const QuestionDialog: React.FC<AppProps> = ({ open, setOpen, dialogData }) => {
  const { date, questions } = dialogData;

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DrawerContent className="overscroll-contain max-h-[100vh]">
          <DrawerHeader>
            <DrawerTitle>Submission List</DrawerTitle>
            <DrawerDescription>
              {dateFormat(dialogData.date, " mmmm dS, yyyy")}
            </DrawerDescription>
          </DrawerHeader>
          <ul className="overflow-y-scroll">
            {questions.map((question, idx) => {
              const result = question.verdict === "OK" ? true : false;
              const { problem } = question;
              return (
                <div>
                  <li key={idx} className="w-full p-2">
                    <a
                      target="_blank"
                      href={prepareURL(question)}
                      className="flex flex-row justify-between"
                    >
                      <div className="flex flex-row justify-start">
                        <span className="h-[100%] w-12 flex justify-center mr-2">
                          {result ? (
                            <IoCheckmarkDoneCircleOutline
                              size={30}
                              className="text-green-500 my-auto"
                            />
                          ) : (
                            <IoMdCloseCircleOutline
                              size={30}
                              className="text-red-400 my-auto"
                            />
                          )}
                        </span>
                        <div className="grid grid-cols-1">
                          <h6 className="font-Roboto font-bold text-lg">
                            {problem.contestId +
                              "-" +
                              problem.index +
                              " " +
                              problem.name}
                          </h6>
                          <h6>
                            {question.author.participantType +
                              " " +
                              relativeDate(
                                date,
                                question.relativeTimeSeconds
                              ).toTimeString()}
                          </h6>
                        </div>
                      </div>

                      <div>
                        <h6 className="justify-self-end flex justify-end">
                          {problem.rating}
                        </h6>
                        <h6>{getStringFromArray(problem.tags)}</h6>
                      </div>
                    </a>
                  </li>
                  <Separator />
                </div>
              );
            })}
          </ul>

          <DrawerFooter>
            {/* <Button>Submit</Button> */}
            <DrawerClose>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default QuestionDialog;
