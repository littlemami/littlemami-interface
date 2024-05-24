import { styled } from 'styled-components'
import { Modal, InputNumber } from "antd";
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
import TG from '@/public/images/tg.png'
import TGActive from '@/public/images/tgActive.png'
import InfiniteScroll from "react-infinite-scroll-component";
import React, { FC, useEffect, useState}  from 'react'
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import styles from "@/pages/ranklist/index.module.scss";
import rpc from "@/components/Rpc";
import { Col, Row } from 'antd'

export const Container = ({ children }) => {
    return (
        <div className='w100 center'>
            <div style={{ maxWidth: '1144px' }}>{children}</div>
        </div>
    )
}

const ItemWrapper  = styled.div`
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    border-radius: 20px;
    background: rgba(39, 39, 73, 0.4);
`
const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
  background: ${(props) => props.active ? 'rgb(184, 68, 255)' : 'rgb(16, 14, 40)'};
  cursor: pointer;
  color: ${(props) => props.active ? 'rgb(227, 227, 227)' : 'rgb(182, 182, 182)'};
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  backdrop-filter: blur(32.17px);
  width: 240px;
  height: 42px;
`
const ConfirmButton = styled.div`
    width: 100%;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(76, 48, 135);
    border-radius: 15px;
    backdrop-filter: blur(32.17px);
    background: rgb(105, 68, 255);
    margin-top: 104px;
    color: rgb(255, 255, 255);
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
const AmountButton = styled.div`
    height: 30px;
    padding: 5px 15px 5px 15px;
    border-radius: 10px;
    backdrop-filter: blur(32.17px);
    background: rgb(105, 68, 255);
    color: rgb(255, 255, 255);
    font-family: Poppins;
    font-size: 14px;
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
    const { img, title, value, w, h} = props
    return (
        <ItemWrapper className='fx-row ai-ct jc-sb' style={{padding: '28px'}} h="116px" w="246px">
            <Image
                src={img}
                width={w}
                height={h}
                alt={`${img}`}
            />
            <div className='fx-col'>
                <span className='white fz18 fw500'>{title}</span>
                <span className='white fz16 fw300 mt12'>{value}</span>
            </div>
        </ItemWrapper>
    )
}



export const DepositMdoal = ({ isOpen, handleClose, onDeposit, onWidhdraw, isLoading, onMax, defaultInputValue, stakedBalance, pendingPoint}) => {
    const [activeIdx, setActiveIdx] = useState(0)
    const [value, setValue] = useState('')

    useEffect(() => {
        setValue('')
    },[activeIdx])
    useEffect(() => {
        if(!isOpen) {
            setValue('')
        }
    },[isOpen])

    console.log('defaultInputValue', defaultInputValue)
    useEffect(() => {
        if(defaultInputValue !== '') {
            if(Number.isInteger(Number(defaultInputValue))) {
                setValue(parseInt(defaultInputValue))
            }else {
                setValue(defaultInputValue)
            }
        }
    },[defaultInputValue])
    const onHandle = () => {
        if(value && Number(value) > 0) {
            if(activeIdx === 0) {//deposit
                onDeposit(Number(value) )
            }else {
                onWidhdraw(Number(value) )
            }
        }else {
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
            width={666}
            wrapClassName="cur-modal-box-deposit"
            classNames={{ mask: "cur-modal-mask", body: "cur-modal-body" }}
        >
            <div className='' >
                <div className='center w100'>
                    <span className='white fz28 fw600'>Deposit</span>
                </div>
                <div className=' fx-row ai-ct mt36 jc-sb'>
                    <AmountItem
                        img={Assets} 
                        title="Stake Amount"
                        value={ Math.floor(stakedBalance * 100) / 100 } 
                        w={26}
                        h={27.4}
                    />
                    <AmountItem
                        img={Earn} 
                        title="Earn LMC Points"
                        value={ Math.floor(pendingPoint * 100) / 100 } 
                        w={20.2}
                        h={27}
                    />
                </div>
                <div className='mt36 fx-row ai-ct jc-sb w100'>
                    <Tab active={activeIdx === 0} onClick={() => setActiveIdx(0) }>Deposit</Tab>
                    <Tab active={activeIdx === 1} onClick={() => setActiveIdx(1) }>Withdraw</Tab>
                </div>
                <ItemWrapper h="188px" w="100%" style={{ padding: '32px', marginTop: '36px'}}>
                    <div className='fx-col  w100'>
                        <span className='fz18 fw500 white ml14'>Amount</span>
                        <div style={{ position: 'relative', marginTop: '26px'}}>
                            <input className='deposit-input-number' type='number' value={value} onChange={e => setValue(e.target.value)}/>
                            <AmountButton onClick={() => onMax(activeIdx)}>Max</AmountButton>
                        </div>
                      
                    </div>
                </ItemWrapper>
                
                <ConfirmButton onClick={!isLoading ? () => onHandle() : () => null}>
                    {
                        isLoading ? 
                        <>
                            <span className="loading loading-spinner"></span>loading
                        </>
                        :
                        <>
                        { activeIdx === 0 ? 'Deposit' : 'Withdraw'} Now
                        </>
                    }   
                </ConfirmButton>
            </div>
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
const IconWrapper = styled.div`
    &:hover {
        cursor: pointer;
        box-shadow: 0px 0px 50px #473981;
        backdrop-filter: blur(100px);
    }
`






export const ContractBar = () => {
    const [isHover, setHover] = useState(-1)
    return (
        <Container>
            <ContractWrappr className=''>
                <div className='fx-row ai-ct jc-sb'>
                    {
                       [
                        { url: 'https://www.littlemami.io/', icon: Mars, active: MarsActive},
                        { url: 'https://twitter.com/Littlemamilabs', icon: X, active: XActive},
                        { url: 'https://discord.com/invite/xa4BpDJV4V', icon: DC, active: DCActive},
                        { url: 'https://t.me/XNM0620', icon: TG, active: TGActive},
                       ].map((item,idx) => (
                            <IconWrapper 
                                onMouseEnter={() => setHover(idx)}
                                onMouseLeave={() => setHover(-1)}
                                key={item}  onClick={() => window.open(item.url, '_black')}>
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
            </ContractWrappr>
        </Container>
    )
}


export const LeaderBoardModal = ({ open, handleClose}) => {
    
    const pageSize = 20;
    const [data, setData] = useState({});
    const [mount, setMount] = useState(true);
    const [more, seMore] = useState(true);
    const [page, setPage] = useState(1);
    
    const fetchData = async() => {
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
    },[page])

   
    return (
        <Modal
            centered
            open={open}
            onOk={handleClose}
            onCancel={handleClose}
            footer={null}
            width={800}
            wrapClassName="cur-modal-box-deposit"
            classNames={{ mask: "cur-modal-mask" }}
        >         
        
        <div className="new-list-box w100 mt48">
            <div className="fx-row ai-ct jc-sb w100">
                <p className='fz20 white fw500'>Rank</p>
                <p className='fz20 pink fw500'>Address</p>
                <p className='fz20 white fw500'>Points</p>
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
                dataLength={10} //This is important field to render the next data
                next={() => setPage((pre) => pre + 1)}
                hasMore={more}
                loader={
                <div className="loading-box">
                    <span></span>
                    <span></span>
                </div>
                }
                endMessage={<></>}
                style={{ display: "flex", flexDirection: "column" }}
                inverse={false}
                scrollableTarget="scrollableDiv"
            >
                {data?.marsRank?.map((item, index) => (
                    <div className="w100 fx-row ai-ct jc-sb mt36" key={item.address}>
                        <p className='fz18 white8 fw500  center' style={{ width: '50px' }}>{index + 1}</p>
                        <p className='fz18 pink fw500 center' style={{ width: '433px' }}>{item.address}</p>
                        <p className='fz18 white8 fw500 center'  style={{ width: '70px' }}>{item.score}</p>
                    </div>
                ))}
            </InfiniteScroll>

            {data?.marsRank?.length == 0 && (
                <p className="no-data">No data</p>
            )}
            </div>
        </div>
            
    </Modal>
    )
}
export const InviteModal = ({ list, open, handleClose}) => {
    const [more, seMore] = useState(true);

    const splitAddress = (addr) => {
        const start = addr.substring(0,6)
        const end = addr.substring(addr.length - 5,addr.length)
        return `${start}....${end}`
    }
    return (
        <Modal
            centered
            open={open}
            onOk={handleClose}
            onCancel={handleClose}
            footer={null}
            width={666}
            height={652}
            wrapClassName="cur-modal-box-deposit"
            classNames={{ mask: "cur-modal-mask" }}
        >         
        
        <div className="new-list-box w100 ">
            <div className='fz28 fw500 white w100 center'>
                Your Invitation
            </div>
           
            <div
                id="scrollableDiv"
                style={{           
                    marginTop: '36px',        
                    width: '532px',
                    height: '461px',
                    borderRadius: '20px',
                    background: 'rgba(39, 39, 73, 0.4)',
                    padding: '60px 58px'
                }}
            >
                 <div className="fx-row ai-ct jc-sb w100">
                    <p className='fz18 pink fw500 center' style={{ width: '130px' }}>Address</p>
                    <p className='fz18 white fw500 center' style={{ width: '70px' }}>Points</p>
                </div>
                <InfiniteScroll
                    dataLength={10} //This is important field to render the next data
                    next={() => setPage((pre) => pre + 1)}
                    hasMore={more}
                    endMessage={<></>}
                    style={{ display: "flex", flexDirection: "column" }}
                    inverse={false}
                    scrollableTarget="scrollableDiv"
                >
                    {list && !!list.length && list.map((item, index) => (
                        <div className="w100 fx-row ai-ct jc-sb mt36" key={item.address}>
                            <p className='fz16 pink fw500 center ' style={{ width: '130px' }}>{splitAddress(item.address)}</p>
                            <p className='fz16 white8 fw500 center'  style={{ width: '70px' }}>200</p>
                        </div>
                    ))}
                </InfiniteScroll>

                {list?.length == 0 && (
                    <p className="no-data">No data</p>
                )}
            </div>
        </div>
            
    </Modal>
    )
}




const MarsMintWrapper = styled.div`
  height: 711px;
  box-sizing: border-box;
  backdrop-filter: blur(50px);
  padding: 85px 102px;
  margin-top: 46px;
  border-radius: 40px;  
  background: rgba(38, 32, 70, 0.1);
  border: 1px solid rgb(57,43,106);

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
const MintButton = styled.div`
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
    margin-top: 55px
`

export const MarsMintCard = () => {
    const step = 1
    const max = 100
    const [mintValue,setMintValue] = useState(0)
    const onChange = (event) => {
        const value = event.target.value
        if(!isNaN(value)) {
            setMintValue(value)
        }
    }
    const onReduce = () => {
        const target = Number(mintValue) - step
        if(target > 0) {
            setMintValue(Number(mintValue) - step)
        }else {
            setMintValue(0)
        }
    }
    const onAdd = () => {
        const target = Number(mintValue) + step
        if(target < max) {
            setMintValue(Number(mintValue) + step)
        }else {
            setMintValue(max)
        }
    }
    return (
        <MarsMintWrapper>
            <div className='fx-row'>
                <Image
                    src={MarsMintBg}
                    width={417}
                    height={535}
                    alt="MarsMintBg"
                />
                <div className='fx-col ml66'>
                    <span className='fz58 white fw700 mt46'>MARS MINT</span>
                    <span className='fz24 lilac  mt26'>0/100</span>
                    <span className='fz24 lilac mt26'>0.12 Ξ</span>
                    <div className='fx-row ai-ct mt50'>
                        <ReduceButton className='center' onClick={onReduce}>
                            <span className='fz28 mt4'>-</span>
                        </ReduceButton>
                        <input className='mars_mint_input' value={mintValue || ''} onChange={onChange}/>
                        <AddButton className='center' onClick={onAdd}>
                            <span className='fz28 mt4'>+</span>
                        </AddButton>
                    </div>
                    <MintButton className='center'>
                        <span className='fz16 white'>MINT</span>
                    </MintButton>
                </div>
            </div>
        </MarsMintWrapper>
    )
}