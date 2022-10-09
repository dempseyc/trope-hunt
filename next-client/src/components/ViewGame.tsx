import { useEffect } from "react";
import { useStoreState, useStoreActions } from "../store/store";
import TropeCard from "./TropeCard";

const ViewGame = (props) => {
  const setGameOn = useStoreActions(actions => actions.setGameOn);

  return (
    <TropeCard
    />
  );
};

export default ViewGame;
