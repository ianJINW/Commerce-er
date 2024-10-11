const multer = require("multer");
const path = require("path");

const profileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../public/uploads/profileImages"));
	},
	filename: (req, file, cb) => {
		cb(null, `profile_${Date.now()}_${file.originalname}`);
	}
});

const productStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../public/uploads/product"));
	},
	filename: (req, file, cb) => {
		cb(null, `product_${Date.now()}_${file.originalname}`);
	}
});

const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

const imageFilter = (req, file, cb) => {
	if (imageMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Only images are allowed!"), false);
	}
};

const uploadProfile = multer({
	storage: profileStorage,
	fileFilter: imageFilter
});

const uploadProduct = multer({
	storage: productStorage,
	fileFilter: imageFilter
});

module.exports = { uploadProduct, uploadProfile };
