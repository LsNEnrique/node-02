import express from 'express'
import bodyParser from 'body-parser'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from './config/firebaseServiceAccount.json'
import { getDatabase } from 'firebase-admin/database'

const app = express() 
const PORT = process.env.PORT || 3010

//Configuraciion de Firebase
initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirebase()
const usuariosCollection = db.collection('usuarios')

app.use(bodyParser.json())

//Operaciones CRUD


//Inicializar el servidor
app.listen(PORT, () => {
    console.log(`Servidor trabajando en: ${PORT}`)
})


