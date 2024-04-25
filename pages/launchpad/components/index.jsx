import { styled } from 'styled-components'
import { Modal, InputNumber } from "antd";
import Image from "next/image"
import Assets from '@/public/images/assets.png'
import Earn from '@/public/images/earn.png'
import React, { useEffect, useState}  from 'react';

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

export const DepositMdoal = () => {
    const [activeIdx, setActiveIdx] = useState(0)

    const onChange = () => {}

    return (
        <Modal
            open={false}
            // onOk={handleClose}
            // onCancel={handleClose}
            footer={null}
            width={666}
            wrapClassName="cur-modal-box-deposit"
            classNames={{ mask: "cur-modal-mask", body: "cur-modal-body" }}
        >
            <div className=''>
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
                        value={200} 
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
                            <input className='deposit-input-number' type='number'/>
                            <AmountButton>Max</AmountButton>
                        </div>
                      
                    </div>
                </ItemWrapper>
                <ConfirmButton>
                    { activeIdx === 0 ? 'Deposit' : 'Withdraw'} Now
                </ConfirmButton>
            </div>
    
        </Modal>
    )
}

