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

const DataRewardFlowFactoryArtifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../hardhat/artifacts/contracts/DataRewardFlowFactory.sol/DataRewardFlowFactory.json'), 'utf8'));
const DataRewardFlowFactoryABI = DataRewardFlowFactoryArtifact.abi;
const DataRewardFlowFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const DataRewardFlowFactoryManager = new ethers.Contract(DataRewardFlowFactoryAddress, DataRewardFlowFactoryABI, wallet);

async function test() {
  try {
    console.log(DataRewardFlowFactoryManager);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

async function submitData(DataRewardFlowAddress, data, bucketaddress) {
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

    const DataRewardFlowManager = new ethers.Contract(DataRewardFlowAddress, DataRewardFlowABI, wallet);

    const tx = await DataRewardFlowManager.submitData(result.key.toString());
    const receipt = await tx.wait();
    
    console.log(`Transaction successful with hash: ${receipt.hash}`);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

async function createCampaign(bucketaddress, targetData, name, description) {
  try {
    const tx = await DataRewardFlowFactoryManager.createCampaign(bucketaddress, targetData, name, description);
    const receipt = await tx.wait();
    
    console.log(`Transaction successful with hash: ${receipt.hash}`);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

submitData("0xa16E02E87b7454126E5E10d957A927A7F5B5d2be", "It works", "0xFF000000000000000000000000000000000048E4");
// createCampaign("0xFF000000000000000000000000000000000048E4", "Water Level", "Water", "Test Water Level")