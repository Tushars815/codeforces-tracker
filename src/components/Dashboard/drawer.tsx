import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React from "react";
import { SubmissionType, QuestionMapDateType } from "@/src/types";
import { GYM_QUESTION_URL, QUESTION_URL } from "../../API";
import dateFormat from "dateformat";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { relativeDate } from "../../utils/getDate";
import { Separator } from "../ui/separator";
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

// const TransitionDialog = React.forwardRef(function Transition(
//   props: TransitionProps & { children?: React.ReactElement },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const getStringFromArray = (tags: string[]) => {
  let tagString = "  ";
  tags.forEach((tag) => {
    tagString += tag + ",  ";
  });
  return tagString.slice(0, tagString.length - 3).trim();
};

const QuestionDialog: React.FC<AppProps> = ({ open, setOpen, dialogData }) => {
  //   let [isOpen, setIsOpen] = useState(true);
  const { date, questions } = dialogData;

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  //   function isOpen() {
  //     setOpen(true);
  //   }

  //   function isClose() {
  //     setOpen(false);
  //   }

  return (
    <>
      {/* <Button
        onClick={setOpen(true)}
        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Open dialog
      </Button> */}
      {console.log(dialogData)}
      <Transition appear show={open}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={handleClose}
          __demoMode
        >
          <div className="fixed inset-0 z-10 w-full overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full  rounded-xl bg-white/5 p-6 bg-slate-400">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-white"
                  >
                    Submission List
                  </DialogTitle>
                  <p>{dateFormat(dialogData.date, " mmmm dS, yyyy")}</p>
                  <ul>
                    {questions.map((question, idx) => {
                      const result = question.verdict === "OK" ? true : false;
                      const { problem } = question;
                      return (
                        <li key={idx}>
                          <a target="_blank" href={prepareURL(question)}>
                            <span>
                              {result ? (
                                <IoCheckmarkDoneCircleOutline className="text-green-400" />
                              ) : (
                                <IoMdCloseCircleOutline className="text-red-400" />
                              )}
                            </span>
                            <h6>
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
                            <div>
                              <h6>{problem.rating}</h6>
                              <h6>
                                secondary={getStringFromArray(problem.tags)}
                              </h6>
                            </div>
                          </a>
                          <Separator />
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={handleClose}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default QuestionDialog;
