const express = require("express");
const router = express.Router();
const sharp = require("sharp");
const fs = require("fs");
const uploadSingle = require("./index.js");

// /api/files/upload/0
// /api/files/upload/1
// /api/files/upload/2
// /api/files/upload/3

router.post("/upload/:sizeKey", (req, res) => {
  const { sizeKey } = req.params;

  size = {
    0: { width: 600 },
    1: { width: 346, height: 251 },
    2: { width: 661, height: 396 },
    3: { width: 800, height: 1200 },
  };

  uploadSingle(req, res, (err) => {
    if (err) {
      return res.json({ status: false, message: err.message });
    } else {
      try {
        sharp(req.file.path) // 압축할 이미지 경로
          .resize(size[sizeKey]) // 비율을 유지하며 가로 크기 줄이기
          .withMetadata() // 이미지의 exif데이터 유지
          .toBuffer((err, buffer) => {
            if (err) throw err;
            // 압축된 파일 새로 저장(덮어씌우기)
            fs.writeFile(req.file.path, buffer, (err) => {
              if (err) throw err;
            });
          });
      } catch (err) {
        console.log(err);
      }

      const fileURL = "http://52.200.99.153:3001/data/" + req.file.filename;

      return res.json({
        status: "ok",
        filename: req.file.filename,
        fileurl: fileURL,
      });
    }
  });
});

//       console.log("폼에 정의된 필드명 : ", fieldname);
//       console.log("사용자가 업로드한 파일 명 : ", originalname);
//       console.log("파일의 엔코딩 타입 : ", encoding);
//       console.log("파일의 Mime 타입 : ", mimetype);
//       console.log("파일이 저장된 폴더 : ", destination);
//       console.log("destinatin에 저장된 파일 명 : ", filename);
//       console.log("업로드된 파일의 전체 경로 ", path);
//       console.log("파일의 바이트(byte 사이즈)", size);

module.exports = router;
