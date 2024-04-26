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
const rightList = [
  { title: 'Daily Bonus', value: '+ 200 LMC Points',done: true},
  { title: 'Invite More Members', value: '+ 200 LMC Points',done: true},
  { title: 'Follow X Acconut', value: '+ 200 LMC Points'},
  { title: 'Join Telegram', value: '+ 200 LMC Points'},
  { title: 'LMC Deposit', value: 'Earn Points'},
  { title: 'NFT Stake', value: 'Earn Points'},
]

const NFTList = [
  { id: '1', url: NFT1, name: 'Auction Price', value: '4680,000 LMC', price: '＄20,640'},
  { id: '2', url: NFT2, name: 'Auction Price', value: '460,000 LMC', price: '＄19,780'},
  { id: '3', url: NFT3, name: 'Auction Price', value: '460,000 LMC', price: '＄19,780'},
]
const Launchpad = () => {
  const [nextPage, setNextPage] = useState(false)
  const [activeNFTIdx, setActiveNFTIdx] = useState(-1)
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
              <span className="color1 fw400 fz22" >YOUR POINTS</span>
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
        <DepositMdoal/>
      </Container>
      }
      <ContractBar/>
    </div>
  );
};

export default Launchpad;
