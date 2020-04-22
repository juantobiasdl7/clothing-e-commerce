import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCQuWYU20K1F1vM91vU3ZzQjjJ0PYN0XSE",
    authDomain: "crown-database-116e2.firebaseapp.com",
    databaseURL: "https://crown-database-116e2.firebaseio.com",
    projectId: "crown-database-116e2",
    storageBucket: "crown-database-116e2.appspot.com",
    messagingSenderId: "867540190135",
    appId: "1:867540190135:web:39e1f7e4e0cefa198c5e32",
    measurementId: "G-P6028JG4R2"
  };

  export  const createUserProfileDocument = async (userAuth, additionalData) =>{
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;