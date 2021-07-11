const router = require('express').Router();
const {addComment,removeComment} =require('../../controllers/comment-contoller');

router
.route('/:pizzaId')
.post(addComment);

router 
.route('/:commentId')
.delete(removeComment);



module.exports = router;