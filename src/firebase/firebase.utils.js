import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBtexYte8B26rloWgyzN3kVhfGbXSrj0BQ",
    authDomain: "crwn-db-7ca3c.firebaseapp.com",
    databaseURL: "https://crwn-db-7ca3c.firebaseio.com",
    projectId: "crwn-db-7ca3c",
    storageBucket: "crwn-db-7ca3c.appspot.com",
    messagingSenderId: "723418233870",
    appId: "1:723418233870:web:ff2295b24b431af430d05f",
    // measurementId: "G-ZBT7X9B71L"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

     try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
     } catch (error) {
        console.log('error creating user', error.message);
     }
  }

  return userRef;

};

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;