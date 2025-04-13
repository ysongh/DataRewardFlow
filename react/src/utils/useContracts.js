import { ethers } from 'ethers';
import DataRewardFlowFactory from "../artifacts/contracts/DataRewardFlowFactory.sol/DataRewardFlowFactory.json";

const CAMPAIGNSFACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const useContracts = () => {
  const getDataRewardFlowFactoryContract = async (signer) => {
    return new ethers.Contract(CAMPAIGNSFACTORY_ADDRESS, DataRewardFlowFactory.abi, signer);
  };

  const createCampaign = async (signer, bucketaddress, targetData, name, description) => {
    const contract = await getDataRewardFlowFactoryContract(signer);
    const createTX = await contract.createCampaign(bucketaddress, targetData, name, description);
    await createTX.wait();
    return createTX;
  }

  return {
    createCampaign
  };
}