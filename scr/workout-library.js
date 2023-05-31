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
                                console.log('bum');
                                item.classList.add('opened');
                                overlay.classList.remove('closed');
                        } 
                        if(event.target.classList.contains('fas' || 'close-btn')){
                                item.classList.remove('opened');
                                overlay.classList.add('closed');
                        }


                }
}
buildLibrary();