require('dotenv').config();
const {Router} = require('express');

const router = Router();

router.get('/', (req, res)=>{
    res.render('admin-verify');
})

router.get('/display', (req, res)=>{
    const {username, password} = req.query;
    if(username === process.env.adminUsername && password === process.env.adminPassword){
        res.render('display');
    }
    else{
        res.render('admin-verify', {error:'invalid crudentials try again',username, password});
    }
})





module.exports = router;