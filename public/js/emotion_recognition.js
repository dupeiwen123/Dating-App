
var faceapi = window.faceapi;

const minScore = 0.2;
const maxResults = 5;

function str(json) {
    //let text = '<font color="lightblue">';
    text = json ? JSON.stringify(json).replace(/{|}|"|\[|\]/g, '').replace(/,/g, ', ') : '';
    //text += '</font>';
    return text;
}

function drawFaces(canvas, data, fps) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true});
    if (!ctx) return;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.font = 'small-caps 20px "Segoi UI"';
    ctx.fillStyle = 'white';
    //ctx.fillText(`FPS: ${fps}`, 10, 25)

    for (const person of data) {
        ctx.fillStyle = 'deepskyblue';
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.rect(person.detection.box.x, person.detection.box.y, person.detection.box.width, person.detection.box.height);
        ctx.stroke();
        ctx.globalAlpha = 1;
        const expression = Object.entries(person.expressions).sort((a, b) => b[1] - a[1]);
        ctx.fillStyle = 'black';
        ctx.fillText(`expression: ${Math.round(100 * expression[0][1])}% ${expression[0][0]}`, person.detection.box.x, person.detection.box.y - 41);
        
    }
}

function logExpressions(data) {
    for (const person of data) {
        const expression = Object.entries(person.expressions).sort((a, b) => b[1] - a[1]);
        // console.log(`Expression for person: ${expression[0][0]} - ${Math.round(100 * expression[0][1])}%`);
    }
}

async function detectVideo(video, canvas) {
    if (!video || video.paused) return false;
    const t0 = performance.now();
    faceapi
        .detectAllFaces(video, optionsSSDMobileNet)
        .withFaceExpressions()
        .then((result) => {
            const fps = 1000 / performance.now() -t0;
            //drawFaces(canvas, result, fps.toLocaleString());
            logExpressions(result);
            requestAnimationFrame(() => detectVideo(video, canvas));
            return true;
        })
        .catch((err) => {
            console.log(`Detect Error:`, err);
            return false;
        });
        return false;
}

async function setupCamera() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    if (!video || !canvas) return null;

    console.log('Setting up camera');
    if (!navigator.mediaDevices) { // requires access via https
        console.log('Camera Error: access not supported');
        return null;
    }

    let stream;
    const constraints = {audio: false, video :{facingMode : 'user', resizeMode: 'crop-and-scale'}};
    if (window.innerWidth > window.innerHeight) constraints.video.width = { ideal: window.innerWidth};
    else constraints.video.height = {ideal: window.innerHeight};
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch(err) {
        if (err.name === 'PermissionDeniedError' || err.name === 'NotAllowedError') console.log(`Camera error: camera permission denied: ${err.message || err}`);
        if (err.name === 'SourceUnavailableError') console.log(`Camera Error: camera not available: ${err.message || err}`);
        return null;
    }

    if (stream) {
        video.srcObject = stream;
    } else {
        console.log('Camera Error: stream empty');
        return null;
    }
    const track = stream.getVideoTracks()[0];
    const settings = track.getSettings();
    if (settings.deviceId) delete settings.deviceId;
    if (settings.groupId) delete settings.groupId;
    if (settings.aspectRatio) settings.aspectRatio = Math.trunc(100 * settings.aspectRatio) / 100;
    console.log(`Camera active: ${track.label}`);
    console.log(`Camera settings: ${str(settings)}`);
    /**canvas.addEventListener('click', () => {
        if (video && video.readyState >= 2) {
        if (video.paused) {
            video.play();
            detectVideo(video, canvas);
        } else {
            video.pause();
        }
        }
        console.log(`Camera state: ${video.paused ? 'paused' : 'playing'}`);
    });
    **/
    return new Promise((resolve) => {
        video.onloadeddata = async () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.play();
        detectVideo(video, canvas);
        resolve(true);
        };
    });
}

async function setupFaceAPI() {
    await faceapi.nets.ssdMobilenetv1.load('./models');
    
    await faceapi.nets.faceRecognitionNet.load('./models');
    await faceapi.nets.faceExpressionNet.load('./models');
    optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence: minScore, maxResults });
 
    console.log(`Models loaded: ${str(faceapi.tf.engine().state.numTensors)} tensors`);
  }

async function main() {

    await faceapi.tf.setBackend('webgl');
    await faceapi.tf.ready();

    if (faceapi.tf?.env().flagRegistry.CANVAS2D_WILL_READ_FREQUENTLY) faceapi.tf.env().set('CANVAS2D_WILL_READ_FREQUENTLY', true);
    if (faceapi.tf?.env().flagRegistry.WEBGL_EXP_CONV) faceapi.tf.env().set('WEBGL_EXP_CONV', true);
    if (faceapi.tf?.env().flagRegistry.WEBGL_EXP_CONV) faceapi.tf.env().set('WEBGL_EXP_CONV', true);

    console.log(`Version: FaceAPI ${str(faceapi?.version || '(not loaded)')} TensorFlow/JS ${str(faceapi.tf?.version_core || '(not loaded)')} Backend: ${str(faceapi.tf?.getBackend() || '(not loaded)')}`);

    await setupFaceAPI();
    await setupCamera();
}

window.onload = main;