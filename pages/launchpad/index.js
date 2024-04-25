import React, { useEffect, useState} from 'react'
import { DepositMdoal, } from './components'
import { Col, Row } from 'antd'
import { styled } from 'styled-components'
import checkIcon from '@/public/images/check_icon.png'
import NFT from '@/public/images/nft.png'
import Image from "next/image"

const LinearBg = styled.div`
  background: linear-gradient(to right,#0F0E25, #8668FF, #0F0E25);
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
  height: 490px;
  border-radius: 30px;
  box-sizing: border-box;
  border-radius: 30px;
  padding: 64px;
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

const rightList = [
  { title: 'Invite More Members', value: '+ 200 LMC Points',done: true},
  { title: 'Follow X Acconut', value: '+ 200 LMC Points'},
  { title: 'Join Telegram Group', value: '+ 200 LMC Points'},
  { title: 'Deposit', value: 'Earn Points'},
]
const Launchpad = () => {
  return (
    <div>
      <Row className="w100 fx-row jc-sb ai-ct"  gutter={{ xs: 0, sm: 0, md: 0, lg: 1, xl: 1, xxl: 1}} style={{marginTop: '126px'}}> 
        <Col xs={24} sm={24} md={24} lg={9} xl={9} xxl={9} className="">
          <LeftCard className="fx-col ai-ct " style={{}}>
            <span className="color1 fw400 fz22">YOUR POINTS</span>
            <span className="white fw400 fz64 ">200</span>
            <LinearBg />
            <span className="color1 fw400 fz22">Rank</span>
            <span className="white fw400 fz42 mt10">#1000+</span>
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
                  {
                    item.done ?
                    <DoneButton>
                      <Image
                        src={checkIcon}
                        width={15}
                        height={10}
                        alt="checkIcon"
                      />
                    </DoneButton> :
                    <GoButton>Go</GoButton>
                  }
                </div>
              </RightItem>
            ))
          }
        </Col>
      </Row>
      <Row className='mt50 fx-row ai-ct jc-sb '>
        {
          [1,2,3,4].map(item => (
            <Col 
              className=' center mb26'
              key={item} 
              gutter={{ xs: 0, sm: 0, md: 0, lg: 1, xl: '36px', xxl: '36px'}}
              xs={24} sm={12} md={12} lg={5} xl={6} xxl={6}>
              <Image
                src={NFT}
                width={262}
                height={262}
                alt="NFT"
              />
            </Col>
           
          ))
        }
      </Row>
      <DepositMdoal/>
    </div>
  );
};

export default Launchpad;
