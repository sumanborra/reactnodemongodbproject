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

const authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
        jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
        response.status(401);
        response.send("Invalid JWT Token");
    } else {
        // Replace 'MY_SECRET_TOKEN' with your JWT secret key
        jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
            if (error) {
                response.status(401);
                response.send({ "Invalid JWT Token": error });
            } else {
                request.userId = payload.userId;
                next();
            }
        });
    }
};

app.post('/upload', authenticateToken, async (request, response) => {
    try {
        // Replace 'database' with your database name and 'collection' with your collection name
        const collection = client.db('Nxttrendz').collection('user'); 
        const profileImageUpload = request.body; 
        const { image1,userName} = profileImageUpload;
        
        console.log(image1)
        const isUserExist = await collection.find({ userName }).toArray();
        
        if (isUserExist.length === 1) {

            
            const result = await collection.updateOne({userName},{$set:{image:image1}});
            response.status(200)
            response.send({ yourId: result.insertedId, message: "Uploaded Image successfuly" });
        } else {
            response.status(401);
            response.send({ errorMsg: 'User with this Email ID Does not exist' })
        }
    } catch (error) {
        response.status(500)
        response.send({ "Internal server error:": error });
    }
});


app.post('/register', async (request, response) => {
    try {
        // Replace 'database' with your database name and 'collection' with your collection name
        const collection = client.db('Nxttrendz').collection('user'); 
        const userDetails = request.body; 
        const { userName } = userDetails;
        const isUserExist = await collection.find({ userName }).toArray();
        if (isUserExist.length === 0) {
            const hashedPassword = await bcrypt.hash(userDetails.password, 10);
            userDetails.password = hashedPassword;
            const result = await collection.insertOne(userDetails);
            response.status(200)
            response.send({ yourId: result.insertedId, message: "User registered successfuly" });
        } else {
            response.status(401);
            response.send({ errorMsg: 'User with this Email ID already exists' })
        }
    } catch (error) {
        response.status(500)
        response.send({ "Internal server error:": error });
    }
});

app.post('/login', async (request, response) => {
    try {
        // Replace 'database' with your database name and 'collection' with your collection name
        const collection = client.db('Nxttrendz').collection('user'); 
        const userDetails = request.body;
        const { userName, password } = userDetails;
        const isUserExist = await collection.findOne({ userName });
        
        if (!isUserExist) {
            response.status(401)
            response.send({ errorMsg: "User with this Email ID doesn't exist" });
            return;
        }
        const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);
        if (isPasswordMatched) {
            // Replace 'MY_SECRET_TOKEN' with your JWT secret key
            const token = jwt.sign({ userId: isUserExist._id }, "MY_SECRET_TOKEN");
            response.status(200)
            response.send({ jwtToken: token, userName: isUserExist.userName });
        } else {
            response.status(401)
            response.send({ errorMsg: "Incorrect password" });
        }
    } catch (error) {
        response.status(500)
        response.send({ "Internal server error:": error });
    }
});

app.get("/get-profile-image/:userName",authenticateToken, async(req,res) =>{
    try {
        // Replace 'database' with your database name and 'collection' with your collection name
        ﻿const collection = client.db('Nxttrendz').collection('user'); 
        const{userName} = req.params
        
        const result = await collection.find({userName}).toArray();
        
        const image = result[0].image
        res.status(200)
        res.send({image});
    } catch (error) {
        res.status(500)
        res.send({ "Internal server error:": error });
    }

})

app.get("/:userName",authenticateToken, async (req, res) =>{
    try {
        // Replace 'database' with your database name and 'collection' with your collection name
        ﻿const collection = client.db('Nxttrendz').collection('user'); 
        const{userName} = req.params
        const result = await collection.find({userName}).toArray();
        
        res.status(200)
        res.send({result});
    } catch (error) {
        res.status(500)
        res.send({ "Internal server error:": error });
    }
})

app.get("/all-users/:userName", authenticateToken, async (req, res) =>{
    try {
        // Replace 'database' with your database name and 'collection' with your collection name
        ﻿const collection = client.db('Nxttrendz').collection('user'); 
        const{userName} = req.params
        const result = await collection.find({userName:{$ne:userName}}).toArray();
        
        res.status(200)
        res.send({result});
    } catch (error) {
        res.status(500)
        res.send({ "Internal server error:": error });
    }
})



app.post("/edit-settings/:userName", authenticateToken, async (request, response) => {
    try {
        // Replace 'database' with your database name and 'collection' with your collection name
        const collection = client.db('Nxttrendz').collection('user'); 
        const userEditData = request.body; 
        const{userName} = request.params
        const { name, about} = userEditData;
        
        
        const isUserExist = await collection.find({ userName }).toArray();
       
        if (isUserExist.length === 1) {

            
            const result = await collection.updateOne({userName},{$set:{name,about}});
            response.status(200)
            response.send({ yourId: result.insertedId, message: "Uploaded Image successfuly" });
        } else {
            response.status(401);
            response.send({ errorMsg: 'User with this Email ID Does not exist' })
        }
    } catch (error) {
        response.status(500)
        response.send({ "Internal server error:": error });
    }
});

app.post("/delete-account/:userName", authenticateToken, async (request, response) => {
    try {
        // Replace 'database' with your database name and 'collection' with your collection name
        const collection = client.db('Nxttrendz').collection('user'); 
         
        const{userName} = request.params
        
        
        
        const isUserExist = await collection.find({ userName }).toArray();
        
        if (isUserExist.length === 1) {

            
            const result = await collection.deleteOne({userName});
            response.status(200)
            response.send({ yourId: result.insertedId, message: "Uploaded Image successfuly" });
        } else {
            response.status(401);
            response.send({ errorMsg: 'User with this Email ID Does not exist' })
        }
    } catch (error) {
        response.status(500)
        response.send({ "Internal server error:": error });
    }
});


