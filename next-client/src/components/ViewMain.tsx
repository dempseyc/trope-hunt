import { useEffect } from "react";
import { useStoreState, useStoreActions } from "../store/store";
import FilteredSearchList from "./FilteredSearchList";

const ViewMain = (props) => {
  const submitQuery = useStoreActions((actions) => actions.movies.submitQuery);
  const resetQuery = useStoreActions((actions) => actions.movies.resetQuery);
  const chooseMovie = useStoreActions((actions) => actions.movies.chooseGameMovie);
  const setGameOn = useStoreActions(actions => actions.setGameOn);
  const query = useStoreState((state) => state.movies.query);
  const data = useStoreState((state) => state.movies.data);
  const loading = useStoreState((state) => state.movies.loading);
  const complete = useStoreState((state) => state.movies.complete);

  const fetchGameMovies = useStoreActions((actions) => actions.movies.fetchGameMovies);

  useEffect(() => {
    console.log("ue in viewmain");
    const fetch = async () => { await fetchGameMovies() };
    fetch();
  }, [fetchGameMovies]);

  const filterFunction = (data, filter) => {
    const filterWords = filter.toLowerCase().split(" ");
    const testString = data.original_title.toLowerCase();
    return filterWords.every((word) => testString.includes(word));
  };

  const actions = {
    chooseMovie: (idx) => { chooseMovie(data[idx]) },
    setGameOn: (boo) => { setGameOn(boo) }
  }

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
    />
  );
};

export default ViewMain;
