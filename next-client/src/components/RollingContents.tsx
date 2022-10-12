const RollingContents = (props) => {
  return (
    <div className="rolling-container">
      <div className="rolling-text">{props.text}{props.children}</div>
    </div>
  );
};

export default RollingContents;
