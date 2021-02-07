const api = "3752898342c7441f7444634b55547d12";
const url = `http://api.mediastack.com/v1/news?access_key=${api}&languages=pt`;



function getNews (url){ 
    fetch(url)
        .then ((news) => news.json())
        .then ((data) => updateHTML(data))
}

function updateHTML(data){
    (document.getElementsByClassName("header"))[0].className === "header" ? (document.getElementsByClassName("header"))[0].className = "headerUpdated" : null
    
}

function updateInfo(info){
    getNews(url+`&keywords=${info}`);

}

function searchValue (e){
    if(e.key === "Enter"){
        updateInfo(this.value);
        this.value = "";
    }else return null

    
}



function clearInput(){
    document.getElementById("search").value = "";
}

document.getElementById("search").addEventListener("keypress", searchValue);
window.addEventListener("click", clearInput);
