import admin from "firebase-admin"
// -----------------connection-------------------//

const connectFirebase = async () => {
    var serviceAccount = require("../../jfperez-developer-firebase-adminsdk-8wgiz-6af1cf8b62.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('DB connected [firebase]');
}
export default connectFirebase;