import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import Image from "next/image";

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

const MovieListItem = (props) => {
  const { idx, data, selection, handleClick, actions } = props;
  const date = data.release_date && `(${data.release_date.slice(0, 4)})`;
  const overview = data.overview;
  const text = `${data.original_title} ${date}`;

  const handleChange = (event: React.SyntheticEvent) => {
    handleClick(idx);
  };

  const details = (
    <>
      <div className="movie-details">
        <div className="movie-image">
          <Image
            width="100"
            height="150"
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={`${text} movie poster`}
          />
        </div>
        <div className="movie-description">{overview}</div>
      </div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          actions.chooseMovie(data);
        }}
      >
        Choose Movie
      </Button>
    </>
  );

  return (
    <div className="movie-list-item">
      <Accordion expanded={selection === idx} onChange={handleChange}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          {text}
        </AccordionSummary>
        <AccordionDetails>{details}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MovieListItem;
