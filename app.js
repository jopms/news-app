const api = "3752898342c7441f7444634b55547d12";
const url = `http://api.mediastack.com/v1/news?access_key=${api}&languages=pt`;



function getNews (url){ 
    fetch(url)
        .then ((news) => news.json())
        .then ((data) => updateWindow(data))
}

function updateWindow(data){
    
    //(document.getElementsByClassName("header"))[0].className === "header" ? (document.getElementsByClassName("header"))[0].className = "headerUpdated" : null;
    ((document.getElementsByClassName("header"))[0]).style.transform = "translateY(0%)";
    ((document.getElementsByClassName("header"))[0]).style.paddingTop = "1rem";
    ((document.getElementsByClassName("header"))[0]).style.boxShadow = "0px 4px 5px -4px rgba(0, 0, 0, 0.3)";
}

function updateInfo(info){
    //getNews(url+`&keywords=${info}`);
    updateWindow(info);

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
