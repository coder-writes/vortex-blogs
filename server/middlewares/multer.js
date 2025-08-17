import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10 MB per field (increase as needed)
  },
});

export default upload;
