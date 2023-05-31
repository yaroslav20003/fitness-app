import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js'
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
let username = null;

        const mySPA = (function() {
                const ui = { // элементы верстки, учавствующие в процессе
                  btnCreate: document.querySelector(".main__btn-create"),
                  btnLogin: document.querySelector(".main__btn-login"),
                };
          
                const MainComponent = {
                  render: () => {
                    return `
                    <main class="main main_login">
                            <div class="main__info">
                                    <h1 class="main__title">Become the best version of yourself</h1>
                                    <a href="#create" class="main__btn main__btn-create">Create account</a>
                                    <a href="#login" class="main__btn main__btn-login">Already a member? Log in</a>
                            </div>
            
                    </main>`;
                  }
                };
          
                const LoginForm = {
                  render: () => {
                    return `
                    <main class="main main_login-form">
                        <div class="login form-container">
                        
                                <div class="form" >
                                        
                                        <h2 class="form__title">Log in</h2>
                                        
                                        <div class="form__field">
                                                <input tabindex="0" id="username" type="text" placeholder="Username" autocomplete="off" >
                                        </div>
                                        <div class="form__field">
                                                <input tabindex="1" id="email" type="email" placeholder="Email" autocomplete="off" >
                                        </div>
        
                                        <div class="form__field">
                                                <input tabindex="2" id="password" type="password" placeholder="Password" autocomplete="off"  maxlength="15">
                                                <i class="fa-solid  fa-eye-slash"></i>
                                        </div>
                
                                        <a href="#account" class="form__btn">Login</a>
                                </div>
                                
                        </div>
                    </main>
                    `;
                  }
                };
          
                const Slider = {
                  render: () => {
                        return `<main class="main main_slider">
                        <div class="slider">
                                
                        
                                <div class="slider__item">
                                        <div class="gender">
                                                <h2 class="gender__title">Gender</h2>
                                                <div id="male" class="gender__male gender-type"><p>Male</p></div>
                                                <div id="female" class="gender__female gender-type"><p>Female</p></div>
                                        </div>
                                </div>
                                <div class="slider__item">
                                        <div class="height">
                                                <h2 class="height__title">Height</h2>
                                                <div class="cm-or-inch">
                                                        <button type="button" id="cm" class="cm active">cm</button>
                                                        <button type="button" id="in" class="in">in</button>
                                                </div>
                                                <div class="selector">
                                                        <div class="selectField">
                                                                <p id="selectText">Choose height</p>
                                                                <img src="https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/yaroslav20003/fd2-project/26d4dc9673b8c753fc5c492a44b69adabf96a624/img/up-arrow.svg" alt="arrow" class="icon-circle-down"></img>
                                                        </div>
                                
                                                        <ul class="height-list hidden"></ul>
                                                </div>
                                        </div>
                                </div>
                                <div class="slider__item">
                                        <div class="weight">
                                                <h2 class="weight__title">Weight</h2>
                                                <div class="kg-or-lb">
                                                        <button type="button" id="kg" class="kg active">kg</button>
                                                        <button type="button" id="lb" class="lb">lb</button>
                                                </div>
                                                <div class="selector">
                                                        <div class="selectField">
                                                                <p id="selectText">Choose weight</p>
                                                                <img src="https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/yaroslav20003/fd2-project/26d4dc9673b8c753fc5c492a44b69adabf96a624/img/up-arrow.svg" alt="arrow" class="icon-circle-down"></img>
                                                        </div>
                                
                                                        <ul class="weight-list hidden"></ul>
                                                </div>
                                        </div>
                                </div>
                                <div class="slider__item">
                                        <div class="level">
                                                <h2 class="level__title">Fitness level</h2>
                                                <div class="level-option newbie">
                                                        <p class="level-option__title">Newbie</p>
                                                        <p class="level-option__explanation">I've never trained before</p>
                                                </div>
                                                <div class="level-option beginner">
                                                        <p class="level-option__title">Beginner</p>
                                                        <p class="level-option__explanation">Some experience</p>
                                                </div>
                                                <div class="level-option intermediate">
                                                        <p class="level-option__title">Intermediate</p>
                                                        <p class="level-option__explanation">Moderate experience with consistent training</p>
                                                </div>
                                                <div class="level-option advanced">
                                                        <p class="level-option__title">Advanced</p>
                                                        <p class="level-option__explanation">Very experienced with consistent training</p>
                                                </div>
                                        </div>
                                </div>
                                <div class="slider__item">
                                        <div class="goals">
                                                <h2 class="goals__title">Goals<span class="goals__title-explanation">Choose as many as you like</span></h2>
                                                <div id="goal-1" class="goals__option strength">
                                                        <p class="goals__option__title">Build strength</p>
                                                        <p class="goals__option__explanation">Get stronger and perform exercises with greater ease</p>
                                                </div>
                                                <div id="goal-2" class="goals__option muscle">
                                                        <p class="goals__option__title">Build muscle</p>
                                                        <p class="goals__option__explanation">Increase volume and difficulty to ensure muscle growth</p>
                                                </div>
                                                <div id="goal-3" class="goals__option fat-loss">
                                                        <p class="goals__option__title">Lose fat</p>
                                                        <p class="goals__option__explanation">Optimized for high intensity fat burning workouts</p>
                                                </div>
                                                <div id="goal-4" class="goals__option techniques">
                                                        <p class="goals__option__title">Learn techniques</p>
                                                        <p class="goals__option__explanation">Master the basic skills like handstands to the more advanced skills like the planche</p>
                                                </div>
                                        </div>
                                </div>
                                <div class="slider__item">
                                        <div class="perfomance">
                                                <h2 class="perfomance__title">Perfomance</h2>
                                                <div class="perfomance__statistics">
                                                        <div class="perfomance__result pullups">
                                                                <label for="pullups">Max pullups</label>
                                                                <input tabindex="0" type="number" id="pullups" placeholder="0">
                                                        </div>
                                                        <div class="perfomance__result pushups">
                                                                <label for="pushups">Max pushups</label>
                                                                <input tabindex="1" type="number" id="pushups" placeholder="0">
                                                        </div>
                                                        <div class="perfomance__result squats">
                                                                <label for="squats">Max squats</label>
                                                                <input tabindex="2" type="number" id="squats" placeholder="0">
                                                        </div>
                                                        <div class="perfomance__result dips">
                                                                <label for="dips">Max dips</label>
                                                                <input tabindex="3" type="number" id="dips" placeholder="0">
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                
                                <div class="slider__item">
                                
                                <div class="registration form-container">
                
                                        <form class="form" action="POST">
                                                <h2 class="form__title">Sign up</h2>
                                                <div class="form__field">
                                                        <input tabindex="0" id="user-name" type="text" placeholder="Username" autocomplete="off"   maxlength="35">
                                                </div>
                                                <div class="form__field">
                                                        <input tabindex="1" id="full-name" type="text" placeholder="Full name" autocomplete="off"  maxlength="35">
                                                </div>
                                                <div class="form__field">
                                                        <input tabindex="2" id="email" type="email" placeholder="Email" autocomplete="off" maxlength="35">
                                                </div>
                                                <div class="form__field">
                                                        <input tabindex="3" id="password" type="password" placeholder="Password" autocomplete="off"  maxlength="15">
                                                        <i class="fa-solid  fa-eye-slash"></i>
                                                </div>
                        
                                                <button type="button" class="form__btn save">Save</button>
                                                <a href="#account" class="form__btn create hidden">Create account</a>
                                                
                                                
                                                
                                                
                                        </form>
                                        
                                </div>
                                </div>
                                
                        </div>
                        <div class="buttons">
                                
                        </div>
                                </main>`
                        ;
                  }
                };
                
                const AccountPage = {
                        render: () => {
                                return `
                                <nav class="mainmenu" id="mainmenu">
                                        <ul class="mainmenu__list">
                                                
                                                <li><a class="mainmenu__link" href="#goals">Daily goals</a></li>
                                                <li><a class="mainmenu__link" href="#nutrition">Nutrition</a></li>
                                                <li><a class="mainmenu__link" href="#library">Workout library</a></li>
                                                <li><a class="mainmenu__link" href="#programs">Workout programs</a></li>
                                                <li><a class="mainmenu__link active" href="#account">Account</a></li>
                                        </ul>
                                </nav>
                                <main class="main main_account">
                                        <div class="account-container">
                                        <div class="account">
                                                <div class="account__img">
                                                        <img src="https://api.allorigins.win/raw?url=https://github.com/yaroslav20003/fd2-project/blob/main/img/resume.png?raw=true" alt="logo">
                                                </div>
                                                <div class="account__info">
                                                        <h1 class="account__title">
                                                                Profile settings
                                                                <span><i id='log-out' class="fa-solid fa-right-from-bracket"></i></span>
                                                        </h1>

                                                        <div class="account__field account__username">
                                                                <h4>Username:</h4>
                                                                <p class="username"></p>
                                                        </div>
                                                        <div class="account__field account__fullname">
                                                                <h4>Fullname:</h4>
                                                                <p class="fullname"></p>
                                                        </div>
                                                        <div class="account__field account__email">
                                                                <h4>Email:</h4>
                                                                <p class="email"></p>
                                                        </div>
                                                        <div class="account__field account__gender">
                                                                <h4>Gender:</h4>
                                                                <p class="gender"></p>
                                                        </div>
                                                        <div class="account__field account__height">
                                                                <h4>Height:</h4>
                                                                <p class="height"></p>
                                                        </div>
                                                        <div class="account__field account__weight">
                                                                <h4>Weight:</h4>
                                                                <p class="weight"></p>
                                                        </div>
                                                        <div class="account__field account__level">
                                                                <h4>Level:</h4>
                                                                <p class="level"></p>
                                                        </div>
                                                        <div class="account__field account__goals">
                                                                <h4>Goals:</h4>
                                                                <ul class="goals"></ul>
                                                                
                                                        </div>
                                                        <div class="account__field account__perfomance">
                                                                <h4>Perfomance:</h4>
                                                                <h6>Pullups:</h6><p><span class="pullups"></span></p>
                                                                <h6>Pushups:</h6><p><span class="pushups"></span></p>
                                                                <h6>Dips:</h6><p><span class="dips"></span></p>
                                                                <h6>Squats:</h6><p><span class="squats"></span></p>
                                                        </div>
                                                        <div class="account__buttons">
                                                                <button class="account__btn edit">Edit</button>
                                                                <button class="account__btn save hidden">Save</button>
                                                        </div>
                                                </div>
                                                        </div>
                                                </div>
                                        </main>`;
                        }
                }

                const ToDoList = {
                        render: () => {
                                return `
                                <nav class="mainmenu" id="mainmenu">
                                        <ul class="mainmenu__list">
                                                
                                                <li><a class="mainmenu__link active" href="#goals">Daily goals</a></li>
                                                <li><a class="mainmenu__link" href="#nutrition">Nutrition</a></li>
                                                <li><a class="mainmenu__link" href="#library">Workout library</a></li>
                                                <li><a class="mainmenu__link" href="#programs">Workout programs</a></li>
                                                <li><a class="mainmenu__link" href="#account">Account</a></li>
                                        </ul>
                                </nav>
                                <main class="main main_to-do-list">
                                        <h1>My goals</h1>
                                
                                        <form action="">
                                                <input type="text" class="todo-input">
                                                <button class="todo-button" type="submit">
                                                        <i class="fas fa-plus-circle fa-lg"></i>
                                                </button>
                                                <div class="select">
                                                        <select name="todos" class="filter-todo">
                                                                <option value="all">All</option>
                                                                <option value="completed">Completed</option>
                                                                <option value="incomplete">Incomplete</option>
                                                        </select>
                                                </div>
                                        </form>

                                        <div class="todo-container">
                                                <ul class="todo-list"></ul>
                                        </div>
                                </main>`;
                        }
                }
                const Recipes = {
                        render: () => {
                                return `<nav class="mainmenu" id="mainmenu">
                                <ul class="mainmenu__list">
                                        
                                        <li><a class="mainmenu__link" href="#goals">Daily goals</a></li>
                                        <li><a class="mainmenu__link active"  href="#nutrition">Nutrition</a></li>
                                        <li><a class="mainmenu__link" href="#library">Workout library</a></li>
                                        <li><a class="mainmenu__link" href="#programs">Workout programs</a></li>
                                        <li><a class="mainmenu__link" href="#account">Account</a></li>
                                </ul>
                        </nav>
                                <main class="main main_recipes">
                                <div class="container">
                                        <div class="meal-wrapper">
                                                <div class="meal-search">
                                                        <h2 class="meal-title">Find Meals For Your Ingredients</h2>
                                                        
                        
                                                        <div class="meal-search-box">
                                                                <input type="text" class="search-control" placeholder="Enter an ingredient" id="search-input">
                                                                <button type="submit" class="search-btn btn" id="search-btn">
                                                                        <i class="fas fa-search"></i>
                                                                </button>
                                                        </div>
                                                </div>
                                                
                                                <div class="meal-result">
                                                        <h2 class="meal-result-title">Find your dream meal</h2>
                                                        <div class="meal">
                                                        </div>
                                                </div>
                        
                                                <div class="meal-details">
                                                        <button type="button" id="recipe-close-btn" class="btn recipe-close-btn">
                                                                <i class="fas fa-times"></i>
                                                        </button>
                                                        <div class="meal-details-content">
                                                                
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                               </main>`;
                        },
                }
                const WorkoutLibrary = {
                        render: () => {
                                return `<nav class="mainmenu" id="mainmenu">
                                <ul class="mainmenu__list">
                                        
                                        <li><a class="mainmenu__link" href="#goals">Daily goals</a></li>
                                        <li><a class="mainmenu__link"  href="#nutrition">Nutrition</a></li>
                                        <li><a class="mainmenu__link active" href="#library">Workout library</a></li>
                                        <li><a class="mainmenu__link" href="#programs">Workout programs</a></li>
                                        <li><a class="mainmenu__link" href="#account">Account</a></li>
                                </ul>
                        </nav>
                        <main class="main main_workout-library">
                <div class="container">
                        <div class="exercise-wrapper">
                                <div class="exercise-search">
                                        <h2 class="exercise-title">Find exercises by a body part</h2>
                                        <ul class="body-parts">
                                                <li>back</li>
                                                <li>cardio</li>
                                                <li>chest</li>
                                                <li>lower arms</li>
                                                <li>lower legs</li>
                                                <li>neck</li>
                                                <li>shoulders</li>
                                                <li>upper arms</li>
                                                <li>upper legs</li>
                                                <li>waist</li>
          
                                        </ul>
        
                                        <div class="exercise-search-box">
                                                <input type="text" class="search-control" placeholder="Enter an exercise" id="search-input">
                                                <button type="submit" class="search-btn btn" id="search-btn">
                                                        <i class="fas fa-search"></i>
                                                </button>
                                        </div>
                                </div>
                                
                                <div class="exercise-result">
                                        <h2 class="exercise-result-title"></h2>
                                        <div class='overlay closed'></div>
                                        
                                        <div class="exercise">
                                              
                                                
                                        </div>
                                </div>
        
                                <div class="exercise-details">
                                        <button type="button" id="exercise-close-btn" class="btn exercise-close-btn">
                                                <i class="fas fa-times"></i>
                                        </button>
                                        <div class="exercise-details-content">
                                                
                                        </div>
                                </div>
                        </div>
                </div>
        </main>`;
                        },
                }
                const WorkoutPrograms = {
                        render: () => {
                                return `<nav class="mainmenu" id="mainmenu">
                                <ul class="mainmenu__list">
                                        
                                        <li><a class="mainmenu__link" href="#goals">Daily goals</a></li>
                                        <li><a class="mainmenu__link"  href="#nutrition">Nutrition</a></li>
                                        <li><a class="mainmenu__link" href="#library">Workout library</a></li>
                                        <li><a class="mainmenu__link active" href="#programs">Workout programs</a></li>
                                        <li><a class="mainmenu__link" href="#account">Account</a></li>
                                </ul>
                        </nav>
                        <main class="main main_workouts-library">
                        <div class="workouts-library container">
                                <h1 class="workouts-library__title">
                                        Workouts Library
                                </h1>

                                <div class="workout-programs">
                                        <a href="#fatburn" id="fat-burning" class="workout-programs__program workout-programs__program_fat-burn"><h3>Fat burning</h3></a>
                                        <a href="#strength" id="strength-building" class="workout-programs__program workout-programs__program_strength"><h3>Strength building</h3></a>
                                        <a href="#rep" id="rep-building" class="workout-programs__program workout-programs__program_rep"><h3>Rep building</h3></a>
                                        <a href="#muscle" id="muscle-growth" class="workout-programs__program workout-programs__program_muscle"><h3>Muscle growth</h3></a>
                                </div>
                        </div>
                        </main>`;
                        },
                }
                const FatBurn = {
                        render: () => {
                                return `<main class="main main_workout main_workout_fat-burning">
                                <div class="workout container">
                                        
                                        <div id="fat-burning" class="workout-program workout-program_fat-burn">
                                                <h3>Fat burning</h3>
                                                <div class="workout-program__choose-level">
                                                        <button type="button" id="beginner" class="btn-level beginner">Beginner</button>
                                                        <button type="button" id="intermediate" class="btn-level intermediate">Intermediate</button>
                                                        <button type="button" id="advanced" class="btn-level advanced">Advanced</button>
                                                </div>
                                                <div class="buttons">
                                                        <button type="button" class="btn-begin">Begin!</button>
                                                        <button type="button" class="btn-finish hidden">Finish</button>
                                                </div>
                                                <div class="stop-watch hidden">
                                                        <h2 id="display-time" class="display-time">00:00:00</h2>
                                                        <div class="stop-watch__buttons">
                                                                <button type="button" id="start" class="btn-start-session">Start</button>
                                                                <button type="button" id="stop" class="btn-stop-session">Stop</button>
                                                                <button type="button" id="reset" class="btn-reset-session">Reset</button>
                                                        </div>
                                                        
                                                </div>
                                        </div>
                                        <div class="list-of-exercises">
                
                                        </div>
                                                
                                        
                                </div>
                        </main>`;
                        }
                }
                const StrengthBuild = {
                        render: () => {
                                return `<main class="main main_workout main_workout_strength-building">
                                <div class="workout container">
                                        
                                        <div id="fat-burning" class="workout-program workout-program_strength-build">
                                                <h3>Strength building</h3>
                                                <div class="workout-program__choose-level">
                                                        <button type="button" id="beginner" class="btn-level beginner">Beginner</button>
                                                        <button type="button" id="intermediate" class="btn-level intermediate">Intermediate</button>
                                                        <button type="button" id="advanced" class="btn-level advanced">Advanced</button>
                                                </div>
                                                <div class="buttons">
                                                        <button type="button" class="btn-begin">Begin!</button>
                                                        <button type="button" class="btn-finish hidden">Finish</button>
                                                </div>
                                                <div class="stop-watch hidden">
                                                        <h2 id="display-time" class="display-time">00:00:00</h2>
                                                        <div class="stop-watch__buttons">
                                                                <button type="button" id="start" class="btn-start-session">Start</button>
                                                                <button type="button" id="stop" class="btn-stop-session">Stop</button>
                                                                <button type="button" id="reset" class="btn-reset-session">Reset</button>
                                                        </div>
                                                        
                                                </div>
                                        </div>
                                        <div class="list-of-exercises">
                
                                        </div>
                                                
                                        
                                </div>
                        </main>`;
                        }
                }
                const RepBuild = {
                        render: () => {
                                return `<main class="main main_workout main_workout_rep-building">
                                <div class="workout container">
                                        
                                        <div id="fat-burning" class="workout-program workout-program_rep-build">
                                                <h3>Rep building</h3>
                                                <div class="workout-program__choose-level">
                                                        <button type="button" id="beginner" class="btn-level beginner">Beginner</button>
                                                        <button type="button" id="intermediate" class="btn-level intermediate">Intermediate</button>
                                                        <button type="button" id="advanced" class="btn-level advanced">Advanced</button>
                                                </div>
                                                <div class="buttons">
                                                        <button type="button" class="btn-begin">Begin!</button>
                                                        <button type="button" class="btn-finish hidden">Finish</button>
                                                </div>
                                                <div class="stop-watch hidden">
                                                        <h2 id="display-time" class="display-time">00:00:00</h2>
                                                        <div class="stop-watch__buttons">
                                                                <button type="button" id="start" class="btn-start-session">Start</button>
                                                                <button type="button" id="stop" class="btn-stop-session">Stop</button>
                                                                <button type="button" id="reset" class="btn-reset-session">Reset</button>
                                                        </div>
                                                        
                                                </div>
                                        </div>
                                        <div class="list-of-exercises">
                
                                        </div>
                                                
                                        
                                </div>
                        </main>`;
                        }
                }
                const MuscleBuild = {
                        render: () => {
                                return `<main class="main main_workout main_workout_muscle-build">
                                <div class="workout container">
                                        
                                        <div id="fat-burning" class="workout-program workout-program_muscle-build">
                                                <h3>Muscle building</h3>
                                                <div class="workout-program__choose-level">
                                                        <button type="button" id="beginner" class="btn-level beginner">Beginner</button>
                                                        <button type="button" id="intermediate" class="btn-level intermediate">Intermediate</button>
                                                        <button type="button" id="advanced" class="btn-level advanced">Advanced</button>
                                                </div>
                                                <div class="buttons">
                                                        <button type="button" class="btn-begin">Begin!</button>
                                                        <button type="button" class="btn-finish hidden">Finish</button>
                                                </div>
                                                <div class="stop-watch hidden">
                                                        <h2 id="display-time" class="display-time">00:00:00</h2>
                                                        <div class="stop-watch__buttons">
                                                                <button type="button" id="start" class="btn-start-session">Start</button>
                                                                <button type="button" id="stop" class="btn-stop-session">Stop</button>
                                                                <button type="button" id="reset" class="btn-reset-session">Reset</button>
                                                        </div>
                                                        
                                                </div>
                                        </div>
                                        <div class="list-of-exercises">
                
                                        </div>
                                                
                                        
                                </div>
                        </main>`;
                        }
                }
                const Error404Component = {
                  render: (className = "container") => {
                    return `
                      <section class="${className}">
                        <h1>Ошибка 404</h1>
                        <p>Страница не найдена, попробуйте вернуться на <a href="#main">главную</a>.</p>
                      </section>
                    `;
                  }
                };
          
                const router = {
                  main: MainComponent,
                  login: LoginForm,
                  create: Slider,
                  account: AccountPage,
                  goals: ToDoList,
                  nutrition: Recipes,
                  library: WorkoutLibrary,
                  programs: WorkoutPrograms,
                  fatburn: FatBurn,
                  strength: StrengthBuild,
                  rep: RepBuild,
                  muscle: MuscleBuild,
                  error: Error404Component
                };
          
                function updateState() {
                  const hashPageName = location.hash.slice(1).toLowerCase();
                  let routeName = null;
          
                  if (hashPageName.length > 0) {
                    routeName = hashPageName in router ? hashPageName : "error";
                  }
          
                  document.body.innerHTML = router[routeName].render();
                 
                  //updateButtons();
                };
          
                function updateButtons() { // пробегаемся по меню и выставляем класс active для ссылок
                  let menuLinks = ui.navContainer.querySelectorAll(".mainmenu__link");
                  const state = location.hash.toLowerCase();
          
                  for (let link of menuLinks) {
                    state === link.getAttribute("href") ? link.classList.add("active") : link.classList.remove("active");
                  }
                };
          
                return {
                  init: function() {
                    // вешаем слушателей на событие hashchange и кликам по пунктам меню
                    window.addEventListener("hashchange", updateState);
                    window.addEventListener("hashchange", buildCreateAccount);
                    window.addEventListener("hashchange", query);
                    window.addEventListener("hashchange", login);
                    window.addEventListener("hashchange", buildAccountPage);
                    window.addEventListener("hashchange", buildToDoList);
                    window.addEventListener("hashchange", buildRecipes);
                    window.addEventListener("hashchange", buildLibrary);
                    window.addEventListener("hashchange", buildProgramFatBurn);
                    window.addEventListener("hashchange", buildProgramStrength);
                    window.addEventListener("hashchange", buildProgramRep);
                    window.addEventListener("hashchange", buildProgramMuscle);
          
                    //вызываем первую отрисовку
                    location.hash.slice(1) ? updateState() : location.hash = "#main";
                  }
                }
              })();
          
        document.addEventListener("DOMContentLoaded", mySPA.init()); 
        // document.addEventListener('DOMContentLoaded', buildCreateAccount);

        function buildCreateAccount(){
                let mainAccountCreate = document.createElement('div');

                
        
                let genderFlag = null;
                function genderChoose() {
                        let prev = null;
                        let genderContainer = document.querySelector('.gender');
                        let male = document.querySelector('.gender__male');
                        highlight(male);
                        
                        genderContainer.addEventListener('click', function(event) {
                                let btn = event.target.closest('.gender-type');
                                if (!btn) return;
                                highlight(btn);
                                
                        })
                        function highlight(el) {
                                if (prev) {//prev
                                        prev.classList.remove('active');
                                }
                                prev = el;
                                prev.classList.add('active');
                                genderFlag = el.id;
                                console.log(el.id);
                                
                        }
                }
                genderChoose();
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                let heightFlag = null;
                function buildHeight(){
                        let cmBtn = document.querySelector('.cm');
                        let inBtn = document.querySelector('.in');
                        let chose = document.querySelector('.cm-or-inch');
                        let listOfHeights = document.querySelector('.height-list');
                        let selectField = document.querySelector('.selectField');
                        let selectText = document.querySelector('#selectText');
                        let options = document.querySelectorAll('.option');
                        let iconArrow = document.querySelector('.icon-circle-down'); 
                        
                        
                        let measure = '';
                        listOfHeights.addEventListener('click', function(event){
                                let el = event.target;
                                heightFlag = el.id;
                                selectText.textContent = el.id;
                                
                                listOfHeights.classList.toggle('hidden');
                                iconArrow.classList.toggle('rotate');
                                
                        })

                        selectField.addEventListener('click', function() {
                                listOfHeights.classList.toggle('hidden');
                                iconArrow.classList.toggle('rotate');
                                
                        })

                        chose.addEventListener('click', function(event) {
                                let el = event.target;
                                measure = el.className === 'cm active' ? 'cm' : 'in';
                                console.log(measure);
                                //console.log(measure);     
                                if (measure === 'cm') {
                                        if (isNaN(selectText.textContent)){
                                                selectText.textContent = 'Choose height';
                                        } else{
                                                selectText.textContent = Math.round((selectText.textContent * 2.535));
                                        }
                                        
                                        fillSelectCm();
                                } else if (measure === 'in'){
                                        if (isNaN(selectText.textContent)){
                                                selectText.textContent = "Choose height";
                                        } else{
                                                selectText.textContent = Math.round((selectText.textContent / 2.535));
                                        }
                                        fillSelectIn();
                                }
                                
                        })
                        
                        cmBtn.addEventListener('click', function() {
                                cmBtn.classList.add('active');
                                inBtn.classList.remove('active');
                                
                                
                        })
                        inBtn.addEventListener('click', function() {
                                inBtn.classList.add('active');
                                cmBtn.classList.remove('active');
                                
                                
                        })

                        function fillSelectCm() {
                                
                                        let res = ``;
                                        for (let i = 100; i <= 250; i++) {
                                                res += `<li id='${i}' class='option'>${i}</li>`;
                                        }
                                        listOfHeights.innerHTML = res;
                                        
                                
                        }
                        fillSelectCm();
                        function fillSelectIn() {
                                
                                        let res = ``;
                                        for (let i = 39; i <= 98; i++) {
                                                res += `<li id='${i}' class='option'>${i}</li>`;
                                        }
                                        listOfHeights.innerHTML = res;
                                
                        }
                }
                buildHeight();

                let weightFlag = null;
                function buildWeight(){
                        let kgBtn = document.querySelector('.kg');
                        let lbBtn = document.querySelector('.lb');
                        let chose = document.querySelector('.kg-or-lb');
                        let listOfWeights = document.querySelector('.weight-list');
                        let selectField = document.querySelector('.weight .selectField');
                        let selectText = document.querySelector('.weight #selectText');
                        let options = document.querySelectorAll('.weight .option');
                        let iconArrow = document.querySelector('.icon-circle-down'); 
                        
                        
                        let measure = '';
                        listOfWeights.addEventListener('click', function(event){
                                let el = event.target;
                                weightFlag = el.id;
                                selectText.textContent = el.id;
                                listOfWeights.classList.toggle('hidden');
                                iconArrow.classList.toggle('rotate');
                        })

                        selectField.addEventListener('click', function() {
                                listOfWeights.classList.toggle('hidden');
                                iconArrow.classList.toggle('rotate');
                        })

                        chose.addEventListener('click', function(event) {
                                let el = event.target;
                                measure = el.className === 'kg active' ? 'kg' : 'lb';
                                //console.log(measure);     
                                if (measure === 'kg') {
                                        if (isNaN(selectText.textContent)){
                                                selectText.textContent = 'Choose weight';
                                        } else{
                                                selectText.textContent = Math.round((selectText.textContent / 2.2));
                                        }
                                        
                                        fillSelectKg();
                                } else if (measure === 'lb'){
                                        if (isNaN(selectText.textContent)){
                                                selectText.textContent = "Choose weight";
                                        } else{
                                                selectText.textContent = Math.round((selectText.textContent * 2.2));
                                        }
                                        fillSelectLb();
                                }
                                
                        })
                        
                        kgBtn.addEventListener('click', function() {
                                kgBtn.classList.add('active');
                                lbBtn.classList.remove('active');
                                
                                
                        })
                        lbBtn.addEventListener('click', function() {
                                lbBtn.classList.add('active');
                                kgBtn.classList.remove('active');
                                
                                
                        })

                        function fillSelectKg() {
                                
                                        let res = ``;
                                        for (let i = 40; i <= 150; i++) {
                                                res += `<li id='${i}' class='option'>${i}</li>`;
                                        }
                                        listOfWeights.innerHTML = res;
                                
                        }
                        fillSelectKg();
                        function fillSelectLb() {
                                
                                        let res = ``;
                                        for (let i = 88; i <= 330; i++) {
                                                res += `<li id='${i}' class='option'>${i}</li>`;
                                        }
                                        listOfWeights.innerHTML = res;
                                
                        }
                }
                buildWeight();
                ///////////////////////////////////////////////////////////////////////
                let levelFlag = null;
                function buildLevel() {
                        let prev = null;
                        let levelContainer = document.querySelector('.level');
                        let beginner = document.querySelector('.level .beginner');
                        levelFlag = beginner.querySelector('.level-option__title').textContent;
                        highlight(beginner);
                        levelContainer.addEventListener('click', function(event) {
                                let btn = event.target.closest('div');
                                let title = btn.querySelector('.level-option__title');
                                levelFlag = title.textContent;
                                if (!btn) return;
                                highlight(btn);
                                
                        })
                        function highlight(el) {
                                if (prev) {//prev
                                        prev.classList.remove('active');
                                }
                                prev = el;
                                prev.classList.add('active');
                                
                        }
                }
                buildLevel();

                let goalsFlag = {};
                function buildGoals() {
                        
                        let goalsContainer = document.querySelector('.goals');
                        let muscleBuildOption = goalsContainer.querySelector('.muscle');
                        let loseFatOption = goalsContainer.querySelector('.fat-loss');
                        muscleBuildOption.classList.add('active');
                        loseFatOption.classList.add('active');

                        goalsFlag[muscleBuildOption.id] = muscleBuildOption.querySelector('.goals__option__title').textContent;
                        goalsFlag[loseFatOption.id] = loseFatOption.querySelector('.goals__option__title').textContent;

                        goalsContainer.addEventListener('click', function(event) {
                                let btn = event.target.closest('div');
                                goalsFlag[btn.id] = btn.querySelector('.goals__option__title').textContent;
                                if (!btn) return;
                                btn.classList.toggle('active');
                                if (!btn.className.includes('active')) {
                                        delete goalsFlag[btn.id];
                                }
                                
                        })
                        
                }
                buildGoals();

                let perfomanceFlag = {};
                function buildPerfomance() {

                        let perfomance = document.querySelector('.main_slider .perfomance');
                        let listOfInputs = perfomance.querySelectorAll('input');
                        
                        let errorModal = document.createElement('div');
                        errorModal.textContent = `The value mustn't be empty or negative`;
                        errorModal.classList.add('error-modal');
                        perfomance.append(errorModal);
                        
                        for (let el of listOfInputs){
                                el.onblur = function() {
                                        if (!el.value || el.value < 0) {
                                                errorModal.classList.add('show');
                                        } else {
                                                errorModal.classList.remove('show');
                                        }
                                        
                                        if(el.value > 0 && el.value !== ''){
                                                perfomanceFlag[el.id] = el.value;
                                        }
                                }
                        }
                        
                }
                buildPerfomance();
                function buildRegForm(){
                        
                        let signUpForm = document.querySelector('.registration .form');
                        let userNameInput = document.querySelector('.registration .form #user-name');
                        let fullNameInput = document.querySelector('.registration .form #full-name');
                        let emailInput = document.querySelector('.registration .form #email');
                        let passwordInput = document.querySelector('.registration .form #password');
                        let passwordEye = document.querySelector('.fa-solid');
                        let btnCreate = document.querySelector('.registration .form .form__btn.create');
                        let btnSave = document.querySelector('.registration .form .form__btn.save');
                        let userData = {};
                        btnSave.setAttribute('disabled', 'disabled');
                        btnSave.classList.add('disabled');
                        btnSave.addEventListener('click', save);
                        btnSave.addEventListener('click', saveToBase);
                        btnSave.addEventListener('click', addUser);
                        //btnCreate.addEventListener('click', createAccount);

                        let errorModal = document.createElement('div');
                        errorModal.textContent = `The length of your input must be at least 10 symbols or check if your email contains "@"`;
                        errorModal.classList.add('error-modal');
                        signUpForm.append(errorModal);
                        

                        userNameInput.addEventListener('input', removeDisBtn);
                        fullNameInput.addEventListener('input', removeDisBtn);
                        emailInput.addEventListener('input', removeDisBtn);
                        passwordInput.addEventListener('input', removeDisBtn);
                        
                        
                        function removeDisBtn() {
                                if((!userNameInput.value || userNameInput.value.length < 5) 
                                || (!fullNameInput.value || userNameInput.value.length < 5) 
                                || (!emailInput.value || emailInput.value.length < 5 || !emailInput.value.includes('@')) 
                                || (!passwordInput.value || passwordInput.value.length < 5)){
                                        btnSave.setAttribute('disabled', 'disabled');
                                        btnSave.classList.add('disabled');
                                        errorModal.classList.add('show');
                                } else{
                                        btnSave.removeAttribute('disabled');
                                        btnSave.classList.remove('disabled');
                                        errorModal.classList.remove('show');
                                }
                        }

                        function save(event){
                                
                                event.preventDefault();
                                
                                userData['username'] = userNameInput.value;
                                userData['fullName'] = fullNameInput.value;
                                userData['email'] = emailInput.value;
                                userData['gender'] = genderFlag;
                                userData['height'] = heightFlag;
                                userData['weight'] = weightFlag;
                                userData['level'] = levelFlag;
                                userData['goals'] = goalsFlag;
                                userData['perfomance'] = perfomanceFlag;

                                for (let key in userData){
                                        if (!userData[key]){
                                                userData[key] = "Haven't specified:(";
                                        }
                                }

                                //localStorage.setItem('userData', JSON.stringify(userData));
                                //clearingValues();

                                //btnCreate.setAttribute('disabled', 'disabled');
                                
                                
                                //clearingValues();
                        
                                btnSave.setAttribute('disabled', 'disabled');
                                btnSave.classList.add('disabled');
                                btnCreate.classList.remove('hidden');

                                // buildAccountPage();
        
                                //window.location.href = "https://www.google.com/";
                        };
                        function saveToBase() {
                                let email = emailInput.value;
                                let password = passwordInput.value
                                username = userNameInput.value;
                                let fullName = fullNameInput.value;
                                
        
                                set(ref(database, 'users/' + username), {
      
                                        userData: userData
                                });
                                console.log('saved');
                        }
                        function addUser() {
                                let email = emailInput.value;
                                let password = passwordInput.value
                                username = userNameInput.value;
                                let fullName = fullNameInput.value;

                                createUserWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                        const user = userCredential.user;

                                        set(ref(database, 'users/' + user.username),{
                                                userData: userData
                                        })
                                        console.log('added');
                                        
                                })
                                .catch((error) => {
                                        console.log(error);
                                })
                        }
                        function clearingValues() {
                                userNameInput.value = '';
                                fullNameInput.value = '';
                                emailInput.value = '';
                                passwordInput.value = '';
                        }

                        passwordEye.addEventListener('click',function() {
                                this.classList.toggle('fa-eye');
                                let type = passwordInput.getAttribute('type');
                                if (type === 'password') {
                                        passwordInput.setAttribute('type', 'text');
                                } else {
                                        passwordInput.setAttribute('type', 'password');
                                }
                        })





                
                
                }
                buildRegForm();          
                

        }
           
        function query(){
                $(document).ready(function(){
                        $('.slider').slick({
                        arrows:true,
                        speed:500,
                        infinite: false,
                        touchThreshold: 10,
                        fade:true,
                        draggable:false,
                        responsive:[
                                {
                                        breakpoint: 768,
                                        settings:{
        
                                        }
                                },
                                {
                                        breakpoint: 480,
                                        settings:{
                                                
                                        }
                                }
                        ],
                        prevArrow: '<button class="slick-arrrow slick-prev">Back</button>',
                        nextArrow: '<button class="slick-arrow slick-next">Next</button>',
                        appendArrows:$('.buttons'),
                        
        
                });
                $('.slider').slick('setPosition');
                
                
        
                $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                        console.log(currentSlide);
                        $('.slick-arrow.slick-next').attr('disabled', false);
                        $('.slick-arrow.slick-next').css('opacity', '1');
                        switch(nextSlide) {
                                
                                case 2:
                                        $('.slick-arrow.slick-next').attr('disabled', false);
                                        $('.slick-arrow.slick-next').css('opacity', '1');
                                        break;
                                case 3:
                                        // $('.slick-arrow.slick-next').attr('disabled', true);
                                        // $('.slick-arrow.slick-next').css('opacity', "0.2");
                                        // // console.log($('.slick-arrow'));
                                        // $('.level').on('click', function(event){
                                        //         let option = event.target.closest('.level-option');
                                        //         if (option) {
                                        //                 $('.slick-arrow.slick-next').attr('disabled', false);
                                        //                 $('.slick-arrow.slick-next').css('opacity', "1");  
                                        //         }
                                        // })
                                        $('.slick-arrow.slick-next').attr('disabled', false);
                                        $('.slick-arrow.slick-next').css('opacity', '1');
                                        break;
                                case 4:
                                        
                                        // $('.slick-arrow.slick-next').attr('disabled', true);
                                        // $('.slick-arrow.slick-next').css('opacity', "0.2");
                                        // $('.goals').on('click', function(event){
                                        //         let option = event.target.closest('.goals__option');
                                        //         //console.log(option);
                                        //         if (!option) {
                                        //                 $('.slick-arrow.slick-next').attr('disabled', true);
                                        //                 $('.slick-arrow.slick-next').css('opacity', ".2");  
                                        //         }
                                        // })
                                        $('.slick-arrow.slick-next').attr('disabled', false);
                                        $('.slick-arrow.slick-next').css('opacity', '1');
                                        break;
                                case 5:
                                        if (($('#dips').val() === '' || $('#dips').val() < 0) 
                                        || ($('#pullups').val() === '' || $('#pullups').val() < 0) 
                                        || ($('#squats').val() === '' || $('#squats').val() < 0) 
                                        || ($('#pushups').val() === '' || $('#pushups').val() < 0)){
                                                $('.slick-arrow.slick-next').attr('disabled', true);
                                                $('.slick-arrow.slick-next').css('opacity', "0.2");
                                        }
                                        
                                        $('#dips').on('input', checkPerfomance);
                                        $('#squats').on('input', checkPerfomance);
                                        $('#pullups').on('input', checkPerfomance);
                                        $('#pushups').on('input', checkPerfomance);
        
                                        function checkPerfomance() {
                                
        
                                                if(($('#dips').val() === '' || $('#dips').val() < 0) 
                                                || ($('#pullups').val() === '' || $('#pullups').val() < 0) 
                                                || ($('#squats').val() === '' || $('#squats').val() < 0) 
                                                || ($('#pushups').val() === '' || $('#pushups').val() < 0)){
                                                        $('.slick-arrow.slick-next').attr('disabled', true);
                                                        $('.slick-arrow.slick-next').css('opacity', "0.2");
                                                } else {
                                                        $('.slick-arrow.slick-next').attr('disabled', false);
                                                        $('.slick-arrow.slick-next').css('opacity', "1");
                                                }
                                        };
                                        break;
                                // case 6:
                                //         $('.slick-arrow.slick-next').attr('disabled', true);
                                //         $('.slick-arrow.slick-next').css('opacity', "0.2");
                                       
                                        
                                //         break;
                                
        
                        }
                        
                                
                         
                });
        }); 
        }
        function login() {
                const btnLog = document.querySelector('.login .form__btn');

                btnLog.addEventListener('click', (e) => {
                        console.log('kek');
                        username = document.querySelector('.login #username').value;
                        const email = document.querySelector('.login #email').value;
                        const password = document.querySelector('.login #password').value;
                        let flag = 'logged!';
                
                        signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                                // Signed in 
                                const user = userCredential.user;
                                
                                // update(ref(database, 'users/' + `username/${email}` ),{
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

        function buildAccountPage(){

                                let btnLogOut = document.querySelector('.account__title');
                                let btnEdit = document.querySelector('.account__btn.edit');
                                let btnSave = document.querySelector('.account__btn.save');
                                let accountField = document.querySelectorAll('.account__field');
                                let data = document.querySelectorAll('.account__field p');
                                let usernameField = document.querySelector('.account__field .username');
                                let fullNameField = document.querySelector('.account__field .fullname');
                                let emailField = document.querySelector('.account__field .email');
                                let genderField = document.querySelector('.account__field .gender');
                                let heightField = document.querySelector('.account__field .height');
                                let weightField = document.querySelector('.account__field .weight');
                                let levelField = document.querySelector('.account__field .level');
                                let goalsField = document.querySelector('.account__field .goals');
                                let pullUps = document.querySelector('.account__field .pullups');
                                let pushUps = document.querySelector('.account__field .pushups');
                                let dips = document.querySelector('.account__field .dips');
                                let squats = document.querySelector('.account__field .squats');

                                // let btnLogOut = document.querySelector('i.fa-solid.fa-right-from-bracket');
                                // btnLogOut.addEventListener('click', logOut);
                                
                                
                                function read() {
                
                                        
                                
                                        let userRef = ref(database, 'users/' + username);
                                        onValue(userRef, (snapshot) => {
                                                const data = snapshot.val();
                                                usernameField.textContent = data.userData.username;
                                                fullNameField.textContent = data.userData.fullName;
                                                emailField.textContent = data.userData.email;
                                                genderField.textContent = data.userData.gender;
                                                heightField.textContent = data.userData.height;
                                                weightField.textContent = data.userData.weight;
                                                levelField.textContent = data.userData.level;
                                                pullUps.textContent = data.userData.perfomance.pullups;
                                                pushUps.textContent = data.userData.perfomance.pushups;
                                                dips.textContent = data.userData.perfomance.dips;
                                                squats.textContent = data.userData.perfomance.squats;
                                                console.log(data.userData.gender);
                
                                                let res = ``;
                                                for (let key in data.userData.goals) {
                                                        res += `<li>${data.userData.goals[key]}</li>`;
                                                }
                                                goalsField.innerHTML = res;
                                                console.log(data.userData.goals);
                
                                        });
                                } 
                                read();
                                
                                let editInfo = function(){
                                        
                                        btnSave.classList.remove('hidden');
                                        
                                        for(let item of accountField){
                                                item.addEventListener('click', changeInput);
                                        }
                        
                                        function changeInput(event){
                                                let el = event.target.closest('p');
                                                el.innerHTML = `<input value ="${el.textContent}">`;
                                                
                                                let itemInput = el.firstChild;
                                                let end = itemInput.value.length;
                                                itemInput.setSelectionRange(end, end);
                                                
                                                itemInput.focus();
                        
                                                itemInput.onblur = function (){
                                                        el.textContent = `${itemInput.value}`;
                                                        
                                                } 

                                        }

                                        function updateInfo() {
                                                //        btnSave.classList.add('hidden');
                                                //         btnEdit.disabled = false;
                                                        update(ref(database, 'users/' + username),{
                                                                
                                                                userData : {
                                                                        username:usernameField.textContent,
                                                                        fullName:fullNameField.textContent,
                                                                        email:emailField.textContent,
                                                                        gender: genderField.textContent,
                                                                        level:levelField.textContent,
                                                                        height:heightField.textContent,
                                                                        weight:weightField.textContent,
                                                                        goals:goalsField.textContent,
                                                                        performance: {
                                                                                pullups: pullUps.textContent,
                                                                                pushups: pushUps.textContent,
                                                                                dips: dips.textContent,
                                                                                squats: squats.textContent
                                                                        }
                                                                }
                                                                
                                                                
                                                        }) 
                                                        .then(()=>{
                                                                console.log('data updated successfully');
                                                        })
                                                        .catch((error)=>{
                                                                console.log(error);
                                                        });
                                                }
                                        btnSave.addEventListener('click', updateInfo);

                                }
                                btnEdit.addEventListener('click', editInfo);

                                function logOut(event) {
                                                
                                        console.log('kek');
                                        if(event.target.id === 'log-out') {
                                              
                                                signOut(auth).then(() =>{
                                                        window.location.hash = "#main";
                                                        console.log('logged out');
                                                }).catch((error) => {
                                                        console.log(error);
                                                })  
                                        }
                                        
                                }
                                btnLogOut.addEventListener('click', logOut);

                                
                                
                                
        }
        function buildToDoList(){
                                const todoInput = document.querySelector(".todo-input");
                            const todoButton = document.querySelector(".todo-button");
                            const todoList = document.querySelector(".todo-list");
                            const filterOption = document.querySelector(".filter-todo");
            
                            document.addEventListener("DOMContentLoaded", getLocalTodos);
                            todoButton.addEventListener("click", addTodo);
                            todoList.addEventListener("click", deleteCheck);
                            filterOption.addEventListener("change", filterTodo);
            
                            function addTodo(event) {
                            event.preventDefault();
                            const todoDiv = document.createElement("div");
                            todoDiv.classList.add("todo");
                            const newTodo = document.createElement("li");
                            newTodo.innerText = todoInput.value; 
                            newTodo.classList.add("todo-item");
                            todoDiv.appendChild(newTodo);
                            //ADDING TO LOCAL STORAGE 
                            saveLocalTodos(todoInput.value);
                            
                            const completedButton = document.createElement("button");
                            completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
                            completedButton.classList.add("complete-btn");
                            todoDiv.appendChild(completedButton);
            
                            const trashButton = document.createElement("button");
                            trashButton.innerHTML = '<i class="fas fa-trash"></li>';
                            trashButton.classList.add("trash-btn");
                            todoDiv.appendChild(trashButton);
                            
                            todoList.appendChild(todoDiv);
                            todoInput.value = "";
                            }
            
                            function deleteCheck(e) {
                            const item = e.target;
            
                            if(item.classList[0] === "trash-btn") {
                                    const todo = item.parentElement;
                                    todo.classList.add("slide");
            
                                    removeLocalTodos(todo);
                                    todo.addEventListener("transitionend", function() {
                                    todo.remove();
                                    });
                            }
            
                            if(item.classList[0] === "complete-btn") {
                                    const todo = item.parentElement;
                                    todo.classList.toggle("completed");
                            }
                            }
            
                            function filterTodo(e) {
                            const todos = todoList.childNodes;
                            todos.forEach(function(todo) {
                                    switch(e.target.value) {
                                    case "all": 
                                            todo.style.display = "flex";
                                            break;
                                    case "completed": 
                                            if(todo.classList.contains("completed")) {
                                            todo.style.display = "flex";
                                            } else {
                                            todo.style.display = "none";
                                            }
                                            break;
                                    case "incomplete":
                                            if(!todo.classList.contains("completed")) {
                                            todo.style.display = "flex";
                                            } else {
                                            todo.style.display = "none";
                                            }
                                            break;
                                    }
                            });
                            }
            
                            function saveLocalTodos(todo) {
                            let todos;
                            if(localStorage.getItem("todos") === null) {
                                    todos = [];
                            } else {
                                    todos = JSON.parse(localStorage.getItem("todos"));
                            }
                            todos.push(todo);
                            localStorage.setItem("todos", JSON.stringify(todos));
                            }
            
                            function getLocalTodos() {
                            let todos;
                            if(localStorage.getItem("todos") === null) {
                                    todos = [];
                            } else {
                                    todos = JSON.parse(localStorage.getItem("todos"));
                            }
                            todos.forEach(function(todo) {
                                    const todoDiv = document.createElement("div");
                                    todoDiv.classList.add("todo");
                                    const newTodo = document.createElement("li");
                                    newTodo.innerText = todo;
                                    newTodo.classList.add("todo-item");
                                    todoDiv.appendChild(newTodo);
            
                                    const completedButton = document.createElement("button");
                                    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
                                    completedButton.classList.add("complete-btn");
                                    todoDiv.appendChild(completedButton);
            
                                    const trashButton = document.createElement("button");
                                    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
                                    trashButton.classList.add("trash-btn");
                                    todoDiv.appendChild(trashButton);
            
                                    todoList.appendChild(todoDiv);
                            });
                            }
            
                            function removeLocalTodos(todo) {
                            let todos;
                            if(localStorage.getItem("todos") === null) {
                                    todos = [];
                            } else {
                                    todos = JSON.parse(localStorage.getItem("todos"));
                            }
            
                            const todoIndex = todo.children[0].innerText;
                            todos.splice(todos.indexOf(todoIndex), 1);
                            localStorage.setItem("todos", JSON.stringify(todos));
                            }
        }
        function buildRecipes(){
                const searchBtn = document.getElementById('search-btn');
        const mealList = document.querySelector('.meal');
        const mealDetailsContent = document.querySelector('.meal-details-content');
        const recipeCloseBtn = document.getElementById('recipe-close-btn');

        searchBtn.addEventListener('click', getMealList);
        mealList.addEventListener('click', getMealRecipe);
        recipeCloseBtn.addEventListener('click', function() {
                mealDetailsContent.parentElement.classList.remove('showRecipe');
        })
        //get meal list that matches with the ingredients
        function getMealList() {
                let searchInputTxt = document.getElementById('search-input').value.trim();
                let url = 'http://www.themealdb.com/api/json/v1/1/filter.php?i=egg';
                fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
                .then(response => response.json())
                .then(data => {
                        let html = '';
                        if (data.meals){
                                data.meals.forEach(meal => {
                                        html += `
                                        <div class="meal-item" data-id = ${meal.idMeal}>
                                                <div class="meal-img">
                                                        <img src="${meal.strMealThumb}" alt="potato">
                                                </div>
                                                <div class="meal-name">
                                                        <h3>${meal.strMeal}</h3>
                                                        <a href="#" class="recipe-btn">Get recipe</a>
                                                </div>
                                        </div>`;
                                });
                                mealList.classList.remove('notFound');

                        } else {
                                html = 'Sorry, there is no such meal:('
                                mealList.classList.add('notFound');
                        }
                        mealList.innerHTML = html;
                })
        }
        function getMealRecipe(event) {
                event.preventDefault();
                if(event.target.classList.contains('recipe-btn')){
                        let mealItem = event.target.parentElement.parentElement;
                        fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
                        .then(response => response.json())
                        .then(data => mealRecipeModal(data.meals));
                }

        }
        function mealRecipeModal(meal) {
                meal = meal[0];
                let html = `
                                <h2 class="recipe-title">${meal.strMeal}</h2>
                                <p class="recipe-category">${meal.strCategory}</p>
                                <div class="recipe-instruct">
                                        <h3>Instructions:</h3>
                                        
                                        <p>${meal.strInstructions}</p>
                                </div>
                                <div class="recipe-meal-img">
                                        <img src="${meal.strMealThumb}" alt="potato">
                                </div>
                                <div class="recipe-link">
                                        <a href="${meal.strYoutube}" target="_blank">Watch video</a>
                                </div>`;
                mealDetailsContent.innerHTML = html;
                mealDetailsContent.parentElement.classList.add('showRecipe');
        }
        }
        function buildLibrary() {
                const searchBtn = document.getElementById('search-btn');
                const exerciseList = document.querySelector('.exercise');
                const exerciseDetailsContent = document.querySelector('.exercise-details-content');
                const exerciseCloseBtn = document.getElementById('exercise-close-btn');
                const bodyParts = document.querySelector('.body-parts');
                let searchInput= document.getElementById('search-input');
                let overlay = document.querySelector('.overlay.closed');

                bodyParts.addEventListener('click', function(event){
                        let el = event.target.textContent;
                        searchInput.value = el;
                })
                searchBtn.addEventListener('click', getExerciseList);
                exerciseList.addEventListener('click', getExerciseRecipe);
                exerciseCloseBtn.addEventListener('click', function() {
                        exerciseDetailsContent.parentElement.classList.remove('showExercise');
                })
                //get meal list that matches with the ingredients
                function getExerciseList() {
                        let searchInputTxt = document.getElementById('search-input').value.trim();
                        ////////////////
                        const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${searchInputTxt}`;
                        const options = {
                                method: 'GET',
                                headers: {
                                        'X-RapidAPI-Key': '59c6f9ab1bmsh703be949e728a02p1d693djsn1e738b460c06',
                                        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                                }
                        };

                        async function fetchAsyncData() {
                                try {
                                        const response = await fetch(url, options);
                                        const data = await response.json();
                                        function showExercises(data) {
                                                let html = '';
                                                if (data){
                                                        for (let i = 0; i < data.length/5; i++) {
                                                                html += `
                                                                
                                                                <div class="exercise-item" data-id = ${data[i].name}>
                                                                        <button type="button" id="exercise-close-btn" class="btn close-btn">
                                                                                <i class="fas fa-times"></i>
                                                                        </button>
                                                                        <div class="exercise-img">
                                                                                <img src="${data[i].gifUrl}" alt="potato">
                                                                        </div>
                                                                        <div class="exercise-name">
                                                                                <h3>${data[i].name}</h3>
                                                                                <button type="button" class="exercise-btn">Look closer</button>
                                                                        </div>
                                                                </div>`; 
                                                        }
                                                      
                                                exerciseList.classList.remove('notFound');

                                                } else {
                                                        html = 'Sorry, there is no such bodypart:('
                                                        exerciseList.classList.add('notFound');
                                                }
                                                exerciseList.innerHTML = html;
                                        }
                                        showExercises(data);
                                } catch (error) {
                                        console.error(error);
                                }
                        }
                        fetchAsyncData();
                        
                        
                }
                function getExerciseRecipe(event) {
                        event.preventDefault();
                        let item = event.target.closest('.exercise-item');
                        let btnClose = event.target.closest('.btn-close');
                        if(event.target.classList.contains('exercise-btn')){
                                console.log('bum')
                                item.classList.add('opened');
                                overlay.classList.remove('closed');
                        } 
                        if(event.target.classList.contains('fas' || 'close-btn')){
                                item.classList.remove('opened');
                                overlay.classList.add('closed');
                        }


                }
        }
        function buildProgramFatBurn() {
                let prev = null;
        
                let chooseLevel = document.querySelector('.main_workout_fat-burning .workout-program__choose-level');
                let btnBeginner = document.querySelector('.main_workout_fat-burning #beginner');
                let btnIntermediate = document.querySelector('.main_workout_fat-burning #intermediate');
                let btnAdvanced = document.querySelector('.main_workout_fat-burning #advanced');

                let listOfExercises = document.querySelector('.main_workout_fat-burning .list-of-exercises');
                listOfExercises.innerHTML = `<h2>Choose your level</h2>`;
                //let beginnerBtn = chooseLevel.querySelector('#beginner');
                let btnBegin = document.querySelector('.main_workout_fat-burning .btn-begin');
                let btnFinish = document.querySelector('.main_workout_fat-burning .btn-finish');
                let stopWatch = document.querySelector('.main_workout_fat-burning .stop-watch');
                
                // let btnStop = document.querySelector('.btn-stop');
                // let displayTime = document.getElementById('display-time');
                // btnBegin.addEventListener('click', function(){
                //         listOfExercises.innerHTML = `<div>${beginnerBtn.id}</div>`;
                // })
                // highlight(beginnerBtn);
                
                chooseLevel.addEventListener('click', function(event) {
                        let level = null;
                        let btnLevel = event.target.closest('button');

                        let el = event.target;
                        if (!btnLevel) {
                                console.log('kek');
                        };
                        highlight(btnLevel);

                        btnBegin.addEventListener('click', getExercises);
                        

                        btnFinish.addEventListener('click', function() {
                                btnBeginner.disabled = false;
                                btnIntermediate.disabled = false;
                                btnAdvanced.disabled = false;

                                btnBegin.disabled = false;
                                btnBegin.classList.remove('disabled');
                                btnFinish.classList.add('hidden');
                                stopWatch.classList.add('hidden');
                                el.disabled = false;
                                listOfExercises.innerHTML = `<h2>You've finished your training session</h2>`;
                                


                        })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        function getExercises() {
                                
                                buildStopWatch();
                                btnBeginner.disabled = true;
                                btnIntermediate.disabled = true;
                                btnAdvanced.disabled = true;
                                el.disabled = true;
                                btnBegin.disabled = true;
                                btnBegin.classList.add('disabled');
                                stopWatch.classList.remove('hidden');
                                btnFinish.classList.remove('hidden');
                                
                                // btnStop.classList.remove('hidden');
                                // displayTime.classList.remove('hidden');
                                
                                const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/cardio';
                                const options = {
                                        method: 'GET',
                                        headers: {
                                                'X-RapidAPI-Key': '59c6f9ab1bmsh703be949e728a02p1d693djsn1e738b460c06',
                                                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                                        }
                                };
                                
                                async function fetchAsyncData() {
                                try {
                                        const response = await fetch(url, options);
                                        const data = await response.json();
                                        function showExercises(data) {
                                                
                                                if (data && btnLevel.id === 'beginner'){
                                                        let html = `<h2>You've started your training session</h2>`;
                                                        for (let i = 0; i < data.length - 18; i++) {
                                                                
                                                                html += `
                                                                
                                                                
                                                                <div class='option' id="${data[i].name}">
                                                                        <div class='img'>
                                                                                <img src="${data[i].gifUrl}" alt="cardio">        
                                                                        </div>
                                                                        <div class="text">
                                                                                <h4>${data[i].name}</h4>
                                                                                <p>10 reps &#8226; rest 60 seconds</p>
                                                                        </div>
                                                                </div>
                                                                `;
                                                                
                                                        } 
                                                        listOfExercises.innerHTML = html;
                                                        buildStopWatch();       
                                                } else if (data && btnLevel.id === 'intermediate'){
                                                        let html = `<h2>You've started your training session</h2>`;
                                                        for (let i = data.length - 18; i < data.length - 8; i++) {
                                                                
                                                                html += `
                                                                
                                                                
                                                                <div class='option' id="${data[i].name}">
                                                                        <div class='img'>
                                                                                <img src="${data[i].gifUrl}" alt="cardio">        
                                                                        </div>
                                                                        <div class="text">
                                                                                <h4>${data[i].name}</h4>
                                                                                <p>15 reps &#8226; rest 45 seconds</p>
                                                                        </div>
                                                                </div>
                                                                `;
                                                                
                                                                
                                                        }
                                                        listOfExercises.innerHTML = html;
                                                        buildStopWatch();
                                                } else if(data && btnLevel.id === 'advanced'){
                                                        let html = `<h2>You've started your training session</h2>`;
                                                        for (let i = data.length - 8; i < data.length; i++) {
                                                                
                                                                html += `
                                                                
                                                                
                                                                <div class='option' id="${data[i].name}">
                                                                        <div class='img'>
                                                                                <img src="${data[i].gifUrl}" alt="cardio">        
                                                                        </div>
                                                                        <div class="text">
                                                                                <h4>${data[i].name}</h4>
                                                                                <p>20 reps &#8226; rest 30 seconds</p>
                                                                        </div>
                                                                </div>
                                                                `;
                                                                
                                                                
                                                        }
                                                        listOfExercises.innerHTML = html;
                                                        buildStopWatch();
                                                }
                                                
                                                
                                                
                                        }
                                        showExercises(data);
                                } catch (error) {
                                        console.error(error);
                                }
                                }
                                fetchAsyncData();
                                
                }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                       



                })
                
                function highlight(el) {
                        if (prev) {//prev
                                prev.classList.remove('active');
                        }
                        prev = el;
                        prev.classList.add('active');
                        // genderFlag = el.id;
                        // console.log(el.id);
                        
                }
                
                
        }
        function buildProgramStrength() {
                let prev = null;
        
                let chooseLevel = document.querySelector('.main_workout_strength-building .workout-program__choose-level');
                let btnBeginner = document.querySelector('.main_workout_strength-building #beginner');
                let btnIntermediate = document.querySelector('.main_workout_strength-building #intermediate');
                let btnAdvanced = document.querySelector('.main_workout_strength-building #advanced');

                let listOfExercises = document.querySelector('.main_workout_strength-building .list-of-exercises');
                listOfExercises.innerHTML = `<h2>Choose your level</h2>`;
                //let beginnerBtn = chooseLevel.querySelector('#beginner');
                let btnBegin = document.querySelector('.main_workout_strength-building .btn-begin');
                let btnFinish = document.querySelector('.main_workout_strength-building .btn-finish');
                let stopWatch = document.querySelector('.main_workout_strength-building .stop-watch');
                
                // let btnStop = document.querySelector('.btn-stop');
                // let displayTime = document.getElementById('display-time');
                // btnBegin.addEventListener('click', function(){
                //         listOfExercises.innerHTML = `<div>${beginnerBtn.id}</div>`;
                // })
                // highlight(beginnerBtn);
                
                chooseLevel.addEventListener('click', function(event) {
                        let level = null;
                        let btnLevel = event.target.closest('button');

                        let el = event.target;
                        if (!btnLevel) {
                                console.log('kek');
                        };
                        highlight(btnLevel);

                        btnBegin.addEventListener('click', getExercises);
                        

                        btnFinish.addEventListener('click', function() {
                                btnBeginner.disabled = false;
                                btnIntermediate.disabled = false;
                                btnAdvanced.disabled = false;

                                btnBegin.disabled = false;
                                btnBegin.classList.remove('disabled');
                                btnFinish.classList.add('hidden');
                                stopWatch.classList.add('hidden');
                                el.disabled = false;
                                listOfExercises.innerHTML = `<h2>You've finished your training session</h2>`;
                                


                        })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        function getExercises() {
                                
                                buildStopWatch();
                                btnBeginner.disabled = true;
                                btnIntermediate.disabled = true;
                                btnAdvanced.disabled = true;
                                el.disabled = true;
                                btnBegin.disabled = true;
                                btnBegin.classList.add('disabled');
                                stopWatch.classList.remove('hidden');
                                btnFinish.classList.remove('hidden');
                                
                                // btnStop.classList.remove('hidden');
                                // displayTime.classList.remove('hidden');
                                
                                const url = 'https://exercisedb.p.rapidapi.com/exercises/equipment/barbell';
                                const options = {
                                        method: 'GET',
                                        headers: {
                                                'X-RapidAPI-Key': '59c6f9ab1bmsh703be949e728a02p1d693djsn1e738b460c06',
                                                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                                        }
                                };
                                
                                
                                async function fetchAsyncData() {
                                try {
                                        const response = await fetch(url, options);
                                        const data = await response.json();
                                        function showExercises(data) {
                                                
                                                if (data && btnLevel.id === 'beginner'){
                                                        let html = `<h2>You've started your training session</h2>`;
                                                        
                                                        for (let i = 0; i < data.length - 22; i++) {
                                                                
                                                                html += `
                                                                
                                                                
                                                                <div class='option' id="${data[i].name}">
                                                                        <div class='img'>
                                                                                <img src="${data[i].gifUrl}" alt="cardio">        
                                                                        </div>
                                                                        <div class="text">
                                                                                <h4>${data[i].name}</h4>
                                                                                <p>5 reps &#8226; rest 3 min</p>
                                                                        </div>
                                                                </div>
                                                                `;
                                                                
                                                        } 
                                                        listOfExercises.innerHTML = html;
                                                        buildStopWatch();       
                                                } else if (data && btnLevel.id === 'intermediate'){
                                                        let html = `<h2>You've started your training session</h2>`;
                                                        for (let i = data.length - 22; i < data.length - 12; i++) {
                                                                
                                                                html += `
                                                                
                                                                
                                                                <div class='option' id="${data[i].name}">
                                                                        <div class='img'>
                                                                                <img src="${data[i].gifUrl}" alt="cardio">        
                                                                        </div>
                                                                        <div class="text">
                                                                                <h4>${data[i].name}</h4>
                                                                                <p>7 reps &#8226; rest 2.5 min</p>
                                                                        </div>
                                                                </div>
                                                                `;
                                                                
                                                                
                                                        }
                                                        listOfExercises.innerHTML = html;
                                                        buildStopWatch();
                                                } else if(data && btnLevel.id === 'advanced'){
                                                        let html = `<h2>You've started your training session</h2>`;
                                                        for (let i = data.length - 12; i <= data.length; i++) {
                                                                
                                                                html += `
                                                                
                                                                
                                                                <div class='option' id="${data[i].name}">
                                                                        <div class='img'>
                                                                                <img src="${data[i].gifUrl}" alt="cardio">        
                                                                        </div>
                                                                        <div class="text">
                                                                                <h4>${data[i].name}</h4>
                                                                                <p>9 reps &#8226; rest 2 min</p>
                                                                        </div>
                                                                </div>
                                                                `;
                                                                
                                                                
                                                        }
                                                        listOfExercises.innerHTML = html;
                                                        buildStopWatch();
                                                }
                                                
                                                
                                                
                                        }
                                        showExercises(data);
                                } catch (error) {
                                        console.error(error);
                                }
                                }
                                fetchAsyncData();
                                
                }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                       



                })
                
                function highlight(el) {
                        if (prev) {//prev
                                prev.classList.remove('active');
                        }
                        prev = el;
                        prev.classList.add('active');
                        // genderFlag = el.id;
                        // console.log(el.id);
                        
                }
                
                
        }
        function buildProgramRep() {
                let prev = null;
        
                let chooseLevel = document.querySelector('.main_workout_rep-building .workout-program__choose-level');
                let btnBeginner = document.querySelector('.main_workout_rep-building #beginner');
                let btnIntermediate = document.querySelector('.main_workout_rep-building #intermediate');
                let btnAdvanced = document.querySelector('.main_workout_rep-building #advanced');
        
                let listOfExercises = document.querySelector('.main_workout_rep-building .list-of-exercises');
                listOfExercises.innerHTML = `<h2>Choose your level</h2>`;
                //let beginnerBtn = chooseLevel.querySelector('#beginner');
                let btnBegin = document.querySelector('.main_workout_rep-building .btn-begin');
                let btnFinish = document.querySelector('.main_workout_rep-building .btn-finish');
                let stopWatch = document.querySelector('.main_workout_rep-building .stop-watch');
                
                // let btnStop = document.querySelector('.btn-stop');
                // let displayTime = document.getElementById('display-time');
                // btnBegin.addEventListener('click', function(){
                //         listOfExercises.innerHTML = `<div>${beginnerBtn.id}</div>`;
                // })
                // highlight(beginnerBtn);
                
                chooseLevel.addEventListener('click', function(event) {
                        let level = null;
                        let btnLevel = event.target.closest('button');
        
                        let el = event.target;
                        if (!btnLevel) {
                                console.log('kek');
                        };
                        highlight(btnLevel);
        
                        btnBegin.addEventListener('click', getExercises);
                        
        
                        btnFinish.addEventListener('click', function() {
                                btnBeginner.disabled = false;
                                btnIntermediate.disabled = false;
                                btnAdvanced.disabled = false;
        
                                btnBegin.disabled = false;
                                btnFinish.classList.add('hidden');
                                stopWatch.classList.add('hidden');
                                el.disabled = false;
                                listOfExercises.innerHTML = `<h2>You've finished your training session</h2>`;
                                
        
        
                        })
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        function getExercises() {
                                
                                buildStopWatch();
                                btnBeginner.disabled = true;
                                btnIntermediate.disabled = true;
                                btnAdvanced.disabled = true;
                                el.disabled = true;
                                btnBegin.disabled = true;
                                btnBegin.classList.add('disabled');
                                stopWatch.classList.remove('hidden');
                                btnFinish.classList.remove('hidden');
                                
                                // btnStop.classList.remove('hidden');
                                // displayTime.classList.remove('hidden');
                                
                                const url = 'https://exercisedb.p.rapidapi.com/exercises/equipment/body%20weight';
                                const options = {
                                        method: 'GET',
                                        headers: {
                                                'X-RapidAPI-Key': '59c6f9ab1bmsh703be949e728a02p1d693djsn1e738b460c06',
                                                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                                        }
                                };
                                
                                async function fetchAsyncData() {
                                try {
                                        const response = await fetch(url, options);
                                        const data = await response.json();
                                        function showExercises(data) {
                                                
                                                if (data && btnLevel.id === 'beginner'){
                                                        let html = `<h2>You've started your training session</h2>`;
                                                        for (let i = 295; i < data.length - 20; i++) {
                                                                
                                                                html += `
                                                                
                                                                
                                                                <div class='option' id="${data[i].name}">
                                                                        <div class='img'>
                                                                                <img src="${data[i].gifUrl}" alt="cardio">        
                                                                        </div>
                                                                        <div class="text">
                                                                                <h4>${data[i].name}</h4>
                                                                                <p>15 reps &#8226; rest 2 min</p>
                                                                        </div>
                                                                </div>
                                                                `;
                                                                
                                                        } 
                                                        listOfExercises.innerHTML = html;
                                                        buildStopWatch();       
                                                } else if (data && btnLevel.id === 'intermediate'){
                                                        let html = `<h2>You've started your training session</h2>`;
                                                        for (let i = data.length - 20; i < data.length - 10; i++) {
                                                                
                                                                html += `
                                                                
                                                                
                                                                <div class='option' id="${data[i].name}">
                                                                        <div class='img'>
                                                                                <img src="${data[i].gifUrl}" alt="cardio">        
                                                                        </div>
                                                                        <div class="text">
                                                                                <h4>${data[i].name}</h4>
                                                                                <p>15 reps &#8226; rest 1.5 min</p>
                                                                        </div>
                                                                </div>
                                                                `;
                                                                
                                                                
                                                        }
                                                        listOfExercises.innerHTML = html;
                                                        buildStopWatch();
                                                } else if(data && btnLevel.id === 'advanced'){
                                                        let html = `<h2>You've started your training session</h2>`;
                                                        for (let i = data.length - 10; i < data.length; i++) {
                                                                
                                                                html += `
                                                                
                                                                
                                                                <div class='option' id="${data[i].name}">
                                                                        <div class='img'>
                                                                                <img src="${data[i].gifUrl}" alt="cardio">        
                                                                        </div>
                                                                        <div class="text">
                                                                                <h4>${data[i].name}</h4>
                                                                                <p>20 reps &#8226; rest 1 min</p>
                                                                        </div>
                                                                </div>
                                                                `;
                                                                
                                                                
                                                        }
                                                        listOfExercises.innerHTML = html;
                                                        buildStopWatch();
                                                }
                                                
                                                
                                                
                                        }
                                        showExercises(data);
                                } catch (error) {
                                        console.error(error);
                                }
                                }
                                fetchAsyncData();
                                
                }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                       
        
        
        
                })
                
                function highlight(el) {
                        if (prev) {//prev
                                prev.classList.remove('active');
                        }
                        prev = el;
                        prev.classList.add('active');
                        // genderFlag = el.id;
                        // console.log(el.id);
                        
                }
                
                
        }
        function buildProgramMuscle() {
                let prev = null;
        
                let chooseLevel = document.querySelector('.main_workout_muscle-build .workout-program__choose-level');
                let btnBeginner = document.querySelector('.main_workout_muscle-build #beginner');
                let btnIntermediate = document.querySelector('.main_workout_muscle-build #intermediate');
                let btnAdvanced = document.querySelector('.main_workout_muscle-build #advanced');

                let listOfExercises = document.querySelector('.main_workout_muscle-build .list-of-exercises');
                listOfExercises.innerHTML = `<h2>Choose your level</h2>`;
                //let beginnerBtn = chooseLevel.querySelector('#beginner');
                let btnBegin = document.querySelector('.main_workout_muscle-build .btn-begin');
                let btnFinish = document.querySelector('.main_workout_muscle-build .btn-finish');
                let stopWatch = document.querySelector('.main_workout_muscle-build .stop-watch');
                
                // let btnStop = document.querySelector('.btn-stop');
                // let displayTime = document.getElementById('display-time');
                // btnBegin.addEventListener('click', function(){
                //         listOfExercises.innerHTML = `<div>${beginnerBtn.id}</div>`;
                // })
                // highlight(beginnerBtn);
                
                chooseLevel.addEventListener('click', function(event) {
                        let level = null;
                        let btnLevel = event.target.closest('button');

                        let el = event.target;
                        if (!btnLevel) {
                                console.log('kek');
                        };
                        highlight(btnLevel);

                        btnBegin.addEventListener('click', getExercises);
                        

                        btnFinish.addEventListener('click', function() {
                                btnBeginner.disabled = false;
                                btnIntermediate.disabled = false;
                                btnAdvanced.disabled = false;

                                btnBegin.disabled = false;
                                btnFinish.classList.add('hidden');
                                stopWatch.classList.add('hidden');
                                el.disabled = false;
                                listOfExercises.innerHTML = `<h2>You've finished your training session</h2>`;
                                


                        })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        function getExercises() {
                                
                                buildStopWatch();
                                btnBeginner.disabled = true;
                                btnIntermediate.disabled = true;
                                btnAdvanced.disabled = true;
                                el.disabled = true;
                                btnBegin.disabled = true;
                                btnBegin.classList.add('disabled');
                                stopWatch.classList.remove('hidden');
                                btnFinish.classList.remove('hidden');
                                
                                // btnStop.classList.remove('hidden');
                                // displayTime.classList.remove('hidden');
                                
                                const url = 'https://exercisedb.p.rapidapi.com/exercises/equipment/dumbbell';
                                const options = {
                                        method: 'GET',
                                        headers: {
                                                'X-RapidAPI-Key': '59c6f9ab1bmsh703be949e728a02p1d693djsn1e738b460c06',
                                                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                                        }
                                };
                                
                                async function fetchAsyncData() {
                                try {
                                        const response = await fetch(url, options);
                                        const data = await response.json();
                                        function showExercises(data) {
                                                
                                                if (data && btnLevel.id === 'beginner'){
                                                        let html = `<h2>You've started your training session</h2>`;
                                                        for (let i = 250; i < data.length - 34; i++) {
                                                                
                                                                html += `
                                                                
                                                                
                                                                <div class='option' id="${data[i].name}">
                                                                        <div class='img'>
                                                                                <img src="${data[i].gifUrl}" alt="cardio">        
                                                                        </div>
                                                                        <div class="text">
                                                                                <h4>${data[i].name}</h4>
                                                                                <p>8 reps &#8226; rest 2.5 min</p>
                                                                        </div>
                                                                </div>
                                                                `;
                                                                
                                                        } 
                                                        listOfExercises.innerHTML = html;
                                                        buildStopWatch();       
                                                } else if (data && btnLevel.id === 'intermediate'){
                                                        let html = `<h2>You've started your training session</h2>`;
                                                        for (let i = data.length - 34; i < data.length - 24; i++) {
                                                                
                                                                html += `
                                                                
                                                                
                                                                <div class='option' id="${data[i].name}">
                                                                        <div class='img'>
                                                                                <img src="${data[i].gifUrl}" alt="cardio">        
                                                                        </div>
                                                                        <div class="text">
                                                                                <h4>${data[i].name}</h4>
                                                                                <p>10 reps &#8226; rest 2 min</p>
                                                                        </div>
                                                                </div>
                                                                `;
                                                                
                                                                
                                                        }
                                                        listOfExercises.innerHTML = html;
                                                        buildStopWatch();
                                                } else if(data && btnLevel.id === 'advanced'){
                                                        let html = `<h2>You've started your training session</h2>`;
                                                        for (let i = data.length - 24; i <= data.length - 14; i++) {
                                                                
                                                                html += `
                                                                
                                                                
                                                                <div class='option' id="${data[i].name}">
                                                                        <div class='img'>
                                                                                <img src="${data[i].gifUrl}" alt="cardio">        
                                                                        </div>
                                                                        <div class="text">
                                                                                <h4>${data[i].name}</h4>
                                                                                <p>12 reps &#8226; rest 1.5 min</p>
                                                                        </div>
                                                                </div>
                                                                `;
                                                                
                                                                
                                                        }
                                                        listOfExercises.innerHTML = html;
                                                        buildStopWatch();
                                                }
                                                
                                                
                                                
                                        }
                                        showExercises(data);
                                } catch (error) {
                                        console.error(error);
                                }
                                }
                                fetchAsyncData();
                                
                }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                       



                })
                
                function highlight(el) {
                        if (prev) {//prev
                                prev.classList.remove('active');
                        }
                        prev = el;
                        prev.classList.add('active');
                        // genderFlag = el.id;
                        // console.log(el.id);
                        
                }
               
        }
        
       
        function buildStopWatch(){
                        
                        
                let [seconds, minutes, hours] = [0,0,0];
                let intervalId = null;
                let display = document.querySelector('#display-time');
                let start = document.querySelector('#start');
                let stop = document.querySelector('#stop');
                let reset = document.querySelector('#reset');

                start.addEventListener('click', watchStart);
                stop.addEventListener('click', watchStop);
                reset.addEventListener('click', watchReset);

                

                function stopWatch(displayTime){
                        seconds++;
                        if(seconds === 60){
                                seconds = 0;
                                minutes++;
                                if(minutes === 60) {
                                        minutes = 0;
                                        hours++;
                                }
                        }
                        let h = hours < 10 ? '0' + hours : hours;
                        let m = minutes < 10 ? '0' + minutes : minutes;
                        let s = seconds < 10 ? '0' + seconds : seconds;
                        display.textContent = `${h}:${m}:${s}`;
                }

                
                function watchStart() {
                        if (intervalId !== null){
                                clearInterval(intervalId);
                        }
                        intervalId = setInterval(stopWatch, 1000);
                }
                function watchStop(){
                        clearInterval(intervalId);
                }
                function watchReset(){
                        clearInterval(intervalId);
                        [seconds, minutes, hours] = [0,0,0];
                        display.textContent = '00:00:00';
                }

          
        
}  
                           
                
                
        