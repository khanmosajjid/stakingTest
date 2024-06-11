"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { stakeToken,getReward,getUserStakesDetails,STAKING_CONTRACT,TOKEN_CONTRACT} from "./web3services";
// import { create } from "kubo-rpc-client";
function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [amount,setAmount]=useState(0)
  const { address, isConnected } = useAccount();
  const [reward,setReward]=useState(0);
  const [stakedAmount,setStakedAmount]=useState(0);

  useEffect(()=>{
     const data=async()=>{
      let reward=await getReward(address);
      console.log("reward is----->>",reward.toString());
      let stakeData=await getUserStakesDetails(address)
      console.log("stake data is----->",stakeData);
      setStakedAmount(stakeData[0].toString());
      setReward((reward.toString())/1e6);
     }
     data();
  },[address])

  
  return (
    <>
      <div>
        <ConnectButton></ConnectButton>
        <h2>Account</h2>
        <p>Staking Contract Address:</p>
        {STAKING_CONTRACT}

        <p>Token Contract Address:</p>
        {TOKEN_CONTRACT}
        <div>
          status: {account.status}
          <br />
          addresses: {address}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
        {account.status === "connected" ? (
          <>
            <input
              placeholder="amount"
              type="number"
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
              }}
            ></input>
            <button
              type="button"
              onClick={async () => {
                let res = await stakeToken(address, amount);
              }}
            >
              Stake
            </button>
          </>
        ) : (
          ""
        )}
      </div>
      <p>User Staked Amount:</p>
      {stakedAmount}

      {/* {reward > 0 ? (
        <>
          <p>Reward Generated</p>
          <p>{reward} Token</p>
        </>
      ) : (
        ""
      )} */}
    </>
  );
}

export default App;
