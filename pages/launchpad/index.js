import {  ContractBar, Container,  } from '@/components/LaunchpadLayout'
import { styled } from 'styled-components'
import Image from "next/image"
import ETHIcon from '@/public/images/eth.png'
import Airdrop from '@/public/images/airdrop.png'
import { useRouter } from "next/router";
import StakeTitle from "@/components/Stake/StakeTitle";
import styles from "@/pages/stake/index.module.scss";
import Invite from "@/components/Invite";
import { useAccount } from "wagmi";
import { useEffect, useState } from 'react'
import rpc from "@/components/Rpc";
import { useConnectModal } from "@rainbow-me/rainbowkit";

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
export const Launchpad = () => {
    const [showCode, setShowCode] = useState(false)
    const [invites, setInvites] = useState(false)
    const router = useRouter();

    const { address } = useAccount();
    const { openConnectModal } = useConnectModal();
    useEffect(() => {
        fetchData()
    },[address])


    const fetchData =  async() => {
        const user = await rpc.getUser(address);
        console.log('user111', )
        // user?.leader
        setInvites(user?.leader || false)
    }
   

    const onDetail = () => {
        console.log('address', address)
        if(address)  {
            if(!!invites) {
                router.push('/launchpaddetail')
                setShowCode(false)
            }else {
                setShowCode(true)
            }
        }else {
            openConnectModal()
        }
    }
    return (
        <div >
            {
                showCode ?  <Invite toPath="/launchpaddetail"/> : (
                    <div style={{ marginTop: '108px'}} >
                        <StakeTitle
                            title="Launching Feature"
                            extraNode={
                            <div
                                className={`${styles.titleInfo} relative text-[rgba(255,255,255,0.90)] font-Poppins text-[1rem] font-not-italic font-400 leading-normal tracking-0.48px before:block before:absolute before:w-full before:h-0.5 `}
                            >
                                ACTIVE & UPCOMING
                            </div>
                            }
                        />
                        <div className='fx-col'>


                            <AirdropWrapper className='fx-col ai-ct click' onClick={onDetail}>
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
                    </div>
                )
            }            
            <ContractBar/>
        </div>
    )
}

export default Launchpad