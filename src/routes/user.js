const router = require('express').Router();
const { creat,
    find,
    update,
    deletOne,
    findByCredentials} = require('../models/user');
require('dotenv').config();

router.post('/addUser', async(req, res) => {
    try {
        const { username,password  } = req.body;
        const user_id = await creat('users', { username,password });
        res.status(200).json({ creat: "Done" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err });
    }
})
router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await findByCredentials(username, password);
        console.log(user.username);
        res.status(200).json({ token: user.username });
    } catch (err) {
        res.status(400).json({ Error: "Unable to login" })
    }
})
router.get('/allUsers', async(req, res) => {
    try {
        
        const user = await find('users');
        console.log(user)
        res.status(200).json({  user});
    } catch (err) {
        console.log(err)
        res.status(400).json({ Error: "Unable to login" })
    }
})
router.post('/user', async(req, res) => {
    try {
        const { username } = req.body;
        const user = await find('users', { username } );
        console.log(user)
        res.status(200).json(user[0]);
    } catch (err) {
        console.log(err)
        res.status(400).json({ Error: "Unable to login" })
    }
})
router.post('/addBalance', async(req, res) => {
    try {
        const { balance,username } = req.body;
        let status = "واصل"
        if(balance<=0){
            status = "فاصل"
        }
       
        await update('users', username,{status, balance });
        res.status(200).json({ update: "Done" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err });
    }
})

router.post('/addPulses', async(req, res) => {
    try {
        const { pulses,username } = req.body;
        await update('users', username,{ pulses });
        res.status(200).json({ update: "Done" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err });
    }
})


router.post('/newConsumption', async(req, res) => {
    try {
        const { counter,username } = req.body;
        const user = await find('users', {username})
        console.log(user[0].pulses)
        let balance = parseInt(user[0].balance) - counter/user[0].pulses
        let consumption = counter/user[0].pulses
        if(balance<=0){
            balance = 0 ;
            let status = "فاصل"
            const user_id = await update('users', username,{ status,balance,consumption });
        }else{
            const user_id = await update('users', username,{ balance,consumption });
        }
        
        res.status(200).json({ update: "Done" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err });
    }
})

router.post('/deleteUser', async(req, res) => {
    try {
        const { username } = req.body;
        await deletOne('users',{username});
        res.status(200).json({delete:"Done"});
    } catch (err) {
        console.log(err)
        res.status(400).json({ Error: "Unable to login" })
    }
})

router.post('/addmessage',async(req,res)=>{
    try{
        const { sender ,receiver ,content  } = req.body;
        const date = new Date()
        const message_id = await creat('messages ', { sender ,receiver ,content ,date });
        res.status(200).json({add:"Done"});
    }catch{
        console.log(err)
        res.status(400).json({ Error: "error" })
    }
})
router.post('/messages',async(req,res)=>{
    try{
        const { username  } = req.body;
        const messages = await find('messages', {receiver: username } );
        res.status(200).json({messages});
    }catch{
        console.log(err)
        res.status(400).json({ Error: "error" })
    }
})


module.exports = router;