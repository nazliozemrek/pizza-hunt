const { Pizza } = require('../models');

const pizzaController = {
    getAllPizza(req,res){
        Pizza.find({})
        .populate({
            path:'comments',
            select:'-__v'
        })
            .select('-__v')
            .sort({_id:-1})
            .then(dbPizzadata => res.json(dbPizzadata))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getPizzaById({params},res) {
        Pizza.findOne({_id:params.id})
            .populate({
                path:'comments',
                select:'-__v'
            })
            .select('-__v')
            .then(dbPizzadata => {
                if(!dbPizzadata){
                    res.status(404).json({ message:'No pizza'});
                    return;
                }
                res.json(dbPizzadata)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createPizza({body},res){
        Pizza.create(body)
        .then(dbPizzadata => res.json(dbPizzadata))
        .catch(err => res.status(400).json(err));
    },
    updatePizza({params,body},res){
        Pizza.findOneAndUpdate({_id:params.id},body,{new:true})
        .then(dbPizzadata => {
            if(!dbPizzadata){
                res.status(404).json({message:'No pizza'});
                return;
            }
            res.json(dbPizzadata);
        })
        .catch(err => res.status(400).json(err));
    },
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.status(400).json(err));
      }

};

module.exports = pizzaController;