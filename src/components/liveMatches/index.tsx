import MatchList from "./MatchList";


const Matches = () => {
  return <div>
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-bold font-custom">
        Live and upcoming matches
      </h1>
      <MatchList/>
    </div>
  </div>;
};

export default Matches;