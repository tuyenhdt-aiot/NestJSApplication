import { diskStorage } from 'multer';

export const StorageConfig = (folder: string) => diskStorage({
  destination: `uploads/${folder}`,
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
