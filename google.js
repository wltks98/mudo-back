const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
// const fileName = 'Local image file, e.g. /path/to/image.png';

// Performs text detection on the local file
async function a(){
const [result] = await client.textDetection('https://mudo-s3.s3.ap-northeast-2.amazonaws.com/1660895692895%EC%98%AC%EA%B1%B0%EC%A7%80.jpg');
const detections = result.textAnnotations;
console.log('Text:');
detections.forEach(text => console.log(text));
}

a();