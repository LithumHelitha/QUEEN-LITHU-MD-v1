const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "PANDA-MD~aUtmjCyA#AwiizZoa4f1IprKoXdjXSRjGoX9IV53clmFuCDsnSoE",
MONGODB: process.env.MONGODB || "mongodb+srv://lithumhelitha2008:7rDwXUVeTnIfmnjl@cluster0.1d0bq.mongodb.net/",
ALIVE_IMG: process.env.ALIVE_IMG || "https://unitedcamps.in/Images/file_5278.jpg",
AUTO_READ_CMD: process.env.AUTO_READ_CMD || "true",
AUTO_BIO:"true"
};
