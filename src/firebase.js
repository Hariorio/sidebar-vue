import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


var firebaseConfig = {
  apiKey: "AIzaSyBmaCMRc47iPA23bfjs4_wxxSI9haqEVUo",
  authDomain: "vue-chat-dika.firebaseapp.com",
  databaseURL: "https://vue-chat-dika-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vue-chat-dika",
  storageBucket: "vue-chat-dika.appspot.com",
  messagingSenderId: "786793506217",
  appId: "1:786793506217:web:c484a8bf59fc35e33890b8"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db