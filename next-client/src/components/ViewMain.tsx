import { useEffect } from "react";
import { useStoreState, useStoreActions } from "../store/store";
import FilteredSearchList from "./FilteredSearchList";
import MovieListItem from "./MovieListItem";

const ViewMain = () => {
  const submitQuery = useStoreActions((actions) => actions.movies.submitQuery);
  const resetQuery = useStoreActions((actions) => actions.movies.resetQuery);
  const chooseMovie = useStoreActions(
    (actions) => actions.movies.chooseGameMovie
  );
  const setGameOn = useStoreActions((actions) => actions.setGameOn);
  const gameOn = useStoreState((state) => state.gameOn);
  const query = useStoreState((state) => state.movies.query);
  const data = useStoreState((state) => state.movies.data);
  const loading = useStoreState((state) => state.movies.loading);
  const complete = useStoreState((state) => state.movies.complete);
  const gameData = useStoreState((state) => state.users?.user?.data);
  const loadMovie = useStoreActions((actions) => actions.movies.loadGameMovie);
  const loadGame = useStoreActions((actions) => actions.game.loadGame);
  const gameLoaded = useStoreState((state) => state.game.gameLoaded);
  const userReady = useStoreState((state) => state.users.ready);
  const setCurrView = useStoreActions((actions) => actions.setCurrView);

  const fetchGameMovies = useStoreActions(
    (actions) => actions.movies.fetchGameMovies
  );

  useEffect(() => {
    if (!data) {
      const fetch = async () => {
        await fetchGameMovies();
      };
      fetch();
    }
  }, [fetchGameMovies, data]);

  useEffect(() => {
    if (!gameOn && gameData?.gameOn && !gameLoaded) {
      loadMovie(gameData.movie);
      loadGame(gameData);
      setGameOn(true);
    }
    if (!gameOn && !gameData?.gameOn && gameData?.score) {
      loadGame(gameData);
    }
  }, [gameOn, gameData, gameLoaded, loadMovie, loadGame, setGameOn]);

  const filterFunction = (data, filter) => {
    const ignoreList = ["a","an","and","t","th","the","&","+",];
    const filterWords = filter.toLowerCase().split(" ").filter((word) => !ignoreList.includes(word));
    const testString = data.original_title?.toLowerCase();
    return filterWords.every((word) => testString?.includes(word));
  };

  const actions = {
    chooseMovie: (data) => {
      if (userReady) {
        chooseMovie(data);
        setGameOn(true);
      } else {
        setCurrView(1);
      }
    },
    setGameOn: (boo) => {
      setGameOn(boo);
    },
  };

  return (
    <FilteredSearchList
      contentName="movies"
      query={query}
      submitQuery={submitQuery}
      resetQuery={resetQuery}
      data={data}
      loading={loading}
      complete={complete}
      filterFunction={filterFunction}
      actions={actions}
      ListItem={MovieListItem}
    />
  );
};

export default ViewMain;
