import { useStoreActions, useStoreState } from "../store/store"
import Button from "@mui/material/Button";
import SwapCallsRoundedIcon from '@mui/icons-material/SwapCallsRounded';



const GameHeader = () => {
  const movieTitle = useStoreState(state => state.movies.currentGameMovie?.original_title);
  const setGameOn = useStoreActions(actions => actions.setGameOn );
  const handleMovieSwap = () => {
    setGameOn(false);
  }

  return (
    <>
      <h2>{`${movieTitle}`}<Button
        onClick={handleMovieSwap}
      ><SwapCallsRoundedIcon /></Button></h2>
    </>
  )
}

export default GameHeader;