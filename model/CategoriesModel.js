const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    pageName: {
        type: String,
        required: true,
        unique:true
    },
    pageAuthor:{
        type:String,
        required:true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique:true
    },
    pages: [pageSchema] 
});

module.exports = mongoose.model('Category', categorySchema);
