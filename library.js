const section = document.getElementById('container');
const modalContainer = document.getElementById('modal-container');
const noteDisplayContainer = document.getElementById('note-display-container');


const notesList = document.querySelector('.notes-list');
const list = document.querySelector('.list');
const closeBox = document.querySelector('.close');


closeBox.addEventListener('click', close);
notesList.addEventListener('click', handleNote);

function close(event)
{
    noteDisplayContainer.style.display = 'none';
    displayNotes(item.innerHTML);
}

function handleNote(event){
    if(event.target.classList.contains('trash-btn')){
        const library = JSON.parse(localStorage.getItem('library'));
        const name = event.target.parentElement.firstChild.innerHTML;
        library.notes = library.notes.filter((note) => note.key!== name);
        event.target.parentElement.remove();
        noteInfoContainer.style.display = 'none';
        noteDisplayContainer.style.display = 'none';
        if(name === item.innerText){
            heading.style.display = 'none';
            list.innerHTML = "";
        }
        localStorage.setItem("library", JSON.stringify(library));
    }
    else if(event.target.classList.contains('note-item')){
        item.innerText = event.target.innerHTML;
        heading.style.display = 'flex';
        noteInfoContainer.style.display = 'none';
        noteDisplayContainer.style.display = 'none';
        list.innerHTML = "";
        displayNotes(item.innerHTML);
    }
}


const newItem = document.querySelector('.new-item');
const newNote = document.querySelector('.new-note');
const noteName = document.querySelector('.note-name');
const noteContentValue = document.querySelector('.note-content');

const noteTitle = document.querySelector('.note-info-name');
const noteContent = document.querySelector('.note-info-content');
const noteHeading = document.querySelector('.note-heading');



list.addEventListener('click', viewNoteContent);


function viewNoteContent(event)
{
    const library = JSON.parse(localStorage.getItem('library'));
    const result = library["notes"].filter(x => x.key == item.innerHTML)[0];
    const content = result["value"].filter(x => x.title == event.target.innerHTML)[0].content;
    noteHeading.innerHTML = event.target.innerHTML;
    noteContentValue.innerHTML = content;
    noteDisplayContainer.style.removeProperty('display');
    list.style.display = 'none';
    noteDisplayContainer.style.display = 'block';
    console.log(item.innerHTML)
    console.log(event.target.innerHTML);
}



const welcomeButton = document.querySelector('.done');
document.addEventListener('DOMContentLoaded', app);


welcomeButton.addEventListener('click', addUser);
newNote.addEventListener('click', addNote);
const user = document.querySelector('.user');

const item = document.getElementById('item');
const heading = document.getElementById('heading');
const noteInfoContainer = document.getElementById('note-info-container');

const noteInfoName = document.querySelector('.note-info-name');
const newInfo = document.querySelector('.add');

newItem.addEventListener('click', handleItem);
newInfo.addEventListener('click', addNoteInfo);

function handleItem(event){
    noteInfoName.setAttribute('placeholder',`Add title for ${item.innerHTML}`);
    noteInfoContainer.style.display = 'block';
    list.style.display = 'none';
    console.log(event.target);
}

function displayNotes(name){
    console.log(name);
    list.innerText = "";
    const library = JSON.parse(localStorage.getItem('library'));
    library["notes"].forEach(element => {
        if(element.key == name)
        {
            element["value"].forEach(ele => {
                const title = document.createElement('li');
                title.innerText = ele["title"];
                title.classList.add('note-title');
                list.appendChild(title);
            });
        }
    });
    list.style.display = 'block';
}

function addNoteInfo(event){
    event.preventDefault();
    const library = JSON.parse(localStorage.getItem('library'));
    if(noteTitle.value && noteContent.value){
        const note = {
            title: noteTitle.value,
            content: noteContent.value
        }
        library["notes"].forEach(element => {
            if(element.key == item.innerHTML){
                element["value"].push(note);
            }
        });
        localStorage.setItem('library', JSON.stringify(library));
        displayNotes(item.innerHTML);
        noteInfoContainer.style.display = 'none';
        noteTitle.value = "";
        noteContent.value = "";
    }

}


function addNote(event){
    event.preventDefault();
    const library = JSON.parse(localStorage.getItem('library'));
    const len = (library.notes.filter((note) => note.key === noteName.value)).length;
    if(noteName.value && len===0){
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
    console.log("user working");
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




