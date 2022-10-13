import { useStoreActions, useStoreState } from "../store/store";
import Button from "@mui/material/Button";
import SwapCallsRoundedIcon from "@mui/icons-material/SwapCallsRounded";
import TreeCounter from "./TreeCounter";
import TitleDisplay from "./TitleDisplay";

const GameHeader = () => {
  const movieTitle = useStoreState(
    (state) => state.movies.currentGameMovie?.original_title
  );
  const score = useStoreState((state) => state.game.score);
  const tropes = useStoreState((state) => state.game.tropes);
  const setGameOn = useStoreActions((actions) => actions.setGameOn);
  const saveGame = useStoreActions((actions) => actions.game.saveGame);
  const setCurrentGameMovie = useStoreActions((actions) => actions.movies.setCurrentGameMovie);
  const handleMovieEnd = () => {
    setCurrentGameMovie(null);
    saveGame({gameOn: false, score, tropes});
    setGameOn(false);
  };
  console.log("header renders", score);
  return (
    <>
        <TreeCounter number={score*0.1}/>
        <TitleDisplay text={movieTitle} handleMovieEnd={handleMovieEnd} style={{display: "inline-flex", justifyContent: "center"}}>
        </TitleDisplay>
    </>
  );
};

export default GameHeader;