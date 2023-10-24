import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const isAuthenticated = !!localStorage.getItem("authToken");

const unsignedUserNavigation = [
  { name: "Sign in", href: "/signin" },
  { name: "Sign up", href: "/signup" },
];

const userNavigation = [
  { name: "Preferences", href: "#" },
  { name: "Sign out", href: "/logout" },
];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Appbar = () => {


  return (
    <>
      <Disclosure as="nav" className="border-b border-gray-400 bg-teal-100">
        {() => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-xl font-extrabold ">
                  <p>Sports Pulse </p>
                </div>
                <div className="hidden md:block">
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-white p-1 text-gray-800 hover:text-blue-600">
                        <UserCircleIcon
                          className="h-6 w-6 "
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        { isAuthenticated ? userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        )) : unsignedUserNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item> )) }
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;