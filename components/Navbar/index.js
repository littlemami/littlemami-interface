import { Fragment, useEffect, useState } from "react";
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
import Box from '@/components/LaunchpadLayout/Box'
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

export const FinanceWrapper = styled(Box)` 
  color: rgba(255, 255, 255, 1);
  font-family: Poppins;
  font-weight: 500;
  font-size: 18px;
  position: relative;
  &:hover span{
    color:#FF45B5
  }
  &:hover .selectBox{
    display: block;
  }
  // &:hover img {
  //   content: url(/images/active-group.png);
  // }
`

export const SelectWrapper = styled(Box)` 
  display: none;
  position: absolute;
  width: 144px;
  height: 270px;
  background-color:#161332 ;
  // top: 50px;
  border-radius: 12px;
  border: 1px solid rgba(204, 139, 255, 0.12);
  padding-top: 18px;
  z-index: 999;
`
export const OptionWarpper = styled.div` 
  text-align: left;
  padding-left: 16px;
  font-size:16px;
  &:not(:nth-child(1)){
    margin-top: 28px;
  }
`

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState('Finance')


  useEffect(() => {
    if(router.pathname === '/') {
      setCurrentPath('Finance')
    }
  },[router.pathname])
  
  return (

      <Disclosure as="nav" className=' '>
        {({ open }) => (
          <>
            <Box className="" paddingLeft={['5%','5%','5%','5%','0',]} paddingRight={['5%','5%','5%','5%','0',]} >
              <div className={`relative z-50 flex items-center justify-between nav-bar-box ${styles["nav-box"]}`}>
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
                  <FinanceWrapper className="click ml24 ai-ct pt24" display={['none','none','block','block','block']}>
                    <div className="fx-row ai-ct ">
                      <span>{currentPath}</span>
                      <Image src="/images/group.png" width={16} height={8} style={{marginLeft:"10px",width:'16px',height:'8px'}} alt="" />
                    </div>
                    <SelectWrapper className="selectBox" >
                      { navigation.map((item)=>{
                       return( <OptionWarpper
                            key={item.name}
                            className={classNames(
                                router.pathname === item.href
                                    ? "nav-color"
                                    : "",
                                "px-3 mr-14 cursor-pointer nav-title"
                            )}
                            onClick={() => {
                              if (item?.disabled) return;
                             
                              setCurrentPath(item.name)
                              if (router.pathname !== item.href ||item.name === "Stake") {
                                
                                router.push(item.href);
                              }

                            }}
                            aria-current={
                              router.pathname === item.href ? "page" : undefined
                            }
                        >
                          {item.name}
                        </OptionWarpper>)
                    })}
                    </SelectWrapper>
                  </FinanceWrapper>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden md:block ">
                  <UserInfo />
                </div>

              </div>
            </Box>


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
