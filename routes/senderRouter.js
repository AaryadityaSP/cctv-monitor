// require('dotenv').config();
const uuid = require('uuid').v4;
const {Router} = require('express');
const {addData} = require('../db/dbfuctions');

const router = Router();

router.get('/', (req, res)=>{
    res.render('new-cam-add-form');
})

router.post('/add', (req, res)=>{
    const id = uuid();
    addData(id,req.body);
    res.render('sender' , {id, details:req.body});
})





module.exports = router;