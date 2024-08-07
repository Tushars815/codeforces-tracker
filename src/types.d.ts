type Problem = {
  contestId: number;
  index: string;
  name: string;
  type: string;
  rating: number;
  points?: number | undefined;
  tags: string[];
};

type SubmissionType = {
  id: number;
  contestId: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: Problem;
  author: {
    contestId: number;
    members: { handle: string }[];
    participantType: string;
    ghost: boolean;
    room?: number;
    startTimeSeconds: number;
  };
  programmingLanguage: string;
  verdict: string;
  testset: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
};

type ContestListType = {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
};

type UserInfoType = {
  lastName: string;
  country: string;
  lastOnlineTimeSeconds: number;
  city: string;
  rating: number;
  friendOfCount: number;
  titlePhoto: string;
  handle: string;
  avatar: string;
  firstName: string;
  contribution: number;
  organization: string;
  rank: string;
  maxRating: number;
  registrationTimeSeconds: number;
  maxRank: string;
};

type yearListType = {
  value: number;
  label: string;
};

type QuestionMapDateType = {
  date: Date;
  questions: SubmissionType[];
};

type ContestData = {
  "Contest Given": number;
  "Best Rank": number;
  "Worst Rank": number;
  "Best Gain in Rating": number;
  "Worst Gain in Rating": number;
};

interface QuestionMapWrapperType extends Problem {
  solved: boolean;
  incorrectSubmissions: number;
}

type QuestionMapType = Record<string, QuestionMapWrapperType>;

export {
  ContestListType,
  SubmissionType,
  QuestionMapType,
  QuestionMapDateType,
  UserInfoType,
  yearListType,
};
