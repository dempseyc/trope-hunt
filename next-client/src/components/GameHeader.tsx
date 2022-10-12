import { useStoreActions, useStoreState } from "../store/store";
import Button from "@mui/material/Button";
import SwapCallsRoundedIcon from "@mui/icons-material/SwapCallsRounded";
import TreeCounter from "./TreeCounter";
import RollingContents from "./RollingContents";

const GameHeader = () => {
  const movieTitle = useStoreState(
    (state) => state.movies.currentGameMovie?.original_title
  );
  const score = useStoreState((state) => state.game.score);
  const setGameOn = useStoreActions((actions) => actions.setGameOn);
  const handleMovieSwap = () => {
    setGameOn(false);
  };
  console.log("header renders", score);
  return (
    <>
      <h3>
        <TreeCounter number={score*0.1}/>
        <RollingContents text={movieTitle}>
          <Button onClick={handleMovieSwap} style={{display: "inline-flex"}}>
            <SwapCallsRoundedIcon />
          </Button>
        </RollingContents>
      </h3>
    </>
  );
};

export default GameHeader;
