// const main = document.getElementById("section");
// const form = document.getElementById("form");
// const search = document.getElementById("query");

// //Fetch from URL
// returnMovies(APILINK)  //<<<< Didn't work without this
// function returnMovies(url){
//     fetch(url).then(res => res.json())
//     .then(function(data){
//         console.log(data.results);
//         data.results.forEach(element => {
//             const div_card = document.createElement('div');
//             //create new div element!^^
//             div_card.setAttribute('class', 'card');
            
//             const div_row = document.createElement('div');
//             div_row.setAttribute('class', 'row');

//             const div_column = document.createElement('div');
//             div_column.setAttribute('class', 'column');

//             const image = document.createElement('img');
//             image.setAttribute('class', 'thumbnail');
//             image.setAttribute('id', 'image');
//             // image.setAttribute('alt', 'poster');

//             const title = document.createElement('h3');
//             title.setAttribute('id', 'title');

//             const center = document.createElement('center');

//             title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
//             image.src = IMG_PATH + element.poster_path;

//             center.appendChild(image);
//             div_card.appendChild(center);
//             div_card.appendChild(title);
//             div_column.appendChild(div_card);
//             div_row.appendChild(div_column);

//             main.appendChild(div_row);

//         });
//     });
// }

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     main.innerHTML = '';
//     //^^ Remove all initial movies after search

//     const searchItem = search.value;

//     if (searchItem) {
//         returnMovies(SEARCHAPI + searchItem);
//         search.value = '';
//     }

// });

/////////////////////////////// Code refactor practice

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// v v v vCould always add Async / await here too. Why?
// 1. Easier to read code
// 2. Error handling - trying and catching
// 3. Sequentilal execution, makes sure operations are complete before going to next step.
// 4. Performance optimisation - probably not much of a difference with a project this size.

//Fetch from URL
returnMovies(APILINK)  //<<<< Didn't work without this
function returnMovies(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const fragment = document.createDocumentFragment(); //Avoids multiple layout calculations.

        data.results.forEach(element => {
            const div_card = document.createElement('div');
            div_card.innerHTML = `
            <div class="row">
            <div class="column">
                <div class="card">
                    <center>
                        <img src="${IMG_PATH + element.poster_path}" alt="" class="thumbnail" />
                    </center>
                    <h3>${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a></h3>
                </div>
            </div>
        </div>
        `;

        fragment.appendChild(div_card);
        });

        main.appendChild(fragment);
        //Actually appends to document and doesn't just stay in RAM.
        //Renders quicker than before.
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
    //^^ Remove all initial movies after search

    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = '';
    }

});