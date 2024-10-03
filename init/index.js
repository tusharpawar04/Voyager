const mongoose = require('mongoose');
const initData = require('./data.js');

const Listing = require('../models/listing.js');

let mongo_url ='mongodb://127.0.0.1:27017/Voyager';

main().then(()=>{
    console.log("connected to MongoDB");
})
.catch((err) => {
    console.log(err);
});
async function main(){
    mongoose.connect(mongo_url);
};

const initDb = async ()=>{
    await Listing.deleteMany({});
initData.data = initData.data.map((obj) => ({...obj, owner: "664e1a0ff90b0c0f271fe577"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDb();