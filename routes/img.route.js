const express = require('express');
const router = express.Router();
const imgService = require('../service/img.service');
const {upload, download} = require('../middlewares/multer');

//검색
router.get('/', async (req,res,next)=>{
  try {
    imgService.getImg(req.query,(err,result)=>{
      if (err) {res.status(400).send(result);console.log(err);}
      else {res.status(200).send(result);}
    });
  } catch (error) { console.error(error); next(error);}
});

//업로드
router.post('/', async (req,res,next)=>{
  const uploadMultiple = upload.array('images'); //이 선언을 밖으로 빼면 오류가 생김
  await uploadMultiple(req, res, (err)=> {
    if (err) {
      res.status(400).send({success:false,message:err.message})
      console.log(err);
    }
    else{
      try {
        imgService.uploadImg({files:req.files,...req.body},(err,result)=>{
          if (err) {res.status(400).send(result);console.log(err);}
          else {res.status(200).send(result);}
        });
      } catch (error) { console.error(error); next(error);}
    }
    })
});

//파일 다운로드
router.post('/download',download);


module.exports = router;