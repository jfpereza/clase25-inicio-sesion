import mongoose from "mongoose";
import * as model from '../../Container/containerMongo.js'
// -----------------connection-------------------//
import express from 'express';
import Container from '../../Container/Container.js';
const router = express.Router();
const containerdata = new Container();
CRUD()

async function CRUD() {
    try {
        const URL = 'mongodb://localhost:27017/CODERHOUSE'

        const rta = mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('DB runing.....')

        console.log('CREATE');
        const user = {
            name: 'R2',
            lastname: 'Verbel',
            email: 'r2@gmail.com',
            username: 'r2',
            password: 234531
        }
        const userSaveModel = new model.User(user)
        const userSave = await userSaveModel.save()
        console.log(userSave, 'user save...');
    } catch (e) {
        console.log("ERROR", e);
    }
}




// const productss = mongoose.model('users',
//     {
//         name: String,
//         lastname: String,
//         email: String,
//     })

// const newProductss = new productss({
//     name: 'lara', lastname: 'gata', email: '@garra'
// })

// newProductss.save()
//     .then(() => console.log('MONGO SAVE USER.....'))
//     .catch((e) => console.log('ERROR ', e))



