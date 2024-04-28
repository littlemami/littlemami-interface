import { styled } from 'styled-components'
import { Modal, InputNumber } from "antd";
import Image from "next/image"
import Assets from '@/public/images/assets.png'
import Earn from '@/public/images/earn.png'
import Mars from '@/public/images/mars.png'
import MarsActive from '@/public/images/marsActive.png'
import X from '@/public/images/x.png'
import XActive from '@/public/images/xActive.png'
import DC from '@/public/images/dc.png'
import DCActive from '@/public/images/dcActive.png'
import TG from '@/public/images/tg.png'
import TGActive from '@/public/images/tgActive.png'

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

export const DepositMdoal = ({ isOpen, handleClose, onDeposit, onWidhdraw, isLoading, onMax, defaultInputValue, stakedBalance}) => {
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

    useEffect(() => {
        if(defaultInputValue !== '') {
            setValue(defaultInputValue)
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
                        value={stakedBalance} 
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



