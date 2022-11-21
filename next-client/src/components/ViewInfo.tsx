const ViewInfo = () => {
  return (
    <>
      <section className="info-text">
        <p>{`On 'main' page, search movies, choose a movie.`}</p>
        <p>{`Find tropes in the movie you're watching. Some tropes have bonus or
        other options. Click on a trope to view options or to claim it, or to discard it.`}</p>
        <p>{`When you claim a trope, it is removed from your card and a new one is added at the top.`}</p>
        <p>{`When finished watching movie, or to go back to Movie Search, click the
        gold movie title, then click yes.`}</p>
      </section>
    </>
  );
};

export default ViewInfo;
