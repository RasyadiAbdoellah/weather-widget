// Types used in multiple components here
export type city = {
  name?: string;
  lat?: number;
  lon?: number;
};

// weather is expected response shape for a location's weather. Note that this is heavily simplified
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

