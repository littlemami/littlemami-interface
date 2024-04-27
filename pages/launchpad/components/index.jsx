import { styled } from 'styled-components'
import { Modal, InputNumber } from "antd";
import Image from "next/image"
import Assets from '@/public/images/assets.png'
import Earn from '@/public/images/earn.png'
import ETHIcon from '@/public/images/eth.png'
import Airdrop from '@/public/images/airdrop.png'
import Link1 from '@/public/images/link1.png'
import React, { FC, useEffect, useState}  from 'react'
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { Notify } from "notiflix/build/notiflix-notify-aio";

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

const amountList = [1000,3000,5000,10000,50000,'Max']

export const DepositMdoal = ({ isOpen, handleClose, onDeposit, onWidhdraw}) => {
    const [activeIdx, setActiveIdx] = useState(0)
    const [value, setValue] = useState('')

    useEffect(() => {
        setValue('')
    },[activeIdx])
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
            onCancel={handleClose}
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
                        value={200} 
                        w={26}
                        h={27.4}
                    />
                    <AmountItem
                        img={Earn} 
                        title="Earn LMC Points"
                        value={400} 
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
                            <AmountButton>Max</AmountButton>
                        </div>
                      
                    </div>
                </ItemWrapper>
                <ConfirmButton onClick={onHandle}>
                    { activeIdx === 0 ? 'Deposit' : 'Withdraw'} Now
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
        box-shadow: 0px 4px 52px #473981;
        backdrop-filter: blur(100px);
    }
`

export const ContractBar = () => {
    return (
        <Container>
            <ContractWrappr className=''>
                <div className='fx-row ai-ct jc-sb'>
                    {
                        [1,2,3,4].map(item => (
                            <IconWrapper  key={item}  onClick={() => window.open('https://www.bilibili.com', '_black')}>
                                <Image
                                    src={Link1}
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
const AirdropWrapper = styled.div`
    width: 496px;
    height: 439px;
    opacity: 0.8;
    border-radius: 30px;
    box-sizing: border-box;
    background: linear-gradient(198.28deg, rgba(126, 115, 169, 0.1) 17.6%, rgba(81, 72, 107, 0.1) 93.61%);
    box-shadow: 0px 4px 13.8px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(50px);
    margin-top: 40px;
    padding: 49px 44px  42px 44px;
`
const InProcess = styled.div`   
    width: 120px;
    height: 36px;
    border-radius: 20px;
    border: 0.5px solid rgba(230, 223, 255, 0.3);
    box-sizing: border-box;
    background: rgba(30, 23, 65, 0.6);
    backdrop-filter: blur(5px); 
    position: absolute;
    top: 10px;
    right: 10px;
`
const BgWrapper = styled.div`
    position: relative
`


export const L1 = () => {
    return (
        <Container>
            <div style={{ marginTop: '108px'}} className='fx-col'>
                <div  className='fx-row ai-ct'>
                    <Image
                        src={ETHIcon}
                        width={8.28}
                        height={13}
                        alt={`eth`}
                    />
                    <span className='white fz42 fw600 ml10'>Launching Feature</span>
                </div>
                <p className='fz24 fw500 white9 ml18 mt38'>ACTIVE & UPCOMING</p>
                <AirdropWrapper className='fx-col ai-ct click'>
                    <BgWrapper>
                        <Image
                            src={Airdrop}
                            width={409}
                            height={229}
                            alt={`eth`}
                        />
                        <InProcess className='center'>
                            <span className='fz14 fw500 white'>IN PROCESS</span>
                        </InProcess>
                    </BgWrapper>
                    <div className='w100 ai-start mt36'>
                        <span className=' white fz24 fw500'>MARs Airdrop</span>
                        <div className='fx-row ai-ct jc-sb mt36'>
                            <span className=' white fz16 fw500'>Start Time</span>
                            <span className=' white fz16 fw500'>01/01/2024 12pm UTC</span>
                        </div>
                    </div>
                </AirdropWrapper>
            </div>
        </Container>
    )
}