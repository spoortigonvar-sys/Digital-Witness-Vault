// ===============================
// DIGITAL WITNESS VAULT
// upload.js
// ===============================

// ---------- USER SESSION ----------

// ===============================
// DIGITAL WITNESS VAULT
// upload.js
// ===============================

// ---------- USER SESSION ----------

// Get logged-in user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Display user information
const welcomeElement = document.getElementById("welcome");
const usernameElement = document.getElementById("username");

if (welcomeElement) {
    welcomeElement.innerHTML =
        `<i class="fa-solid fa-user"></i> Welcome, ${user.fullname}`;
}

if (usernameElement) {
    usernameElement.textContent = user.fullname;
}


// ---------- DATE & TIME ----------
function showLoading(){

document.getElementById("loadingOverlay").style.display="flex";

}

function hideLoading(){

document.getElementById("loadingOverlay").style.display="none";

}

function showToast(message){

const toast=document.getElementById("toast");

document.getElementById("toastMessage").textContent=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}
function updateClock() {

    const now = new Date();

    document.getElementById("date").textContent =
        now.toLocaleDateString();

    document.getElementById("time").textContent =
        now.toLocaleTimeString();
}

updateClock();

setInterval(updateClock,1000);


// ---------- LOGOUT ----------

// ---------- LOGOUT ----------

document.getElementById("logoutBtn").onclick = () => {

    localStorage.removeItem("user");

    window.location.href = "login.html";

};


// ---------- FILE SELECT ----------

const chooseBtn = document.getElementById("chooseBtn");

const videoFile = document.getElementById("videoFile");

const fileName = document.getElementById("fileName");

const preview = document.getElementById("preview");

const dropArea = document.getElementById("dropArea");


chooseBtn.onclick = () => videoFile.click();


// ---------- DISPLAY FILE ----------

videoFile.addEventListener("change", displayFile);

function displayFile(){

    const file = videoFile.files[0];

    if(!file) return;

    fileName.innerHTML = file.name;

    preview.src = URL.createObjectURL(file);

    preview.style.display = "block";

}


// ---------- DRAG & DROP ----------

dropArea.addEventListener("dragover",(e)=>{

    e.preventDefault();

    dropArea.style.borderColor="#10b981";

});

dropArea.addEventListener("dragleave",()=>{

    dropArea.style.borderColor="#3b82f6";

});

dropArea.addEventListener("drop",(e)=>{

    e.preventDefault();

    videoFile.files=e.dataTransfer.files;

    displayFile();

    dropArea.style.borderColor="#3b82f6";

});


// ---------- UPLOAD ----------

document.getElementById("uploadBtn").onclick = uploadVideo;

async function uploadVideo(){

const file=videoFile.files[0];

if(!file){

showToast("Please select a video.");

return;

}

showLoading();

const formData=new FormData();

formData.append("file",file);

const progressBar=document.getElementById("progressBar");

progressBar.style.width="15%";

try{

const response=await fetch(

"http://127.0.0.1:8000/upload",

{

method:"POST",

body:formData

}

);

progressBar.style.width="70%";

const data=await response.json();

progressBar.style.width="100%";

hideLoading();

showSummary(data);

updateStatistics(file);

await getDashboard();

showToast("Evidence Uploaded Successfully");

}
catch(error){

hideLoading();

progressBar.style.width="0%";

showToast("Upload Failed");

console.log(error);

}

}



// ---------- SUMMARY ----------

function showSummary(data){

document.getElementById("summary").innerHTML=

`
<b>Evidence ID</b><br>
${data.evidence_id}<br><br>

<b>Filename</b><br>
${data.filename}<br><br>

<b>SHA-256</b><br>
${data.sha256}<br><br>

<b>Upload Time</b><br>
${data.upload_time}<br><br>

<b>Status</b><br>
🟢 ${data.status}

`;

}



// ---------- RECENT TABLE ----------

function loadDashboard(data){

    document.getElementById("totalFiles").textContent = data.total;
    document.getElementById("verifiedFiles").textContent = data.verified;
    document.getElementById("storageUsed").textContent = data.storage + " MB";

    const table = document.getElementById("recentTable");
    table.innerHTML = "";

    data.recent.forEach(item => {

        table.innerHTML += `
        <tr>
            <td>${item[0]}</td>
            <td>${item[1]}</td>
            <td>${item[2]}</td>
            <td style="color:#10b981">✔ ${item[3]}</td>
        </tr>
        `;

    });

}
function updateStatistics(file){

const boxes=document.querySelectorAll(".stat-box h3");

let total=parseInt(boxes[0].textContent);

boxes[0].textContent=total+1;

let verified=parseInt(boxes[1].textContent);

boxes[1].textContent=verified+1;

const size=(file.size/(1024*1024)).toFixed(2);

boxes[2].textContent=size+" MB";

boxes[3].textContent="100%";

}
async function getDashboard(){

    try{

        const response =
        await fetch("http://127.0.0.1:8000/dashboard");

        const data =
        await response.json();

        loadDashboard(data);

    }

    catch(error){

        console.log(error);

    }

}

getDashboard();