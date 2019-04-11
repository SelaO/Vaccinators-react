import {getUserById} from './backend'

getAllUsers2().then(
    (users) => users.forEach((user => console.log(user.get('name'))
)));


getAllUsers().then((users) => users.forEach((user) => console.log(user.get('name'))))

getUserById('1').then((user) => console.log(user.get('name')));



// function getAllUsers2(){
//     var users = [];
//     return db.collection(USERS_TABLE).get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log('hello')
//         users.push(doc);
//         });
//         return users;
//     });
// x
// }
