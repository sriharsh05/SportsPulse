import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PreferencesState, Team } from "../../context/preferences/types";
import { updatePreferences } from "../../context/preferences/actions";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { getSports, getTeams } from "../../utils/api";
import { Sport } from "../../context/articles/types";
import LoadingSpinner from "../../components/LoadingSpinner";

const PreferencesModal = () => {
  const preferencesState: PreferencesState = usePreferencesState();
  const preferencesDispatch = usePreferencesDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [sportsData, setSportsData] = useState<Sport[]>([]);
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [userPreferences, setUserPreferences] = useState({
    sports: [] as string[],
    teams: [] as string[],
  });

  const closeModal = () => {
    setIsOpen(false);
    navigate("../");
  };

  useEffect(() => {
    const fetchStateData = async () => {
      const fetchedSportsData = await getSports();
      const fetchedTeamData = await getTeams();
      setSportsData(fetchedSportsData.sports);
      setTeamsData(fetchedTeamData);
    };
    fetchStateData();
  }, []);


  useEffect(() => {
    if (
      preferencesState.isLoading == false &&
      preferencesState.preferences
    ) {
      setUserPreferences(preferencesState.preferences);
    }
  }, [
    preferencesState.isLoading,
    preferencesState.preferences
  ]);


  const handleSportsSelect = (event:React.ChangeEvent<HTMLInputElement>) => {
    const selectedSport = event.target.value;
    const isChecked = event.target.checked;
  
    setUserPreferences((prevPreferences) => {
      const updatedSports = Array.isArray(prevPreferences.sports) ? [...prevPreferences.sports] : [];
  
      if (isChecked) {
        updatedSports.push(selectedSport);
      } else {
        const index = updatedSports.indexOf(selectedSport);
        if (index > -1) {
          updatedSports.splice(index, 1);
        }
      }
  
      return { ...prevPreferences, sports: updatedSports };
    });
  };
  
  const handleTeamsSelect = (event:React.ChangeEvent<HTMLInputElement>) => {
    const selectedTeam = event.target.value;
    const isChecked = event.target.checked;
  
    setUserPreferences((prevPreferences) => {
      const updatedTeams = Array.isArray(prevPreferences.teams) ? [...prevPreferences.teams] : [];
  
      if (isChecked) {
        updatedTeams.push(selectedTeam);
      } else {
        const index = updatedTeams.indexOf(selectedTeam);
        if (index > -1) {
          updatedTeams.splice(index, 1);
        }
      }
  
      return { ...prevPreferences, teams: updatedTeams };
    });
  };
  
  const handelSubmit = () => {
    updatePreferences(preferencesDispatch, userPreferences.sports, userPreferences.teams);
    setIsOpen(false);
  };

  if (preferencesState.isLoading) {
    return (
      <div className="text-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (preferencesState.isError) {
    return (
      <div className="text-center">
        <span>{preferencesState.errorMessage}</span>
      </div>
    );
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-3xl p-6 my-8 text-left align-middle transition-all transform bg-white rounded-2xl shadow-xl">
              <h1 className="text-2xl text-gray-800 font-semibold">
                Preferences
              </h1>
              <div className="mt-3">
                <div className="flex flex-col space-y-3">
                  {sportsData.map((sport) => (
                    <div key={sport.id} className="flex items-center">
                      <input
                        id={`sports-${sport.id}`}
                        type="checkbox"
                        value={sport.name}
                        checked={(userPreferences.sports ? userPreferences.sports.includes(sport.name) : false)}
                        onChange={handleSportsSelect}
                        className=" appearance-none w-4 h-4 border-2 border-teal-500 rounded-sm bg-white
                        mt-1 shrink-0
                        checked:bg-teal-700 checked:border-1 checked:border-gray-900"
                      />
                      <label
                        htmlFor={`sports-${sport.id}`}
                        className="text-sm text-gray-800 ml-2"
                      >
                        {sport.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className="text-2xl text-gray-800 font-semibold mt-3">
                Teams
              </h1>
              <div className="mt-3">
                <div className="grid grid-cols-4 space-y-3">
                  {teamsData.map((team) => (
                    <div key={team.id} className="flex items-center">
                      <input
                        id={`teams-${team.id}`}
                        type="checkbox"
                        value={team.name}
                        checked={(userPreferences.teams ? userPreferences.teams.includes(team.name) : false)}
                        onChange={handleTeamsSelect}
                        className="appearance-none w-4 h-4 border-2 border-teal-500 rounded-sm bg-white
                        mt-1 shrink-0
                        checked:bg-teal-700 checked:border-1 checked:border-gray-900"
                      />
                      <label
                        htmlFor={`teams-${team.id}`}
                        className="text-sm text-gray-800 ml-2"
                      >
                        {team.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <button
                  className="absolute bottom-4 right-4 px-6 py-2 rounded-lg border-2 border-gray-700 text-sm font-medium text-white bg-teal-600 hover:bg-teal-400 hover:border-gray-900"
                  onClick={handelSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PreferencesModal;