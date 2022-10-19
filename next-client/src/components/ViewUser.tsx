import { useStoreState, useStoreActions } from "../store/store";
import { useEffect } from "react";
import LoginModule from "./LoginModule";
import UserDetails from "./UserDetails";

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
  }, []);

  return (
    <>
      {ready ? (
        <UserDetails user={user} logoutUser={onLogout} />
      ) : (
        <LoginModule />
      )}
      {/* { ready ? null : <MessageList/> } */}
    </>
  );
};

export default ViewUser;
