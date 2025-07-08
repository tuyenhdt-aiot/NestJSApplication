import { extname } from "path"

export const FileFiter = (req, file, cb) => {
    const ext= extname(file.originalname);
    const AllowedExtArr = ['.png','.jpg','.jpeg'];
    if (!AllowedExtArr.includes(ext)){
        req.fileValidationError = `Wrong extension type. Accepted file ext are : ${AllowedExtArr.toString()}`;
        return cb(null, false);
    }
    
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 1024 * 1024 * 5){
        req.fileValidationError = `File size is too large. Accepted file size is less than 5MB`;
        return cb(null, false);
    }

    return cb(null, true);
};