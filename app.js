const newsData = {
    api: "0f8afbb9e2071a3227218ffe759b88b0",
    category: "general",
    country: "pt",
    language: "pt",
    keywords: "",
    date(){ //Converts the desired date to the format the API works with (yyyy-mm-dd)
        let d = new Date();
            month = '' + (d.getMonth() + 1);
            day = '' + d.getDate();
            year = d.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2)  
            day = '0' + (day);
    return [year, month, day].join('-')
    },
    url () {return `http://api.mediastack.com/v1/news?access_key=${this.api}&countries=${this.country}&languages=${this.language}&sort=published_desc&categories=${this.category}&keywords=${this.keywords}`},
    lastUrl() { return `http://api.mediastack.com/v1/news?access_key=${this.api}&countries=${this.country}&languages=${this.language}&sort=popularity&date=2021-02-06,${this.date()}&limit=30`} //Currently the API used doesn't work when calling the current day (maybe because it's a free version)
}
//Function that's on every category in html "onclick" feature
function updateCategory(cat) {
    newsData.category = cat;
}

function getNews(url) {
    fetch(url)
        .then((news) => news.json())
        .then((data) => {
            url === newsData.url() ? updateSearchedNews(data) : updateFrontPageNews(data); //Condition so that it updates the front page or the window depending on the url used
        });
}

//Gets a random int so that the displayed front page news is random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

//Updates the random front page news
function updateFrontPageNews (news){
    
    let random = [getRandomInt(0,11),getRandomInt(11,21),getRandomInt(21,31)]
    let info = "";
    for (let i=0; i<3 ; i++){
        info += `<div class ="last-news fade">
                <a href="${news.data[random[i]].url}"><h2 class="title3">${news.data[random[i]].title}</h2></a>
                <p><h3 class="description">${news.data[random[i]].description}</h3></p>
                <p><h4 class="source">${news.data[random[i]].source} - ${(news.data[random[i]].published_at).slice(0, 10)}<h4></p>
                </div>`
    }
    document.getElementById("last-news").innerHTML = info;
    requestAnimationFrame(() => {
                for(let i = 0; i<document.getElementsByClassName("last-news").length; i++){
                    document.getElementsByClassName("last-news")[i].classList.remove("fade");
                }
        });
} 

function updateSearchedNews(news) {
    if(document.getElementById("news")===null){ //Condition so that new's div gets created if doesnt exist yet
    let newsDiv  = document.createElement("div");
    newsDiv.className="news-wrapper"
    newsDiv.id = "news"
    document.body.appendChild(newsDiv);
    }

    const headerStyle = ((document.getElementsByClassName("header"))[0]).style;
    headerStyle.transform = "translateY(0%)";
    headerStyle.paddingTop = "1rem";
    headerStyle.boxShadow = "0px 4px 5px -4px rgba(0, 0, 0, 0.3)";
    headerStyle.position = "fixed";
    if (news.data.length === 0) {
        document.getElementById("news").innerHTML = `<div class ="news fade"><h3 class="description"><i>NO NEWS RELATED TO <b>"${newsData.keywords}"</b></i></h3></p></div>`;
        requestAnimationFrame(() => {
            news.data.forEach((n, i) => {
                document.getElementsByClassName("news")[i].classList.remove("fade");
            });
        });
    } else {
        const organizeData = (news.data).map((n, i) => {
            return (
                `   <div class ="news fade">
                    <a href="${news.data[i].url}"><h2 class="title2">${news.data[i].title}</h2></a>
                    <p><h3 class="description">${news.data[i].description}</h3></p>
                    <p><h4 class="source">${news.data[i].source} - ${(news.data[i].published_at).slice(0, 10)}<h4></p>
                    </div>`
            );
        }).join("");
        document.getElementById("news").innerHTML = organizeData;
    }

    requestAnimationFrame(() => {
        news.data.forEach((n, i) => {
            document.getElementsByClassName("news")[i].classList.remove("fade");
        });
    });
}

//Updates CSS information to get to first page
function transitionToFrontPage (news) {
    const headerStyle = ((document.getElementsByClassName("header"))[0]).style;
    headerStyle.transition = "transform 1s cubic-bezier(0.075, 0.82, 0.165, 1)"
    headerStyle.transform = "translateY(80%)";
    headerStyle.paddingTop = "none";
    headerStyle.boxShadow = "none";
    headerStyle.position = "relative";
}

function clearLastNews(){
    //clearInterval(intervalId);
    let div = document.getElementById("last-news");
    if(div === null){
        return; }
    div.style.opacity = '0';
    setTimeout(function(){div.remove();}, 500);
}

//Updates url keyworks with whatever is typed in searched box
function updatesUrlKeywords(info) {
    newsData.keywords = info;
    getNews(newsData.url());
}

//Runs when "enter" key is pressed
function searchValue (e) {
    if (e.key === "Enter") {
        clearLastNews();
        updatesUrlKeywords(this.value);
        this.value = "";
    } else return null
}

//Creates div os latest news and removes the searched news div
function goToStartPage (){
    if(document.getElementById("last-news") === null){
    let newsDiv  = document.createElement("div");
    newsDiv.className="last-news-wrapper"
    newsDiv.id = "last-news"
    document.body.appendChild(newsDiv);
    }else return;
    let div = document.getElementById("news");
    let header = document.getElementById("header");
    div.remove();
    getNews(newsData.lastUrl())
    var intervalId = window.setInterval(function(){
    getNews(newsData.lastUrl())
    }, 12000);
    transitionToFrontPage();
}
//Clears search input after "enter" key is pressed
function clearInput() {    
    document.getElementById("search").value = "";
}

//Toggles the categories div whenever the button is pressed
function toggleCategories() {
    const stateBttn = document.getElementById("categories").style;
    if(document.getElementById("last-news") != null){  //Condition to make button toggle even if it the div with id of "last-news" is deleted ("2nd page")
        const stateNews = document.getElementById("last-news").style;
        stateBttn.display === "none" ? stateBttn.display = "flex" : stateBttn.display = "none";
        stateBttn.display === "flex" ? stateNews.zIndex = "-1" : stateNews.zIndex = "1"
    }else stateBttn.display === "none" ? stateBttn.display = "flex" : stateBttn.display = "none";     
}

document.getElementById("search").addEventListener("keypress", searchValue);
document.getElementById("title").addEventListener("click", goToStartPage);
window.addEventListener("click", clearInput);

getNews(newsData.lastUrl());

//Updates every 12 seconds the last news
var intervalId = window.setInterval(function(){
    getNews(newsData.lastUrl())
}, 12000);

