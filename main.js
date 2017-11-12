        function getAllEvents(){
            fetch('http://www.nocomplaintwebsite.dk/wordpress/wp-json/wp/v2/events?_embed')
            .then(res=>res.json())
            .then(showEvents);
        }
        function getAllEventsByGenre(id){
            fetch('http://www.nocomplaintwebsite.dk/wordpress/wp-json/wp/v2/events?_embed&genres='+ id)
            .then(res=>res.json())
            .then(showEvents);
        }
        // step 1
        function getSingleEventById(myId){
            console.log(myId)
            fetch('http://www.nocomplaintwebsite.dk/wordpress/wp-json/wp/v2/events/' + myId + '/?_embed')
            .then(res=>res.json())
            .then(showSingleEvent);
        }

        function getMenu(){
            fetch('http://www.nocomplaintwebsite.dk/wordpress/wp-json/wp/v2/genre')
            .then(e=>e.json())
            .then(showMenu)
        }

        function showMenu (genres) {
            //console.log(genres)
            let lt = document.querySelector('#linkTemplate').content;

            genres.forEach(function(genre){
                if(genre.count > 0) {

                let clone = lt.cloneNode(true);
                let parent = document.querySelector('#genreMenu');
                clone.querySelector('a').textContent = genre.name;
                clone.querySelector('a').setAttribute ('href', 'index.html?genreid='+genre.id)

                parent.appendChild(clone);
                }
            });
        }

        function showSingleEvent(json){
            console.log(json)
            document.querySelector('#single h1').textContent = json.title.rendered;

            document.querySelector('#single img').setAttribute('src', json._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);

            document.querySelector('#single .price span').textContent = json.acf.price_entrance;

            document.querySelector('.content').innerHTML = json.acf.description_of_event;

        }

        function showEvents(data) {
            //console.log(data)
            let list = document.querySelector('#list');
            let template = document.querySelector('#eventTemplate').content;

            //step2
            data.forEach(function(theEvent){
              //console.log(theEvent)
               let clone = template.cloneNode(true);
                let title = clone.querySelector('h1');
                let description = clone.querySelector('.description');
                let price = clone.querySelector('.price span');
                let img = clone.querySelector('img');
                let link = clone.querySelector('a.read-more');

                title.textContent = theEvent.title.rendered;
                description.innerHTML = theEvent.content.rendered;
                price.textContent = theEvent.acf.price_entrance;

                img.setAttribute('src', theEvent._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url)

                link.setAttribute('href', 'event.html?id=' + theEvent.id);

            list.appendChild(clone);
            });
        };


let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let genreid = searchParams.get('genreid');
//console.log(id)

getMenu();
if(id){
    getSingleEventById(id);
}
    if(genreid){
        getAllEventsByGenre (genreid);
}
else {
getAllEvents();
}
