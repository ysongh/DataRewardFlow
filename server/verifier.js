import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const infuraUrl = process.env.INFURA_URL;
const contractAddress = process.env.CONTRACT_ADDRESS;

const contractABI = [
  "event DataSubmitted(uint256 submissionId, address contributor, string dataHash)",
  "function verifyData(uint256 submissionId, bool isValid) external",
  "function getBucketAddress() external view returns (string)",
  "function getTargetData() external view returns (string)",
  "function submissions(uint256) view returns (address contributor, string dataHash, bool isVerified, bool isRewarded, uint256 rewardAmount)"
];

const provider = new JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function verifyOnChain(submissionId, isValid, dataHash) {
  console.log(`[START] Processing submission ${submissionId} with value ${isValid}`);
  try {
    const bucketaddress = await contract.getBucketAddress();

    const response = await fetch(`http://localhost:4000/getobject/${bucketaddress}/${dataHash}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);

    const targetData = await contract.getTargetData();
    console.log("Target Data: ", targetData);

    console.log(`Preparing to send transaction to contract at ${contractAddress}`);
    console.log(`Using wallet address: ${wallet.address}`);
    
    const tx = await contract.verifyData(submissionId, isValid);
    console.log(`Transaction sent: ${tx.hash}`);
    
    console.log(`Waiting for transaction confirmation...`);
    await tx.wait();
    console.log(`Submission ${submissionId} verified as ${isValid ? 'valid' : 'invalid'} - Tx: ${tx.hash}`);
  } catch (error) {
    console.error(`Failed to verify submission ${submissionId}:`, error);
    console.error(`Error code:`, error.code);
    console.error(`Error message:`, error.message);
    if (error.receipt) {
      console.error(`Transaction receipt:`, error.receipt);
    }
  }
}

function startEventListener() {
  console.log("Starting verifier event listener...");
  
  contract.on("DataSubmitted", (submissionId, contributor, dataHash, event) => {
    console.log(`New submission detected: ID=${submissionId}, Contributor=${contributor}, Hash=${dataHash}`);
    
    const submissionIdNumber = Number(submissionId);
    
    console.log(`Converting submissionId ${submissionId} to number: ${submissionIdNumber}`);
    
    try {
      verifyOnChain(submissionIdNumber, true, dataHash);
      console.log("verifyOnChain function called successfully");
    } catch (error) {
      console.error("Error calling verifyOnChain function:", error);
    }
  });
  
  console.log("Event listener registered successfully");
}

startEventListener();