import { ethers } from 'ethers';
import DataRewardFlowFactory from "../artifacts/contracts/DataRewardFlowFactory.sol/DataRewardFlowFactory.json";
import DataRewardFlow from  "../artifacts/contracts/DataRewardFlow.sol/DataRewardFlow.json";
// const CAMPAIGNSFACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CAMPAIGNSFACTORY_ADDRESS = "0x0e79dd711611bB54d70BFac1a5f8A3de62f8d015";


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
    campaign = Array.from(campaign);
    console.log(campaign);
    return campaign;
  }

  const getTargetData = async (signer, contractAddress) => {
    const DataRewardFlowManager = new ethers.Contract(contractAddress, DataRewardFlow.abi, signer);
    let campaign = await DataRewardFlowManager.getTargetData();
    console.log(campaign);
    return campaign;
  }

  const createCampaign = async (signer, bucketaddress, targetData, name, description) => {
    const contract = await getDataRewardFlowFactoryContract(signer);
    const createTX = await contract.createCampaign(bucketaddress, targetData, name, description);
    await createTX.wait();
    return createTX;
  }

  const submitData = async (signer, contractAddress, data, bucketaddress) => {
    try {
      const response = await fetch(`http://localhost:4000/addtobucket/${bucketaddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: data})
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
  
      const DataRewardFlowManager = new ethers.Contract(contractAddress, DataRewardFlow.abi, signer);
  
      const tx = await DataRewardFlowManager.submitData(result.key.toString());
      const receipt = await tx.wait();
      
      console.log(`Transaction successful with hash: ${receipt.hash}`);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  }

  return {
    getActiveCampaigns,
    getCampaignDetails,
    getTargetData,
    createCampaign,
    submitData
  };
}