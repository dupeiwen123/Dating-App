export async function loadFaceAPIModel() {
    await faceapi.nets.faceExpressionNet.loadFromDisk('./models')
}

export async function detectFaceExpressions(input) {
    return await faceapi.detectSingleFace(input).withFaceExpressions()
}


async function detectExpressions() {
    const input = document.createElement('canvas');
    input.width = window.innerWidth;
    input.height = window.innerHeight;
    const inputContext = input.getContext('2d');
    inputContext.drawImage(video, 0, 0, input.width, input.height);

    const detectionWithExpressions = await faceapi.detectSingleFace(input)
        .withFaceLandmarks()
        .withFaceExpressions();

    if (detectionWithExpressions) {
        const expressions = detectionWithExpressions.expressions;
        const sortedExpressions = Object.entries(expressions)
            .sort(([, a], [, b]) => b - a);

        const [dominantExpression] = sortedExpressions;
        return dominantExpression ? dominantExpression[0] : 'No expression detected';
    } else {
        return 'No face detected';
    }
}

async function updateExpression() {
    const expression = await detectExpressions();
    const expressionContainer = document.getElementById('expressionContainer');
    expressionContainer.textContent = `Facial Expression: ${expression}`;
}

export { updateExpression };