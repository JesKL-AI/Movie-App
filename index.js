let movieNameRef = document.getElementById("movie-name");
let searchButton = document.getElementById("search-button");
let result = document.getElementById("result");

let getMovie = () =>{
	let movieName = movieNameRef.value;
	let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
	

	// if the input is empty
	if(movieName.length <=0) {
		result.innerHTML = `<h3 class="message"> Please enter a movie name </h3>`;
	}
	
	else {
		fetch(url).then((resp) => resp.json()).then((data) =>{
			// if the movie is found
			if(data.Response == "True"){
				result.innerHTML = `
					<div class="info">
						<img src=${data.Poster} class="poster">
						<div>
							<h2>${data.Title}</h2>
							<div class="rating">
								<img src="star-icon.svg">
								<h4>${data.imdbRating}</h4>
							</div>
							<div class="details">
								<span>${data.Rated}</span>
								<span>${data.Year}</span>
								<span>${data.Runtime}</span>
							</div>
							<div class="genre">
								<div>${data.Genre.split(",").join("</div><div>")}</div>
							</div>
						</div>
						<h3> Plot: </h3>
						<p>${data.Plot}</p>
						<h3> Cast: </h3>
						<p>${data.Actors}</p>
					</div>
				`;
			}
			
			// if movie not found
			else{
				result.innerHTML = `<h3 class = "msg"> ${data.Error} </h3>`
			}
		})

		.catch(() =>{
			result.innerHTML = '<h3 class="msg"> Error Occured </h3>'
		});
	}
};

searchButton.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
