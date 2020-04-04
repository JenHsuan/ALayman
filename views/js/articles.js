window.onload = function() {
    console.log("window loaded")
    $.ajax({
        url:'https://datacollector2020.herokuapp.com/health',
        type: "get",
        dataType: "json",
        success: function() {
            getData();
        }
    });
};

function getData() {
    $.ajax({
        url:'https://datacollector2020.herokuapp.com/getBlogData',
        type: "get",
        dataType: "json",
        success: function(data) {
            var projects = document.getElementById('projects')
            if (projects !== undefined && projects !== null) {
                data.forEach(ele => {
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
                    if (ele.subtitle.match(/[\u3400-\u9FBF]/)) {
                        subTitle.innerHTML = ele.subtitle.match(new RegExp('.{1,30}', 'g'))[0] + "...";
                    } else {
                        subTitle.innerHTML = ele.subtitle.match(new RegExp('.{1,55}', 'g'))[0] + "...";
                    }
                    cardBlock.appendChild(subTitle)
    
                    var a = document.createElement('a');
                    a.className = "btn btn-primary"
                    a.innerHTML = "Read more"
                    a.href = ele.url
            
                    cardBody.appendChild(cardTitle)
                    cardBody.appendChild(cardBlock)
                    cardBody.appendChild(a)
    
                    card.appendChild(img)
                    card.appendChild(cardBody)
                    
                    div.appendChild(card)
                    projects.appendChild(div)
                });
            }
        }
    });
}