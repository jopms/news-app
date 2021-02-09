const newsData = {
    api: "3752898342c7441f7444634b55547d12",
    category: "general",
    url() { return `http://api.mediastack.com/v1/news?access_key=${this.api}&languages=pt&country=pt&sort=published_desc&categories=${this.category}` }
}

const updateCategory = (cat) => {
    newsData.category = cat;
}

const getNews = (url) => {
    console.log(url);
    fetch(url)
        .then((news) => news.json())
        .then((data) => updateWindow(data))
}

const updateWindow = (news) => {
    const headerStyle = ((document.getElementsByClassName("header"))[0]).style;

    headerStyle.transform = "translateY(0%)";
    headerStyle.paddingTop = "1rem";
    headerStyle.boxShadow = "0px 4px 5px -4px rgba(0, 0, 0, 0.3)";

    const organizeData = (news.data).map((n, i) => {
        return (
            `   <div class ="news fade">
                <a href="${news.data[i].url}"><h2 class="title2">${news.data[i].title}</h2></a>
                <p><h3 class="description">${news.data[i].description}</h3></p>
                <p><h4 class="source">${news.data[i].source} - ${(news.data[i].published_at).slice(0, 10)}<h4></p>
                </div>`
        )
    }).join("");

    document.getElementById("news").innerHTML = organizeData;

    requestAnimationFrame(() => {
        news.data.forEach((n, i) => {
            document.getElementsByClassName("news")[i].classList.remove("fade");
        });
    });
}

const updateInfo = (info) => {
    getNews(newsData.url() + `&keywords=${info}`);
}

const searchValue = (e) => {
    if (e.key === "Enter") {
        updateInfo(this.value);
        this.value = "";
    } else return null
}

const clearInput = () => {
    document.getElementById("search").value = "";
}

document.getElementById("search").addEventListener("keypress", searchValue);
window.addEventListener("click", clearInput);