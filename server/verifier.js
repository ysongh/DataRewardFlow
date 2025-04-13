import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const infuraUrl = process.env.INFURA_URL;
const factoryAddress = process.env.CONTRACT_ADDRESS;

const campaignABI = [
  "event DataSubmitted(uint256 submissionId, address contributor, string dataHash)",
  "function verifyData(uint256 submissionId, bool isValid) external",
  "function getBucketAddress() external view returns (string)",
  "function getTargetData() external view returns (string)",
  "function submissions(uint256) view returns (address contributor, string dataHash, bool isVerified, bool isRewarded, uint256 rewardAmount)"
];

const factoryABI = [
  "event CampaignCreated(uint256 indexed campaignId, address indexed campaignAddress, string name)",
  "event CampaignDeactivated(uint256 indexed campaignId, address indexed campaignAddress)",
  "event CampaignReactivated(uint256 indexed campaignId, address indexed campaignAddress)",
  "function getDeployedCampaigns() public view returns (address[])"
];

const provider = new JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const factoryContract = new ethers.Contract(factoryAddress, factoryABI, wallet);

const campaignContracts = new Map();

function setupCampaignListener(campaignAddress) {
  // Skip if we're already listening to this campaign
  if (campaignContracts.has(campaignAddress)) {
    return;
  }
  
  console.log(`Setting up listener for campaign at ${campaignAddress}`);
  
  // Create contract instance
  const campaignContract = new ethers.Contract(campaignAddress, campaignABI, wallet);
  
  // Store in our map
  campaignContracts.set(campaignAddress, campaignContract);
  
  // Listen for submissions
  campaignContract.on("DataSubmitted", (submissionId, contributor, dataHash, event) => {
    console.log(`New submission detected on ${campaignAddress}: ID=${submissionId}, Contributor=${contributor}, Hash=${dataHash}`);
    
    const submissionIdNumber = Number(submissionId);
    
    try {
      verifyOnChain(campaignAddress, submissionIdNumber, true, dataHash);
    } catch (error) {
      console.error("Error calling verifyOnChain function:", error);
    }
  });
  
  console.log(`Listener setup complete for campaign at ${campaignAddress}`);
}

async function verifyOnChain(campaignAddress, submissionId, isValid, dataHash) {
  console.log(`[START] Processing submission ${submissionId} with value ${isValid} on campaign ${campaignAddress}`);
  try {
    const campaignContract = campaignContracts.get(campaignAddress);
    
    const bucketaddress = await campaignContract.getBucketAddress();
    console.log(`Bucket address: ${bucketaddress}`);

    const response = await fetch(`http://localhost:4000/getobject/${bucketaddress}/${dataHash}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);

    const targetData = await campaignContract.getTargetData();
    console.log("Target Data: ", targetData);
    
    const tx = await campaignContract.verifyData(submissionId, isValid);
    console.log(`Transaction sent: ${tx.hash}`);
    
    await tx.wait();
    console.log(`Submission ${submissionId} verified as ${isValid ? 'valid' : 'invalid'} - Tx: ${tx.hash}`);
  } catch (error) {
    console.error(`Failed to verify submission ${submissionId}:`, error);
    console.error(`Error message:`, error.message);
  }
}

function startEventListener() {
  console.log("Starting verifier event listener...");
  
  factoryContract.on("CampaignCreated", (campaignId, campaignAddress, name, event) => {
    console.log(`New campaign detected: ID=${campaignId}, Campaign Address=${campaignAddress}, Name=${name}`);

    setupCampaignListener(campaignAddress);
  });
  
  console.log("Event listener registered successfully");
}

startEventListener();