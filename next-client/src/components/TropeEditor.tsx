import { access } from "fs";
import { useEffect, useState, Fragment } from "react";
import { useStoreState, useStoreActions } from "../store/store";
import { TropeData } from "../store/game";

import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import TropeForm from "./TropeForm"

const headers = ["","description","points","bonus","bonus_pts"];

const headerRow = () => {
  return headers.map((header,i) => <TableCell key={i} align="left">{header}</TableCell>)
}

const Row = (props: { row: TropeData })  => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const rowCells = headers.map((col,i) => {
    const item = (typeof row[col] === 'object') ?
      row[col].join(" | ")
      : row[col]
    return (
      <TableCell key={i} align="right">{item}</TableCell>
    )
  });

  return (
    <Fragment key={`${row._id}-row`}>
      <TableRow key={`${row._id}-data`} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {rowCells}
      </TableRow>
      <TableRow key={`${row._id}-form-container`}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                UPDATE
              </Typography>
              <TropeForm key={`${row._id}-form`} trope={row} labels={headers}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const TropeViewer = () => {
  const tropes: TropeData[] | null = useStoreState((state) => state.game.tropes);
  const fetchTropes = useStoreActions((actions) => actions.game.fetchTropes);
  useEffect(() => {
    if (!tropes) {
      fetchTropes();
    }
  }, [tropes, fetchTropes]);

    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
            <TableCell />
              {headerRow()}
            </TableRow>
          </TableHead>
          <TableBody>
            <Row key="add-trope" row={{_id: null, description: "+ NEW", points: 10, bonus: [], bonus_pts: 0}}/>
            {tropes && tropes.map((row,i) => (
              <Row key={i} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  export default TropeViewer;


