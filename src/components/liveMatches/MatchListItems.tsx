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
    return <LoadingSpinner />;
  }

  if (matchListState.isError) {
    return (
      <div className="text-center">
        <span>{matchListState.errorMessage}</span>
      </div>
    );
  }
  return (
    <div className="flex p-2 bg-teal-100">
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
              className=" text-teal-500 p-2 text-sm rounded-lg hover:text-teal-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchListItems;
