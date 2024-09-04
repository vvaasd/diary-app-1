type ResultType = {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    [key: string]: unknown;
  };
  height: number;
  width: number;

  [key: string]: unknown;
};

export type ResultsImageFetchType = ResultType[] | { results: ResultType[] };
