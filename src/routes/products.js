import express from 'express';
import Container from '../Container/Container.js';
import upload from '../services/uploader.js';
import { io } from '../app.js';

const router = express.Router();
const containerdata = new Container();
//GETS
router.get('/', (req, res) => {
    containerdata.getAllproducts().then(result => {
        console.log(result, 'products get');
        res.send(result);
    })
})
router.get('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    containerdata.getproductById(id).then(result => {
        res.send(result);
    })
})
//POSTS
router.post('/', upload.single('image'), (req, res) => {
    let file = req.file;
    let product = req.body;
    product.thumbnail = req.protocol + "://" + req.hostname + ":8081" + '/images/' + file.filename;
    containerdata.registerproduct(product).then(result => {
        res.send(result);
        if (result.status === 'success') {
            containerdata.getAllproducts().then(result => {
                io.emit('sendProducts', result)
            })
        }
        else {
            return { status: 'error', message: 'algo anda mal en products.js/routers.post' }
        }
    })
})
//PUTS
router.put('/:pid', (req, res) => {
    let body = req.body;
    let id = parseInt(req.params.pid);
    containerdata.updateproduct(id, body).then(result => {
        res.send(result);
    })
})
//DELETES
router.delete('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    containerdata.deleteproduct(id).then(result => {
        res.send(result)
    })
})
export default router;