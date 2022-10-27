// import {useStoreState, useStoreActions} from '../store/store'
import Link from "next/link";

const ViewInfo = (props) => {
  return (
    <>
      <p className="info-text">
        On 'main' page, search movies, choose a movie.
        <br></br>
        Find tropes in the movie you're watching. Some tropes have bonus or
        other options. Click on a trope to view options or to claim it.
        <br></br>
        When finished watching movie, or to go back to Movie Search, click the
        gold movie title, then click yes.
      </p>
      <p></p>
    </>
  );
};

export default ViewInfo;
