const express = require('express');
const router = express.Router();
const todoCTRL = require('../controllers/TodoCTRL');

// dislay data base content
router.get('/', todoCTRL.getAllTask);
// display one element by id
router.get('/:id', todoCTRL.getOneTask);
// display one element by name
router.get('/content/:content', todoCTRL.getOneTaskName);
// add new element
router.post('/', todoCTRL.addTask);
// modify elements
router.put('/:id', todoCTRL.modifyTask);
// delete something
router.delete('/:id', todoCTRL.deleteTask);

module.exports = router;