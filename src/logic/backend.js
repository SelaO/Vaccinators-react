
const config = {
  apiKey: "AIzaSyBnp2EI2K9GpVvsy7Hgf-e7IcOk9fMp5dc",
  authDomain: "vaccinepad.firebaseapp.com",
  databaseURL: "https://vaccinepad.firebaseio.com",
  projectId: "vaccinepad",
  storageBucket: "vaccinepad.appspot.com",
  messagingSenderId: "1034222937573"
};


function getDb() {
    var firebase = require('firebase');
    firebase.initializeApp(config);
    var db = firebase.firestore();
    return db;
}

const USERS_TABLE = 'users'

const db = getDb();


 async function getAllUsers(){
    var users = [];
    var querySnapshot = await db.collection(USERS_TABLE).get();
    querySnapshot.forEach((doc) => {
        users.push(doc);
        });
        return users;
}

async function getUserById(id){
    var userdDb = db.collection(USERS_TABLE);
    var user;
    var query = await userdDb.where('id', '==', id).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
         user = doc;
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
      return user;
}


async function getUsersVaccinesDocRef(id){
    var userdDb = db.collection(USERS_TABLE);
    var vaccines = [];
    var query = await userdDb.where('id', '==', id).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
          vaccines = doc.get('given_vaccines');
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
      return vaccines;
}

export async function getUsersVaccines(id) {
    var vaccDocRef = await getUsersVaccinesDocRef(id);
    var vaccines = [];
    for(i = 0; i < vaccDocRef.length; i++){
       await vaccDocRef[i].get().then((doc) => vaccines.push(doc.data()));
    }
    return vaccines;
}

var vaccines = getUsersVaccines('1');
console.log(vaccines);

//vaccines.forEach((v) => console.log(v));

 //getUserById('1').then((user) => user.get('given_vaccines')[0].get().then((doc) => console.log(doc.data())));




