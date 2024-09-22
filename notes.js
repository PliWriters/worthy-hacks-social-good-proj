const tgform = document.getElementById("tgform");
const modal = document.getElementById("modal");
const notesList = document.getElementById("notes");
let currentNoteIndex = null; // Track the currently selected note for editing

tgform.onclick = function() {
    openModal();
tgform.style.display = "none";
};

function openModal() {
    modal.classList.add("active");
    modal.innerHTML = `
    <div id="modal-header">
<span id="close-modal">
  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#fff" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
        </span>
    </div>
    <div id="form">
        <input id="inputT" placeholder="Title" type="text">
        <textarea id="textarea" placeholder="Description"></textarea>
        <center>
            <button id="savei">Save</button>
        </center>
    </div>
    `;
document.getElementById("close-modal").onclick = function() {
        closeModal();
tgform.style.display = "block";
    };

    document.getElementById("savei").onclick = function() {
        saveData();
    };
}

function closeModal() {
    modal.classList.remove("active");
    tgform.style.display = "block";
    currentNoteIndex = null; // Reset the index when closing the modal
}

function saveData() {
    let local = JSON.parse(localStorage.getItem("notes")) || [];
    let data = {
        title: document.getElementById("inputT").value,
        decs: document.getElementById("textarea").value,
    };

    if (currentNoteIndex !== null) {
        // Edit existing note
        local[currentNoteIndex] = data;
    } else {
        // Add new note
        local.push(data);
    }

    localStorage.setItem("notes", JSON.stringify(local));
    closeModal();
    displayNotes();
}

function displayNotes() {
    notesList.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    
    notes.forEach((note, index) => {
        let li = document.createElement("div");
        li.classList.add("note");
li.innerHTML = `<center>
<h3>${note.title}</h3>
<p>${note.decs}</p>
</center>`;
let title = notes.title;

        // Add click event to open the modal with note details
        li.onclick = function() {
            openNoteModal(index);
        };

        notesList.appendChild(li);
    });
}

function openNoteModal(index) {
tgform.style.display = "none";
    currentNoteIndex = index;
    let notes = JSON.parse(localStorage.getItem("notes"));
    let note = notes[index];

    modal.classList.add("active");
    modal.innerHTML = `
    <div id="modal-header">
<span id="close-modal">
<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#fff" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
</span>
    </div>
    <div id="form">
        <input id="inputT" value="${note.title}" type="text">
        <textarea id="textarea">${note.decs}</textarea>
        <center>
            <button id="savei">Save</button>
            <button id="deletei" onclick="deleteNote(${index}); closeModal();">Delete</button>
        </center>
    </div>
    `;

    document.getElementById("close-modal").onclick = function() {
        closeModal();
    };

    document.getElementById("savei").onclick = function() {
        saveData();
    };
}

function deleteNote(index) {
    let local = JSON.parse(localStorage.getItem("notes")) || [];
    local.splice(index, 1); // Remove the note
    localStorage.setItem("notes", JSON.stringify(local));
    displayNotes();
}

window.onload = displayNotes; // Load existing notes on window load
