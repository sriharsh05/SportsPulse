import { format } from "date-fns";
import { MatchPreview, MatchListState } from "../../context/liveMatches/types";
import { useMatchListState } from "../../context/liveMatches/context";

const MatchListItems = () => {
  const matchListState: MatchListState = useMatchListState();

  const handleUpdate = (matchId: number) => {
    console.log(`Update match with id ${matchId}`);
  };

  if (matchListState.isLoading) {
    return (
      <div className="text-center">
        <span>Loading...</span>
      </div>
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
    <div className="flex overflow-x-auto space-x-4">
      
        {matchListState.matches.map((match: MatchPreview) => (
          <div
            key={match.id}
            className="w-96 p-4 border rounded-lg bg-white shadow-md"
            
          >
           <div className="px-2 py-4">
            {match.isRunning && (
              <div className="absolute top-1 right-1">
                <span className="text-green-500">
                   Running
                </span>
              </div>
            )}
            <p className="text-xl font-bold mb-2">{match.sportName}</p>
            <p className="text-gray-600 mb-2">{match.location}</p>
            <p className="text-gray-600 mb-2">
              {match.isRunning
                ? `Started at ${format(new Date(match.endsAt), "yyyy-MM-dd HH:mm:ss")}`
                : `Starts at ${format(new Date(match.endsAt), "yyyy-MM-dd HH:mm:ss")}`}
            </p>
            <div className="mt-2">
              {match.teams.map((team, index) => (
                <p key={index} className="text-gray-600 mb-2">
                  {team.name}
                </p>
              ))}
            </div>
            <button
              onClick={() => handleUpdate(match.id)}
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
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