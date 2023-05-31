import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getDatabase, remove, set, ref, child, push, update, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
        apiKey: "AIzaSyCOmsmfK2mI-eqyx5FbqCqrwi31cDGRfgk",
        authDomain: "signup-cb4c7.firebaseapp.com",
        databaseURL: "https://signup-cb4c7-default-rtdb.firebaseio.com",
        projectId: "signup-cb4c7",
        storageBucket: "signup-cb4c7.appspot.com",
        messagingSenderId: "329484801937",
        appId: "1:329484801937:web:d58d4e156d36a5fde26c30",
        measurementId: "G-BHBEBJGCM8"
};
      
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const user = auth.currentUser;

                function login() {
                        const btnLog = document.querySelector('.login .form__btn');

                btnLog.addEventListener('click', (e) => {
                        console.log('kek');
                        let username = document.querySelector('.login #username').value;
                        const email = document.querySelector('.login #email').value;
                        const password = document.querySelector('.login #password').value;
                        let flag = 'logged!';
                       
                        signInWithEmailAndPassword(auth, email.value, password.value)
                        .then((userCredential) => {
                                // Signed in 
                                const user = userCredential.user;
                                getAuth()
                                .getUserByEmail(email)
                                .then((userRecord) => {
                                // See the UserRecord reference doc for the contents of userRecord.
                                console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
                                })
                                .catch((error) => {
                                console.log('Error fetching user data:', error);
                                });
                                const dt = new Date();
                                // update(ref(database, 'users/' + `${state}/flag` ),{
                                //         state:flag,
                                        
                                // })
                                
                                console.log('You logged in!');
                                // ...
                        })
                        .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.log(errorMessage);
                        });

                        
                })
                }

                