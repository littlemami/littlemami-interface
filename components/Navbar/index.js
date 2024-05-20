import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./index.module.scss";
// import UserInfo from "@/components/UserInfo";
import dynamic from "next/dynamic";
import { Drawer }  from 'antd'
import { styled } from 'styled-components'

const UserInfo = dynamic(() => import("@/components/UserInfo"), {
  ssr: false,
  loading: () => <>Loading...</>,
});

const navigation = [
  { name: "MarsNode", href: "/marsnode" },
  { name: "Stake", href: "/stake" },
  { name: "Launchpad", href: "/launchpad" },
  { name: "Loan", href: "/Loan", disabled: true },
  { name: "Leaderboard", href: "/ranklist" },
  // { name: "Faq", href: "/faq" },
];




function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false)

  return (
  
      <Disclosure as="nav" className=''>
        {({ open }) => (
          <>
            <div className="mx-auto sm:px-6">
              <div
                className={`relative z-50 flex items-center justify-between nav-bar-box ${styles["nav-box"]}`}
              >
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden "  onClick={() => setOpen(true)}>
                    <div className="ml36 mt22"> 
                      <Image src="/images/menu.png" height={20} width={16} alt="menu" className=""/>
                    </div>                
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
                              ? "text-white active"
                              : "text-white/[0.5] hover:text-white",
                            "px-3 mr-14 cursor-pointer nav-title"
                          )}
                          onClick={() => {
                            if (item?.disabled) return;
                            if (
                              router.pathname !== item.href ||
                              item.name === "Stake"
                            ) {
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

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden md:block ">
                  <UserInfo />
                </div>

              </div>
            </div>
                    

            <Drawer
              onClose={() => setOpen(false)}
              autoFocus
              destroyOnClose
              footer={null}
              title={null}
              closeIcon={null}
              width="70%"
              placement="left"
              className="click"
              maskClosable
              style={{ background: '#101025' }} 
              open={isOpen}
             
            >
              <div className="fx-col ml36 mt26">
                <div className="mb40" onClick={() => {
                    setOpen(false)
                    if (router.pathname !== "/") {
                      router.push("/");
                    }
                  }}
                > 
                  <Image src="/images/mobile_logo.png" height={25.6} width={148} alt="mobile_logo"/>
                </div>       
                <UserInfo />
                
                <div className="mt10">
                  {navigation.map((item) => (
                    <div
                      key={item.name}
                      className="fz14 click mt24"
                      style={{ color: 'rgb(219,219,222)' }}
                      onClick={() => {
                        if (router.pathname !== item.href) {
                          setOpen(false)
                          router.push(item.href);
                        }
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
                
              </div>
            </Drawer>


            {/* <Disclosure.Panel className="sm:hidden">
              <div >
                <div className=" block md:hidden ">
                  <UserInfo />
                </div>
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
            </Disclosure.Panel> */}
          </>
        )}
      </Disclosure>
    
  );
}
