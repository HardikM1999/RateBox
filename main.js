document.getElementById('MovieForm').addEventListener('submit',getMovieName);
function getMovieName(e){
    let MovieName =  document.getElementById('MovieName').value;
    OmdbRating(MovieName);
    //console.log(rt.json());
    e.preventDefault();
}
function OmdbRating(MovieName){
    //return fetch('http://www.omdbapi.com/?i=tt3896198&apikey=1c149048&t='+MovieName).then(response => response.json());
    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=1c149048&t='+MovieName
    ).then(
        function(response){
            if(response.status !== 200)
            {
                console.log('Looks Like There is a problem');
                return;
            }
            response.json().then(function(data){
                //console.log(data);
                let ratings = [];
                ratings = data.Ratings;
                const imdbrt = parseInt(ratings[0].Value.substring(0,ratings[0].Value.indexOf("/")),10);
                const rtrt = parseInt(ratings[1].Value.substring(0,ratings[1].Value.indexOf("%")),10);
                const mtcrt = parseInt(ratings[2].Value.substring(0,ratings[2].Value.indexOf("/")),10);
                let scaledrt = parseInt((imdbrt*10 + rtrt + mtcrt)/3);
                let res = document.getElementById('result');
                res.innerHTML = ''; 
                res.innerHTML = ('<div class="card card-body bg-light"><p><h4>Combined Rating:</h4></p>'+scaledrt+'</div>'+
                                '<div class="card card-body bg-light"><p><h4>Imdb Rating:</h4></p>'+imdbrt+'</div>'+
                                '<div class="card card-body bg-light"><p><h4>Rotten Tomatoes Rating:</h4></p>'+rtrt+'</div>'+
                                '<div class="card card-body bg-light"><p><h4>MetaCritic:</h4></p>'+mtcrt+'</div>'
                );
                //console.log(scaledrt);
                //console.log(typeof(ratings[0].Value));
            });
        }
    )
    .catch(function(err){
        console.log('Fetch Error:-S', err);
    });
}