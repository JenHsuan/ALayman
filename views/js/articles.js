//const API_BASE_URL = 'http://127.0.0.1:5000/';
const API_BASE_URL = 'https://datacollector2020.herokuapp.com/';
var keyword=""

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

function handleTextChanged(id) {
    console.log(id)
    var newKeyword=document.getElementById(id).value;
    if(newKeyword.trim() !== keyword.trim()) {
        removeChilds('medium');
        showLoader();    
        var searchFunc = newKeyword.trim() !== '' ? () => getDataByKeyword(newKeyword) : getData();
        $.ajax({        
            url: `${API_BASE_URL}api/health`,
            type: "get",
            dataType: "json",
            success: searchFunc
        });
        keyword = newKeyword; 
    }
}

function getDataByKeyword(keyword) {
    var projects = document.getElementById('medium')
    if (projects !== undefined && projects !== null) {
        $.ajax({
            url:`${API_BASE_URL}api/getBlogData/${keyword}`,
            type: "get",
            dataType: "json",
            success: function(data) {
                hideLoader();
                data.forEach(ele => {
                    var div = appendMediumChild(ele);
                    projects.appendChild(div)
                });
            },
            error: () => {
                hideLoader();
                var div = document.createElement('h5');
                div.className = 'no-articles-warning'
                div.innerHTML = 'No articles!';
                projects.appendChild(div)
            }
        });
    }
}

function hideLoader() {
    var loader = document.getElementById("loader");
    loader.style.display = 'none'; 
}

function showLoader() {
    var loader = document.getElementById("loader");
    loader.style.display = 'block'; 
}

function removeChilds(id) {
    const parent = document.getElementById(id);
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
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
                //append JSON-LD
                appendJsonLd(data);
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
                //append JSON-LD
                appendJsonLd(data);
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
    card.setAttribute('itemscope','');
    card.setAttribute('itemtype', 'http://schema.org/Article');

    var img = document.createElement("img");

    img.className = "card-img-top"
    img.setAttribute('src', ele.image);
    img.setAttribute('alt', ele.title);
    img.setAttribute('title', ele.title);

    var figure = document.createElement("figure");
    var figcaption = document.createElement("figcaption");
    figcaption.innerHTML = ele.link;
    figcaption.setAttribute('itemprop', 'url');
    figure.appendChild(img);
    figure.appendChild(figcaption);

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body'

    var cardTitle = document.createElement('h1');
    cardTitle.className = 'card-title'
    //cardTitle.innerHTML = ele.title.match(new RegExp('.{1,80}', 'g'))[0] + "...";;
    cardTitle.innerHTML = ele.title;
    cardTitle.setAttribute('itemprop', 'name');

    var cardBlock = document.createElement('div');
    cardBlock.className = 'card-block'

    var ul = document.createElement('ul');

    var name = document.createElement('li');
    name.className = 'card-subtitle';
    name.innerHTML = 'Author: ' 
    
    var nameSpanParent = document.createElement('span');
    nameSpanParent.setAttribute('itemscope','author');
    nameSpanParent.setAttribute('itemtype', 'http://schema.org/Person');

    var nameSpan = document.createElement('span');
    nameSpan.className = 'card-subtitle';
    nameSpan.innerHTML = ele.name;
    name.setAttribute('itemprop', 'name');

    nameSpanParent.appendChild(nameSpan);
    name.appendChild(nameSpanParent);

    var tags = document.createElement('li');
    tags.className = 'card-subtitle';
    tags.innerHTML = 'Tags: ' + ele.tags.join();

    var time = document.createElement('li');
    time.className = 'card-subtitle'
    time.innerHTML = 'Date: ';

    var timeSpan = document.createElement('span');
    timeSpan.className = 'card-subtitle';
    timeSpan.innerHTML = ele.date;
    timeSpan.setAttribute('itemprop', 'dataPublished');
    timeSpan.setAttribute('content', ele.date);
    time.appendChild(timeSpan)

    var btnDiv = document.createElement('div');
    btnDiv.className = 'col-md-12 col-xs-12 text-center'

    var a = document.createElement('a');
    a.className = "btn read-btn"
    a.innerHTML = "Read the article"
    a.href = ele.link
    btnDiv.appendChild(a)

    ul.appendChild(name)
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

    var figure = document.createElement("figure");
    var figcaption = document.createElement("figcaption");
    figcaption.innerHTML = ele.url;
    figure.appendChild(img);
    figure.appendChild(figcaption);

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body'

    var cardTitle = document.createElement('h1');
    cardTitle.className = 'card-title'
    //cardTitle.innerHTML = ele.title.match(new RegExp('.{1,70}', 'g'))[0] + "...";
    cardTitle.innerHTML = ele.title;

    var cardBlock = document.createElement('div');
    cardBlock.className = 'card-block'

    var ul = document.createElement('ul');

    var subTitle = document.createElement('li');
    subTitle.className = 'card-subtitle';
    if (ele.subtitle.match(/[\u3400-\u9FBF]/)) {
        subTitle.innerHTML = 'Introduction: ' + ele.subtitle.match(new RegExp('.{1,100}', 'g'))[0] + "...";
    } else {
        subTitle.innerHTML = 'Introduction: ' + ele.subtitle.match(new RegExp('.{1,130}', 'g'))[0] + "...";
    }

    var author = document.createElement('li');
    author.className = 'card-subtitle';
    author.innerHTML = 'Author: ' + ele.name;

    var time = document.createElement('li');
    time.className = 'card-subtitle'
    time.innerHTML = 'Date: ' + ele.time;

    ul.appendChild(author)
    ul.appendChild(time)
    ul.appendChild(subTitle)
    cardBlock.appendChild(ul)

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

    //card.appendChild(img)
    card.appendChild(figure)
    card.appendChild(cardBody)
    
    div.appendChild(card)

    return div
} 

function appendJsonLd(data){
    var el = document.createElement('script');
    el.type = 'application/ld+json';

    var devto = document.getElementById('devto')
    if (devto !== undefined && devto !== null) {
        list = []
        data.forEach(ele => {
            var t = { 
                "@context": "http://schema.org",  
                "@type": "Article", 
                "name": ele.title,
                "author": {
                    "@type": "Person",
                    "name": ele.name
                },
                "datePublished": ele.date,
                "url": ele.link,
                "image": ele.image,
                "publisher": {
                    "@type": "Person",
                    "name": ele.name
                },
                "headline": ele.title
            }
            list.push(t)
        });
        el.text = JSON.stringify(list);
        document.querySelector('head').appendChild(el);
    }


    var projects = document.getElementById('medium')
    if (projects !== undefined && projects !== null) {
        list = []
        data.forEach(ele => {
            var t = { 
                "@context": "http://schema.org",  
                "@type": "Article", 
                "name": ele.title,
                "author": {
                    "@type": "Person",
                    "name": ele.name
                },
                "datePublished": ele.time,
                "url": ele.url,
                "image": ele.image,
                "publisher": {
                    "@type": "Person",
                    "name": ele.name
                },
                "headline": ele.title
            }
            list.push(t)
        });
        el.text = JSON.stringify(list);
        document.querySelector('head').appendChild(el);
    }

}