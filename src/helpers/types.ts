export type city = {
  name?: string;
  lat?: number;
  lon?: number;
};

export type weather = {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    [key: string]: string | number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
    id: number;
  }[];
  [key: string]: string | number | {};
};

