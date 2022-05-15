const {Schema, model} = require("mongoose");
const userSchema = new Schema({
    userId: String,
    win:{type: Number, default: 0},
    lose: {type: Number, default: 0},
})
module.exports.User = model("User", userSchema);