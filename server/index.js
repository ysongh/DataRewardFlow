import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'body-parser';
import { testnet } from "@recallnet/chains";
import { RecallClient } from "@recallnet/sdk/client";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

dotenv.config();

const privateKey = process.env.USER_PRIVATE_KEY;
const walletClient = createWalletClient({
    account: privateKeyToAccount(privateKey),
    chain: testnet,
    transport: http(),
});

const { json } = pkg;
const app = express();
const port = 4000;

app.use(cors());

app.use(json());

app.get('/test', async (req, res) => {
    try {
        const client = new RecallClient({ walletClient });
    
        res.json({ client });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/createbucket', async (req, res) => {
    try {
        const client = new RecallClient({ walletClient });
        const bucketManager = client.bucketManager();
        const {
        result: { bucket },
        } = await bucketManager.create();
        console.log("Bucket created:", bucket); 
    
        res.json({ bucket });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => res.send('It Work'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
