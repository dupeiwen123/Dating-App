const minScore = 0.2;
const maxResults = 5;
let expressionsHistory = [];

function str(json) {
    text = json ? JSON.stringify(json).replace(/{|}|"|\[|\]/g, '').replace(/,/g, ', ') : '';
    return text;
}

function logExpressions(data) {
    for (const person of data) {
        const expression = Object.entries(person.expressions).sort((a, b) => b[1] - a[1]);
        console.log(`Expression for person: ${expression[0][0]} - ${Math.round(100 * expression[0][1])}%`);
        expressionsHistory.push(expression)
    }
}

async function detectVideo(video, canvas) {
    if (!video || video.paused) return false;
    detectionIntervalId = setInterval(() => {
        faceapi
            .detectAllFaces(video, optionsSSDMobileNet)
            .withFaceExpressions()
            .then((result) => {
                logExpressions(result);
            })
            .catch((err) => {
                console.log(`Detect Error:`, err);
            });
    }, 100); // Adjust interval as needed
    return true;
}

function stopDetection() {
    clearInterval(detectionIntervalId)
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
    
    return new Promise((resolve) => {
        video.onloadeddata = async () => {
        video.play();
        detectVideo(video, canvas);
        resolve(true);
        };
    });
}

async function setupFaceAPI() {
    await faceapi.nets.ssdMobilenetv1.load('./models');
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