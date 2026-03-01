import multer from "multer";
// use to handle file upload*
const upload = multer({storage: multer.diskStorage({})})

export default upload 