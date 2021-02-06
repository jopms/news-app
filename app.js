const api = "3752898342c7441f7444634b55547d12";
const url = `http://api.mediastack.com/v1/news?access_key=${api}&languages=pt`;


function getNews (url){ 
    fetch(url)
        .then ((news) => news.json())
        .then ((data) => console.log(data))
}

