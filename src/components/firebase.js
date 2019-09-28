import app from 'firebase/app';//The app variable represents the firebase application.

//We have to import auth and firestore to use the features.
import 'firebase/auth';
import 'firebase/firestore';

//For firebase config setting, you should use your own application's information.
const config = {
    apiKey: "AIzaSyANakNDForKvIncA664Pn7WKsVM1SpN49U",
    authDomain: "fir-material-app.firebaseapp.com",
    databaseURL: "https://fir-material-app.firebaseio.com",
    projectId: "fir-material-app",
    storageBucket: "fir-material-app.appspot.com",
    messagingSenderId: "1060497125298",
    appId: "1:1060497125298:web:709a9cb08fb158f070beab"
  };

class Firebase{

    constructor(){

        app.initializeApp(config)//Let config information initialize firebase
        //With this.auth and this.db variables we can access auth and firestore
        this.auth=app.auth()
        this.db=app.firestore()
    }

    login(email,pass){
      //firebase login function
      return this.auth.signInWithEmailAndPassword(email,pass)
    }

    logout(){
      //firebase logout function
      return this.auth.signOut()
    }

    async register(name,email,pass){
      //firebase register function
      await this.auth.createUserWithEmailAndPassword(email,pass)
      //We've updated the username of the register result.
      return this.auth.currentUser.updateProfile({
          displayName:name
      })
    }

    addFruit(fruit){
      //user presence control
      if(!this.auth.currentUser){
          return alert('Not authorized')
      }

      //Adding documents to the collection of pckurdu
      return this.db.doc(`pckurdu/${this.auth.currentUser.uid}`).set({
          fruit:fruit
      })
    }
}

export default new Firebase()