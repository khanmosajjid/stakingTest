import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";


import stakingABI from "./stakingAbi.json";
import tokenAbi from "./tokenAbi.json"
import { config } from "../wagmi";
// import { BigNumber } from "bignumber.js";
// import PairABI from "../constants/pairABI.json";
// import FactoryABI from "../constants/factoryABI.json";
// import RouterABI from "../constants/routerABI.json";
import { ethers } from "ethers";
export const STAKING_CONTRACT = "0xf68C25f91B3311a6902E82A81BBeA50E3Ac92b6f";
export const TOKEN_CONTRACT = "0x9d4c36760e30B3985ab43a4fFcD66c8EA1f30542";


export const convertToEther = (amount: unknown) => {
  try {
    const balanceInWeiBigInt: any = amount;
    const balanceInWeiBigNumber = ethers.BigNumber.from(
      balanceInWeiBigInt.toString()
    );

    const balanceInEther = ethers.utils.formatEther(balanceInWeiBigNumber);

    return balanceInEther;
  } catch (e) {
    console.log("error is---->", e);
    return 0;
  }
};

      {
        /* 0x1379B6e533bf36337C562fDA72542A133739999B test token*/
      }
      {
        /* 0xA7B22CABA131889f9eA08D1bE18a15E3F1579f2D staking token */
      }



export const convertToWei = (amount: any) => {
  try {
    const balanceInWeiBigInt = amount;
    const balanceInEther = ethers.utils.parseEther(balanceInWeiBigInt);

    return balanceInEther;
  } catch (e) {
    console.log("error is---->", e);
  }
};

// export const buy = async (account: any, amount: any) => {
//   console.log(account, amount);
//   try {
//     if (parseInt(amount) == 0) {
//       toast.error("Amount should be greater then zero");
//       return;
//     }
//     console.log("here in buy token ", account, amount);
//     let allowance: any = await checkAllowance(
//       account,
//       CICC_CONTRACT,
//       PAYMENT_TOKEN,
//       tokenAbi
//     );

//     console.log("allowance is---->", parseInt(allowance), amount);

//     if (parseInt(allowance) < parseInt(amount)) {
//       let approve = await approveToken(
//         account,
//         CICC_CONTRACT,
//         PAYMENT_TOKEN,
//         tokenAbi
//       );
//       console.log("here approve result----->", approve);
//       if (approve == false) {
//         toast.error("approval fails");
//         return;
//       }
//     }

//     let value = convertToWei(amount.toString());

//     console.log("here 405 ---->", value?.toString());
//     const data: any = await writeContract(config, {
//       abi: CICCABI,
//       address: CICC_CONTRACT,
//       functionName: "buy",
//       args: [value?.toString()],
//     });

//     console.log("data of buy pool is ------>", data);
//     const res: any = await waitForTransactionReceipt(config, {
//       hash: data,
//     });

//     // res = await res.wait();
//     console.log("res", res);
//     if (res.status == "success") {
//       toast.success("token buy Successfully");
//       return res.status;
//     } else {
//       return -1;
//     }
//   } catch (e: any) {
//     console.log("error in buy token is pool is----->", e);
//     const detailsIndex = e?.message.indexOf("Details:");
//     const detailsPart = e?.message.substring(detailsIndex);
//     toast.error(detailsPart);
//     // toast.error(detailsPart);
//     return -1;
//   }
// };

export const approveToken = async (
  account: any,
  spenderContract: any,
  contract: any,
  abi: any
) => {
  let amount: any = "1000000000000000000000000";

  try {
    const data: any = await writeContract(config, {
      address: contract,
      abi: abi,
      functionName: "approve",
      args: [spenderContract, amount],
    });
    console.log("data is----->", data);

    const res: any = await waitForTransactionReceipt(config, {
      hash: data,
    });
    console.log("after transactin finished", res);
    return true;
  } catch (e: any) {
    console.log("here error---->", e);
    // toast.success(e.message)
    // toast.error(e.message);
    return false;
  }
};

export const checkAllowance = async (
  account: any,
  spenderContract: any,
  contract: any,
  abi: any
) => {
  try {
    const data = await readContract(config, {
      address: contract,
      abi: abi,
      functionName: "allowance",
      args: [account, spenderContract],
    });
    console.log("data is---->>",data);

    return convertToEther(data);
  } catch (e) {
    console.log("error is----->", e);
  }
};


// export const isWhitelist = async (account: any) => {
//   try {
//     const data: any = await readContract(config, {
//       abi: CICCABI,
//       address: CICC_CONTRACT,
//       functionName: "whitelist",
//       args: [account],
//     });
//     console.log("data is----->", data);

//     return data;
//   } catch (e: any) {
//     console.log("here error---->", e);
//     // toast.success(e.message)
//     // toast.error(e.message);
//     return false;
//   }
// };
// export const getTokenBalance = async (account: any, address: any) => {
//   try {
//     const data: any = await readContract(config, {
//       abi: CICCABI,
//       address: address,
//       functionName: "balanceOf",
//       args: [account],
//     });
//     console.log("data is----->", data);
//     let bal = data / 1e6;
//     return bal;
//   } catch (e: any) {
//     console.log("here error---->", e);
//     // toast.success(e.message)
//     // toast.error(e.message);
//     return false;
//   }
// };

// export const createPool = async (
//   account: any,
//   propertyDetails: any,
//   maxPoolSize: any,
//   investmentTime: any,
//   maturityTime: any,
//   investmentAmountToStartEarning: any,
//   minInvestment: any,
//   maxInvestment: any
// ) => {
//   try {
//     console.log("account is-------->>>>", account);
//     let whitelist = await isWhitelist(account);
//     console.log("whitelist result is------>>", whitelist);

//     investmentTime = investmentTime * 24 * 60 * 60;
//     maturityTime = maturityTime * 24 * 60 * 60;

//     if (!whitelist) {
//       toast.error("User is not whitelisted");
//       return false;
//     }

//     const data: any = await writeContract(config, {
//       abi: CICCABI,
//       address: CICC_CONTRACT,
//       functionName: "createPool",
//       args: [
//         propertyDetails.toString(),
//         maxPoolSize,
//         investmentTime,
//         maturityTime,
//         investmentAmountToStartEarning,
//         minInvestment,
//         maxInvestment,
//       ],
//     });

//     console.log("data of create pool is ------>", data);
//     const res: any = await waitForTransactionReceipt(config, {
//       hash: data,
//     });

//     // res = await res.wait();
//     console.log("res", res);
//     if (res.status == "success") {
//       toast.success("Pool Created Successfully ");
//       return res;
//     } else {
//       return false;
//     }
//   } catch (e: any) {
//     console.log("here is errror is----->", e);
//     const extractedError = e.message
//       ? e.message.split(":")[1]
//       : "Invalid error message";

//     console.log(extractedError);
//     const detailsIndex = e?.message.indexOf("Details:");
//     const detailsPart = e?.message.substring(detailsIndex);
//     console.log("details part is--->>", detailsPart);
//     toast.error(extractedError);

//     // toast.error(detailsPart);
//     return false;
//   }
// };

// export const getContractAdmin = async () => {
//   try {
//     const data: any = await readContract(config, {
//       abi: CICCABI,
//       address: CICC_CONTRACT,
//       functionName: "owner",
//     });
//     console.log("data is----->", data);

//     return data;
//   } catch (e) {
//     console.log("error is ", e);
//   }
// };

// export const addToWhiteList = async (account: any, walletAddress: any) => {
//   try {
//     let admin = await getContractAdmin();
//     if (admin != account) {
//       alert("You are not Admin");
//       return;
//     }
//     const data: any = await writeContract(config, {
//       abi: CICCABI,
//       address: CICC_CONTRACT,
//       functionName: "addToWhitelist",
//       args: [walletAddress],
//     });

//     console.log("data of create pool is ------>", data);
//     const res: any = await waitForTransactionReceipt(config, {
//       hash: data,
//     });

//     console.log("res", res);
//     if (res.status == "success") {
//       alert("Developer Whitelisted Successfully");
//       return res.status;
//     } else {
//       return false;
//     }
//   } catch (e: any) {
//     console.log("here is errror is----->", e);
//     const extractedError = e.message
//       ? e.message.split(":")[1]
//       : "Invalid error message";

//     console.log(extractedError);
//     const detailsIndex = e?.message.indexOf("Details:");
//     const detailsPart = e?.message.substring(detailsIndex);
//     console.log("details part is--->>", detailsPart);
//     toast.error(extractedError);
//     return false;
//   }
// };

// export const setPoolActive = async (account: any, poolAddress: any) => {
//   try {
//     console.log("poolAddress is----->", poolAddress);
//     let admin = await getContractAdmin();
//     if (admin != account) {
//       alert("You are not Admin");
//       return;
//     }
//     const data: any = await writeContract(config, {
//       abi: CICCABI,
//       address: CICC_CONTRACT,
//       functionName: "setPoolActive",
//       args: [poolAddress],
//     });

//     console.log("data of create pool is ------>", data);
//     const res: any = await waitForTransactionReceipt(config, {
//       hash: data,
//     });

//     // res = await res.wait();
//     console.log("res", res);
//     if (res.status == "success") {
//       alert("Pool  Whitelisted Successfully");
//       return res.status;
//     } else {
//       return false;
//     }
//   } catch (e: any) {
//     console.log("here is errror is----->", e);
//     const extractedError = e.message
//       ? e.message.split(":")[1]
//       : "Invalid error message";

//     console.log(extractedError);
//     const detailsIndex = e?.message.indexOf("Details:");
//     const detailsPart = e?.message.substring(detailsIndex);
//     console.log("details part is--->>", detailsPart);
//     // alert(extractedError);
//     toast.error(detailsPart);
//     return false;
//   }
// };

export const stakeToken = async (
  account: any,
  amount: any
) => {
  try {
    
    let allowance: any = await checkAllowance(
      account,
      STAKING_CONTRACT,
      TOKEN_CONTRACT,
      tokenAbi
    );

    console.log("allowance is---->", parseInt(allowance), amount);

    if (parseInt(allowance) < parseInt(amount)) {
      let approve = await approveToken(
        account,
        STAKING_CONTRACT,
        TOKEN_CONTRACT,
        tokenAbi
      );
      console.log("here approve result----->", approve);
      if (approve == false) {
        alert("approval fails");
        return;
      }
    }

    const data: any = await writeContract(config, {
      abi: stakingABI,
      address: STAKING_CONTRACT,
      functionName: "stake",
      args: [amount*1e18],
    });

    console.log("data of invest pool is ------>", data);
    const res: any = await waitForTransactionReceipt(config, {
      hash: data,
    });

    
    console.log("res", res);
    if (res.status == "success") {
      alert("Invested  Successfully");
      return res.status;
    } else {
      return false;
    }
  } catch (e: any) {
    console.log("here is errror is----->", e);
    const extractedError = e.message
      ? e.message.split(":")[1]
      : "Invalid error message";

    console.log(extractedError);
    const detailsIndex = e?.message.indexOf("Details:");
    const detailsPart = e?.message.substring(detailsIndex);
    console.log("details part is--->>", detailsPart);
    alert(extractedError);
    // toast.error(detailsPart);
    return false;
  }
};

export const unstakeToken = async()=>{
    try{

    }
    catch(err){
            console.log("err",err)
    }
}

export const getUserStakesDetails = async (address:any) => {
  try {
    const data: any = await readContract(config, {
      abi: stakingABI,
      address: STAKING_CONTRACT,
      functionName: "stakes",
      args: [address],
    });
    console.log("data is----->", data);

    return data;
  } catch (e: any) {
    console.log("error in get total pool is---->", e);
  }
};

export const getReward = async (address: any) => {
  try {
    const data: any = await readContract(config, {
      abi: stakingABI,
      address: STAKING_CONTRACT,
      functionName: "calculateReward",
      args: [address],
    });
    console.log("data is----->", data);

    return data;
  } catch (e: any) {
    console.log("error in get total pool is---->", e);
  }
};
