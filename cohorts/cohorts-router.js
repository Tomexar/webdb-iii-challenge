const knex = require('knex')
const router = require('express').Router()
const Cohorts = require('./cohorts-model.js')

const knexConfig = require('../knexfile')

db = knex(knexConfig.development)

router.get('/', (req, res) => {
    Cohorts.find()
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
router.get('/:id', (req, res) => {
    Cohorts.findById(req.params.id)
        .then(cohort => {
            if (cohort) {
                res.status(200).json(cohort);
            } else {
                res.status(404).json({ message: 'Cohort not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/', (req, res) => {
    Cohorts.find()
        .insert(req.body, 'id')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Cohorts.find()
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `${count} cohort updated` });
            } else {
                res.status(404).json({ message: 'Cohort not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/:id', (req, res) => {
    Cohorts.find()
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                const unit = count > 1 ? 'cohorts' : 'cohort';
                res.status(200).json({ message: `${count} ${unit} deleted` });
            } else {
                res.status(404).json({ message: 'cohort not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});



module.exports = router;