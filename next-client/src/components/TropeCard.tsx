import { useEffect } from "react";
import { useStoreState, useStoreActions } from "../store/store";
import ActionableItemList from "./ActionableItemList";
import TropeListItem from "./TropeListItem";

const TropeCard = (props) => {
  const tropes = useStoreState((state) => state.game.tropes);
  const loading = useStoreState((state) => state.game.loading);
  const updateGame = useStoreActions((actions) => actions.game.updateGame);
  const fetchTropes = useStoreActions((actions) => actions.game.fetchTropes);
  const movieId = useStoreState((state) => state.movies.currentGameMovie?._id);

  const actions = {
    claimTrope: (id, bonus, points) => updateGame({ movieId, id, bonus, points }),
  };

  useEffect(() => {
    console.log("ue in viewgame");
    const fetch = async () => {
      await fetchTropes();
    };
    fetch();
  }, [fetchTropes]);

  const filteredTropes = tropes?.filter(trope => trope.status === "card");

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
