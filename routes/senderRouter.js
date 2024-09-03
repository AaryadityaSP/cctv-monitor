// require('dotenv').config();
const uuid = require('uuid').v4;
const {Router} = require('express');

const router = Router();

router.get('/', (req, res)=>{
    res.render('new-cam-add-form');
})

router.post('/add', (req, res)=>{
    const id = uuid();
    console.log(req.body);
    console.log(id);
    res.render('sender' , {id});
})





module.exports = router;