const Task = require('../models/Todo');

exports.addTask = (req, res, next) => {
    delete req.body._id;
    const task = new Task({
        ...req.body
    });
    task.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyTask = (req, res, next) => {
    Task.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteTask = (req, res, next) => {
    Task.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllTask = (req, res, next) => {
    Task.find()
        .then(tasks => res.status(200).json(tasks))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneTask = (req, res, next) => {
    Task.findOne({ _id: req.params.id })
        .then(task => res.status(200).json(task))
        .catch(error => res.status(404).json({ error }));
}

exports.getOneTaskName = (req, res, next) => {
    Task.find({ content: { $regex: req.params.content, $options: 'i' } })
        .then(task => res.status(200).json(task))
        .catch(error => res.status(404).json({ error }));
}