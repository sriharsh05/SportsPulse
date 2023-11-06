import { format } from "date-fns";
import { fetchUpdatedMatchScore } from "../../context/liveMatches/action";
import { useMatchListDispatch } from "../../context/liveMatches/context";
import { MatchPreview } from "../../context/liveMatches/types";
import { getMatch } from "../../utils/api";
import { useEffect, useState } from "react";

const MatchCard = ({ matchID }: { matchID: string }) => {
  const [match, setMatch] = useState<MatchPreview>();
  const matchListDispatch = useMatchListDispatch();

  const updateMatch = async () => {
    const data = await getMatch(matchID);
    setMatch(data);
  };

  useEffect(() => {
    updateMatch();
  }, [matchID]);

  const handleUpdate = (matchId: string) => {
    fetchUpdatedMatchScore(matchListDispatch, matchId);
  };

  return match ? (
    <div
      key={match.id}
      className="w-64 p-2 m-2 border rounded-lg bg-white shadow-md"
    >
      <div className="px-2 py-4">
        <div className="flex flex-row justify-between">
          <p className="text-l font-bold font-custom mb-2">{match.sportName}</p>
          {match.isRunning && (
            <div className="flex mx-1">
              <span className="text-red-500">Live</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-2 text-sm">{match.location}</p>
        <p className="text-gray-600 mb-2 text-sm">
          {" "}
          Date: {format(new Date(match.endsAt), "yyyy-MM-dd")}
        </p>
        <p className="text-gray-600 mb-2 text-sm">
          Time: {format(new Date(match.endsAt), "HH:mm:ss")}
        </p>
        <div className="mt-2">
          {match.teams.map((team, index) => (
            <div
              key={index}
              className="grid grid-cols-2 justify-center text-xs"
            >
              <p className="text-gray-600 mb-2 text-xs">{team.name}</p>
              <p className="text-gray-600 mb-2 text-xs">
                {match?.score[match?.teams[index].name]}
              </p>
            </div>
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
  ) : (
    <div className="w-64 p-2 m-2 border rounded-lg bg-white shadow-md">
      <div className="px-2 py-4">
        <div className="flex flex-row justify-between">
          <p className="text-l font-bold font-custom mb-2">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
