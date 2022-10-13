import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

const TitleDisplay = (props) => {
  const { text, handleMovieEnd, children } = props;
  const [open, setOpen] = useState(false);
  const calcFontSize = (str, maxFontSize) => {
    const n = str?.length;
    let numLines = 1;
    if (n > 15) {
      numLines = 2;
    }
    if (n > 30) {
      numLines = 3;
    }
    let eachLineLengthApprox = n / numLines;
    const fontSize = (maxFontSize * 12) / eachLineLengthApprox / numLines;
    return Math.trunc(fontSize * 100) * 0.01;
  };
  const size = calcFontSize(text, 1.5);

  const onClose = (value) => {
    if (value) {
      handleMovieEnd();
    } else {
      setOpen(false);
    }
  };

  const handleClick = (value) => {
    onClose(value);
  };

  const DialogButton = (
      <div className="title-container" style={{ fontSize: `${size}em`, lineHeight: 1.25}}>
    <Button onClick={() => setOpen(true)}>
        <span className="title-on-button">{text}</span>
        {children}
    </Button>
      </div>
  );

  const Choices = (
    <>
      <Button key={1} onClick={() => handleClick(true)}>
        YES
      </Button>
      <Button key={0} onClick={() => handleClick(false)}>
        NO
      </Button>
    </>
  );

  return (
    <>
      {DialogButton}
      <Dialog onClose={()=>{setOpen(false)}} open={open}>
        <DialogTitle>{`Finished playing ${props.text}?`}</DialogTitle>
        {Choices}
      </Dialog>
    </>
  );
};

export default TitleDisplay;
