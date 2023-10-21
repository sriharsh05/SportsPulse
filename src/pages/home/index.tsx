import Matches from "../../components/liveMatches";

const Home = () => {
  return (
    <main className="flex flex-col">
      <section>
        <Matches />
      </section>
      <section className="grid grid-cols-2">
        Article section
      </section>
    </main>
  )
};

export default Home;