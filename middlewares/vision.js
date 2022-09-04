const vision = require('@google-cloud/vision');


const client = new vision.ImageAnnotatorClient();


exports.detection = async (url)=>{

    const [result] = await client.textDetection(url);
    const detections = result.textAnnotations;
    console.log(detections)

    if(detections.length>0){
        return detections[0].description;
    }
    else{
        return null
    }
    
}

