
//initialize the news api paramitter
let country = 'in';
let category = "entertainment";
let apiKey = "c8499e5d9ef5483e9a216ea6688e3144";
//Grap the news container
let latestNews = document.getElementById("latestNews");

//create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `http://newsapi.org/v2/top-headlines?country=${country}&${category}=entertainment&apiKey=${apiKey}`, true);

xhr.getResponseHeader('Content-type', 'application/json');

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let newsJson = JSON.parse(this.responseText);
        let newsArticles = newsJson.articles;
        let newsHTML = "";
        newsArticles.forEach(function(element, index){
            console.log(element);
            let news = `<div class="accordion-item">
                            <h2 class="accordion-header" id="heading${index}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                                <span><strong>Breaking News ${index + 1}</strong> ${element["title"]}</span>
                            </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#latestNews">
                            <div class="accordion-body">
                            <img src="${element["urlToImage"]}" class="rounded mx-auto d-block" alt="${element["title"]}">
                            ${element["content"]} <a href="${element["url"]}" target="_nesw">Read More</a>
                            </div>
                            </div>
                        </div>`; 
            newsHTML += news;
        });
        latestNews.innerHTML = newsHTML;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send();
