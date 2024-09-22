let tgform = document.getElementById("location");
let modal = document.getElementById("modal");
let local = JSON.parse(localStorage.getItem("notes")) || [];
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false; // Change to false for single utterance
recognition.interimResults = true;

recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    console.log(transcript); // Process the transcript as needed
};

recognition.onend = () => {
    console.log("Recognition ended.");
    // Optionally restart recognition
};

recognition.onerror = (event) => {
    console.error("Error occurred in recognition: " + event.error);
};

// Automatically stop recognition after a pause in speech
recognition.onstart = () => {
    console.log("Recognition started. Speak now.");
};

let timeout;

recognition.onaudiostart = () => {
    clearTimeout(timeout); // Clear any existing timeout
};

recognition.onspeechend = () => {
    // Set a timeout to stop recognition after a short delay
    timeout = setTimeout(() => {
        recognition.stop();
    }, 1500); // 1.5 seconds delay
};

// Start recognition function
function startRecognition() {
    recognition.start();
}

// Stop recognition function
function stopRecognition() {
    recognition.stop();
}

// Link to buttons in HTML
document.getElementById("mic").onclick = startRecognition;

tgform.onclick = function() {
    modals();
}
 function modals() {
 modal.classList.add("active");
 modal.innerHTML = `
 <div id="modal-header">
 <span id="close-modal"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#fff" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></span>
 <p>Apointment</p>
 </div>
 <div id="form">
 <input id="inputT" placeholder="Title" type="text">
<div>
 <input id="datetime" type="datetime-local" />
 </div>
 <div>
 <label for="uplimg">Upload Location image</label>
 <input type="file" accept="image/*" id="uplimg">
 </div>
 <textarea id="textarea" placeholder="Short description"></textarea>
 <center>
 <button id="savei">Save</button>
 </center>
 </div>
 `;
 document.getElementById("datetime").value = "2024-06-01T08:30";
console.log(document.getElementById("datetime"));
 document.getElementById("close-modal").onclick = function() {
     modal.classList.remove("active");
 }
 console.log(document.getElementById("savei"));
document.getElementById("savei").onclick = function() {
    savedata(); 
}
document.getElementById("uplimg").addEventListener("change", function() {
    let input = document.getElementById("uplimg");
    if (input.files && input.files[0]) {
        var reader = new FileReader();   
        reader.onloadend = function(e) {
            let base64String = e.target.result.replace(/^data:.+;base64,/, '');
            // Store file in localStorage
            localStorage.setItem('wallpaper', base64String);
        }
        reader.readAsDataURL(input.files[0]); // Read the file as Data URL
    }
});

function savedata() {
    let local = JSON.parse(localStorage.getItem("manager")) || []; // Initialize local array
    console.log(localStorage.getItem("wallpaper")); // Get wallpaper directly
    let data = {
        title: document.getElementById("inputT").value,
        decs: document.getElementById("textarea").value,
        date: document.getElementById("datetime").value,
        img: localStorage.getItem("wallpaper"), // Corrected this line
    }
    local.push(data);
    localStorage.setItem("manager", JSON.stringify(local)); // Save notes back to localStorage
}
}
let menu = document.getElementById("menu-cont");
document.getElementById("menu").onclick = function() {
   menu.classList.toggle("show");
   menu.innerHTML = `
  <li>Dashboard</li>
  <li>Manager</li>
  <li>Tracker</li>
  <li>Notes</li>
  <li>Travel</li>
  <li>Notifications</li>
  `;
}