import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticlePreview } from "../../context/articles/types";
import { getArticle } from "../../utils/api";

const ArticleModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [article, setarticle] = useState<ArticlePreview | undefined>(undefined);

  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
    navigate("/");
  };

  const { id } = useParams();
  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticle(id || "");
      setarticle(data);
    };
    fetchArticle();
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
                    style={
                      {
                        "--image-url": `url(${article?.thumbnail})`,
                      } as React.CSSProperties
                    }
                    className="bg-center bg-cover bg-no-repeat bg-[image:var(--image-url)]"
                  >
                    <div className="p-6 backdrop-brightness-50">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl text-white font-bold leading-6 mb-2"
                      >
                        {article?.title}
                      </Dialog.Title>
                      <button
                        className="absolute top-0 right-0 p-2 m-2 rounded-full bg-gray-900 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
                      <p className="mb-4 text-sm">{article?.summary}</p>
                      <div className="flex justify-between items-center mt-2 ">
                        <p className="text-sm font-bold">
                          {article?.sport.name}
                        </p>
                        <div className="flex text-sm items-center">
                          <p>
                            {article?.date &&
                              new Date(article.date).toDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-lg font-bold">Details</p>
                    <p>{article?.content}</p>
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

export default ArticleModal;
