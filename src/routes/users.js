import express from 'express';
import Container from '../Container/Container.js';
import { getTime } from '../utils.js';

const router = express.Router();
const containerdata = new Container();

router.use((req, res, next) => {
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Petición..users.js ' + time.toTimeString().split(" ")[0])
    next()
})
//GETS
router.get('/', (req, res) => {
    containerdata.getAllUsers().then(result => {
        console.log(result, getTime(), 'users get');
        res.send(result);

    })
})
router.get('/:uid', (req, res) => {
    let id = parseInt(req.params.uid);
    containerdata.getUserById(id).then(result => {
        res.send(result);
    })
})
//POSTS
router.post('/', (req, res) => {
    let user = req.body;
    console.log(user);
    containerdata.registerUser(user).then(result => {
        res.send(result);
    })
})
//PUTS
router.put('/:uid', (req, res) => {
    let body = req.body;
    let id = parseInt(req.params.uid);
    containerdata.updateUser(id, body).then(result => {
        res.send(result);
    })
})
//DELETES
router.delete('/:uid', (req, res) => {
    let id = parseInt(req.params.uid);
    containerdata.deleteUser(id).then(result => {
        res.send(result);
    })
})
export default router;