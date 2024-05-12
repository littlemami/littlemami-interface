import {useEffect, useState, useRef} from "react";
import {styled} from 'styled-components'
import Image from "next/image";
import {ContractBar,} from '@/components/LaunchpadLayout'
import * as echarts from 'echarts'
import MarsActive from '@/public/images/marsActive.png'
import LMC from '@/public/images/LMC.png'
import arrowPink from '@/public/images/arrow_pink.png'
import { DashboardMobile } from './DashboardMobile'

const Wrapper = styled.div`
  max-width: 1056px;
  margin-top: 182px;
`
const Page1Wrapper = styled.div`
`
const LinkWrapper = styled.div`
  cursor: pointer;
  position: relative;
  padding-left: 14px;
  color: white;
  &:before {
    content: "";
    position: absolute;
    top: -10px;
    left: 0;
    width: 8px;
    height: 50px;
    background-color: #C55FDB;
    opacity: 0;
  }

  &:hover > span,&:hover > img {
    animation: colorChange 1s linear, moveAnimation 1.5s linear !important; 
 }
  &:hover::before {
    animation: linkVfx 1.5s linear !important;
  }
`

const Page2Wrapper = styled.div`
  height: 288px;
  padding-left: 24px;
  padding-top: 43px;
  border-top: 1.5px solid;
  border-image-source: linear-gradient(90deg, rgba(184, 68, 255, 0) 0%, rgba(182, 128, 250, 0.15) 52%, rgba(184, 68, 255, 0) 100%);
  border-image-slice: 1;
  border-image-outset: 0.8px;
  position: relative;
  .box1{
    margin-left: 14%;
    transition:  margin-left 1s ;
  }
  img{
    position: absolute;
    right: 10px;
    opacity: 0;
    top:88px
  }
   &:hover {
     border-top: 4px solid;
     padding-top: 30px;
     border-image-source: linear-gradient(90deg, rgba(246, 98, 249, 1) 9.5%, rgba(65, 19, 112, 0) 100%);
     border-image-outset: 2px;
     & span {
       background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(222, 20, 255, 0) 100%), linear-gradient(166.65deg, rgba(246, 98, 250, 1) 18.52%, rgba(193, 164, 255, 1) 86.15%);
       -webkit-background-clip: text;
       -webkit-text-fill-color: transparent;
     }
     img {
       animation: imgChange 0.8s linear !important;
       opacity: 1;
     }
     .text {
       display: inline-block;
     }
     & .box1{
       margin-left: 0px
     }
  
   }
`
const Circle = styled.div`
  width: 20px;
  height: 20px;
  background: ${(props) => props.bg};
  margin-right: 20px;
  border-radius: 50%;
`
const Sector = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transform: rotate(60deg);
    // background: ${(props) => props.bg};
  // background: transparent;
  box-sizing: border-box;
  border: 30px solid ${(props) => props.bg};
  clip-path: ${(props) => props.value};
  // box-shadow: 2px 4px 18px rgba(101, 154, 255, 0.5);
`
const Page3Box = styled.div`
  // width: 432px;
  border-radius: 15px;
  border: 2px solid rgba(147, 109, 255, 1);
  box-sizing: border-box;
  box-shadow: 0 4px 13.8px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);
  padding: 12px 24px;
  margin-left: 64px;

`


const PieOption = {
    color: ['rgb(110, 58, 255)', 'rgb(101, 154, 255)', 'rgb(246, 98, 249)'],
    grid: {
        left: 50,
        right: 50,
        top: 30,
        bottom: 50,
        containLabel: true
    },
    series: [
        {
            type: 'pie',
            radius: ['100%', '50%'],
            avoidLabelOverlap: false,
            data: [
                {value: 75, name: '75%'},
                {value: 20, name: '20%'},
                {value: 5, name: '5%'}
            ]
        }
    ]
}
const page2List = [
    {
        img: '/images/item1.png',
        num: '01',
        name: 'MarsNode',
        text: 'With a total supply of 30,000, MarsNode leverages the LMC economic model and user sociagraphs to foster Web3 interactions, enhancing point-to-multipoint engagement and drivingprofitability.'
    },
    {
        img: '/images/item2.png',
        num: '02',
        name: 'Stake',
        text: "Boost your profits with LittleMami’s easy and innovative staking, offering rewards and secure governance."
    },
    {
        img: '/images/item3.png',
        num: '03',
        name: 'LaunchPad',
        text: "Open doors to diverse earnings for users by supporting emerging projects with our extensive LaunchPad network."
    },
    {
        img: '/images/item4.png',
        num: '04',
        name: 'Loan',
        text: "By holding LittleMami assets and compatible tokens, users can engage in hassle-free loan services using NFTs as collateral without the need to sell, optimizing asset utilization."
    },
]
const Page2 = (props) => {
    return (
        <Wrapper className="" style={{marginTop: '310px',}}>
            {page2List.map((item, index) => {
                return (
                    <Page2Wrapper key={item.name} className="">
                        <div className="fx jc-start box1">
                            <span className='fz20 fw500'>/{item.num}</span>
                            <div className=""  style={{marginRight: '46px'}}>
                                    <div className='fz116' style={{marginTop: '-20px'}}>{item.name}</div>
                                    <div className='fz16 hidden text' style={{width: "820px"}}>
                                        {item.text}
                                    </div>
                            </div>
                        </div>
                        <Image
                            alt={item.name}
                            src={item.img}
                            width={190}
                            height={190}
                        />
                    </Page2Wrapper>
                );
            })}
        </Wrapper>
    );
}
const Page1 = () => {
    return (
        <Page1Wrapper className="">
            <p className="fz88 white fw900">Unlocking Your</p>
            <p className="fz88 color1 fw900 ml52">Profit Potential</p>
            <p className="fz88 white fw900" style={{marginLeft: '300px'}}>with LMC</p>
            <div className="fx-row ai-ct jc-sb " style={{marginTop: '82px'}}>
                <div/>
                <div className="fx-col" style={{maxWidth: '506px'}}>
                    <span className="fz18 white3">A DEX launchpad that establishes a diverse web3 protocol tailored to user scenarios by integrating DeFi and lending functionalities.</span>
                    <LinkWrapper className="fx-row ai-ct jc-sb mt24">
                        <span className="fz20">Connect Us</span>
                        <Image src={arrowPink} alt="arrowPink" height={18} width={18}/>
                    </LinkWrapper>
                </div>
            </div>
        </Page1Wrapper>
    )
}

const Page3 = () => {
    const chartRef = useRef(null)
    useEffect(() => {
        if (chartRef.current) {
            const echartsInstance = echarts.init(chartRef.current)
            if (echartsInstance) {
                echartsInstance.setOption(PieOption)
            }
        }
    }, [])

    return (
        <div style={{marginTop: '200px', maWidth: '1173px'}} className="w100 fx-col center ">
            <p className="fz68 fw500 white">Economic Model</p>
            <p className="fz24 fw500 white3">LittleMami Coin(LMC)</p>
            <div className="fx-row ai-ct jc-sb w100" style={{marginTop: '84px'}}>
                {
                    [
                        {title: 'Total supply :', value: '1,000,000,000 LMC'},
                        {title: 'Block reward :', value: '69.5 LMC'},
                        {title: 'Daily production :', value: '500,400 LMC'}
                    ].map(item => (
                        <div className="fx-row ai-ct" key={item.title}>
                            <span className="blue fz20">{item.title}</span>
                            <span className="white fz20 ml20">{item.value}</span>
                        </div>
                    ))
                }
            </div>
            <div style={{marginTop: '85px'}} className="fx-row">
                <div className="fx-col " style={{height: '414px', width: '314px'}}>
                    <div style={{position: 'relative'}}>
                        <div ref={chartRef}
                             style={{height: '314px', width: '314px', position: 'absolute', left: 0, top: 0}}
                             className=" center"/>
                        <div className="center fx-col " style={{position: 'absolute', left: '136px', top: '105px'}}>
                            <Image src={LMC} height={47} width={43} alt="logo"/>
                            <p className="green fz20 fw500 mt2">LMC</p>
                            <p className="green fz20 fw500 mt2">100%</p>
                        </div>
                    </div>

                    <div className="center w100 " style={{position: 'relative', marginTop: '354px'}}>
                        <p className=" green fz18">100% = 1,000,000,000 LMC</p>
                    </div>
                </div>
                <div className="fx-col ml34 ">
                    <div className="fx-row">

                        <Sector bg="rgba(246, 98, 249, 1)" value="polygon(0% 0%, 15% 0%,50% 50%, 0% 15%)"/>

                        <Circle bg="rgba(246, 98, 249, 1)"/>
                        <div className="fx-col">
                            <p className="fz20 purple">Foundation</p>
                            <p className="fz20 purple mt10">5%=50,000,000 LMC</p>
                            <div className="mt8">
                                {
                                    ['- 20% for rewarding ecosystem developers.', '- 30% for business cooperation expansion.', '- 50% for community ecosystem governance.'].map(item =>
                                        <p className="mt4 white fz16" key={item}>{item}</p>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="fx-row mt50">
                        <div className="fx-col">
                            <div className="fx-row">
                                <Sector bg="rgb(101, 154, 255)" value="polygon(0% 0%, 40% 0%,50% 50%, 0% 40%)"/>
                                <Circle bg="rgb(101, 154, 255)"/>
                                <div className="fx-col ">
                                    {['Financing reservation', '20%=200,000,000 LMC.'].map(item => <p
                                        className="mt4 blue fz16" key={item}>{item}</p>)}
                                </div>
                            </div>
                            <div className="fx-row " style={{marginTop: '60px'}}>
                                <Sector bg="rgb(110, 58, 255)" value="polygon(0% 0%, 150% 0%,50% 50%, 0% 150%)"/>
                                <Circle bg="rgb(110, 58, 255)"/>
                                <div className="fx-col">
                                    {['Mining', '75%=750,000,000 LMC.'].map(item => <p className="mt4 blueviolet fz16"
                                                                                       key={item}>{item}</p>)}
                                </div>
                            </div>
                        </div>
                        <Page3Box>
                            {['MARS＆MARS LP stake 250,000,000 LMC', 'Node stake 100,000,000 LMC', 'SSR LP stake 100,000,000 LMC', 'LSP LP ＆ Outer Space LP stake 150,000,000 LMC', 'Game＆Metaverse 150,000,000 LMC'].map(item =>
                                <p className="mt12 white fz16" key={item}>{item}</p>)}
                        </Page3Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Dashboard = (props) => {

    return (
        <div>
            <div className="w100">
                <div className="center w100">
                    <Wrapper className=" w100">
                        <Page1/>
                    </Wrapper>
                </div>
                <Page2/>
                <Page3/>
                <div style={{marginTop: '140px'}}>
                    <ContractBar/>
                </div>
            </div>
            {/* <DashboardMobile/> */}
        </div>

    );
};

export default Dashboard;
