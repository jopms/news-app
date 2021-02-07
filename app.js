const api = "3752898342c7441f7444634b55547d12";
const url = `http://api.mediastack.com/v1/news?access_key=${api}&languages=pt`;



function getNews (url){ 
    fetch(url)
        .then ((news) => news.json())
        .then ((data) => updateWindow(data))
}

function updateWindow(news){

    ((document.getElementsByClassName("header"))[0]).style.transform = "translateY(0%)";
    ((document.getElementsByClassName("header"))[0]).style.paddingTop = "1rem";
    ((document.getElementsByClassName("header"))[0]).style.boxShadow = "0px 4px 5px -4px rgba(0, 0, 0, 0.3)";

    document.getElementById("news").innerHTML=`
        <div class ="news fade">
        <h2 class="title2">${news.data[0].title}</h2>
        <p><h3 class="description">${news.data[0].description}</h3></p>
        <p><h4 class="source">${news.data[0].source}<h4></p>
        </div>

        <div class ="news fade">
        <h2 class="title2">${news.data[1].title}</h2>
        <p><h3 class="description">${news.data[1].description}</h3></p>
        <p><h4 class="source">${news.data[1].source}<h4></p>
        </div>

        <div class ="news fade">
        <h2 class="title2">${news.data[2].title}</h2>
        <p><h3 class="description">${news.data[2].description}</h3></p>
        <p><h4 class="source">${news.data[2].source}<h4></p>
        </div>
    `;
    requestAnimationFrame(() => {
    document.getElementsByClassName("news")[0].classList.remove("fade");
     document.getElementsByClassName("news")[1].classList.remove("fade");
     document.getElementsByClassName("news")[2].classList.remove("fade");
    });
 


    
    
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
