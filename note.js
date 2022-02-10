const fs = require('fs')
const chalk = require('chalk')

const log = console.log;

//Read Note
const readNote = (title) => {
    const notes = loadNotes()
    const matchedNote = notes.find((note) => note.title === title)
    if(matchedNote) {
        log(chalk.magenta.inverse('Note has been found'))
        log(chalk.inverse(matchedNote.title))
        log(matchedNote.body)
    }
    else {
       log(chalk.red.inverse('No note available'))
    }
}

//List Note
const listNotes = () => {
    log(chalk.cyan.inverse('List of your notes'))
    const notes = loadNotes()
    notes.forEach(note => {
        log(note.title)
    });
}

//Add Note
const addNote = (title,body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note) => note.title === title )
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        log(chalk.yellow.inverse('Note has been added to your list'))
    }
    else {
        log(chalk.red.inverse('Title already exists'))
    }
}

//Remove Note
const removeNotes = (title) =>{
    const notes = loadNotes()
    const finalNotes = notes.filter((note) => note.title !== title )
    if (notes.length > finalNotes.length) {
        saveNotes(finalNotes)
        log((chalk.blue.inverse('Note has been removed')))
    }
    else {
        log(chalk.red.inverse('No note has been found'))
    }
}

//Saving The notes to JSON file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('note.json',dataJSON)
}


const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('note.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }

    
}

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    readNote: readNote
}