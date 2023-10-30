import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../utils/api";

const UpdatePasswordModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  const navigate = useNavigate();
  const closeModal = () => {
    console.log("close modal");
    setIsOpen(false);
    navigate("/");
  };

  const handleUpdatePassword = async (
    current_password: string,
    new_password: string
  ) => {
    try {
      const response = await updatePassword(current_password, new_password);
      if (response.status) {
        setUpdateStatus(response.status);
      } else {
        throw response.message;
      }
    } catch (error: any) {
      setUpdateStatus("Invalid Password");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
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
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
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
              <h1 className="text-2xl">Update Password</h1>
              <button
                className="absolute top-0 right-0 p-2 m-2 rounded-full bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-600"
                onClick={closeModal}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Current Password:
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                />
                <label className="block text-gray-700 font-semibold mb-2">
                  New Password:
                </label>
                <input
                  id="newPassword"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                />
                <p>{updateStatus}</p>
                <button
                  className="flex w-full m-2 justify-center rounded-md bg-teal-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                  onClick={() =>
                    handleUpdatePassword(currentPassword, newPassword)
                  }
                >
                  Update Password
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdatePasswordModal;
