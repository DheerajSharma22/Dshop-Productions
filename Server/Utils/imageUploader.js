const cloudinary = require("cloudinary").v2;

exports.uploadOnCloudinary = async (file, folder, quality, height) => {
    try {
        const options = { folder, resource_type: "auto" };

        if (height) options.height = height;
        if (quality) options.quality = quality;

        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.log("Error in image uploader -> ", error);
    }

}