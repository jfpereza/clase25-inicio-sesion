import mongoose from "mongoose";

// -----------------connection-------------------//
mongoose.connect('mongodb://localhost:27017/CODERHOUSE')

const productss = mongoose.model('shoppinCart',
    {
        name: String,
        category: String,
        price: Number,
    })

const newProductss = new productss({ name: 'carne', category: 'special', price: 10 })
newProductss.save()
    .then(() => console.log('MONGO SAVE SHOPCART.....'))
    .catch((e) => console.log('ERROR ', e))



