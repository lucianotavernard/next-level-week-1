import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads', 'points'),
    filename(request, file, callbak) {
      const hash = crypto.randomBytes(6).toString('hex');

      const fileName = hash + path.extname(file.originalname);

      callbak(null, fileName);
    },
  }),
};
