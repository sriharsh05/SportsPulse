import Matches from "../../components/liveMatches";
import Article from "../../components/articles";
import { Outlet } from "react-router-dom";
import FavouriteNews from "../../components/favouriteNews";

const Home = () => {
  return (
    <main className="flex flex-col">
      <div>
        <Matches />
      </div>
      <div className="grid grid-cols-4">
        <Article />
        <FavouriteNews />
      </div>
      <Outlet />
    </main>
  );
};

export default Home;
