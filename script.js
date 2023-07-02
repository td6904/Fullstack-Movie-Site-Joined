const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);
function returnMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const fragment = document.createDocumentFragment();

      data.results.forEach((element) => {
        const div_card = document.createElement("div");
        div_card.innerHTML = `
            <div class="row">
            <div class="column">
                <div class="card">
                    <center>
                        <img src="${
                          IMG_PATH + element.poster_path
                        }" alt="" class="thumbnail" />
                    </center>
                    <h3>${element.title}<br><a href="movie.html?id=${
          element.id
        }&title=${element.title}">reviews</a></h3>
                </div>
            </div>
        </div>
        `;

        fragment.appendChild(div_card);
      });

      main.appendChild(fragment);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});
