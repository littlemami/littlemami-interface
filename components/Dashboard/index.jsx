
import { useEffect, useState } from "react";

import { styled } from 'styled-components'





const Wrapper = styled.div`
    max-width: 1056px;
    margin-top: 182px;
`
const Page1Wrapper = styled.div`

`

const Dashboard = (props) => {


  return (
    <div className="center w100">
        <Wrapper className="bd2 w100">
            <Page1Wrapper className="bd1">
                <p className="fz88 white fw900">Unlocking Your</p>
                <p className="fz88 color1 fw900 ml52" >Profit Potential</p>
                <p className="fz88 white fw900" style={{ marginLeft: '300px'}}>with LMC</p>
                <div className="fx-row ai-ct jc-sb " style={{ marginTop: '82px'}}>
                  <div/>
                  <div className="fx-col" style={{ maxWidth: '506px'}}>
                    <span className="fz18 white3">A DEX launchpad that establishes a diverse web3 protocol tailored to user scenarios by integrating DeFi and lending functionalities.</span>
                    <div className="fx-row ai-ct jc-sb mt24">
                      <span className="fz20 white">Connect Us</span> 
                      <span className="fz20 white">{'->'}</span> 
                    </div>
                  </div>
                </div>
            </Page1Wrapper>
        </Wrapper>
    </div>
  );
};

export default Dashboard;
 