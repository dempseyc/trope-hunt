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

const CheckIcon = ({value}) => {
  return value ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
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
      (item, i) => {
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
    console.log(bonus.filter((b, i) => bonusCheck[i]));
    const points = data.points + bonusCheck.length * data.bonus_pts;
    actions.claimTrope(data._id, bonus.filter((b, i) => bonusCheck[i]), points);
    // actions.saveGame();
    handleClick(null);
  };

  const handleBonus = (_, i) => {
    let newBonusCheck = [...bonusCheck];
    if (bonusRequired) { newBonusCheck = newBonusCheck.map(b => false) };
    newBonusCheck[i] = !newBonusCheck[i];
    setBonusCheck(newBonusCheck);
  };

  const bonusButtons = bonus.map((b, i) => {
    return (
      <Button key={`bb-${i}`} onClick={() => handleBonus(b, i)}>
        <CheckIcon value={bonusCheck[i]} />
        {b}
      </Button>
    );
  });

  const details = (
    <>
      <div className="bonus-buttons">{bonusButtons}</div>
      <Button variant="outlined" onClick={handleClaim}>
        Claim Trope
      </Button>
      <Button className="not-now-button" variant="outlined" onClick={()=>{handleClick(null)}}>Not Now</Button>
    </>
  );

  return (
    <div className="movie-list-item">
      <Accordion expanded={selection === idx} onChange={handleChange}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          {description}
        </AccordionSummary>
        <AccordionDetails>{details}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TropeListItem;
