$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val(); // the name of the movie
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com?s=" + searchText + "&apikey=thewdb") // returns a promise
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
       <div class="col-md-3">
       <div class="well text-center">
       <img src="${movie.Poster}">
       <h5>${movie.Title}</h5>
       <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#
">  Movie Details</a>  
<a onclick="playList('${movie.imdbID}')" class="btn btn-secondary">Add to playlist</a>  
</div>
       </div>
       `;
      });
      $("#movies").html(output); // selecting the id from index.html using jquery
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
  // using session storage
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

var list = [];
function playList(id) {
  localStorage.setItem("movieId", JSON.stringify(id));
  list.push(JSON.parse(localStorage.getItem("movieId")));
  console.log(list);
  return false;
}
console.log(list);
function playListMovie() {
  for (let i = 0; i < list.length; i++) {
    console.log(list[i]);
    let a = list[i];
    axios
      .get("http://www.omdbapi.com?i=" + a + "&apikey=thewdb") // returns a promise
      .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = " ";
        $.each(movies, (index, movie) => {
          output += `
       <div class="col-md-3">
       <div class="row text-center">
       <img src="${movie.Poster}">
       <h5>${movie.Actors}</h5>
       <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#
">  Movie Details</a>  
<a onclick="playList('${movie.imdbID}')" class="btn btn-secondary">Add to playlist</a>  
</div>
       </div>
       `;
        });
        $("#mooove").html(output); // selecting the id from index.html using jquery
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  axios
    .get("http://www.omdbapi.com?i=" + movieId + "&apikey=thewdb")
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
      <div class="row">
      <div class="col-md-4">
      <img src="${movie.Poster}" class="thumbnail">
      </div>
      <div class="col-md-8">
       <h2>${movie.Title}</h2>
       <ul class="list-group">
       <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
       <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
       <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
       <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
       <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
       <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
       <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
       </ul>
      </div>
      </div>

      <div class="row">
      <div class="well">
      <h3>Plot</h3>
      ${movie.Plot}
      <hr>
      <a href = "http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
      <a href="index.html" class="btn btn-secondary">Go back to search</a>
      <button class='btn btn-primary'>Add to playList</button>
      </div>
      </div>
      `;
      $("#movie").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

//var m = ["tt0458339", "tt1843866"];
//function playListMovie() {
//  for (let i = 0; i < m.length; i++) {
//    //let movieId = MOVIEID[0];
//    //console.log(movieId);
//    let a = m[i];
//    axios
//      .get("http://www.omdbapi.com?i=" + a + "&apikey=thewdb")
//      .then((response) => {
//        console.log(response);
//        let movie = response.data;
//        let output = `
//          <div class="row">
//          <div class="col-md-4">
//          <img src="${movie.Poster}" class="thumbnail">
//          </div>
//          <div class="col-md-8">
//           <h2>${movie.Title}</h2>
//
//          </div>
//          </div>
//
//          <div class="row">
//          <div class="well2">
//          <h3>Plot</h3>
//          ${movie.Plot}
//          <hr>
//          <a href = "http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
//          <a href="index.html" class="btn btn-secondary">Go back to search</a>
//          </div>
//          </div>
//          `;
//        $("#mooove").html(output);
//      })
//      .catch((err) => {
//        console.log(err);
//      });
//  }
//}
//
