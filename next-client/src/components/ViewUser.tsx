import { useStoreState, useStoreActions } from "../store/store";
import { useEffect } from "react";
import LoginModule from "./LoginModule";
import UserDetails from "./UserDetails";
import Button from "@mui/material/Button";

const ViewUser = () => {
  const ready = useStoreState((state) => state.users.ready);
  const user = useStoreState((state) => state.users.user);
  const logoutUser = useStoreActions((actions) => actions.users.logoutUser);
  const clearMovie = useStoreActions(
    (actions) => actions.movies.clearGameMovie
  );
  const clearGame = useStoreActions((actions) => actions.game.clearGame);
  const fetchUser = useStoreActions((actions) => actions.users.fetchUser);
  const setGameOn = useStoreActions((actions) => actions.setGameOn);

  const onLogout = () => {
    logoutUser();
    clearGame();
    clearMovie();
    setGameOn(false);
  };

  useEffect(() => {
    fetchUser(null);
  }, [fetchUser]);

  return (
    <>
      {ready ? (
        <UserDetails user={user} logoutUser={onLogout} />
      ) : (
        <LoginModule />
      )}
      {/* <Button variant="outlined" color="primary">OutlinedPrimary</Button>
      <Button variant="text" color="primary">TextPrimary</Button>
      <Button variant="contained" color="primary">ContainedPrimary</Button> */}
    </>
  );
};

export default ViewUser;
