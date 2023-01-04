const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//Route 1 get all the notes using: Get "/api/auth/getuser". Login required


router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {

        const notes = await Note.find({ user: req.user.id })
        res.json(notes)


    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server  Error occured");
    }
})

//Route 2 get all the notes using: Get "/api/auth/add ". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description  must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {


        try {

            const { title, description, tag } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNotes = await note.save()
            res.json(savedNotes)



        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server  Error occured");
        }
    })
//routes 3  update an existing notes 


router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {



        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };


        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send(" not found ") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server  Error occured");
    }

})



// route
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //find he note to be update and deltee it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send(" not found ") }

        //only allow if user owns this notes
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "sucess": "note has been delted", note: note });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server  Error occured");
    }


})








module.exports = router