const section = document.getElementById('container');
const modalContainer = document.getElementById('modal-container');

const notesList = document.querySelector('.notes-list');

notesList.addEventListener('click', handleNote);

function handleNote(event){
    if(event.target.classList.contains('trash-btn')){
        const library = JSON.parse(localStorage.getItem('library'));
        event.target.parentElement.remove();
        library.notes = library.notes.filter((note) => note.key!== event.target.parentElement.firstChild.innerHTML);
        localStorage.setItem("library", JSON.stringify(library));
    }

}


const newNote = document.querySelector('.new-note');
const noteName = document.querySelector('.note-name');

const welcomeButton = document.querySelector('.done');
document.addEventListener('DOMContentLoaded', app);

welcomeButton.addEventListener('click', addUser);
newNote.addEventListener('click', addNote);
const user = document.querySelector('.user');

function addNote(event){
    event.preventDefault();
    const library = JSON.parse(localStorage.getItem('library'));
    if(noteName.value){
        const note = {
            "key" : noteName.value,
            "value" : []
        }
        library.notes.push(note);
        localStorage.setItem("library", JSON.stringify(library));
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        const newNote = document.createElement('li');
        newNote.innerText = note["key"];
        newNote.classList.add('note-item');
        noteDiv.appendChild(newNote);
        const trash = document.createElement('i');
        trash.classList.add("trash-btn");
        trash.classList.add("fa");
        trash.classList.add("fa-trash");
        trash.classList.add("fa-2x");
        noteDiv.appendChild(trash);
        notesList.appendChild(noteDiv);
        noteName.value = "";
    }
}

function addUser(event){
    event.preventDefault();
    if(user.value.trim()){
        let userName =  user.value.split(" ")[0];
        const library = {
            "userName" : userName.charAt(0).toUpperCase() + userName.slice(1),
            "notes" : []
        }
        localStorage.setItem('library', JSON.stringify(library));
        modalContainer.style.display = "none";
        document.getElementById("name").innerHTML = library["userName"];
        section.style.display = "block";
    }
}

function welcome()
{
    section.style.display = 'none';
    modalContainer.style.display = 'block';
}

function app(){
    let notes;
    if(localStorage.getItem('library') === null)
    {
        welcome();
    }
    else{
        const library = JSON.parse(localStorage.getItem('library'));
        document.getElementById("name").innerHTML = library["userName"];
        library["notes"].forEach(element => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            const newNote = document.createElement('li');
            newNote.innerText = element.key;
            newNote.classList.add('note-item');
            noteDiv.appendChild(newNote);
            const trash = document.createElement('i');
            trash.classList.add("trash-btn");
            trash.classList.add("fa");
            trash.classList.add("fa-trash");
            trash.classList.add("fa-2x");
            noteDiv.appendChild(trash);
            notesList.appendChild(noteDiv);
        });

    }
}




