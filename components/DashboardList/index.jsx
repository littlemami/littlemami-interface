import {styled} from 'styled-components'
import Image from "next/image";

const ListWrapper = styled.div`
  width: 1200px;
  height: 288px;
  padding-left: 44px;
  padding-top: 40px;
  border-top: 1.5px solid;
  border-image-source: linear-gradient(90deg, rgba(184, 68, 255, 0) 0%, rgba(182, 128, 250, 0.15) 52%, rgba(184, 68, 255, 0) 100%);
  border-image-slice: 1;
  border-image-outset: 0.8px;

  &:hover {
    border-top: 4px solid;
    border-image-source: linear-gradient(90deg, rgba(246, 98, 249, 1) 9.5%, rgba(65, 19, 112, 0) 100%);
    border-image-outset: 2px;
    & span {
      background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(222, 20, 255, 0) 100%), linear-gradient(166.65deg, rgba(246, 98, 250, 1) 18.52%, rgba(193, 164, 255, 1) 86.15%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    img {
      display: inline-block;
    }

    .text {
      display: inline-block;
    }
  }
`
const List = [
    {
        img: '/images/svg/myStake.svg',
        num: '01',
        name: 'MarsNode',
        text: 'With a total supply of 30,000, MarsNode leverages the LMC economic model and user sociagraphs to foster Web3 interactions, enhancing point-to-multipoint engagement and drivingprofitability.'
    },
    {
        img: '/images/svg/myStake.svg',
        num: '02',
        name: 'Stake',
        text: "Boost your profits with LittleMami’s easy and innovative staking, offering rewards and secure governance."
    },
    {
        img: '/images/svg/myStake.svg',
        num: '03',
        name: 'LaunchPad',
        text: "Open doors to diverse earnings for users by supporting emerging projects with our extensive LaunchPad network."
    },
    {
        img: '/images/svg/myStake.svg',
        num: '04',
        name: 'Loan',
        text: "By holding LittleMami assets and compatible tokens, users can engage in hassle-free loan services using NFTs as collateral without the need to sell, optimizing asset utilization."
    },
]
const DashboardList = (props) => {
    return (
        <div className="fx-col center w100" style={{marginTop: '360px'}}>
            {List?.map((item, index) => {
                return (
                    <ListWrapper className="fx-row ai-start">
                        <span className='fz20 fw500'>/{item.num}</span>
                        <div className="fx-row ai-ct">
                            <div>
                                <div className='fz116' style={{marginTop: '-20px'}}>{item.name}</div>
                                <div className='fz16 hidden text' style={{width: "820px"}}>
                                    {item.text}
                                </div>
                            </div>
                            <Image
                                className='hidden'
                                src={item.img}
                                width="100"
                                height="100"
                            />
                        </div>
                    </ListWrapper>
                );
            })}
        </div>
    );
};

export default DashboardList;
