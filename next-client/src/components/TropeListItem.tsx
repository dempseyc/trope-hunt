import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import TreePoint from './TreePoint';

const CheckIcon = ({value}) => {
  return value ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    margin: "0.5em 0",
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const TropeListItem = (props) => {
  const { idx, data, selection, handleClick, actions } = props;
  const { description, bonus } = data;
  const bonusRequired = data.bonus_pts === 0;
  const [bonusCheck, setBonusCheck] = React.useState(
    Array.from(
      {
        length: data.bonus.length,
      },
      (_, i) => {
        if (bonusRequired && i === 0) {
          return true;
        } else { return false; }
      }
    )
  );
  
  const handleChange = (event: React.SyntheticEvent) => {
    handleClick(idx);
  };
  
  const handleClaim = () => {
    const boni = bonus.filter((b, i) => bonusCheck[i]);
    const points = data.points + (boni.length * data.bonus_pts);
    actions.claimTrope(data._id, boni, points);
    handleClick(null);
  };

  const handleBonus = (_, i) => {
    let newBonusCheck = [...bonusCheck];
    if (bonusRequired) { newBonusCheck = newBonusCheck.map(b => false) };
    newBonusCheck[i] = !newBonusCheck[i];
    setBonusCheck(newBonusCheck);
  };

  const bonusButtons = bonus.map((b, i) => {
    const bonusPointDisplay = data.bonus_pts ?
      Array.from({length: data.bonus_pts / 10}, ()=> <TreePoint position="icon"/>) :
      null;
    const plusSign = bonusPointDisplay ? " + " : null;
    return (
      <>
      <Button color="secondary" key={`bb-${i}`} onClick={() => handleBonus(b, i)}>
        <CheckIcon value={bonusCheck[i]} />{plusSign} {bonusPointDisplay}
        {b}
      </Button>
      </>
    );
  });

  const details = (
    <>
      <div className="bonus-buttons">{bonusButtons}</div>
      <Button color="secondary" variant="outlined" onClick={handleClaim}>
        Claim Trope
      </Button>
      <Button color="secondary" className="not-now-button" variant="outlined" onClick={()=>{handleClick(null)}}>Not Now</Button>
    </>
  );

  return (
    <div className="trope-list-item">
      <Accordion expanded={selection === idx} onChange={handleChange}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          {description}{" "}
          {Array.from({length: data.points / 10}, ()=><TreePoint position="inline"/>)}
        </AccordionSummary>
        <AccordionDetails>{details}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TropeListItem;
