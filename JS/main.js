let app={
    
    
    URL: 'https://api.themoviedb.org/3/',
    imgURL: '',
    
    init: function(){
        
    //focus on text field
        let input = document.getElementById('search-input');
        input.focus();
    //add click listener
        let btn = document.getElementById('search-button');
        btn.addEventListener('click', app.runSearch);
    //add listener for <ENTER>
        document.addEventListener('keypress', function(ev){
            let char= ev.char || ev.charCode || ev.which;
            if (char == 10 || char == 13){ //enter or return key
                btn.dispatchEvent(new MouseEvent('click'));
            }
        });
    },
    runSearch: function(ev){
        //fetch to get list of movies
        ev.preventDefault();
        
        let input = document.getElementById('search-input');
        if (input.value){ //only run code if there is a value
            //let url=app.URL + "search/movie?api_key=" +APIKEY+ "&query="+input.value;
            //console.log(app.URL);
            let url=`${app.URL}search/movie?api_key=${APIKEY}&query=${input.value}`;
            fetch(url)
            .then(response => response.json())
            .then(data => {
                document.getElementById('topHeading1').textContent="Here are your results";
                app.showMovies(data);
            })
            .catch(err => {console.log(err)})
        };
        
    },
    showMovies: function(movies){
            let container = document.querySelector('#search-results .content');
            let docFrag= document.createDocumentFragment();
            container.innerHTML = "";
            movies.results.forEach(function(movie){
                let div = document.createElement('div');
                //div.textContent = movie.title;
                console.log(movie.id)
                let title=document.createElement('h2');
                title.textContent=movie.title;
                title.setAttribute('class','movie-title');
                div.classList.add('movie');
                div.setAttribute('class','content');
                let poster=document.createElement('img');
                poster.setAttribute('src','https://image.tmdb.org/t/p/w500/'+movie.poster_path);
                poster.setAttribute('class','poster');
                poster.setAttribute('id',movie.id);
                poster.setAttribute('alt',movie.title);
                let description=document.createElement('p');
                description.setAttribute('class','movie-desc');
                description.textContent=movie.overview;
                poster.addEventListener('click',app.recommendMovies);
                div.appendChild(title);
                div.appendChild(poster);
                div.appendChild(description);
                docFrag.appendChild(div);
            });
        container.appendChild(docFrag);
        document.getElementById('search-results').className="page active";
        document.getElementById('recommend-results').className="page";
        },
    recommendMovies: function(ev){
        console.log(ev.target.getAttribute('id'));
        let urlRec=`${app.URL}movie/${ev.target.id}/recommendations?api_key=${APIKEY}&language=en-US&page=1`;
        console.log(urlRec);
        fetch(urlRec)
            .then(response => response.json())
            .then(data => {
                document.getElementById('topHeading2').textContent="Movies like: "+ev.target.getAttribute('alt');
                app.showRecommendedMovies(data);
            })
            .catch(err => {console.log(err)})
    },
    showRecommendedMovies: function(movies){
            let container2 = document.querySelector('#recommend-results .content');
            let docFrag2= document.createDocumentFragment();
            container2.innerHTML = "";
            movies.results.forEach(function(movie){
                let div = document.createElement('div');
                console.log(movie.id)
                div.classList.add('movie');
                div.setAttribute('class','content');
                let title=document.createElement('h2');
                title.textContent=movie.title;
                title.setAttribute('class','movie-title');
                let poster=document.createElement('img');
                poster.setAttribute('src','https://image.tmdb.org/t/p/w500/'+movie.poster_path);
                poster.setAttribute('class','poster');
                poster.setAttribute('id',movie.id);
                poster.setAttribute('alt',movie.title);
                let description=document.createElement('p');
                description.setAttribute('class','movie-desc');
                description.textContent=movie.overview;
                let release=document.createElement('p');
                release.textContent='Released on: '+movie.release_date;
                release.setAttribute('class','movie-desc');
                poster.addEventListener('click',app.recommendMovies);
                div.appendChild(title);
                div.appendChild(poster);
                div.appendChild(description);
                div.appendChild(release);
                docFrag2.appendChild(div);
            });
        container2.appendChild(docFrag2);
        document.getElementById('search-results').className="page";
        document.getElementById('recommend-results').className="page active";
        
        },

/*
setTimeout( function{
    codestuffs
    },(index+1)*200)
    
setTimeout(function,delay)
*/

};
document.addEventListener('DOMContentLoaded', app.init);
//DOMContent loaded listener
//fetch image config info
//click and keydown (enter) listener

//call search function with listeners

//new movie content has listeners
//click to fetch recommendations
//display recommendations