'use client'

import React, { useEffect, useState} from 'react'
import { DepositMdoal, } from './components'
import { Col, Row } from 'antd'
import { styled } from 'styled-components'
import checkIcon from '@/public/images/check_icon.png'
import Back from '@/public/images/back.png'
import NFT1 from '@/public/images/nft1.png'
import NFT2 from '@/public/images/nft2.png'
import NFT3 from '@/public/images/nft3.png'
import Image from "next/image"
import Mars from './mars'
import { L1, ContractBar, Container} from './components'
import { useNetwork, useAccount, useContractReads, useWaitForTransaction, useContractWrite, usePrepareContractWrite } from "wagmi"
import { contract } from "@/config"
import USDTABI from "@/abi/USDTABI.json"
import rpc from "@/components/Rpc"
import { ethers, BigNumber } from 'ethers'
import { Notify } from "notiflix/build/notiflix-notify-aio";

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
  background: #2C2B4F;
  width: 100%;
  height: 734px;
  border-radius: 30px;
  box-sizing: border-box;
  border-radius: 30px;
  padding: 126px;
`

const RightItem = styled.div`
  border-radius: 20px;
  background: ${(props) => props.bg};
  width: 100%;
  height: 102px;
  padding: 40px 38px;
  border: 1px solid #343150;
`
const GoButton = styled.div`
  border: 1px solid rgb(76, 48, 135);
  border-radius: 15px;
  backdrop-filter: blur(32.17px);
  background: rgb(105, 68, 255);
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






const Launchpad = () => {
  const [nextPage, setNextPage] = useState(false)
  const [isLoading,setLoading] = useState(false)
  const [modalLoading,setModalLoading] = useState(false)
  const [isOpen,setOpen] = useState(false)
  const [activeNFTIdx, setActiveNFTIdx] = useState(-1)
  const { address } = useAccount()
  const { chain } = useNetwork()
  const [rightData, setRightData] = useState({})
  const [rank, setRank] = useState(0)
  const [points, setPoints] = useState(0)
  const [defaultInputValue, setDefaultInputValue] = useState('')
  
  const [rightList, setRightList] = useState([
    { id: 1,title: 'Daily Bonus', value: '+ 20 LMC Points',done: false},
    { id: 2,title: 'Invite More Members', value: '+ 200 LMC Points',done: false},
    { id: 3,title: 'Follow X Acconut', value: '+ 200 LMC Points', done: false},
    { id: 4,title: 'Join Telegram', value: 'Earn Points', done: false},
    { id: 5, title: 'LMC Deposit', value: 'Earn Points', done: false},
    { id: 6,title: 'NFT Stake', value: 'Earn Points', done: false},
  ])

  const [dailyDone, setDailyDone] = useState(false)
  const [xDone, setXDone] = useState(false)
  const [tgDone, setTgDone] = useState(false)
  const [isDeposit, setDeposit] = useState(true)



  const marsContract = contract[chain?.id]?.mars

  console.log('marsContract', marsContract)
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
  const pendingPoint = reads0?.[2]?.result; //用户通过stake获得point总数

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
              marsScore} = res
      setRank(marsRank)
      setPoints(marsScore)
      setDailyDone(dailyCheckedIn)
      setXDone(marsX)
      setTgDone(marsTelegram)
    }
    setLoading(false)
  }
  
  const handleRightItem = async(item) => {
    if(item.id === 1) {
      const a = await rpc.getMarsScore("dailyCheckIn", address)
      // setDailyDone(true)
      fetchRightData()
    }
    if(item.id === 3) {
      window.open('https://twitter.com/Littlemamilabs','_black')
      await rpc.getMarsScore("x", address)
      // setXDone(true)
      fetchRightData()
    }
    if(item.id === 4) {
      window.open('https://t.me/XNM0620','_black')
      await rpc.getMarsScore("telegram", address)
      fetchRightData()
      // setTgDone(true)
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
        onDeposit()
      } else {
        onWidhdraw()
      }
    }
  }, [approveConfirmed, isDeposit])

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
    // const _amount = amount * 1e18
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

  console.log('stakedBalance', stakedBalance)
  console.log('_LMCBalance', _LMCBalance)
  const onMax = (idx) => {
    if(idx === 0) {
      setDefaultInputValue(_LMCBalance)
    }else {
      setDefaultInputValue(stakedBalance)
    }
  }

  const btnType = (isTrue, item) => (
    <>
      {
       isTrue ? <DoneButton >
          <Image
            src={checkIcon}
            width={15}
            height={10}
            alt="checkIcon"
          />
        </DoneButton> :
        <GoButton onClick={() => handleRightItem(item)}>Go</GoButton>
      }
    </>
  )
  return (
    <div>
      {/* <Mars/> */}
      {
       !nextPage ? 
      <div onClick={() => setNextPage(true)}>
        <L1/>
      </div>:
      <Container>
        <div className='fx-row ai-ct click' style={{ marginTop: '78px'}} onClick={() => setNextPage(false)}>
          <Image
            src={Back}
            height={12}
            width={8}
            alt='Back'
          />
          <span className='white fw400 fz18 ml12'>Back</span>
        </div>
        <Row className="w100 fx-row jc-sb ai-ct "  gutter={{ xs: 0, sm: 0, md: 0, lg: 1, xl: 1, xxl: 1}} style={{marginTop: '60px'}}> 
          <Col xs={24} sm={24} md={24} lg={9} xl={9} xxl={9} className="">
            <LeftCard className="fx-col ai-ct " style={{}}>
              <p className="color1 fw400 fz22" style={{ whiteSpace: 'nowrap'}}>YOUR POINTS</p>
              <span className="white fw400 fz64 ">{points}</span>
              <LinearBg />
              <span className="color1 fw400 fz22">Rank</span>
              <span className="white fw400 fz42 mt10">#{rank}</span>
              <LeaderBoardButton className=''>
                LeaderBoard
              </LeaderBoardButton>
            </LeftCard>
          </Col>
          <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14} className="fx-col w100">
            {
              rightList.map((item,idx) => (
                <RightItem bg={item.done ? '#0E0E20' : '#2C2B4F' } key={item.title} style={{ marginTop: idx > 0 ? '26px' : 0 }} className='fx-row ai-ct jc-sb'> 
                  <span className='white fz18 fw400'>{item.title}</span>
                  <div className='fx-row ai-ct'>
                    <span className='fz18 fw400 color1 '>{item.value}</span> 
                    { item.id === 1 && btnType(dailyDone,item) }
                    { item.id === 3 && btnType(xDone,item) }
                    { item.id === 4 && btnType(tgDone,item) }
                    { item.id === 2 && btnType(item.done,item) }
                    { item.id === 5 && btnType(item.done,item) }
                    { item.id === 6 && btnType(item.done,item) }
                   
                  </div>
                </RightItem>
              ))
            }
          </Col>
        </Row>
        <Row className='fx-row ai-ct jc-sb ' style={{ marginTop: '80px',}}>
          {
            NFTList.map((item,idx) => (
              <Col 
                // span={8}
              // offset={0}
              // pull={0.5}
                className='center mb26 relative'
                key={item.id} 
                onMouseOver={() => setActiveNFTIdx(idx)}
                onMouseLeave={() => setActiveNFTIdx(-1)}
                // gutter={{ xs: 0, sm: 0, md: 0, lg: 1, xl: '36px', xxl: '36px'}}
                // xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}
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
          isLoading={
            modalLoading ||
            approveConfirming || 
            depositConfirming ||
            withdrawConfirming
          }
          isOpen={isOpen} 
          handleClose={() => setOpen(false)}
          onDeposit={onDeposit}
          onWidhdraw={onWidhdraw}
          onMax={onMax}
          defaultInputValue={defaultInputValue}

        />
      </Container>
      }
      <ContractBar/>
    </div>
  );
};

export default Launchpad;
