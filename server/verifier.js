import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';
import dotenv from 'dotenv';

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const infuraUrl = process.env.INFURA_URL;
const contractAddress = process.env.CONTRACT_ADDRESS;

const contractABI = [
  "event DataSubmitted(uint256 submissionId, address contributor, string dataHash)",
  "function verifyData(uint256 _submissionId, bool _isValid) external",
  "function submissions(uint256) view returns (address contributor, string dataHash, bool isVerified, bool isRewarded, uint256 rewardAmount)"
];

const provider = new JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

function startEventListener() {
  console.log("Starting verifier event listener...");
  contract.on("DataSubmitted", (submissionId, contributor, dataHash, event) => {
    console.log(`New submission detected: ID=${submissionId}, Contributor=${contributor}, Hash=${dataHash}`);
  });
}

startEventListener();