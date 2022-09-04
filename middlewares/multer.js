const multer =require('multer');
const multerS3 =require('multer-s3');
const AWS = require('aws-sdk');
require('dotenv').config();
const utf8 = require('utf8');



AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
})

const s3Client=new AWS.S3()

exports.s3Client=new AWS.S3()

exports.upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: process.env.bucket,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key(req, file, cb) {
        cb(null, Date.now()+(file.originalname));
      },
    }),
    limits: { fileSize: 1024*1024*1024 }, //최대 1GB
  });

  exports.download = async (req, res) => {
    const body = {
      Bucket: process.env.bucket,
      Key: req.body.key,
    };
  
    s3Client
      .getObject(body)
      .createReadStream()
      .on('error', function (err) {
        res.status(500).json({ error: 'Error -> ' + err });
      })
      .pipe(res);
  };