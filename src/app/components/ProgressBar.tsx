interface ProgressBarProps {
  backgroundColor: string;
  completed: number;
}

const ProgressBar = (props: ProgressBarProps) => {
  const { backgroundColor, completed } = props;

  const adjustedBackgroundColor = {
    green: "#25b632",
    indigo: "#2a13fe",
    purple: "#fe14e7",
  }[backgroundColor];

  const containerStyles = {
    height: 10,
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: adjustedBackgroundColor,
    borderRadius: "inherit",
    textAlign: "right" as const,
    minWidth: "1.5em",
  };

  const labelStyles = {
    width: "100%",
    textAlign: "center" as const,
    paddingTop: 2,
    color: "#606263",
  };

  return (
    <div className="react-progress-bar">
      <div style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
      <div style={labelStyles}>{`${completed}%`}</div>
    </div>
  );
};

export default ProgressBar;
