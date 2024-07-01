const express = require('express');
const { ObjectId, MongoClient } = require('mongodb');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(cors());



let client;
const initializeDBAndServer = async () => {
    // Replace 'username' and 'password' with your MongoDB Atlas username and password
    const username = encodeURIComponent("sumanborra");
    const password = encodeURIComponent("Suman@8978");

    // Replace this URI with your Node JS MongoDB connection URI obtained from MongoDB Atlas
    const uri = `mongodb+srv://${username}:${password}@suman.frnfj7m.mongodb.net/?retryWrites=true&w=majority&appName=suman`;

    client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB.....");
        app.listen(3000, () => {
            console.log('Server running on port: 3000');
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
initializeDBAndServer();

app.post("/register", async (req,res) =>{
    try{
        const collection = client.db("Nxttrendz").collection("product");
        console.log(req.body)
        await collection.insertOne(req.body)
        res.send("successfull");
    }
    catch(err){
        res.send("server error")
    }
})

app.get("/", async (req, res) =>{
    try {
        // Replace 'database' with your database name and 'collection' with your collection name
        ﻿const collection = client.db('Nxttrendz').collection('product'); 
        
        const result = await collection.find().toArray();
        console.log(result)
        res.status(200)
        res.send({result});
    } catch (error) {
        res.status(500)
        res.send({ "Internal server error:": error });
    }
})




