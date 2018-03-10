const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
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

const PonySchema = mongoose.Schema({
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
    Todo: mongoose.model("todo", TodoSchema),
    Pony: mongoose.model("pony", PonySchema)
};