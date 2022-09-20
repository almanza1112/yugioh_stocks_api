const express = require('express')
const app = express()
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./yu-gi-oh--stocks-firebase-adminsdk-55vh5-b34c92b925.json');

initializeApp({
    credential: cert(serviceAccount)
});


app.post('/create', async (req, res) => {

    const userJson = {
        email: "hi@gmail.com",
        firstName: "Bad",
        lastName: "alm"
    }

    const docRef = db.collection('users').doc('alovelace').set(userJson);

})

const db = getFirestore();

const usersRouteer = require('./routes/users')
app.use('/users', usersRouteer)

const cardRouter = require('./routes/cards')
app.use('/cards', cardRouter)

//Uncomment below for local testing
app.listen(3000, () => console.log('Server Started')) 

//Uncomment below for push
//app.listen(process.env.PORT || 5000 , () => console.log('Server Started'))