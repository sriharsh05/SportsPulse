import { MatchPreview, MatchListState } from "../../context/liveMatches/types";
import { useMatchListState } from "../../context/liveMatches/context";
import LoadingSpinner from "../LoadingSpinner";
import { usePreferencesState } from "../../context/preferences/context";
import MatchCard from "./MatchCard";

const MatchListItems = () => {
  const matchListState: MatchListState = useMatchListState();
  const preferencesState = usePreferencesState();

  if (matchListState.isLoading) {
    return <LoadingSpinner />;
  }

  if (matchListState.isError) {
    return (
      <div className="text-center">
        <span>{matchListState.errorMessage}</span>
      </div>
    );
  }

  const screenedMatches =
    localStorage.getItem("authToken") &&
    preferencesState.preferences?.sports?.length > 0
      ? matchListState.matches.filter((match) => {
          return preferencesState.preferences.sports.includes(match.sportName);
        })
      : matchListState.matches;

  return (
    <div className="flex p-2 bg-teal-100">
      {screenedMatches.map((match: MatchPreview) => (
        <MatchCard matchID={match.id} key={match.id} />
      ))}
    </div>
  );
};

export default MatchListItems;
