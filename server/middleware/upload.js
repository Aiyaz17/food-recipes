const multer = require("multer");
const path = require("path");

// Define storage options for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB max file size
  },
  // fileFilter: function (req, file, cb) {
  //   if (file.mimetype === "image/*") {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("Only Images are allowed"));
  //   }
  // },
});

module.exports = upload;
