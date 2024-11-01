
const createCard = (data)=>{
    let card = document.createElement("div");
    card.classList.add("card-result");

    let cardImg = document.createElement("div");
    cardImg.classList.add("card-result-img");
    cardImg.style.setProperty("background-image",`url(${data.imageUrl})`);
    cardImg.style.setProperty("background-position","center");
    cardImg.style.setProperty("background-repeat","no-repeat");
    cardImg.style.setProperty("background-size","cover");
    
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-result-body");

    let cardTitle = document.createElement("h1");
    cardTitle.classList.add("card-result-title")
    cardTitle.innerText = data.name
    
    let cardDescription = document.createElement("p");
    cardDescription.classList.add("card-result-description");
    cardDescription.innerText = data.description

    let cardButton = document.createElement("button");
    cardButton.classList.add("card-button");
    cardButton.innerText = "Visit"

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardButton);
    
    card.appendChild(cardImg);
    card.appendChild(cardBody);

    return card;
}

(async()=>{
     
    const buttonSearch =  document.getElementById('search');
    const buttonClear = document.getElementById("clear");
    const elementSearchResults = document.getElementById('searchResults');
    const keywordsSearches = {
        countries: "countries",
        country:  "countries",
        beaches: "beaches",
        beach: "beaches",
        temples: "temples",
        temple: "temples"
    }
    let allRecommendations = await fetch("./travel_recommendation.json")
    .then(Response => Response.json());
    
    buttonClear.addEventListener("click",()=>{
        elementSearchResults.innerHTML = '';
    })

    buttonSearch.addEventListener('click',(e)=>{
        const inputSearchValue = document.getElementById('searchValue');
        searchValue = inputSearchValue.value.toLowerCase().trim();
        
        elementSearchResults.innerHTML = " ";
        const keywordResult = keywordsSearches[searchValue];
        searchResults = allRecommendations[keywordResult];
        if(typeof searchResults === "undefined" ){
            console.log("No Results Found");
        }
        else if(keywordResult === "temples" || keywordResult === "beaches"){
            const searchHead = document.createElement("div");
            searchHead.classList.add("search-head");
            elementSearchResults.appendChild(searchHead);
            searchResults.forEach(element => {
                const card = createCard(element);
                elementSearchResults.appendChild(card);
            });
        }
        else{
            const searchHead = document.createElement("div");
            searchHead.classList.add("search-head");
            elementSearchResults.appendChild(searchHead);
            searchResults.forEach((country) => {
                country.cities.forEach((city=>{
                    const card = createCard(city);
                    elementSearchResults.appendChild(card);
                }))
            })
        }
        
    });
})()