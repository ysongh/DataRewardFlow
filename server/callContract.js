import { ethers } from 'ethers';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

// Get the directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

let chainId = 31337;

const DataRewardFlowArtifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../hardhat/artifacts/contracts/DataRewardFlow.sol/DataRewardFlow.json'), 'utf8'));
const DataRewardFlowABI = DataRewardFlowArtifact.abi;
const DataRewardFlowAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const DataRewardFlowManager = new ethers.Contract(DataRewardFlowAddress, DataRewardFlowABI, wallet);

async function test() {
  try {
    console.log(DataRewardFlowManager);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

test();