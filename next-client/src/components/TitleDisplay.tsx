import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

const TitleDisplay = (props) => {
  const { text, handleMovieEnd, children } = props;
  const [open, setOpen] = useState(false);

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
  const calcFontSize = (n) => {
    const maxSize = 5;
    const minSize = 0.4;
    const size = minSize + ( 1 * (maxSize - minSize) / n );
    const result = Math.trunc(100 * size) / 100;
    console.log(result);
    return result;
  }
  const size = calcFontSize(text?.length);

  const DialogButton = (
      <div className="title-container" onClick={() => setOpen(true)} style={{ fontSize: `${size}em`, lineHeight: 1.25}}>
    {/* <Button onClick={() => setOpen(true)}> */}
        <span className="title-on-button">{text}</span>
        {children}
    {/* </Button> */}
      </div>
  );

  const Choices = (
    <>
      <Button variant="outlined" color="secondary" key={0} onClick={() => handleClick(false)}>
        NO
      </Button>
      <Button variant="contained" color="secondary" key={1} onClick={() => handleClick(true)}>
        YES
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
