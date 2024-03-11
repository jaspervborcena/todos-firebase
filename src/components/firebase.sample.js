import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
export const firebaseApp = initializeApp({
    apiKey: "xxxxx",
    authDomain: "xxxxx",
    projectId: "xxxxx",
    storageBucket: "xxxxx",
    messagingSenderId: "xxxxx",
    appId:"xxxxx",
    measurementId:"xxxxx"
})
 const db = getFirestore(firebaseApp)
 const todosRef = collection(db, 'todo')
export default todosRef










