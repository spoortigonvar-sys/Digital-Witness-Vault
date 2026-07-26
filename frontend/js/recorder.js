const video = document.getElementById("preview");
const status = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const timer = document.getElementById("timer");

let stream;
let recorder;
let chunks = [];

let seconds = 0;
let timerInterval;

// =======================
// Start Camera
// =======================
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        video.srcObject = stream;
        status.innerHTML = "✅ Camera Ready";

    } catch (err) {
        console.error(err);
        status.innerHTML = "❌ Camera Permission Denied";
    }
}

startCamera();

// =======================
// Timer
// =======================
function startTimer() {

    seconds = 0;

    timerInterval = setInterval(() => {

        seconds++;

        const min = String(Math.floor(seconds / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");

        timer.innerHTML = `${min}:${sec}`;

    }, 1000);

}

function stopTimer() {
    clearInterval(timerInterval);
}

// =======================
// Start Recording
// =======================
startBtn.onclick = () => {

    if (!stream) {
        alert("Camera not ready.");
        return;
    }

    chunks = [];

    try {

        recorder = new MediaRecorder(stream);

    } catch (err) {

        console.error(err);
        alert("MediaRecorder Error: " + err.message);
        return;

    }

    recorder.ondataavailable = (event) => {

        console.log("Data available:", event.data.size);

        if (event.data.size > 0) {
            chunks.push(event.data);
        }

    };

    recorder.onstop = async () => {

        try {

            console.log("STEP 1 : onstop");

            const blob = new Blob(chunks, {
                type: "video/webm"
            });

            console.log("STEP 2 : Blob Created", blob);

            // Download recording
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "EmergencyRecording.webm";
            a.click();

            URL.revokeObjectURL(url);

            console.log("STEP 3 : Download Complete");

            // Upload
            const formData = new FormData();
            formData.append("file", blob, "EmergencyRecording.webm");

            status.innerHTML = "⬆ Uploading...";

            console.log("STEP 4 : Upload Started");

            const response = await fetch("http://127.0.0.1:8000/upload", {
                method: "POST",
                body: formData
            });

            console.log("STEP 5 : Response Status =", response.status);

            if (!response.ok) {
                throw new Error("Upload failed. Status: " + response.status);
            }

           const result = await response.json();

console.log("Backend Response:", result);

alert(JSON.stringify(result, null, 2));

status.innerHTML = "✅ Upload Successful";

        } catch (error) {

            console.error("UPLOAD ERROR:", error);

            alert("Upload Error: " + error.message);

            status.innerHTML = "❌ Upload Failed";

        }

    };

    recorder.start();

    startTimer();

    startBtn.disabled = true;
    stopBtn.disabled = false;

    status.innerHTML = "🔴 Recording...";

};

// =======================
// Stop Recording
// =======================
stopBtn.onclick = () => {

    if (recorder && recorder.state !== "inactive") {

        console.log("Stopping recorder...");

        recorder.stop();

    }

    stopTimer();

    startBtn.disabled = false;
    stopBtn.disabled = true;

};