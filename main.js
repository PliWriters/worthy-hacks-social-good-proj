let tgform = document.getElementById("location");
let modal = document.getElementById("modal");
let local = JSON.parse(localStorage.getItem("notes")) || [];
// new speech recognition object
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.interimResults = true;
console.log(recognition)
recognition.addEventListener('result', (event) => {
    const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
    console.log('Current input:', transcript);
document.getElementById("input").innerText = transcript;
});

recognition.addEventListener('end', () => {
    console.log('User has stopped talking.');
    recognition.stop(); // Restart recognition if needed
});

// Start recognition
recognition.start();

tgform.onclick = function() {
    modals();
}
 function modals() {
 modal.classList.add("active");
 modal.innerHTML = `
 <div id="modal-header">
 <span id="close-modal"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#fff" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></span>
 <p>Appointments</p>
 </div>
 <div id="appointments">
 <button id="createloc">
 create
 </button>
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
const endpoint = 'https://en.wikipedia.org/w/api.php?';
const params = {
    origin: '*',
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exchars: '1000',
    exintro: true,
    explaintext: true,
    generator: 'search',
    gsrlimit: 1,
};
const clearPreviousResults = () => {
    document.getElementById("bannerimg").innerHTML = '';
};

const isInputEmpty = input => {
    if (!input || input === '') return true;
    return false;
};

const showError = error => {
    console.log(error);
};

const showResults = results => {
    results.forEach(result => {
document.getElementById("bannerimg").innerHTML += `
 <div class="wiki-results-item"> 
 <h2 class="wiki-results-item-title">${result.title}</h2>
<p class="wiki-paragraph">${result.intro}</p>
        </div>
    `;
    });
};

const gatherData = pages => {
    const results = Object.values(pages).map(page => ({
        pageId: page.pageid,
        title: page.title,
        intro: page.extract,
    }));

    showResults(results);
};

const getData = async () => {
let inp = document.getElementById("input");
    const userInput = input.value;
    if (isInputEmpty(userInput)) return;

    params.gsrsearch = userInput;
    clearPreviousResults();

    try {
        const { data } = await axios.get(endpoint, { params });

        if (data.error) throw new Error(data.error.info);
        gatherData(data.query.pages);
    } catch (error) {
        showError(error);
    } finally {

    }
};

const registerEventHandlers = () => {
document.getElementById("search").addEventListener('click', getData);
};
registerEventHandlers();
async function searchnotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let input = document.getElementById("input");
    notes.forEach((note) => {
        if (userInput.includes(note.tile)) {
            console.log(note);
        }
    });
}
document.getElementById("search").onclick = searchnotes();