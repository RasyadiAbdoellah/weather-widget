import './CityButton.less'

type props = {
  city: string;
  active?: boolean;
  clickHandler: () => void ;
  label?: string;
}

const CityButton = ({ city, active = false, clickHandler, label }: props) => {
  return (
    <button
      onClick={clickHandler}
      className={`city-btn ${active ? " active" : ""}`}
      aria-label={label ? label : city}
    >
      {city.toLocaleUpperCase()}
    </button>
  );
};

export default CityButton