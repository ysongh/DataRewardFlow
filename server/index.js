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

app.get('/addtobucket/:bucketaddress', async (req, res) => {
    try {
        const bucketaddress = req.params.bucketaddress;
        const client = new RecallClient({ walletClient });
        const bucketManager = client.bucketManager();
        const key = "hello/world1";
        const content = new TextEncoder().encode("testing");
        const file = new File([content], "file.txt", {
          type: "text/plain",
        });
         
        const { meta: addMeta } = await bucketManager.add(bucketaddress, key, file);
        console.log("Object added at:", addMeta?.tx?.transactionHash);
    
        res.json({ transactionHash: addMeta?.tx?.transactionHash });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/query/:bucketaddress', async (req, res) => {
    try {
        const bucketaddress = req.params.bucketaddress;
        const client = new RecallClient({ walletClient });
        const bucketManager = client.bucketManager();
        const prefix = "hello/";
        const {
          result: { objects },
        } = await bucketManager.query(bucketaddress, { prefix });
        console.log("Objects:", objects);

        const serializedObjects = JSON.stringify(objects, (key, value) => 
            typeof value === 'bigint' ? value.toString() : value
        );

        const parsedObjects = JSON.parse(serializedObjects);
    
        res.json({ parsedObjects });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/getobject/:bucketaddress', async (req, res) => {
    try {
        const bucketaddress = req.params.bucketaddress;
        const client = new RecallClient({ walletClient });
        const bucketManager = client.bucketManager();

        const key = "hello/world";
        const { result: object } = await bucketManager.get(bucketaddress, key);
        const contents = new TextDecoder().decode(object);
        console.log("Contents:", contents);
    
        res.json({ contents });
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
