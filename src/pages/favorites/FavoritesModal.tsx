import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MatchPreview } from "../../context/liveMatches/types";
import { getMatch } from "../../utils/api";

const FavoritesModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [matchData, setMatchData] = useState<MatchPreview>({
    id: "",
    isRunning: false,
    name: "",
    location: "",
    startsAt:"",
    endsAt: "",
    teams: [],
    sportName: "",
    playingTeam: -1,
    story: "",
  });

  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
    navigate("/");
  };

  const { id } = useParams();
  useEffect(() => {
    const fetchMatch = async () => {
      const fetchMatchData = await getMatch(id || "");
      setMatchData(fetchMatchData);
    };
    fetchMatch();
  }, [id]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-teal-700 text-white text-left align-middle shadow-xl transition-all">
                  <div
                    className="bg-center bg-cover bg-no-repeat"
                  >
                    <div className="p-6 backdrop-brightness-50">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl text-white font-bold leading-6 mb-2"
                      >
                        {matchData.name}
                      </Dialog.Title>
                      <p className="mb-4 text-sm">{matchData?.location}</p>
                      <div className="flex justify-between items-center mt-2 ">
                        <p className="text-sm font-bold">
                          {matchData?.sportName}
                        </p>
                        <div className="flex text-sm items-center">
                          <p>
                            {matchData?.startsAt &&
                              new Date(matchData.startsAt).toDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-lg font-bold">Story</p>
                    <p className="justify-center">{matchData.story}</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};


export default FavoritesModal;
