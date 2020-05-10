//const API_BASE_URL = 'http://127.0.0.1:5000/';
const API_BASE_URL = 'https://datacollector2020.herokuapp.com/';

window.onload = function() {
    console.log("window loaded")
    $.ajax({        
        url: `${API_BASE_URL}api/health`,
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
            url:`${API_BASE_URL}api/getBlogData`,
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
            url:`${API_BASE_URL}api/devtodata`,
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
    var div = document.createElement('div');
    div.className = 'col-md-6 col-xs-12 content'

    var card = document.createElement('div');
    card.className = 'card'

    var img = document.createElement("img");

    img.className = "card-img-top"
    img.setAttribute('src', ele.image);
    img.setAttribute('alt', ele.title);
    img.setAttribute('title', ele.title);

    var figure = document.createElement("figure");
    var figcaption = document.createElement("figcaption");
    figcaption.innerHTML = ele.tags.join();
    figure.appendChild(img);
    figure.appendChild(figcaption);

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body'

    var cardTitle = document.createElement('h1');
    cardTitle.className = 'card-title'
    cardTitle.innerHTML = ele.title.match(new RegExp('.{1,80}', 'g'))[0] + "...";;

    var cardBlock = document.createElement('div');
    cardBlock.className = 'card-block'

    var ul = document.createElement('ul');

    var tags = document.createElement('li');
    tags.className = 'card-subtitle';
    tags.innerHTML = 'Tags: ' + ele.tags.join();

    var time = document.createElement('li');
    time.className = 'card-subtitle'
    time.innerHTML = 'Date: ' + ele.date;

    var btnDiv = document.createElement('div');
    btnDiv.className = 'col-md-12 col-xs-12 text-center'

    var a = document.createElement('a');
    a.className = "btn read-btn"
    a.innerHTML = "Read the article"
    a.href = ele.link
    btnDiv.appendChild(a)

    ul.appendChild(tags)
    ul.appendChild(time)
    cardBlock.appendChild(ul)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardBlock)
    cardBody.appendChild(btnDiv)

    card.appendChild(figure)
    card.appendChild(cardBody)
    
    div.appendChild(card)

    return div
}

function appendMediumChild(ele) {
    var div = document.createElement('div');
    div.className = 'col-md-6 col-xs-12 content'

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
    cardTitle.innerHTML = ele.title.match(new RegExp('.{1,70}', 'g'))[0] + "...";

    var cardBlock = document.createElement('div');
    cardBlock.className = 'card-block'

    var subTitle = document.createElement('h5');
    subTitle.className = 'card-subtitle';
    if (ele.subtitle.match(/[\u3400-\u9FBF]/)) {
        subTitle.innerHTML = ele.subtitle.match(new RegExp('.{1,100}', 'g'))[0] + "...";
    } else {
        subTitle.innerHTML = ele.subtitle.match(new RegExp('.{1,130}', 'g'))[0] + "...";
    }
    cardBlock.appendChild(subTitle)

    var btnDiv = document.createElement('div');
    btnDiv.className = 'col-md-12 col-xs-12 text-center'

    var a = document.createElement('a');
    a.className = "btn read-btn"
    a.innerHTML = "Read the article"
    a.href = ele.url
    btnDiv.appendChild(a)

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardBlock)
    cardBody.appendChild(btnDiv)

    card.appendChild(img)
    card.appendChild(cardBody)
    
    div.appendChild(card)

    return div
} 