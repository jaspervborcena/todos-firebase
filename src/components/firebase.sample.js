import { initializeApp } from 'firebase/app'
//import { getFirestore } from 'firebase/firestore'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

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










