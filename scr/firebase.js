import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getDatabase, set, ref, update, child, get } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js"
                

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
              
                // Initialize Firebase
                const app = initializeApp(firebaseConfig);
                const database = getDatabase(app);
                const auth = getAuth();
                const user = auth.currentUser;


