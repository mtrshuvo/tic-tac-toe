require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {StreamChat} = require("stream-chat");
const {v4: uuidv4} = require("uuid");
const bcrypt = require("bcrypt");
const mongoose= require("mongoose");
const {User} = require("./models/userModel");
const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.global_DB).then(()=> {
  console.log("DB Conntected");
}).catch(err=> {
  console.log(err);
  console.log("DB not connected");
})
const api_key = "k6hvrfnsaah2";
const api_secret = "qfpb37a23jzmtjqzafmfbt9zv4qv6wckvja494s54fgj6u54vh4r7qehzbwxydbq";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    // const user = await User.findOne(username);
    // if(user) return res.status(400).json("Username already exist");
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    // await new User({username}).save();
    res.status(200).json({ token, userId, firstName, lastName, username, hashedPassword});
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return res.status(400).json({ message: "User not found" });
    
    console.log(users);
    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
    else{
      res.status(400).json({"message": "not found"})
    }
  } catch (error) {
    res.status(500).json({message: "not found"});
  }
});

app.post("/updatescore", async(req, res)=> {

})
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
