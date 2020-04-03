window.onload = function() {
    console.log("window loaded")
    $.ajax({
        url:'https://datacollector2020.herokuapp.com/',
        type: "get",
        dataType: "json",
        success: function(data) {
            // Load historical messages
            console.log(data)

            data.forEach(ele => {
                var projects = document.getElementById('projects')
    
                var div = document.createElement('div');
                div.className = 'col-md-4 col-xs-12 content'
    
                var card = document.createElement('div');
                card.className = 'card'

                var img = document.createElement("img");
                img.className = "card-img-top"
                img.setAttribute('src', ele.image);
        
                var cardBody = document.createElement('div');
                cardBody.className = 'card-body'

                var cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title'
                cardTitle.innerHTML = ele.title.match(new RegExp('.{1,55}', 'g'))[0] + "...";

                var cardBlock = document.createElement('div');
                cardBlock.className = 'card-block'

                var subTitle = document.createElement('h5');
                subTitle.innerHTML = ele.subtitle.match(new RegExp('.{1,55}', 'g'))[0] + "...";
                cardBlock.appendChild(subTitle)

                var a = document.createElement('a');
                a.className = "btn btn-primary"
                a.innerHTML = "check"
                a.href = ele.url
        
                cardBody.appendChild(cardTitle)
                cardBody.appendChild(cardBlock)
                cardBody.appendChild(a)

                card.appendChild(img)
                card.appendChild(cardBody)
                
                div.appendChild(card)
                projects.appendChild(div)
            });
            /*
            <div class="col-md-12 col-xs-12 content">
                        <div class="card">
                            <img class="card-img-top" src="views/images/resume2020.png">
                            <div class="card-body">
                                <h5 class="card-title">2020 Resume(pure HTML/CSS)</h5>
                                <div class="card-block">
                                    <h5>I Build the personal resume by using pure HTML and CSS.</h5>
                                </div>
                                <a class="btn btn-primary" href="https://medium.com/a-layman" class="btn btn-primary">Check</a>
                            </div>
                        </div>
                    </div>
             */
        }
    });
};