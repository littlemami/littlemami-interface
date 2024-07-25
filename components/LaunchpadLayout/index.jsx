import {styled} from 'styled-components'
import {Modal, InputNumber} from "antd";
import Image from "next/image"
import Assets from '@/public/images/assets.png'
import Earn from '@/public/images/earn.png'
import Mars from '@/public/images/mars.png'
import MarsMintBg from '@/public/images/mars_mint.png'

import MarsActive from '@/public/images/marsActive.png'
import X from '@/public/images/x.png'
import XActive from '@/public/images/xActive.png'
import DC from '@/public/images/dc.png'
import DCActive from '@/public/images/dcActive.png'
import InviteLinkIcon from '@/public/images/invite_link.png'
import TG from '@/public/images/tg.png'
import TGActive from '@/public/images/tgActive.png'
import InfiniteScroll from "react-infinite-scroll-component";
import React, {FC, useEffect, useState} from 'react'
import {useAccount, useContractWrite, useWaitForTransaction} from "wagmi";
import {Notify} from "notiflix/build/notiflix-notify-aio";
import styles from "@/pages/ranklist/index.module.scss";
import rpc from "@/components/Rpc";
import {Col, Row, message} from 'antd'
import copy from "copy-to-clipboard";
import {useRouter} from "next/router";
import Box from '@/components/LaunchpadLayout/Box'
import Grid from '@/components/LaunchpadLayout/Grid'
import Text from '@/components/LaunchpadLayout/Text'
import { useMatchBreakpoints } from '@/hooks/useMatchBreakpoints'
import { GoButton, DoneButton } from '@/pages/launchpaddetail';
import checkIcon from '@/public/images/check_icon.png'
const splitAddress = (addr) => {
    const start = addr.substring(0, 6)
    const end = addr.substring(addr.length - 5, addr.length)
    return `${start}....${end}`
}

export const Container = ({children}) => {
    return (
        <div className='w100 center'>
            <div style={{maxWidth: '1144px'}}>{children}</div>
        </div>
    )
}

const Tab = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.active ? 'rgb(184, 68, 255)' : 'rgb(16, 14, 40)'};
  cursor: pointer;
  color: ${(props) => props.active ? 'rgb(227, 227, 227)' : 'rgb(182, 182, 182)'};
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  backdrop-filter: blur(32.17px);
`
const ConfirmButton = styled(Box)`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(76, 48, 135);
  border-radius: 15px;
  backdrop-filter: blur(32.17px);
  background: rgb(105, 68, 255);
 
  color: rgb(255, 255, 255);
  font-family: Poppins;

  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: center;

  &:hover {

    cursor: pointer;
    background: #fff;
    color: #000;
  }
`
const AmountButton = styled(Box)`
  backdrop-filter: blur(32.17px);
  background: rgb(105, 68, 255);
  color: rgb(255, 255, 255);
  font-family: Poppins;
  font-weight: 400;
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 7px;

  &:hover {
    cursor: pointer;
    background: #fff;
    color: #000;
  }
`

const AmountItem = (props) => {
    const {img, title, value, w, h} = props
    return (
        <Box background="rgba(39, 39, 73, 0.4)" 
            borderRadius={['8px','8px','8px','20px','20px',]} 
            className='fx-row ai-ct jc-sb' 
            padding={['12px','12px','12px','28px','28px']}
            height={['61px','61px','61px','116px','116px']}
            width={['154px','154px','154px','246px','246px']}
            >
            <Image
                src={img}
                width={w}
                height={h}
                alt={`${img}`}
            />
            <div className='fx-col'>
                <Text className='white fw500' fontSize={['12px','12px','12px','18px','18px',]}>{title}</Text>
                <Text className='white  fw300' mt={['2px','2px','2px','12px','12px',]} fontSize={['12px','12px','12px','18px','18px',]}>{value}</Text>
            </div>
        </Box>
    )
}


export const DepositMdoal = ({
                                 isOpen,
                                 handleClose,
                                 onDeposit,
                                 onWithdraw,
                                 isLoading,
                                 onMax,
                                 defaultInputValue,
                                 stakedBalance,
                                 pendingPoint,
                                 depositBtnText
                             }) => {
    const [activeIdx, setActiveIdx] = useState(0)
    const [value, setValue] = useState('')
    const { isMobile, isTablet } = useMatchBreakpoints()

    useEffect(() => {
        setValue('')
    }, [activeIdx])
    useEffect(() => {
        if (!isOpen) {
            setValue('')
        }
    }, [isOpen])

   
    useEffect(() => {
        if (defaultInputValue !== '') {
            if (Number.isInteger(Number(defaultInputValue))) {
                setValue(parseInt(defaultInputValue))
            } else {
                setValue(defaultInputValue)
            }
        }
    }, [defaultInputValue])
    const onHandle = () => {
        if (value && Number(value) > 0) {
            if (activeIdx === 0) {//deposit
                onDeposit(Number(value))
            } else {
                onWithdraw(Number(value))
            }
        } else {
            Notify.failure('Please enter amount')
        }
    }

    return (
        <Modal
            open={isOpen}
            onCancel={() => {
                setValue('')
                handleClose()
            }}
            footer={null}
            width={isMobile || isTablet ? '100%' : 666}
            wrapClassName={isMobile || isTablet ? 'cur-modal-box-deposit-mobile' : 'cur-modal-box-deposit'}
            classNames={{mask: "cur-modal-mask", body: "cur-modal-body"}}
        >
            <Box className=''>
                <div className='center w100'>
                    <Text className='white fw600' fontSize={['18px','18px','18px','28px','28px',]}>Deposit</Text>
                </div>
                <Box className=' fx-row ai-ct jc-sb' mt={['32px','32px','32px','36px','36px',]}>
                    <AmountItem
                        img={Assets}
                        title="Stake Amount"
                        value={Math.floor(stakedBalance * 100) / 100}
                        w={isMobile || isTablet ? 18 : 26}
                        h={isMobile || isTablet ? 19 : 27.4}
                    />
                    <AmountItem
                        img={Earn}
                        title="Earn LMC Points"
                        value={Math.floor(pendingPoint * 100) / 100}
                        w={isMobile || isTablet ? 17 : 20.2}
                        h={isMobile || isTablet ? 24 : 27}
                     
                    />
                </Box>
                <Box className='fx-row ai-ct jc-sb w100' mt={['24px','24px','24px','36px','36px',]}>
                    <Tab borderRadius={['6px','6px','6px','11px','11px']} width={['148px','148px','148px','240px','240px']} height={['30px','30px','30px','42px','42px']} active={activeIdx === 0} onClick={() => setActiveIdx(0)}>Deposit</Tab>
                    <Tab borderRadius={['6px','6px','6px','11px','11px']} width={['148px','148px','148px','240px','240px']} height={['30px','30px','30px','42px','42px']} active={activeIdx === 1} onClick={() => setActiveIdx(1)}>Withdraw</Tab>
                </Box>
                <Box
                    background="rgba(39, 39, 73, 0.4)"
                    borderRadius={['6px','6px','6px','20px','20px']}
                    padding={['16px','16px','16px','32px','32px']}
                    height={['110px','110px','110px','188px','188px']}
                    mt={['24px','24px','24px','36px','36px']}
                    width="100%">
                    <div className='fx-col  w100'>
                        <span className='fw500 white ml14' fontSize={['12px','12px','12px','18px','18px',]}>Amount</span>
                        <div style={{position: 'relative', marginTop: '26px'}}>
                            <input 
                                className='deposit-input-number ' 
                                type='number' 
                                value={value}
                                style={{
                                    width: isMobile || isTablet ? "278px" : "470px",
                                    height: isMobile || isTablet ? "30px" : "44px",
                                    borderRadius: isMobile || isTablet ? "4px" : "12px",
                                    fontSize: isMobile || isTablet ? "12px" : "16px",
                                }}
                                onChange={e => setValue(e.target.value)}
                            />
                            <AmountButton
                                height={['20px','20px','20px','30px','30px']}
                                fontSize={['10px','10px','10px','14px','14px',]}
                                borderRadius={['4px','4px','4px','10px','10px']}
                                mt={['-2px','-2px','0px','0px','0px']}
                                padding={['0px 8px 0px 8px','0px 8px 0px 8px','0px 8px 0px 8px','5px 15px 5px 15px','5px 15px 5px 15px']}
                                onClick={() => onMax(activeIdx)}>
                                Max
                            </AmountButton>
                        </div>

                    </div>
                </Box>

                <ConfirmButton
                    height={['34px','34px','34px','52px','52px']}
                    fontSize={['12px','12px','12px','16px','16px',]}
                    marginTop={['24px','24px','24px','104px','104px',]}
                    onClick={!isLoading ? () => onHandle() : () => null}>
                    {
                        isLoading ?
                            <>
                                <span className="loading loading-spinner"></span>loading
                            </>
                            :
                            <>
                                {activeIdx === 0 ? depositBtnText : 'Withdraw Now'} 
                            </>
                    }
                </ConfirmButton>
            </Box>
        </Modal>
    )
}


export const ContractWrappr = styled.div`
  width: 568px;
  height: 64px;
  padding: 20px 80px;
  border-radius: 35px;
  // border-image-source: linear-gradient(179.68deg, rgba(201, 204, 234, 0.16) -1.1%, rgba(167, 174, 242, 0.11) 126.4%);
  // border-image-slice: 1;
  box-sizing: border-box;
  background: rgba(71, 57, 129, 0.08);
  box-shadow: 0px 4px 13.8px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);
  margin-top: 156px;
  margin-bottom: 142px;

`

export const FooterWrapper = styled(Box)`
  
`
export const LinkWrapper = styled.div`
  margin-bottom: 22px;
  color: rgba(166, 169, 198, 0.65);
  font-family: Poppins;
  font-weight: 300;
  font-size: 16px;
  height: 30px;
  width: 122px;

  &:hover {
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
`
export const LinkTitleWrapper = styled.div`
  margin-bottom: 22px;
  color: rgba(255, 255, 255, 1);
  font-family: Heebo;
  font-weight: 500;
  width: 122px;
  font-size: 20px;
`

const IconWrapper = styled.div`
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 50px #473981;
    backdrop-filter: blur(100px);
  }
`


export const Footer = () => {
    const [isHover, setHover] = useState(-1)
    const router = useRouter();
    const { isMobile, isDesktop } = useMatchBreakpoints()
    return (
       <Box className='center w100' maxWidth="1140px">
            <Grid mt={['48px','48px','48px','150px','150px']}
                gridTemplateColumns={['1fr','1fr','1fr','5fr 1fr 1fr','5fr 1fr 1fr']}
                width={['345px','345px','345px','100%','100%']}
                pl={['24px','24px','24px','0px','0px']}
                className='w100'
                
                >
                <Box className='' width={['345px','345px','100%','100%','100%']}>
                    <LinkTitleWrapper>MarsProtocol</LinkTitleWrapper>
                    <div className="color2 fz16">Unlocking Your Profit with LMC</div>
                    <div className="fx-row ai-ct jc-sb" style={{width: "128px", marginTop: '28px'}}>
                        {
                            [
                                {url: 'https://twitter.com/Littlemamilabs', icon: X, active: XActive},
                                {url: 'https://discord.com/invite/xa4BpDJV4V', icon: DC, active: DCActive},
                                {url: 'https://t.me/XNM0620', icon: TG, active: TGActive},
                            ].map((item, idx) => (
                                <IconWrapper
                                    onMouseEnter={() => setHover(idx)}
                                    onMouseLeave={() => setHover(-1)}
                                    key={item} onClick={() => window.open(item.url, '_black')}>
                                    <Image
                                        src={isHover === idx ? item.active : item.icon}
                                        width={25}
                                        height={25}
                                        alt={`link1`}
                                    />
                                </IconWrapper>
                            ))
                        }
                    </div>
                </Box>
                <Box className='fx-row jc-sb' mt={['22px','22px','22px','0px','0px',]}>
                    <div >
                        <LinkTitleWrapper>About</LinkTitleWrapper>
                        {
                            [
                                {url: 'https://www.littlemami.io/', text: "LittleMami"},
                                {url: 'https://medium.com/@lmc2024go', text: "Medium"},
                                {url: 'https://docs.littlemami.io/', text: "WhitePaper"},
                                {url: 'https://etherscan.io/address/', text: "Etherscan"},

                            ].map((item, idx) => (<LinkWrapper key={item}
                                                               onClick={() => window.open(item.url, '_black')}>{item.text}</LinkWrapper>))
                        }
                    </div>
                </Box>

                <div className=''>
                    <LinkTitleWrapper>Finance</LinkTitleWrapper>
                    {
                        [
                            {url: '/marsnode', text: "MarsNode"},
                            {url: '/stake', text: "Stake"},
                            {url: '/launchpad', text: "LaunchPad"},
                            {url: '/Loan', text: "Loan"},

                        ].map((item, idx) => (<LinkWrapper key={item}
                                                onClick={() => {
                                                    if (router.pathname !== item.url) {
                                                        router.push(item.url);
                                                    }
                                                }}>{item.text}</LinkWrapper>))
                    }
                </div>

            </Grid>
        </Box>
       

    )
}


export const LeaderBoardModal = ({open, handleClose}) => {

    const pageSize = 20;
    const [data, setData] = useState({});
    const [mount, setMount] = useState(true);
    const [more, seMore] = useState(true);
    const [page, setPage] = useState(1);
    const { isMobile, isTablet } = useMatchBreakpoints()


    const fetchData = async () => {
        const marsRank = await rpc.getMarsRank(page, pageSize);
        if (!Array.isArray(marsRank)) {
            marsRank = [];
        }
        setData((prev) => ({
            ...prev,
            marsRank:
                page === 1 ? [...marsRank] : [...prev.marsRank, ...marsRank],
        }));
        if (marsRank?.length < pageSize) {
            seMore(false);
            return;
        }
        page === 1 && setMount(true);
    }

    useEffect(() => {
        fetchData(page)
    }, [page])


    return (
        <Modal
            centered
            open={open}
            onOk={handleClose}
            onCancel={handleClose}
            footer={null}
            width={isMobile || isTablet ? '100%' : 800}
            wrapClassName={isMobile || isTablet ? 'cur-modal-box-deposit-mobile' : 'cur-modal-box-deposit'}
            classNames={{mask: "cur-modal-mask",body: "cur-modal-body"}}
            style={{ overflow: 'hidden'}}
        >

            <Box 
                className=" w100" 
                marginTop={['24px','24px','24px','48px','48px',]}
                width={['326px','326px','326px','690px','690px']}
                height={['332px','332px','332px','461px','461px']}
                borderRadius={['8px','8px','8px','20px','20px']}
                p={['18px 42px','18px 42px','18px 42px','60px 58px','60px 58px']}
                >
                <div className="fx-row ai-ct jc-sb w100">
                    <Text className='white fw500' fontSize={['10px','10px','10px','20px','20px',]} >Rank</Text>
                    <Text className='pink fw500' fontSize={['10px','10px','10px','20px','20px',]} >Address</Text>
                    <Text className='white fw500' fontSize={['10px','10px','10px','20px','20px',]} >Points</Text>
                </div>
                <div
                    id="scrollableDiv"
                    style={{
                        height: `calc(100vh - 25rem)`,
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <InfiniteScroll
                        dataLength={10} 
                        next={() => setPage((pre) => pre + 1)}
                        hasMore={more}
                        loader={
                            <div className="loading-box">
                                <span></span>
                                <span></span>
                            </div>
                        }
                        endMessage={<></>}
                        style={{height: isMobile || isTablet ? '284px' : '340px', display: "flex", flexDirection: "column", overflowY: 'scroll'}}
                        inverse={false}
                        className='hide-scrollbar'
                        scrollableTarget="scrollableDiv"
                    >
                        {data?.marsRank?.map((item, index) => (
                            <Box className="w100 fx-row ai-ct jc-sb" key={item.address}   marginTop={['12px','12px','12px','36px','36px',]}>
                                <Text className='white8 fw500 ' 
                                    fontSize={['10px','10px','1px','18px','18px',]} 
                                    width={['50px','50px','50px','50px','50px']}
                                    >{index + 1}</Text>
                                <Text className='pink fw500 center' 
                                     fontSize={['10px','10px','1px','18px','18px',]} 
                                     width={['100px','100px','100px','433px','433px']}
                                >{ isMobile || isTablet ? splitAddress(item.address) : item.address}</Text>
                                <Text className=' white8 fw500 fx ai-ct jc-end' 
                                    fontSize={['10px','10px','1px','18px','18px',]} 
                                    width={['32px','32px','32px','70px','70px']}
                                   >{item.score}</Text>
                            </Box>
                        ))}
                    </InfiniteScroll>

                    {/* {data?.marsRank?.length == 0 && (
                        <p className="no-data">No data</p>
                    )} */}
                </div>
            </Box>

        </Modal>
    )
}


const CopyInviteLink = styled(Box)`

  display: flex;
  place-content: center;
  place-items: center;
  gap: 24px;
  flex-shrink: 0;
  padding: 12px 24px;
  border-radius: 15px;
  background: rgba(105, 68, 255, 1);

`
export const InviteModal = ({list, open, handleClose, userId}) => {
    const [more, seMore] = useState(true);
    const { isMobile, isTablet } = useMatchBreakpoints()
    const [messageApi, contextHolder] = message.useMessage();
    
    return (
        <Modal
            centered
            open={open}
            onOk={handleClose}
            onCancel={handleClose}
            footer={null}
            height={652}
            
            width={isMobile || isTablet ? '100%' : 666}
            wrapClassName={isMobile || isTablet ? 'cur-modal-box-deposit-mobile' : 'cur-modal-box-deposit'}

            classNames={{mask: "cur-modal-mask"}}
        >

            <div className="new-list-box w100 ">
                {contextHolder}
                <Text className=' fw500 white w100 center' fontSize={['18px','18px','18px','28px','28px',]}>
                    Your Invitation
                </Text>
                <Box className="center w100 "  marginTop={['24px','24px','24px','36px','36px',]}>
                    <CopyInviteLink 
                        className='fx-row ai-ct click' 
                        height={['34px','34px','34px','52px','52px']}
                        width={['328px','328px','328px','420px','420px']}
                        onClick={() => {
                            copy(window.location.href + '/' + userId);
                            messageApi.open({
                                type: "success",
                                content: "Copied",
                            });
                    }}>
                        <Image src={InviteLinkIcon} width={16.6} height={14.7} alt='InviteLinkIcon'/>
                        <Text className='white ' fontSize={['12px','12px','12px','16px','16px',]}>Copy Invite Link</Text>
                    </CopyInviteLink>
                </Box>
                <Box
                    id="scrollableDiv"
                    marginTop={['24px','24px','24px','36px','36px',]}
                    width={['326px','326px','326px','532px','532px']}
                    height={['332px','332px','332px','461px','461px']}
                    borderRadius={['8px','8px','8px','20px','20px']}
                    p={['18px 42px','18px 42px','18px 42px','60px 58px','60px 58px']}
                    background='rgba(39, 39, 73, 0.4)'
                >
                    <div className="fx-row ai-ct jc-sb w100">
                        <Text 
                            className='pink fw500 center' 
                            fontSize={['10px','10px','10px','18px','18px',]} 
                            width={['62px','62px','62px','130px','130px']}
                        >Address</Text>
                        <Text className=' white fw500 center' 
                            fontSize={['10px','10px','10px','18px','18px',]} 
                            width={['32px','32px','32px','70px','70px']}
                           >
                        Points</Text>
                    </div>
                    <InfiniteScroll
                        dataLength={10} //This is important field to render the next data
                        next={() => setPage((pre) => pre + 1)}
                        hasMore={more}
                        endMessage={<></>}
                        style={{ height: isMobile || isTablet ? '284px' : '340px', display: "flex", flexDirection: "column", overflowY: 'scroll'}}
                        inverse={false}
                        className='hide-scrollbar'
                        scrollableTarget="scrollableDiv"
                    
                    >
                        {list && !!list.length && list.map((item, index) => (
                            <Box className="w100 fx-row ai-ct jc-sb" 
                                marginTop={['12px','12px','12px','36px','36px',]}
                                key={item.address}>
                                <Text 
                                    className=' pink fw500 center '
                                    fontSize={['10px','10px','10px','16px','16px',]} 
                                    width={['62px','62px','62px','130px','130px']}
                                    >{splitAddress(item.address)}</Text>
                                <Text 
                                    className=' white8 fw500 center' 
                                    fontSize={['10px','10px','10px','16px','16px',]} 
                                    width={['32px','32px','32px','70px','70px']}
                                    >300</Text>
                            </Box>
                        ))}
                    </InfiniteScroll>

                    {/* {list?.length == 0 && (
                        <p className="no-data">No data</p>
                    )} */}
                </Box>
            </div>

        </Modal>
    )
}


const MarsMintWrapper = styled(Box)`
    box-sizing: border-box;
    backdrop-filter: blur(50px);
    background: rgba(38, 32, 70, 0.1);
    border: 1px solid rgb(57, 43, 106);

`
const ReduceButton = styled.div`
  width: 35px;
  height: 35px;
  border: 1.5px solid rgba(105, 68, 255, 1);
  box-sizing: border-box;
  background: rgba(111, 77, 209, 0.1);
  border-radius: 50%;
  cursor: pointer;
`
const AddButton = styled.div`
  width: 35px;
  height: 35px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  background: rgba(105, 68, 255, 1);
  border-radius: 50%;
  cursor: pointer;
`
const MintButton = styled(Box)`
  width: 101px;
  height: 44px;
  display: inline-flex;
  place-content: center;
  place-items: center;
  gap: 10px;
  border-radius: 15px;
  border: 1px solid rgba(76, 48, 135, 1);
  background: rgba(105, 68, 255, 1);
  backdrop-filter: blur(32.171371px);
  cursor: pointer;
 
`

export const MarsMintCard = () => {
    const step = 1
    const max = 100
    const [mintValue, setMintValue] = useState(0)
    const onChange = (event) => {
        const value = event.target.value
        if (!isNaN(value)) {
            setMintValue(value)
        }
    }
    const onReduce = () => {
        const target = Number(mintValue) - step
        if (target > 0) {
            setMintValue(Number(mintValue) - step)
        } else {
            setMintValue(0)
        }
    }
    const onAdd = () => {
        const target = Number(mintValue) + step
        if (target < max) {
            setMintValue(Number(mintValue) + step)
        } else {
            setMintValue(max)
        }
    }
    return (
        <MarsMintWrapper
            height={['auto','auto','auto','711px','711px',]}
            p={['24px','24px','24px','85px 102px','85px 102px',]}
            mt={['24px','24px','24px','46px','46px',]}
            borderRadius={['12px','12px','12px','40px','40px',]}
        >
            <Grid gridGap={['0px','0px','0px','66px','66px']} className='fx-row' gridTemplateColumns={['1fr','1fr','1fr','4.1fr 3fr','4.1fr 3fr',]}>
                {/* <Image
                    src={MarsMintBg}
                    width={417}
                    height={535}
                    alt="MarsMintBg"
                /> */}
    {/* MarsMintVideo */}
                
                    <video
                        width={417}
                        height={535}
                        autoPlay
                        loop preload="none"
                        src="/mars_mint_ideo.mp4" >
                        
                    </video>
             

                <Box className='fx-col'  >
                    <Text className=' white fw700 mt46' fontSize={['32px','32px','32px','58px','58px']}>MARS MINT</Text>
                    <Text className='lilac' mt={['12px','12px','12px','26px','26px']}  fontSize={['20px','20px','20px','24px','24px']}>0/100</Text>
                    <Text className='lilac'  mt={['12px','12px','12px','26px','26px']} fontSize={['20px','20px','20px','24px','24px']}>0.12 Ξ</Text>
                    <Box className='fx-row ai-ct' mt={['24px','24px','24px','50px','50px']}>
                        <ReduceButton className='center' onClick={onReduce}>
                            <span className='fz28 mt4'>-</span>
                        </ReduceButton>
                        <input className='mars_mint_input' value={mintValue || ''} onChange={onChange}/>
                        <AddButton className='center' onClick={onAdd}>
                            <span className='fz28 mt4'>+</span>
                        </AddButton>
                    </Box>
                    <MintButton className='center' mt={['24px','24px','24px','55px','55px']}>
                        <span className='fz16 white'>MINT</span>
                    </MintButton>
                </Box>
            </Grid>

        </MarsMintWrapper>
    )
}




export const XModal = ({  open, handleClose, userId, done }) => {


    const { isMobile, isTablet } = useMatchBreakpoints()

    const onLink = () => {
     
        const text = encodeURIComponent(
        `@WeAreMARS_ Odyssey Hub is now live!
Join the fun, collect LMC points, and secure your #MARS airdrops.
Keep an eye on the daily leaderboard to track your progress.

Seize this amazing chance today! https://www.marsprotocol.org/launchpaddetail/${userId}

        `);
        const tweetUrl = `https://twitter.com/intent/tweet?text=${text}`;
        window.open(tweetUrl, "_blank");
            
    }
    return (
      <Modal
        centered
        open={open}
        onOk={handleClose}
        onCancel={handleClose}
        footer={null}
        height={247}
        width={isMobile || isTablet ? '100%' : 975}
        wrapClassName={isMobile || isTablet ? 'cur-modal-box-deposit-mobile' : 'cur-modal-box-deposit'}
        classNames={{mask: "cur-modal-mask"}}
      > 
        <div className='w100 center'>
            <span className='fz28 fw600 white'>More Points (1/1)</span>
        </div>
        <div className='fx-row ai-ct jc-sb' style={{ marginTop: '55px'}}>
            <span className='fz18 white' >Post Twitter</span>
            <span className='fz18' style={{ color: 'rgba(185, 174, 255, 1)'}}>+100 LMC Points</span>
            {
                done ? 
                <DoneButton onClick={onLink}>
                  <Image
                    src={checkIcon}
                    width={15}
                    height={10}
                    alt="checkIcon"
                  />
                </DoneButton>:
                <GoButton onClick={onLink}>Go</GoButton>
                
            }
        </div>  
        <div style={{
           
            marginTop: '24px',
            width: '788px',
            height: '0.8px',
            border: '0.8px solid',
            borderImageSource: 'linear-gradient(90deg, rgba(73, 68, 193, 0.48) 0%, rgba(134, 104, 255, 0.64) 48.5%, rgba(73, 68, 193, 0.48) 100%)',
            borderImageSlice: 1,
            borderImageOutset: '0.4px'

              
        }}/>
       

      </Modal>
    );
};