import { useEffect } from "react";
import MatchListItems from "./MatchListItems";
import { useMatchListDispatch } from "../../context/liveMatches/context";
import { fetchMatches } from "../../context/liveMatches/action";

const MatchList = () => {
  const matchListDispatch = useMatchListDispatch();

  useEffect(() => {
    fetchMatches(matchListDispatch);
  }, [matchListDispatch]);

  return (
    <div className="overflow-x-auto ">
      <MatchListItems />
    </div>
  );
};

export default MatchList;