import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./index.module.scss";
// import UserInfo from "@/components/UserInfo";
import dynamic from "next/dynamic";

const UserInfo = dynamic(() => import("@/components/UserInfo"), {
  ssr: false,
  loading: () => <>Loading...</>,
});

const navigation = [
  { name: "Node", href: "/" },
  { name: "Ranklist", href: "/ranklist" },
  { name: "FAQ", href: "/faq" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const router = useRouter();

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto sm:px-6">
            <div
              className={`relative z-50 flex items-center justify-between nav-bar-box ${styles["nav-box"]}`}
            >
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      style={{ width: "2.625rem", height: "2.625rem" }}
                      className="block h-12 w-12"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
                      style={{ width: "2.625rem", height: "2.625rem" }}
                      className="block h-12 w-12"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (router.pathname !== "/") {
                        router.push("/");
                      }
                    }}
                  >
                    <div className={`hidden sm:block ${styles["logo"]}`}>
                      <Image
                        src="/images/logo.png"
                        alt="Littlemami"
                        layout="fill"
                      />
                    </div>

                    <div className={`hidden ${styles["in-logo"]}`}>
                      <Image
                        src="/images/in_logo.png"
                        alt="Littlemami"
                        layout="fill"
                      />
                    </div>
                  </div>
                </div>
                <div className="hidden sm:ml-24 sm:flex items-center">
                  <div className={`flex ${styles["nav-link"]}`}>
                    {navigation.map((item) => (
                      <span
                        key={item.name}
                        className={classNames(
                          router.pathname === item.href
                            ? "text-white"
                            : "text-white/[0.5] hover:text-white",
                          "px-3 mr-14 cursor-pointer nav-title"
                        )}
                        onClick={() => {
                          if (router.pathname !== item.href) {
                            router.push(item.href);
                          }
                        }}
                        aria-current={
                          router.pathname === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <ConnectButton className="abc" /> */}
                <UserInfo />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className={`space-y-1 px-2 pb-3 pt-2 ${styles["dowm-nav"]}`}>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="span"
                  // href={item.href}

                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 cursor-pointer"
                  )}
                  onClick={() => {
                    if (router.pathname !== item.href) {
                      router.push(item.href);
                    }
                  }}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
