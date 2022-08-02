import express from 'express';
import { engine } from 'express-handlebars';
import cors from 'cors';
import Container from './Container/Container.js';
import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import usersRouter from './routes/users.js';
import upload from './services/uploader.js';
import _dirname, { authMidleware, getTime } from './utils.js';
import { Server } from 'socket.io';


const admin = true;//acceso admin
const app = express();
const PORT = process.env.PORT || 8080;
const containerdata = new Container();
const server = app.listen(PORT, () => {
    console.log("R..8080 ", PORT)
})

export const io = new Server(server);

app.engine('handlebars', engine())
app.set('views', './views')//'views',__dirname+'/views'//
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    req.auth = admin;
    next();
})
app.use(express.static(_dirname + '/public'));
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/users', usersRouter);

app.post('/api/getAproduct', (req, res) => {
    let userId = parseInt(req.body.uid);
    let productId = parseInt(req.body.pid);
    containerdata.getAproduct(userId, productId).then(result => {
        res.send(result);
    })
})
app.post('/api/uploadfile', upload.fields([
    {
        name: 'file', maxCount: 1
    },
    {
        name: "documents", maxCount: 3
    }
]), (req, res) => {
    const files = req.files;
    console.log(files);
    if (!files || files.length === 0) {
        res.status(500).send({ messsage: "No se subió archivo" })
    }
    res.send(files);
})
app.get('/view/products', authMidleware, (req, res) => {
    containerdata.getAllproducts().then(result => {
        let info = result.payload;
        let preparedObject = {
            products: info
        }
        res.render('products', preparedObject)
    })
})


io.on('connection', async socket => {
    console.log(`El socket ${socket.id}  conectado`)
    let products = await containerdata.getAllproducts();
    socket.emit('sendProducts', products);

})
//-------------------{chat}--------------------//

let messages = [];
io.on('connection', socket => {
    console.log("Cliente conectado");
    socket.emit('messagelog', messages);
    socket.emit('welcome', 'pagina actualizada')
    socket.on('message', data => {
        messages.push(data)
        io.emit('messagelog', messages);
        console.log(data, messages, getTime());
    })
})