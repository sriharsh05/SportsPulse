import { format } from "date-fns";
import { MatchPreview, MatchListState } from "../../context/liveMatches/types";
import {
  useMatchListDispatch,
  useMatchListState,
} from "../../context/liveMatches/context";
import { fetchUpdatedMatchScore } from "../../context/liveMatches/action";
import LoadingSpinner from "../LoadingSpinner";

const MatchListItems = () => {
  const matchListState: MatchListState = useMatchListState();
  const matchListDispatch = useMatchListDispatch();

  const handleUpdate = (matchId: string) => {
    fetchUpdatedMatchScore(matchListDispatch, matchId);
  };

  if (matchListState.isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  if (matchListState.isError) {
    return (
      <div className="text-center">
        <span>{matchListState.errorMessage}</span>
      </div>
    );
  }
  return (
    <div className="flex p-2 bg-slate-200">
      {matchListState.matches.map((match: MatchPreview) => (
        <div
          key={match.id}
          className="w-64 p-2 m-2 border rounded-lg bg-white shadow-md"
        >
          <div className="px-2 py-4">
            <div className="flex flex-row justify-between">
              <p className="text-l font-bold mb-2">{match.sportName}</p>
              {match.isRunning && (
                <div className="flex mx-1">
                  <span className="text-red-500">Live</span>
                </div>
              )}
            </div>

            <p className="text-gray-600 mb-2 text-sm">{match.location}</p>
            <p className="text-gray-600 mb-2 text-sm">
              {match.isRunning
                ? `Started at ${format(
                    new Date(match.endsAt),
                    "yyyy-MM-dd HH:mm:ss"
                  )}`
                : `Starts at ${format(
                    new Date(match.endsAt),
                    "yyyy-MM-dd HH:mm:ss"
                  )}`}
            </p>
            <div className="mt-2">
              {match.teams.map((team, index) => (
                <p key={index} className="text-gray-600 mb-2 text-sm">
                  {team.name}
                </p>
              ))}
            </div>
            <button
              onClick={() => handleUpdate(match.id)}
              className="bg-teal-500 text-white p-2 text-sm rounded-lg hover:bg-teal-600"
            >
              Refresh
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchListItems;
