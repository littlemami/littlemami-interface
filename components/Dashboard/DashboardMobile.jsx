'use client'

import {useEffect, useState, useRef} from "react";
import {styled} from 'styled-components'
import Image from "next/image";
import { Carousel } from 'antd';
import Linear1 from '@/public/images/linear1.png'
import arrowPink from '@/public/images/arrow_pink.png'
import item1 from '@/public/images/item1.png'
import item1Linear from '@/public/images/item1_linear.png'
import sortBg from '@/public/images/sort_bg.png'
import item2 from '@/public/images/item2.png'
import item3 from '@/public/images/item3.png'
import item4 from '@/public/images/item4.png'
import * as echarts from 'echarts'
import LMC from '@/public/images/LMC.png'


const PieOption = {
    color: ['rgb(110, 58, 255)', 'rgb(101, 154, 255)', 'rgb(246, 98, 249)'],

    series: [
        {
            type: 'pie',
            selectedMode: 'single',
            label: {
                position: 'inner',
                textStyle: {
                    color: "#fff",
                    align: "right",
                    fontSize: 8,
                },
            },

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




const Page1Wrapper = styled.div`
    background: red;//linear-gradient(180deg, rgba(96, 32, 178, 0.45) 0.31%, rgba(13, 13, 31, 0) 30.79%);
    filter: blur(150px);
`


const Page1Center = styled.div`
    width: 220px;
    height: 220px;
    background: red;//linear-gradient(180deg, rgba(96, 32, 178, 0.45) 0.31%, rgba(13, 13, 31, 0) 30.79%);
    filter: blur(150px);
` 
const Line1 = styled.div`  
    width: 84.4px;
    height: 2px;
    border-width: 2px;
    border-style: solid;
    border-image-source: linear-gradient(270deg, rgba(246, 98, 249, 0.65) 0%, rgba(65, 19, 112, 0.36) 100%);
    border-image-slice: 1;
    border-image-outset: 1px;
    filter: blur(10px);
    margin-top: 8px;
`
const Hemisphere = styled.div`
    height: 174px;  
    opacity: 0.65;
    background: linear-gradient(180deg, rgba(96, 32, 178, 0.45) 0.31%, rgba(13, 13, 31, 0) 30.79%);
    border-radius: 50%;
`
const Line2 = styled.div`
    width: 100%;
    height: 1px;
    border-width: 1px;
    border-style: solid;
    border-image-source: linear-gradient(90deg, rgba(184, 68, 255, 0) 0%, rgba(182, 128, 250, 0.15) 52%, rgba(184, 68, 255, 0) 100%);
    border-image-slice: 1;
    border-image-outset: 0.5px;
`
const NumberBg = styled.div`
    width: 93.4px;
    height: 58px;
    background:red;// linear-gradient(180deg, rgba(15, 14, 35, 0.03) 27.53%, rgba(255, 47, 196, 0.08) 67.35%, rgba(202, 92, 241, 0.08) 123.8%, rgba(202, 92, 241, 0) 169.1%);
    filter: blur(20px);
`
const NumberText = styled.div`
    width: 20px;
    height: 30px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(222, 20, 255, 0) 100%), linear-gradient(166.65deg, rgba(246, 98, 250, 1) 18.52%, rgba(193, 164, 255, 1) 86.15%);
    text-align: justify;
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(222, 20, 255, 0) 100%), linear-gradient(166.65deg, rgba(246, 98, 250, 1) 18.52%, rgba(193, 164, 255, 1) 86.15%);
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent;
    font-family: Poppins;
    font-weight: 500;
    font-size: 12px;
    line-height: 30px;
    margin-top: -12px;
`

const page2List = [
    { sort: '/01', title: 'MarsNode', 'desc': 'With a total supply of 30,000, MarsNode leverages the LMC economic model and user social graphs to foster Web3 interactions, enhancing point-to-multipoint engagement and driving profitability.', },
    { sort: '/02', title: 'Stake', 'desc': 'Boost your profits with LittleMami’s easy and innovative staking, offering rewards and secure governance.' , },
    { sort: '/03', title: 'LaunchPad', 'desc': 'Open doors to diverse earnings for users by supporting emerging projects with our extensive LaunchPad network.' , },
    { sort: '/04', title: 'Loan', 'desc': 'By holding LittleMami assets and compatible tokens, users can engage in hassle-free loan services using NFTs as collateral without the need to sell, optimizing asset utilization.' , },
]

const Page3SubTitle = styled.div`
    // filter: blur(10px);
    width: 162px;
    height: 23px;
    opacity: 0.65;
    background: linear-gradient(180deg, rgba(88, 32, 178, 0.75) 0.31%, rgba(13, 13, 31, 0) 128.26%);
`
const Page3Card = styled.div`
    width: 100%;
    height: fit-content;
    display: inline-flex;
    flex-direction: column;
    place-content: center;
    place-items: center;
    gap: 10px;
    flex-shrink: 0;
    padding: 25px 0px;
    border-radius: 20px;
    border: 0.5px solid rgb(71,34,93);
    box-sizing: border-box;
    margin-top: 28px;

  
`
const page3List = [
    { t1: 'Total supply :', t2: '1,000,000,000 LMC'},
    { t1: 'Block reward :', t2: '69.5 LMC'},
    { t1: 'Daily production :', t2: '500,400 LMC'},
]

const Circle = styled.div`
  width: 6px;
  height: 6px;
  background: ${(props) => props.bg};
  margin-right: 8px;
  border-radius: 50%;
`
const Sector = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transform: rotate(60deg);
  box-sizing: border-box;
  border: 15px solid ${(props) => props.bg};
  clip-path: ${(props) => props.value};

`

export const DashboardMobile = () => {
    const [h, setH ] = useState(0)
    const [w, setW ] = useState(0)
    const [dotIdx, setDotIdx] = useState(1)
    useEffect(() => {
        const height = window.innerHeight - 66
        const width = window.innerWidth
        setH(height)
        setW(width)

    },[])



    const onChange = (currentSlide) => {
        setDotIdx(currentSlide+1)
    };

    const Page1 = () => {
        return (
            <div className="w100 center hide_scrollbar"  style={{ height:h-174, overflowY: 'scroll' }}>
                {/* <Page1Center/> */}
                <div className="fx-col ai-end" >  
                    <p className="white fz38 fw500">Unlocking Your</p>
                    <p className="purple fz38 fw500 mt8">Profit Potential</p>
                    <p className="white fz38 fw500 mt8">With LMC</p>
                    <Line1/>
                    <Image src={Linear1} height={2} width={84} alt="Linear1" style={{ marginTop: '-5px'}}/>
                    <p className="white fz12 mt34" style={{ maxWidth: '324px',opacity: 0.8, textAlign: 'center' }}>A DEX launchpad that establishes a diverse web3 protocol tailored to user scenarios by integrating DeFi and lending functionalities.</p>
                    <div className="fx-row ai-ct mt42">
                        <p className="fz14 white mr24">Connect Us</p>
                        <Image src={arrowPink} alt="arrowPink" height={12} width={12} className="mr20"/>
                    </div>
                   
                   
                   
                </div>
            </div>
        )
    }
    const Page2 = () => {
        return (
            <div className="pl14 pr14 pb40 hide_scrollbar" style={{height:h , overflowY: 'scroll' }}>
                {
                    page2List.map((item,idx) => (
                        <div className="fx-col pt10 pb20"  key={item.title} style={{ }}>
                            <Line2/>
                            <Image src={sortBg} height={58} width={93} alt="bg" style={{marginLeft: '-10px'}}/>
                            <div className="fx-row ai-ct" style={{ marginTop: '-58px'}}> 
                                <NumberText >{item.sort}</NumberText>
                                <span className="white fz48 ml14">{item.title}</span>
                            </div>
                            <div className="fx-row ml34">
                                <p className=" fz10 fw500 mt10" style={{  color: 'rgb(219, 219, 211)', maxWidth: '212px' }}>{item.desc}</p>
                                {
                                    idx === 0 && 
                                    <div className="fx-col  ai-ct">
                                        <Image src={item1} height={73.6} width={77.43} alt={item.title} />
                                        <Image src={item1Linear} height="36px" width="129px" alt={item.title} />
                                    </div>
                                }
                                {
                                    idx === 1 && 
                                    <div className=" ml24">
                                        <Image src={item2} height={79.8} width={99} alt={item.title} />
                                    </div>
                                }
                                {
                                    idx === 2 && 
                                    <div className=" ml24" style={{ marginTop: '-54px'}}>
                                        <Image src={item3} height={129.79} width={89.2} alt={item.title} />
                                    </div>
                                }
                                {
                                    idx === 3 && 
                                    <div className="" >
                                        <Image src={item4} height={79.8} width={99} alt={item.title} />
                                    </div>
                                }
                                
                            </div>
                        </div>
                    ))
                }
            </div>
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
            <div className="fx-col ai-ct pl20 pr20 hide_scrollbar" style={{height:h , overflowY: 'scroll' }}>
                <p className="white fz28 fw500 mt42">Economic Model</p>
                <Page3SubTitle className="center">
                    <p className="white fz14 mt2">LittleMami Coin(LMC)</p>
                </Page3SubTitle>
                <Page3Card>
                    {
                        page3List.map(item => (
                            <div style={{ textAlign:'center'}} key={item.t1}>
                                <span className="fz12 blue">{item.t1}</span>
                                <span className="fz12 white ml10">{item.t2}</span>
                            </div>
                        ))
                    }
                    
                </Page3Card>
                <Page3Card>
                    <div  className="fx-row">
                        <div className="fx-col pt24" >
                            <div style={{}}>
                                <div ref={chartRef}
                                    style={{height: '106px', width: '106px', }}
                                    className=" center"/>
                                <div className="center fx-col " style={{ marginTop: '-74px'}}>
                                    <Image src={LMC} height={17} width={17} alt="LMC"/>
                                    <p className="green fz8 fw500 mt2">LMC</p>
                                    <p className="green fz8 fw500 mt2">100%</p>
                                </div>
                            </div>

                            <div className="center w100 " style={{ marginTop: '40px'}}>
                                <p className="green fz8">100% = 1,000,000,000 LMC</p>
                            </div>
                        </div>

                        <div className="fx-col ml12" >
                            <div className="fx-row">
                                <Sector bg="rgba(246, 98, 249, 1)" value="polygon(0% 0%, 15% 0%,50% 50%, 0% 15%)"/>
                                <Circle bg="rgba(246, 98, 249, 1)"/>
                                <div className="fx-col">
                                    <p className="fz10 purple">Foundation</p>
                                    <p className="fz10 purple mt2">5%=50,000,000 LMC</p>
                                    <div className="mt6">
                                        {
                                            ['- 20% for rewarding ecosystem developers.', '- 30% for business cooperation expansion.', '- 50% for community ecosystem governance.'].map(item =>
                                                <p className="mt4 white fz8" key={item}>{item}</p>)
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="fx-row mt18">
                                <Sector bg="rgb(101, 154, 255)" value="polygon(0% 0%, 40% 0%,50% 50%, 0% 40%)"/>
                                <Circle bg="rgb(101, 154, 255)"/>
                                <div className="fx-col ">
                                    {['Financing reservation', '20%=200,000,000 LMC.'].map(item => <p
                                        className="blue fz10" key={item}>{item}</p>)}
                                </div>
                            </div>

                            <div className="fx-row mt18" >
                                <Sector bg="rgb(110, 58, 255)" value="polygon(0% 0%, 150% 0%,50% 50%, 0% 150%)"/>
                                <Circle bg="rgb(110, 58, 255)"/>
                                <div className="fx-col">
                                    {['Mining', '75%=750,000,000 LMC.'].map(item => <p className=" blueviolet fz10"
                                                                                    key={item}>{item}</p>)}
                                </div>
                            </div>

                                                        
                        </div>
                    </div>
                </Page3Card>
                <Page3Card  style={{ alignItems:'flex-start', paddingLeft: '31px' }}>
                    {
                        [
                            'MARS＆MARS LP stake 250,000,000 LMC',
                            'Node stake 100,000,000 LMC',
                            'SSR LP stake 100,000,000 LMC',
                            'LSP LP ＆ Outer Space LP stake 150,000,000 LMC',
                            'Game＆Metaverse 150,000,000 LMC',
                        ].map(item => (
                            <p className="fz12 white" key={item}>{item}</p>
                        ))
                    }
                </Page3Card>
            </div>
        )
    }
    return (
        <div>
            <Carousel dots={false} afterChange={onChange} className=" w100" style={{ height: '100%' }}>
                <div>
                    <Page1/>
                    <Hemisphere style={{ width: w,}}/>
                </div>
                <Page2/>
                <Page3/>      
                
            </Carousel>
            <div className="center w100" style={{ position: 'absolute',left: 0, bottom: '48px' }}>
                <div className="fx-row ai-ct jc-sb" style={{ width: '50px' }}>
                    {
                        [1,2,3].map(item => (
                            <div key={item} style={{ height: '8px', width: '8px', borderRadius: '50%', background: item === dotIdx ? 'rgb(244,95,234)' : 'rgb(72,57,85)'}}/>

                        ))
                    }
                </div>       
            </div>  
        </div>
    )
}