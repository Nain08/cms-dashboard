const mongoose = require('mongoose');

const dbConnect = () => {
    try {
        const con = mongoose.connect("mongodb://localhost:27017/DCXDashboard");
        console.log("Database Connected");
    } catch (error) {
        console.error("Database error:", error.message);
    }
};
 
module.exports = dbConnect;
 
