import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database"

const firebaseConfig = {
    apiKey: "AIzaSyAngjAnqhIPt4nLpfeyu4xVnEwO9DVmmUE",
    authDomain: "esp32-smartbathroom.firebaseapp.com",
    databaseURL: "https://esp32-smartbathroom-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "esp32-smartbathroom",
    storageBucket: "esp32-smartbathroom.appspot.com",
    messagingSenderId: "178236218699",
    appId: "1:178236218699:web:9677a694f962dd51869cce"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };