// import { createApp } from 'vue'
// import { VueFire, VueFireAuth } from 'vuefire'
// import App from './App.vue'
// // the file we created above with `database`, `firestore` and other exports
// import { firebaseApp } from './components/firebase'

// const app = createApp(App)
// app.use(VueFire, {
//   // imported above but could also just be created here
//   firebaseApp,
//   modules: [
//     // we will see other modules later on
//     VueFireAuth(),
//   ],
// })

// app.mount('#app')

//import { createApp } from 'vue-demi'
//import { VueFire } from 'vuefire'
//import App from './App.vue'
// the file we created above with `database`, `firestore` and other exports
//import { firebaseApp } from './components/firebase'
//import { collection } from 'firebase/firestore'

// const app = createApp(App)
// app.use(VueFire, { firebaseApp,collection })
// app.mount('#app')





import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
// the file we created above with `database`, `firestore` and other exports
import { firebaseApp } from './components/firebase'
import { collection } from 'firebase/firestore'
const app = createApp(App)

app.use(VueFire, collection,{
  // imported above but could also just be created here
  firebaseApp,
  
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})

app.mount('#app')