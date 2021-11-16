const section = document.getElementById('container');
const modalContainer = document.getElementById('modal-container');


const notesList = document.querySelector('.notes-list');
const newNote = document.querySelector('.new-note');
const noteName = document.querySelector('.note');

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
        const newNote = document.createElement('a');
        newNote.appendChild(document.createTextNode(note["key"]));
        newNote.setAttribute("id",note["key"]);
        newNote.setAttribute("class","note-info");
        newNote.setAttribute("href","#");
        notesList.append(newNote);
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
            const newNote = document.createElement('a');
            newNote.appendChild(document.createTextNode(element.key));
            newNote.setAttribute("id",element.key);
            newNote.setAttribute("href","#");
            notesList.append(newNote);
        });
    }
}




