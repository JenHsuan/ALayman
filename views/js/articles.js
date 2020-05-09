window.onload = function() {
    console.log("window loaded")
    $.ajax({        
        url:'https://datacollector2020.herokuapp.com/api/health',
        type: "get",
        dataType: "json",
        success: function() {
            getData(); 
        }
    });
};

function hideLoader() {
    var loader = document.getElementById("loader");
    loader.style.display = 'none'; 
}

function getData() {
    var projects = document.getElementById('medium')
    if (projects !== undefined && projects !== null) {
        $.ajax({
            url:'https://datacollector2020.herokuapp.com/api/getBlogData',
            type: "get",
            dataType: "json",
            success: function(data) {
                hideLoader();
                data.forEach(ele => {
                    var div = appendMediumChild(ele);
                    projects.appendChild(div)
                });
            }
        });
    }

    var devto = document.getElementById('devto')
    if (devto !== undefined && devto !== null) {
        $.ajax({
            url:'https://datacollector2020.herokuapp.com/api/devtodata',
            type: "get",
            dataType: "json",
            success: function(data) {
                hideLoader();
                data.forEach(ele => {
                    var div = appendDevToChild(ele);
                    devto.appendChild(div)
                });
            }
        });
    }
}


function appendDevToChild(ele) {
    console.log(ele)
    var div = document.createElement('div');
    div.className = 'col-md-4 col-xs-12 content'

    var card = document.createElement('div');
    card.className = 'card'

    var img = document.createElement("img");
    img.className = "card-img-top"
    img.setAttribute('src', ele.image);
    img.setAttribute('alt', ele.title);
    img.setAttribute('title', ele.title);

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body'

    var cardTitle = document.createElement('h1');
    cardTitle.className = 'card-title'
    cardTitle.innerHTML = ele.title.match(new RegExp('.{1,55}', 'g'))[0] + "...";;

    var cardBlock = document.createElement('div');
    cardBlock.className = 'card-block'

    var subTitle = document.createElement('h5');
    subTitle.innerHTML = ele.tags.join();

    var time = document.createElement('h6');
    time.innerHTML = 'Date: ' + ele.date;

    cardBlock.appendChild(subTitle)
    cardBlock.appendChild(time)

    var a = document.createElement('a');
    a.className = "btn btn-primary"
    a.innerHTML = "Read more"
    a.href = ele.link

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardBlock)
    cardBody.appendChild(a)

    card.appendChild(img)
    card.appendChild(cardBody)
    
    div.appendChild(card)

    return div
}

function appendMediumChild(ele) {
    var div = document.createElement('div');
    div.className = 'col-md-4 col-xs-12 content'

    var card = document.createElement('div');
    card.className = 'card'

    var img = document.createElement("img");
    img.className = "card-img-top"
    img.setAttribute('src', ele.image);
    img.setAttribute('alt', ele.title);
    img.setAttribute('title', ele.title);

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body'

    var cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title'
    cardTitle.innerHTML = ele.title.match(new RegExp('.{1,50}', 'g'))[0] + "...";

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

    return div
} 