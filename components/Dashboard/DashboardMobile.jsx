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
const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


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
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
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
    padding: 25px 78px;
    border-radius: 20px;
    border-width: 0.5px;
    border-style: solid;
    border-image-source: linear-gradient(180deg, rgba(211, 109, 247, 0.4) 0%, rgba(156, 69, 225, 0.4) 100%);
    border-image-slice: 1;
    box-sizing: border-box;
  
`
const page3List = [
    { t1: '', t2: ''},
    { t1: '', t2: ''},
    { t1: '', t2: ''},
]
export const DashboardMobile = () => {
    const [h, setH ] = useState(0)
    const [w, setW ] = useState(0)
    useEffect(() => {
        const height = window.innerHeight - 63
        const width = window.innerWidth
        setH(height)
        setW(width)

    },[])
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    const Page1 = () => {
        return (
            <div className="w100 center"  style={{ height:h }}>
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
                    <Hemisphere />
                </div>
            </div>
        )
    }
    const Page2 = () => {
        return (
            <div className="mt46 pl14 pr14" style={{ marginBottom: '98px'}}>
                
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
        return (
            <div className="fx-col ai-ct">
                <p className="white fz28 fw500 mt42">Economic Model</p>
                <Page3SubTitle className="center">
                    <p className="white fz14 mt2">LittleMami Coin(LMC)</p>
                </Page3SubTitle>
                <Page3Card>
                    <div></div>
                </Page3Card>
            </div>
        )
    }
    return (
        <Carousel afterChange={onChange} className=" w100" style={{ height: '100%' }}>
            {/* <Page1/> */}
            <Page2/>
            <Page3/>
                
          
        
        </Carousel>
    )
}