const multer = require("multer");
const dayjs = require("dayjs");
const crypto = require("crypto");

const limits = {
  fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
  filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};

/**
 * @author Ryan
 * @description 파일 업로드시 파일 체크 함수
 *
 * @param {Object} file 파일 정보
 *
 * {
 *     fieldname: 'file',
 *     originalname: '001.png',
 *     encoding: '7bit',
 *     mimetype: 'image/png'
 * }
 *
 * @param {Function} callback 파일 업르도 허용 및 거부 처리
 *
 *               허용: callback(null, true);
 *               거부: callback(null, false);
 */
const fileFilter = (req, file, callback) => {
  const typeArray = file.mimetype.split("/");

  const fileType = typeArray[1]; // 이미지 확장자 추출

  //이미지 확장자 구분 검사
  if (fileType == "jpg" || fileType == "jpeg" || fileType == "png") {
    callback(null, true);
  } else {
    return callback(
      { message: "jpg, jpeg, png 파일만 업로드가 가능합니다." },
      false
    );
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/data/"); // './public/data/' directory name where save the file
  },
  filename: (req, file, cb) => {
    cb(
      null,
      dayjs().format("YYYYMMDDHHmmss") +
        "_" +
        crypto.randomBytes(10).toString("hex") +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({
  storage: storage,
  limits: limits, // 이미지 업로드 제한 설정
  fileFilter: fileFilter, // 이미지 업로드 필터링 설정
});

const uploadSingle = upload.single("file");

module.exports = uploadSingle;
