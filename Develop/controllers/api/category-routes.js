const router = require('express').Router();
const { Category } = require('../../models');

router.get('/categories', (req, res) => {
    Category.findAll()
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/categories', (req, res) => {
    Category.create({
        category_name: req.body.category_name,   
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
});

router.put('/categories/:id', (req, res) => {
    Category.update({
        category_name: req.body.title
    },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No category found with this id ' });
                return;
            }
            res.json(dbCategoryData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.delete('/categories/:id', (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No category found with this id ' });
                return;
            }
            res.json(dbCategoryData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;