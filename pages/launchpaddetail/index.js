'use client'

import React, { useEffect, useState} from 'react'
import { DepositMdoal, ContractBar, Container, LeaderBoardModal, InviteModal, MarsMintCard} from '@/components/LaunchpadLayout'
import { Col, Row } from 'antd'
import { styled } from 'styled-components'
import checkIcon from '@/public/images/check_icon.png'
import Back from '@/public/images/back.png'
import NFT1 from '@/public/images/nft1.png'
import NFT2 from '@/public/images/nft2.png'
import NFT3 from '@/public/images/nft3.png'
import Image from "next/image"
import Mars from './mars'
import { useNetwork, useAccount, useContractReads, useWaitForTransaction, useContractWrite, usePrepareContractWrite } from "wagmi"
import { contract } from "@/config"
import USDTABI from "@/abi/USDTABI.json"
import rpc from "@/components/Rpc"
import { ethers, BigNumber } from 'ethers'
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useRouter } from "next/router";
import { Tabs } from "@/pages/ranklist/index"

const LinearBg = styled.div`
  background: linear-gradient(to right,transparent, #8668FF, transparent);
  width: 284px;
  height: 2px;
  margin: 34px 0px;
`

const LeaderBoardButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  border: 1px solid rgb(76, 48, 135);
  border-radius: 15px;
  backdrop-filter: blur(32.17px);
  background: rgb(184, 68, 255);
  margin-top: 40px;
`

const LeftCard = styled.div`
  
  background: rgba(38, 32, 70, 0.1);
  width: 100%;
  height: 734px;
  border-radius: 30px;
  box-sizing: border-box;
  border-radius: 30px;
  padding: 126px;
  border: 1px solid rgb(54,34,92)

`
const RightItem = styled.div`
  border-radius: 20px;
  background: ${(props) => props.isDone ? 'linear-gradient(to right,#16182E,#100E27)' : 'linear-gradient(to right,#1C153A,#1C1745)'};
  width: 100%;
  height: 102px;
  padding: 40px 38px;
  border: 1px solid rgb(66,50,108);
  display: flex;
  flex-direction: row;
  aligin-items: center;
  justify-content: space-between
`
const GoButton = styled.div`
  border: 1px solid rgb(76, 48, 135);
  border-radius: 15px;
  backdrop-filter: blur(32.17px);
  background: ${(props) => props.stamp > 0 ? 'rgb(60, 47, 111)' : 'rgb(105, 68, 255)'};
  color: ${(props) => props.stamp > 0 ? 'rgb(148, 140, 175)' : '#fff'};
  width: 59px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
  
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: center;
  &:hover {
    cursor: ${(props) => props.stamp > 0 ? 'auto' : 'pointer'};
    background: ${(props) => props.stamp > 0 ? 'rgb(60, 47, 111)' : '#fff'};
    color:${(props) => props.stamp > 0 ? 'rgb(148, 140, 175)' : '#000'};
  }
`
const DoneButton = styled.div`
  background: rgba(47, 255, 218, 0.9);
  border: 1px solid rgb(76, 48, 135);
  border-radius: 15px;
  backdrop-filter: blur(32.17px);
  width: 59px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
  color: #fff;
  font-family: Poppins;
  font-size: 16px;
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
const NFTMask = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  left: 0,
  top: 0;
  padding: 30px 27px;
  background: rgba(0,0,0,0.8);
  border-radius: 20px;
  // backdrop-filter: blur(2px);
  // box-shadow: 0 0 30px 10px rgba(0, 0, 0, .3);
`
const PriceBg  = styled.div`
  margin-top: 11px;
  width: 98px;
  height: 24px;
  border-radius: 5px;
  background: rgba(210, 255, 203, 0.6);
  backdrop-filter: blur(5px);
`


const NFTList = [
  { id: '1', url: NFT1, name: 'Auction Price', value: '4680,000 LMC', price: '＄20,640'},
  { id: '2', url: NFT2, name: 'Auction Price', value: '460,000 LMC', price: '＄19,780'},
  { id: '3', url: NFT3, name: 'Auction Price', value: '460,000 LMC', price: '＄19,780'},
]

const ONE_DAY = 86400000


const LeftTimeWrapper = (props) => {
  const stamp = props.stamp
  const [leftTime, setLeftTime] = useState(stamp)

 

  const A = 86400000
  const B = 3600000
  const C = 60000
  const calculateTimeRemaining = () => {
    const now = new Date().getTime()
    if(stamp > now) {
      setLeftTime(stamp - now)
    }else {
      setLeftTime(0)
      props.reset()
    }
  } 

  useEffect(() => {

    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
    
  },[])
  const formatTime = (time) => {
    const hours = Math.floor((time % (A)) / (B));
    const minutes = Math.floor((time % (B)) / (C));
    const seconds = Math.floor((time % (C)) / 1000);
    return `${hours}: ${minutes}: ${seconds}`;
  };

  return (
   <div style={{ width: '150px'}} className='fx jc-end'>
     <span className='fz18 fw400 gray'>{formatTime(leftTime)}</span>
   </div>
  )
}
const LaunchpadDetail = () => {
  const [isLoading,setLoading] = useState(false)
  const [modalLoading,setModalLoading] = useState(false)
  const [leaderBoardOpen,setLeaderBoardOpen] = useState(false)
  const [inviteOpen,setInviteOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isOpen,setOpen] = useState(false)
  const [activeNFTIdx, setActiveNFTIdx] = useState(-1)
  const { address } = useAccount()
  const { chain } = useNetwork()
  const [rank, setRank] = useState(0)
  const [points, setPoints] = useState(0)
  const [defaultInputValue, setDefaultInputValue] = useState('')
  const router = useRouter();
  

  const [row1Data, setRow1Data] = useState({id: 1, title: 'Daily Bonus', points: '+ 10 LMC Points', done: false, countdown: 0 })
  const [row2Data, setRow2Data] = useState({ id: 2, title: 'Invite More Members', points: '+ 300 LMC Points', done: false, countdown: 0 })
  const [row3Data, setRow3Data] = useState({ id: 3, title: 'Follow X Acconut', points: '+ 300 LMC Points', done: false, countdown: 0 })
  const [row4Data, setRow4Data] = useState({ id: 4, title: 'Join Telegram', points: '+ 300 LMC Points', done: false, countdown: 0 })
  const [row5Data, setRow5Data] = useState({ id: 5, title: 'LMC Deposit', points: 'Earn Points', done: false, countdown: 0 })
  const [row6Data, setRow6Data] = useState({ id: 6, title: 'NFT Stake', points: 'Upcoming', done: false, countdown: 0 })



  const [isDeposit, setDeposit] = useState(true)
  const [depositAmount, setDepositAmount] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [refecrral, setRefecrral] = useState([])

  


  const marsContract = contract[chain?.id]?.mars

  console.log('marsContract', marsContract)

 
  const today = () => {
    return new Date().getTime()
  }
  const { data: reads0, refetch } = useContractReads({
    contracts: [
      {
        ...marsContract,
        functionName: "users",
        args: [address],
      },
      {
        ...marsContract,
        functionName: "lmc",
      },
      {
        ...marsContract,
        functionName: "getPendingPoint",
        args: [address],
      },
    ],
  })  

  const user = reads0?.[0]?.result;
  const lmc = reads0?.[1]?.result;
 

  const { data: reads1 } = useContractReads({
    contracts: [
      {
        address: lmc,
        abi: USDTABI,
        functionName: "allowance",
        args: [address, marsContract?.address],
      },
    ],
  })

  console.log('setRow1Data', row1Data)
  console.log('reads0', reads0)
  console.log('reads1', reads1)
  
  
  const allowance = reads1?.[0]?.result; //授权数量
  console.log('授权数量', Number(allowance))
  
  const userLast = user?.[1]; //最后区块
  console.log('最后区块', userLast)
  
  const userStaked = user?.[0]; //已经质押数量
  console.log('已经质押数量', userStaked)



  useEffect(() => {
    fetchRightData()
  }, [address])

  const fetchRightData = async() => {
    setLoading(true)
    const res = await rpc.getUser(address)
    console.log('useruser', res)
    if(res) {
      const { dailyCheckedIn,//是否每日已签到
              marsX,//是否点了推特
              marsTelegram,//是否点了telegram
              marsRank,//marsRank
              marsScore, 
              marsRefecrral} = res
      setRank(marsRank)
      setPoints(marsScore)
      setRow1Data((q) => ({ ...q, done: dailyCheckedIn }))
      setRow3Data((q) => ({ ...q, done: marsX }))
      setRow4Data((q) => ({ ...q, done: marsTelegram }))
      setRefecrral(marsRefecrral || [])
    }
    setLoading(false)
  }
  
  const handleRightItem = async(item) => {
    

    if(item.id === 1) {
      const a = await rpc.getMarsScore("dailyCheckIn", address)
      setRow1Data((q) => ({ ...q, countdown: today() + ONE_DAY }))
      fetchRightData()
    }
    if(item.id === 2) {
      setInviteOpen(true)
    }
    if(item.id === 3) {
      window.open('https://twitter.com/Littlemamilabs','_black')
      await rpc.getMarsScore("x", address)
      
      
      fetchRightData()
    }
    if(item.id === 4) {
      window.open('https://t.me/XNM0620','_black')
      await rpc.getMarsScore("telegram", address)
      
      fetchRightData()
     
    }
    if(item.id === 5) { // deposit
      setDeposit(true)
      setOpen(true)
    }
    if(item.id === 6) { // 
      setDeposit(false)
      setOpen(true)
    }
  }

  // approve
  const { data: approveTx, write:approveWhite } = useContractWrite({
    address: lmc,
    abi: USDTABI,
    functionName: "approve",
    onError(error) {
      setModalLoading(false)
      Notify.failure(error.message);
    },
  })
  const { isSuccess: approveConfirmed, isLoading: approveConfirming } = useWaitForTransaction(
    {
      ...approveTx,
      onError(error) {
        setModalLoading(false)
        Notify.failure(error.message);
      },
    }
  )
  // deposit 
  const { data:depositTx, write:depositWhite } = useContractWrite({
    ...marsContract,
    functionName: "stake",
    onError(error) {
      setModalLoading(false)
      Notify.failure(error.message);
    },
  })
  const { isSuccess: depositConfirmed, isLoading: depositConfirming } = useWaitForTransaction(
    {
      ...depositTx,
      onError(error) {
        setModalLoading(false)
        Notify.failure(error.message);
      },
    }
  )
  // withdraw 
  const { data:withdrawTx, write:withdrawWhite } = useContractWrite({
    ...marsContract,
    functionName: "unstake",
    
    onError(error) {
      setModalLoading(false)
      Notify.failure(error.message);
    },
  })
  const { isSuccess: withdrawConfirmed, isLoading: withdrawConfirming } = useWaitForTransaction(
    {
      ...withdrawTx,
      onError(error) {
        setModalLoading(false)
        Notify.failure(error.message);
      },
    }
  )

  const { data: reads3, refetch: refetch3 } = useContractReads({
    contracts: [
      {
        address: "0x5195b2709770180903b7aCB3841B081Ec7b6DfFf",
        abi: USDTABI,
        functionName: "balanceOf",
        args: [address],
      },
    ],
  })

  useEffect(() => {
    if (approveConfirmed) {
      Notify.success('Approved')
      if(isDeposit) {
        onDeposit(depositAmount)
      } else {
        onWidhdraw(withdrawAmount)
      }
    }
  }, [approveConfirmed, isDeposit,depositAmount, withdrawAmount])

  useEffect(() => {
    if(depositConfirmed) {
      setModalLoading(false)
      Notify.success('Deposit successful')
      setOpen(false)
      refetch()
      refetch3()
    }
  },[depositConfirmed])

  useEffect(() => {
    if(withdrawConfirmed) {
      setModalLoading(false)
      Notify.success('Withdraw successful')
      setOpen(false)
      refetch()
      refetch3()
    }
  },[withdrawConfirmed])
 
  const onDeposit = async(amount) => {
    setDepositAmount(amount)
    // const _amount = amount * 1e18
    console.log('onDeposit amount', amount)
    const _amount = ethers.utils.parseEther(`${amount}`)
    setDeposit(true)
    setModalLoading(true)
    if(Number(allowance) < _amount) {
      approveWhite({
        args: [marsContract?.address, _amount ],    
      })    
    }else {
      depositWhite({
        args: [_amount]
      })
    }
  }
  const onWidhdraw = (amount) => {
    setWithdrawAmount(amount)
    setDeposit(false)
    // const _amount = amount * 1e18
    const _amount = ethers.utils.parseEther(`${amount}`)
    setModalLoading(true)
    if(Number(allowance) < _amount) {
      approveWhite({
        args: [marsContract?.address, _amount ],    
      })    
    }else {
      withdrawWhite({
        args: [_amount]
      })
    }
  } 

    
  const LMCBalance = reads3?.[0]?.result
  const _LMCBalance = ethers.utils.formatEther(LMCBalance || 0)
  const stakedBalance = ethers.utils.formatEther(userStaked || 0)

  const pendingPoint = reads0?.[2]?.result; //用户通过stake获得point总数
  const _pendingPoint = ethers.utils.formatEther(pendingPoint || 0)
  console.log('pendingPoint', pendingPoint)
  console.log('_pendingPoint', _pendingPoint)
  console.log('stakedBalance', stakedBalance)
  console.log('_LMCBalance', _LMCBalance)
  const onMax = (idx) => {
    if(idx === 0) {
      setDefaultInputValue(_LMCBalance)
    }else {
      setDefaultInputValue(stakedBalance)
    }
  }

  useEffect(() => {
    setRow5Data((q) => ({ ...q, points: _pendingPoint > 0 ? `${_pendingPoint} Points` : 'Earn Points' }))
  },[_pendingPoint])

  const onResetStamp = (id) => {
    if(id === 1) {
      setRow1Data((q) => ({ ...q, countdown: 0 }))
    }
    if(id === 2) {
      setRow2Data((q) => ({ ...q, countdown: 0 }))
    }
    if(id === 3) {
      setRow3Data((q) => ({ ...q, countdown: 0 }))
    }
    if(id === 4) {
      setRow4Data((q) => ({ ...q, countdown: 0 }))
    }
    if(id === 5) {
      setRow5Data((q) => ({ ...q, countdown: 0 }))
    }
    if(id === 6) {
      setRow6Data((q) => ({ ...q, countdown: 0 }))
    }
  }

  const LeftItem = (data) => (
    <RightItem isDone={data.done} style={{ marginTop: data.id  > 1 ? '26px' : 0 }} > 
        <span className='white fz18 fw400'>{data.title}</span>
        <div className='fx-row ai-ct'>
          {
            data.countdown > 0 ?
            <LeftTimeWrapper stamp={data.countdown} reset={() => onResetStamp(data.id)}/> : 
            <span className='fz18 fw400 color1 '>{data.points}</span> 
          }
          <>
            {
            data.done ? 
              <DoneButton >
                <Image
                  src={checkIcon}
                  width={15}
                  height={10}
                  alt="checkIcon"
                />
              </DoneButton> :
                <>
                  {
                    data.points === 'Upcoming' ? null :
                    <GoButton stamp={data.countdown} onClick={
                      data.countdown > 0 ? () => null :
                      () => handleRightItem(data)}>Go</GoButton>
                  }
                </>
            }
          </>


        </div>
    </RightItem>
  )
  return (
    <div className=''>
      <div className="fx-row w100 center mt36">
        <Tabs active={activeIdx === 0} onClick={() => setActiveIdx(0)}>MarsAirdrop</Tabs>
        <Tabs className="ml30" active={activeIdx === 1} onClick={() => setActiveIdx(1)}>MarsMint</Tabs>
      </div>
      {
        activeIdx === 0 && (
          <Container>
            <div className='fx-row ai-ct click' style={{ marginTop: '46px'}} onClick={() => router.back()}>
              <Image
                src={Back}
                height={12}
                width={8}
                alt='Back'
              />
              <span className='white fw400 fz18 ml12'>Back</span>
            </div>
            <Row className="w100 fx-row jc-sb ai-ct "  gutter={{ xs: 0, sm: 0, md: 0, lg: 1, xl: 1, xxl: 1}} style={{marginTop: '60px'}}> 
              <Col xs={24} sm={24} md={24} lg={9} xl={9} xxl={9} >
                <LeftCard className={
                `fx-col ai-ct relative after:block after:absolute after:-bottom-[4px] 
                after:left-[50%] after:-translate-x-[50%] after:w-[60%] after:h-[4px] after:rounded-[0_0_4px_4px] 
                after:shadow-[0px_2px_10px_0px_#9C21FDF5] 
                `
                } >
                  <p className="color1 fw400 fz22" style={{ whiteSpace: 'nowrap'}}>YOUR POINTS</p>
                  <span className="white fw400 fz64 ">{points || 0}</span>
                  <LinearBg />
                  <span className="color1 fw400 fz22">Rank</span>
                  <span className="white fw400 fz42 mt10">#{rank || 0}</span>
                  <LeaderBoardButton className='' onClick={() => setLeaderBoardOpen(true)}>
                    LeaderBoard
                  </LeaderBoardButton>
                </LeftCard>
              </Col>
              <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14} className="fx-col w100">
                {LeftItem(row1Data)}
                {LeftItem(row2Data)}
                {LeftItem(row3Data)}
                {LeftItem(row4Data)}
                {LeftItem(row5Data)}
                {LeftItem(row6Data)}
              </Col>
            </Row>
            <Row className='fx-row ai-ct jc-sb ' style={{ marginTop: '80px',}}>
              {
                NFTList.map((item,idx) => (
                  <Col 
                    className='center mb26 relative'
                    key={item.id} 
                    onMouseOver={() => setActiveNFTIdx(idx)}
                    onMouseLeave={() => setActiveNFTIdx(-1)}
                    >
                    <Image
                      src={item.url}
                      width={300}
                      height={300}
                      alt={item.id}
                    />
                    {
                      activeNFTIdx === idx && 
                      <NFTMask>
                        <p className='fz18 fw400 white'>{item.name}</p>
                        <p className='fz20 fw500 white' style={{ marginTop: '157px'}}>{item.value}</p>
                        <PriceBg className='center'>
                          <span className='fz14 fw500 black'>{item.price}</span>
                        </PriceBg>
                      </NFTMask>
                    }
                  </Col>
                
                ))
              }
            </Row>
            <DepositMdoal 
              pendingPoint={_pendingPoint}
              stakedBalance={ stakedBalance }
              isLoading={
                modalLoading ||
                approveConfirming || 
                depositConfirming ||
                withdrawConfirming
              }
              isOpen={isOpen} 
              handleClose={() => {
                setDepositAmount(0)
                setWithdrawAmount(0)
                setOpen(false)
                
              }}
              onDeposit={onDeposit}
              onWidhdraw={onWidhdraw}
              onMax={onMax}
              defaultInputValue={defaultInputValue}

            />
            <LeaderBoardModal open={leaderBoardOpen} handleClose={() => setLeaderBoardOpen(false)}/>
            <InviteModal list={refecrral} open={inviteOpen} handleClose={() => setInviteOpen(false)}/>
          </Container>
        )
      }
      {
        activeIdx === 1 && (
          <Container>
            <MarsMintCard/>
          </Container>
        )
      }
      <ContractBar/>
    </div>
  );
};

export default LaunchpadDetail;
