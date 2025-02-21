const video = document.getElementById('video');
const output = document.getElementById('output');

// Check if the browser supports accessing the camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
            requestAnimationFrame(tick);
        })
        .catch(function(error) {
            console.error("Error accessing the camera: ", error);
        });
} else {
    alert("Sorry, your browser does not support accessing the camera.");
}

function tick() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });

        if (code) {
            output.textContent = code.data;
        }
    }
    requestAnimationFrame(tick);
}