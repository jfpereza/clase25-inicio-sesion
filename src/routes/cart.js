import express from 'express';
import Container from '../Container/Container.js';
import upload from '../services/uploader.js';
import {io} from '../app.js';
import { getTime } from '../utils.js';

const router = express.Router();
const containerdata  = new Container();
//GETS
router.get('/',(req,res)=>{
    containerdata.getAllcart().then(result=>{
        res.send(result);
       console.log(getTime());
    })
})
router.get('/:cid',(req,res)=>{
    let id = parseInt(req.params.cid);
    containerdata.getcartById(id).then(result=>{
        res.send(result);
        console.log(getTime());
    })
})
//POSTS
router.post('/',upload.single('image'),(req,res)=>{
    let file = req.file;
    let cart = req.body;
    cart.thumbnail = req.protocol+"://"+req.hostname+":8081"+'/images/'+file.filename;
    containerdata.registercart(cart).then(result=>{
        res.send(result);
        if(result.status==='success'){
            containerdata.getAllcart().then(result=>{
                io.emit('sendcarts',result)
            })
        }
        else{
            return{status:'error',message:'algo anda mal en cart.js/routers.post'}
        }
    })
})
//PUTS
router.put('/:cid',(req,res)=>{
    let body = req.body;
    let id = parseInt(req.params.cid);
    containerdata.updatecart(id,body).then(result=>{
        res.send(result);
    })
})
//DELETES
router.delete('/:cid',(req,res)=>{
    let id= parseInt(req.params.cid);
    containerdata.deletecart(id).then(result=>{
        res.send(result)
    })
})
export default router;