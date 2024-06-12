import React from "react";
import { useState } from "react";
import { ResponsiveRadar } from "@nivo/radar";
import { useSelector } from "react-redux";
import { QuestionMapType } from "@/src/types";
import { selectQuestionMap } from "../../reducers/slices/FetchedDataSlice";

export const prepareData = (questionMap: QuestionMapType) => {
  let Attempts: Record<string, number> = {};
  let total = 0;
  for (const [, value] of Object.entries(questionMap)) {
    let attemptsCount = value.incorrectSubmissions + 1;
    if (value.solved) {
      total += 1;
      let attemptsKey = attemptsCount >= 5 ? 5 : attemptsCount;
      Attempts[attemptsKey] = Attempts[attemptsKey]
        ? Attempts[attemptsKey] + 1
        : 1;
    }
  }
  return { Attempts, total };
};

const Radar = () => {
  const questionMap = useSelector(selectQuestionMap);
  const { Attempts, total } = prepareData(questionMap);
  const [toggle, setToggle] = useState<boolean>(false);
  const data = Object.entries(Attempts).map(([key, value]) => {
    key = key === "1" ? key + " Submission" : key;
    key = key === "5" ? key + "+" : key;
    return {
      label: key,
      value: value,
    };
  });

  return (
    <div className="w-[100%] min-h-[30vh]">
      <ResponsiveRadar
        data={data}
        keys={["value"]}
        indexBy="label"
        maxValue={toggle ? "auto" : total}
        margin={{ top: 20, right: 20, bottom: 20, left: 30 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: "color" }}
        gridLevels={4}
        gridShape="circular"
        gridLabelOffset={10}
        enableDots={true}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        dotBorderColor={{ from: "color" }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: "nivo" }}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        isInteractive={true}
      />
    </div>
  );
};

export default Radar;
