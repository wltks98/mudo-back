const express = require('express');
const router = express.Router();

const imgRouter = require('./img.route');


router.get('/v1/healthcheck',async (req,res,next)=>{
    res.status(200).send('성공')
});

router.use('/v1/img', imgRouter);


module.exports = router;