import { useEffect, useState } from "react";
import { usePreferencesState } from "../../context/preferences/context";
import { Sport } from "../../context/articles/types";
import { Team } from "../../context/preferences/types";
import FavouritesCard from "./FavouritesCard";
import { useMatchListState } from "../../context/liveMatches/context";
import { getSports, getTeams } from "../../utils/api";

const FavouriteList = () => {
  const preferencesState = usePreferencesState();
  const matchList = useMatchListState();

  const [screenedTeams, setScreenedTeams] = useState<Team[]>([]);
  const [currentSport, setCurrentSport] = useState("");
  const [currentTeam, setCurrentTeam] = useState<string>("");

  const [sportData, setSportData] = useState<Sport[]>([]);
  const [teamData, setTeamData] = useState<Team[]>([]);

  useEffect(() => {
    const fetchStateData = async () => {
      const fetchedSportsData = await getSports();
      const fetchedTeamData = await getTeams();
      setSportData(fetchedSportsData.sports);
      setTeamData(fetchedTeamData);
    };
    fetchStateData();
  }, []);

  useEffect(() => {
    let currentSportsTeams = currentSport
      ? teamData.filter((team) => team.plays?.includes(currentSport))
      : [];
    currentSportsTeams =
      localStorage.getItem("authToken") &&
      preferencesState.preferences?.teams?.length > 0
        ? currentSportsTeams.filter((team) =>
            preferencesState.preferences.teams.includes(team.name)
          )
        : currentSportsTeams;
    setScreenedTeams(currentSportsTeams);
  }, [currentSport, teamData, preferencesState.preferences.teams]);

  const screenedSports =
    localStorage.getItem("authToken") &&
    preferencesState.preferences?.sports?.length > 0
      ? sportData.filter((sport) =>
          preferencesState.preferences.sports.includes(sport.name)
        )
      : sportData;

  const screenedMatches = matchList.matches.filter((match) =>
    currentSport && currentTeam
      ? match.teams.some((team) => team.name === currentTeam)
      : currentSport
      ? match.sportName.includes(currentSport)
      : true
  );

  return (
    <div className="flex flex-col mt-5 p-2 gap-4">
      <div className="flex flex-col gap-3">
        <select
          className="w-full block bg-gray-50 border-2 border-teal-300 focus:ring-teal-500 focus:border-teal-500 font-semibold rounded-lg p-2"
          onChange={(e) => setCurrentSport(e.target.value)}
        >
          <option value="">Select sport</option>
          {screenedSports.map((sport) => (
            <option key={sport.id} value={sport.name}>
              {sport.name}
            </option>
          ))}
        </select>
        <select
          className="w-full block bg-gray-50 border-2 border-teal-300 focus:ring-teal-500 focus:border-teal-500 font-semibold rounded-lg p-2"
          onChange={(e) => setCurrentTeam(e.target.value)}
        >
          <option value="">Select Team</option>
          {screenedTeams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      {screenedMatches.map((match) => (
        <FavouritesCard key={match.id} {...match} />
      ))}
    </div>
  );
};

export default FavouriteList;
