import { ethers } from 'ethers';
import DataRewardFlowFactory from "../artifacts/contracts/DataRewardFlowFactory.sol/DataRewardFlowFactory.json";

const CAMPAIGNSFACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const useContracts = () => {
  const getDataRewardFlowFactoryContract = async (signer) => {
    return new ethers.Contract(CAMPAIGNSFACTORY_ADDRESS, DataRewardFlowFactory.abi, signer);
  };

  const getActiveCampaigns = async (signer) => {
    const contract = await getDataRewardFlowFactoryContract(signer);
    let campaigns = await contract.getActiveCampaigns();
    campaigns = Array.from(campaigns);
    console.log(campaigns);
    return campaigns;
  }

  const getCampaignDetails = async (signer, id) => {
    const contract = await getDataRewardFlowFactoryContract(signer);
    let campaign = await contract.getCampaignDetails(id);
    console.log(campaign);
    return campaign;
  }

  const createCampaign = async (signer, bucketaddress, targetData, name, description) => {
    const contract = await getDataRewardFlowFactoryContract(signer);
    const createTX = await contract.createCampaign(bucketaddress, targetData, name, description);
    await createTX.wait();
    return createTX;
  }

  return {
    getActiveCampaigns,
    getCampaignDetails,
    createCampaign
  };
}