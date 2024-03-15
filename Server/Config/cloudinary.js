const cloudinary = require("cloudinary").v2;

const connectWithCloudinary = async () => {
    try {
        await cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
        });

        console.log("Connected with cloudinary successfully...");
    } catch (error) {
        console.log("error in connecting with cloudinary");
        console.log(error);
    }
}

module.exports = connectWithCloudinary;