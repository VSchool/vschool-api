const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    imgUrl: String,
    completed: {
        type: Boolean,
        default: false
    },
    sessionId: {
        type: String,
        required: true
    }
});

const ponySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        required: true
    }
});

module.exports = {
    Todo: mongoose.model("todo", todoSchema),
    Pony: mongoose.model("pony", ponySchema)
};