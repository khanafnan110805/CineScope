let searchBtn = document.getElementById("searchBtn")

let searchInput = document.getElementById("searchInput")

let movieContainer = document.getElementById("movieContainer")

let apiKey = "6d081bee"

searchBtn.addEventListener("click", async () => {

    let movieName = searchInput.value

    let url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`

    let response = await fetch(url)

    let movie = await response.json()

    movieContainer.innerHTML = `

        <div class="movie-details">

            <img src="${movie.Poster}">

            <div class="details">

                <h1>${movie.Title}</h1>

                <p><b>Year:</b> ${movie.Year}</p>

                <p><b>Genre:</b> ${movie.Genre}</p>

                <p><b>IMDB Rating:</b> ⭐ ${movie.imdbRating}</p>

                <p><b>Actors:</b> ${movie.Actors}</p>

                <p><b>Plot:</b> ${movie.Plot}</p>

            </div>

        </div>

    `

})