import admin from "firebase-admin"
import serviceAccount from "../../../jfperez-developer-firebase-adminsdk-8wgiz-6af1cf8b62.json";


(async function () {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('DB connected [firebase]');
        const db = firestore()
        const query = db.collection('products')
        await query.doc().create({ name: 'R2' })
        await query.doc().create({ name: 'asdasd' })
    } catch (e) {
        then(() => console.log('MONGO SAVE SHOPCART.....'))
        console.log('ERROR ', e)
    }
    console.log('Inserted!');
})()