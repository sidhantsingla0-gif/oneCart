import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = './public/images'
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({ storage: storage })
export default upload;