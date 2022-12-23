import Link from 'next/link'

const AdminButton = () => <Link href='/admin'><a>Admin Page</a></Link>

const ViewInfo = () => {
  return (
    <div style={{height: "100%", overflowY: "scroll"}}>
      <section className="info-text">
        <p>{`On 'main' page, search movies, choose a movie.`}</p>
        <p>{`Find tropes in the movie you're watching. Some tropes have bonus or
        other options. Click on a trope to view options or to claim it, or to discard it.`}</p>
        <p>{`When you claim a trope, it is removed from your card and a new one is added at the top.`}</p>
        <p>{`When finished watching movie, or to go back to Movie Search, click the
        gold movie title, then click yes.`}</p>
      </section>
      <Link href="http://www.craigdempsey.com">
        <div>
        www.craigdempsey.com
        </div>
        </Link>
      <AdminButton/>
    </div>
  );
};

export default ViewInfo;
