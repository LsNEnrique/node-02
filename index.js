import express from 'express'
import bodyParser from 'body-parser'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from './config/firebaseServiceAccount.json' with {type: 'json'}

const app = express() 
const PORT = process.env.PORT || 3010

//Configuraciion de Firebase
initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()
const usuariosCollection = db.collection('usuarios')

app.use(bodyParser.json())

//Operaciones CRUD
app.post('/usuarios', async (req, res) => {
    try{
        const newUser = req.body
        const userRef = await usuariosCollection.add(newUser)
        res.status(201).json({
            id: userRef.id,
            ...newUser
        })
    } catch(error){
        res.status(400).json({
            error: 'No se puede crear el usuario'
        })
    }
})

//Leer todos los usuarios
app.get('/usuarios', async (req, res) => {
    try{
       const colUsuarios = await usuariosCollection.get()
       const usuarios = colUsuarios.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
       }))
       res.status(200).json(usuarios)
    } catch(error){
        res.status(400).json({
            error: 'No se puede leer el usuario'
        })
    }
})

//Leer usuarios por ID
app.get('/usuarios/:id', async (req, res) => {
    try{
        const userId = req.params.id
        const userDoc = await usuariosCollection.doc(userId).get()
        if (!userDoc.exists) {
            res.status(404).json({
                error: 'Usuario no encotrado'
            })
        } else {
            res.status(200).json({
                id: userDoc.id,
                ...userDoc.data()
            })
        }
    } catch(error){
        res.status(400).json({
            error: 'No se puede leer el usuario mediante el ID'
        })
    }
})

//Eliminar usuario por ID
app.delete('/usuarios/:id', async (req, res) => {
    try{
        const userId = req.params.id
        await usuariosCollection.doc(userId).delete()
        res.status(200).json({
            message: 'El usuario fue borrado'
        })
    } catch(error){
        res.status(400).json({
            error: 'No se puede borrar el usuario mediante ID'
        })
    }
})

//Modificar usuario por ID
app.put('/usuarios/:id', async (req, res) => {
    try{
        await usuariosCollection.doc(userId).set(updateUser, {
            merge: true
        })
        res.status(200).json({
            id: userUd,
            ...updateUser
        })
    } catch(error){
        res.status(400).json({
            error: 'No se puede actualizar el usuario'
        })
    }
})

//Inicializar el servidor
app.listen(PORT, () => {
    console.log(`Servidor trabajando en: ${PORT}`)
})


