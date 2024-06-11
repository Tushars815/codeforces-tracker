import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useSelector } from "react-redux";
import { SubmissionType, yearListType, QuestionMapDateType } from "../../types";
import getDate from "../../utils/getDate";
import { selectSubmissionList } from "../../reducers/slices/FetchedDataSlice";
import dateFormat from "dateformat";
import Select from "react-select";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import Drawer from "./drawer";
import "react-tooltip/dist/react-tooltip.css";

const prepareData = (SubmissionList: SubmissionType[]) => {
  const LastSubmissionYear = getDate(
    SubmissionList[0].creationTimeSeconds
  ).getFullYear();
  const FirstSubmissionYear = getDate(
    SubmissionList[SubmissionList.length - 1].creationTimeSeconds
  ).getFullYear();

  let yearList: yearListType[] = [];
  for (let idx = FirstSubmissionYear; idx <= LastSubmissionYear; idx++)
    yearList.push({ value: idx, label: idx.toString() });

  //  date sorted Question List

  let QuestionMap: Record<string, QuestionMapDateType> = {};
  SubmissionList.forEach((attempt: SubmissionType) => {
    const date = getDate(attempt.creationTimeSeconds);
    // yyyy-mm-dd format
    const dateKey = date.toISOString().slice(0, 10);
    if (!QuestionMap[dateKey]) {
      QuestionMap[dateKey] = {
        date: date,
        questions: [attempt],
      };
    } else {
      QuestionMap[dateKey].questions.push(attempt);
    }
  });
  return { QuestionMap, yearList };
};

/**
 * The given function filters out the data from the hashmap and returns
 *  an array of all the submission sorted by date for the given year
 *
 * @param QuestionMap Hash Map containing all question with key as dates
 * @param year current year to filter the data to be fed into the heatmap
 */
const filterData = (
  QuestionMap: Record<string, QuestionMapDateType>,
  year: number
) => {
  const QuestionListYear: QuestionMapDateType[] = [];

  for (const [, value] of Object.entries(QuestionMap)) {
    const { date } = value;
    if (date.getFullYear() === year) QuestionListYear.push(value);
  }

  return QuestionListYear;
};

/**
 * Helper function to take care of starting and ending dates for the heatmap component
 * @param year The year to for which you need to return the first and last dates
 */
const getYearDate = (year: number): Record<string, Date> => {
  // year is 0 indexed
  const dateObject = {
    startDate: new Date(year, 0, 0),
    endDate: new Date(year, 11, 31),
  };
  return dateObject;
};

const Heatmap: React.FC<{ drawerOpen: boolean }> = ({ drawerOpen }) => {
  const SubmissionList = useSelector(selectSubmissionList);
  const { QuestionMap, yearList } = prepareData(SubmissionList);
  const [year, setYear] = React.useState(yearList[yearList.length - 1].value);
  const [open, setOpen] = React.useState(false);
  const QuestionListYear = filterData(QuestionMap, year);

  const [dialogQuestionList, setDialogQuestionList] =
    React.useState<QuestionMapDateType>(
      QuestionListYear[QuestionListYear.length - 1]
    );

  // React.useEffect(() => {
  //   Tooltip.rebuild();
  // }, [year, drawerOpen]);

  // getting the start and end date for the selected year
  const Dates = getYearDate(year);

  let numberOfSubmissions = 0;
  QuestionListYear.forEach(({ questions }) => {
    numberOfSubmissions += questions.length;
  });

  return (
    <div>
      <div className="flex flex-row w-full justify-between">
        <h6>
          Number of Submissions in {year} : {numberOfSubmissions}
        </h6>

        <Select
          className="w-48"
          options={yearList}
          defaultValue={yearList[yearList.length - 1]}
          onChange={(options) => setYear(options!.value)}
        ></Select>
      </div>
      <div>
        <CalendarHeatmap
          startDate={Dates.startDate}
          endDate={Dates.endDate}
          values={QuestionListYear}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            const count = Math.min(4, Math.ceil(value.questions.length / 4));
            return `color-github-${count}`;
          }}
          tooltipDataAttrs={(value: QuestionMapDateType) => {
            if (value && value?.date && value?.questions) {
              console.log(value);

              return {
                "data-tooltip-id": "tooltip",
                "data-tooltip-content": `${
                  value.questions.length
                } Submissions on ${dateFormat(value.date, "mmm dS, yyyy")}`,
              };
            } else return {};
          }}
          onClick={(value: any) => {
            if (value && value.questions) {
              setOpen(true);
              setDialogQuestionList(value);
            }
          }}
        />
        <Tooltip id="tooltip" />
      </div>
      <Drawer open={open} setOpen={setOpen} dialogData={dialogQuestionList} />
    </div>
  );
};

export default Heatmap;
