import { useEffect } from "react";
import { useStoreState, useStoreActions } from "../store/store";
import ActionableItemList from "./ActionableItemList";
import TropeListItem from "./TropeListItem";

const TropeCard = (props) => {
  const tropes = useStoreState((state) => state.game.tropes);
  const loading = useStoreState((state) => state.game.loading);
  const updateGame = useStoreActions((actions) => actions.game.updateGame);
  const fetchTropes = useStoreActions((actions) => actions.game.fetchTropes);
  const movie = useStoreState((state) => state.movies.currentGameMovie);
  const score = useStoreState((state) => state.game.score);
  const gameOn = useStoreState((state) => state.gameOn);
  const saveGame = useStoreActions((actions) => actions.game.saveGame);

  // const saving = () => saveGame({movie, tropes, score});

  const actions = {
    claimTrope: (id, bonus, points) => {
      updateGame({ movie, id, bonus, points });
    }
  };

  useEffect(() => {
    if (!tropes) {
      console.log("ue in viewgame");
      const fetch = async () => {
        await fetchTropes();
      };
      fetch();
    }
  }, [fetchTropes, tropes]);

  useEffect(() => {
    saveGame({gameOn, movie, tropes, score});
  },[movie,tropes,score, saveGame])

  const filteredTropes = tropes?.filter((trope) => trope.status === "card");

  return (
    <ActionableItemList
      data={filteredTropes}
      loading={loading}
      ListItem={TropeListItem}
      actions={actions}
    />
  );
};

export default TropeCard;
