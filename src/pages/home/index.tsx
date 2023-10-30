import Matches from "../../components/liveMatches";
import Article from "../../components/articles";
import { Outlet } from "react-router-dom";
import FavouriteNews from "../../components/favouriteNews";

const Home = () => {
  return (
    <main className="flex flex-col">
      <section>
        <Matches />
      </section>
      <section className="grid grid-cols-4">
        <Article />
        <FavouriteNews/>
      </section>
      <Outlet />
    </main>
  );
};

export default Home;
