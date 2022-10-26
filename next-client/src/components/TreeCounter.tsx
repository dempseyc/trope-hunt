const iconBaselineStyle = {
  top: "0.125em",
  position: "relative" as "relative",
}

const Tree = (props) => {
  const { num } = props;
  const circles = Array.from({ length: 10 });
  const mapColor = circles.map((item, i) => {
    return i < num ? "#ffffff" : "#166045";
  });
  return (
    <svg
      style={iconBaselineStyle}
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      version="1.1"
      id="svg5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="layer1">
        <path
          fill="#166045"
          stroke="#166045"
          strokeWidth={3.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={4}
          d="M 8.4666663,1.6933333 15.24,15.24 H 1.6933333 L 8.4666663,1.6933333"
          id="path6170"
        />
        <circle
          fill={mapColor[9]}
          id="circle10"
          cx="8.4666662"
          cy="3.175"
          r="0.79374993"
        />
        <circle
          fill={mapColor[7]}
          id="circle8"
          cx="6.8791666"
          cy="6.8791666"
          r="0.79374993"
        />
        <circle
          fill={mapColor[8]}
          id="circle9"
          cx="10.054166"
          cy="6.8791666"
          r="0.79374993"
        />
        <circle
          fill={mapColor[5]}
          id="circle6"
          cx="8.4666662"
          cy="10.583332"
          r="0.79374999"
        />
        <circle
          fill={mapColor[6]}
          id="circle7"
          cx="11.641666"
          cy="10.583332"
          r="0.79374993"
        />
        <circle
          fill={mapColor[4]}
          id="circle5"
          cx="5.2916665"
          cy="10.583333"
          r="0.79374993"
        />
        <circle
          fill={mapColor[0]}
          id="circle1"
          cx="3.175"
          cy="14.2875"
          r="0.79374993"
        />
        <circle
          fill={mapColor[1]}
          id="circle2"
          cx="6.7027774"
          cy="14.2875"
          r="0.79374993"
        />
        <circle
          fill={mapColor[2]}
          id="circle3"
          cx="10.230555"
          cy="14.2875"
          r="0.79374993"
        />
        <circle
          fill={mapColor[3]}
          id="circle4"
          cx="13.758333"
          cy="14.2875"
          r="0.79374993"
        />
      </g>
    </svg>
  );
};

const TreeCounter = (props) => {
  const { number } = props;
  const num = number % 10;
  const num2 = Math.floor(number / 10);
  return (
    <div className="icon baseline" style={{display: "inline-flex"}} aria-label={`Score ${number}`}>
      <span className="trees-wrapper" >
        <Tree num={num} /><span className="trees"> + {`${num2}`}</span>
        <Tree num={10} />
      </span>
    </div>
  );
};

export default TreeCounter;
