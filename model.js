var mongoose = require('mongoose');
var objId = mongoose.Schema.Types.ObjectId;

var TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    imgUrl: String,
    completed: Boolean,
    sessionId: {
        type: String,
        required: true
    }
});

var PonySchema = mongoose.Schema({
    //ponyName //imgUrl //userName
    ponyName: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
})

module.exports = {
    Todo: mongoose.model('todo', TodoSchema),
    Pony: mongoose.model('pony', PonySchema)
};