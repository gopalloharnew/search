// Array for card data
const myCardArray = [
  {
    cardTitle: "Title",
    cardLink: "#",
    cardTags: ["HTML", "CSS"],
    cardDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, commodi.",
    card: null,
    searchable: true,
  },
  {
    cardTitle: "HTML tag card",
    cardLink: "https://youtube.com",
    cardTags: ["HTML"],
    cardDescription: "Another Card",
    card: null,
    searchable: true,
  },
  {
    cardTitle: "CSS tag Card",
    cardLink: "https://youtube.com",
    cardTags: ["He"],
    cardDescription: "Another Card",
    card: null,
    searchable: true,
  },
  {
    cardTitle: "The Javascript tag",
    cardLink: "https://youtube.com",
    cardTags: [],
    cardDescription: "Another Card",
    card: null,
    searchable: true,
  },
  {
    cardTitle: "No tag card",
    cardLink: "https://youtube.com",
    cardTags: ["javascript"],
    cardDescription: "Another Card",
    card: null,
    searchable: true,
  },
];

// Constants

const search = document.querySelector("#search");
const mycardTemplet = document.querySelector(".mycard-templet");
const cardContainer = document.querySelector(".card-container");
const filterBox = document.querySelector(".filter-box");
const filterTagTemplate = document.querySelector(".filter-tag-template");
const searchTagWraper = [...document.querySelectorAll(".filter-tag-wraper")];
const tagsArray = []


// Functions

function populateCards(cardArray){
  cardContainer.innerHTML = '';
  for (let i = 0; i < cardArray.length; i++) {
    const cardInfo = cardArray[i];

    // creating card with cardArray
    const cardTemplet = mycardTemplet.content.cloneNode(true).children[0];
    cardTemplet.querySelector(".card-title").textContent = cardInfo.cardTitle;
    cardTemplet.querySelector(".card-title").href = cardInfo.cardLink;
    cardTemplet.dataset.searchable = true;
    cardTemplet.querySelector(".card-description").textContent = cardInfo.cardDescription;
    cardTemplet.querySelector(".card-link").href = cardInfo.cardLink;

    // adding tags to card with cardArray
    for (const cardTag of cardInfo.cardTags) {      
      let cardTagLi = document.createElement("li");
      cardTagLi.classList.add("card-tag", "flex", "center");
      cardTagLi.innerHTML = cardTag;
      cardTemplet.querySelector(".card-tag-box").append(cardTagLi);
    }
    
    //appending the card made above with cardArray
    cardContainer.append(cardTemplet);
    cardInfo.card = cardTemplet;
  }
}


// save info about tags present in the page
function collectFilterTags(cardArray){
  for (let i = 0; i < cardArray.length; i++) {
    const cardInfo = cardArray[i];
    for (const cardTag of cardInfo.cardTags) {
      let didTagFound = false;
      tagsArray.forEach(tagInfo=>{
        if(tagInfo.tagname.toLowerCase().trim() === cardTag.toLowerCase().trim()){
          tagInfo.tagnumber++;
          tagInfo.tagLocations.push(cardInfo.card);
          didTagFound = true;
        }
      })
      if(!didTagFound){
        tagsArray.push({
          tagname: cardTag,
          tagnumber: 1,
          tagLocations: [cardInfo.card]
        })
      }
    }
  }
}

function populateFilterTags(){
  filterBox.innerHTML = "";
  for (let i = 0; i < tagsArray.length; i++) {
    const tagInfo = tagsArray[i];

    // creating filterButtons from tagsArray
    const myfilterTagTemplate = filterTagTemplate.content.cloneNode(true).children[0];
    myfilterTagTemplate.querySelector(".filter-tag").innerHTML = tagInfo.tagname
    myfilterTagTemplate.querySelector(".filter-tag-number").innerHTML = tagInfo.tagnumber
    myfilterTagTemplate.addEventListener("click", ()=>{
      if(myfilterTagTemplate.dataset.filterTagActive === "false"){
        myfilterTagTemplate.dataset.filterTagActive = "true";
      }else{
        myfilterTagTemplate.dataset.filterTagActive = "false";
      }
      applyFilter()
    })

    // appending filterButtons to filterBox
    filterBox.append(myfilterTagTemplate)
  }
}

// Functionality of filters
function applyFilter(){
  // hide every card and make them unsearchable
  myCardArray.forEach(card=>{
    card.card.classList.add("hide");
    card.card.dataset.searchable = "false";
  })

  // if there is filter then show cards which fits to filter
  let filterTags = [...document.querySelectorAll(`[data-filter-tag-active]`)];
  let isAnyFilter = false;
  for (let k = 0; k < filterTags.length; k++) {
    const filterTag = filterTags[k];
    if(filterTag.dataset.filterTagActive === "true"){
      isAnyFilter = true;
      for (let j = 0; j < tagsArray[k].tagLocations.length; j++) {
        const tagLocation = tagsArray[k].tagLocations[j];
        tagLocation.classList.remove("hide");
        tagLocation.dataset.searchable = true;
      }
      tagsArray.tagLocations
    }
  }

  // if no filter show all cards and make them searchable
  if(!isAnyFilter){
    myCardArray.forEach(card=>{
      card.card.classList.remove("hide");
      card.card.dataset.searchable = "true";
    })
  }
}

// logic for search
function searchFunc(cardArray){
  search.addEventListener("input", ()=>{
    val = search.value.toLowerCase().trim();
    for (let m = 0; m < cardArray.length; m++) {
      const cardInfo = cardArray[m];
      if(cardInfo.card.dataset.searchable === "true"){
        if(
          cardInfo.cardTitle.toLowerCase().trim().includes(val)||
          cardInfo.cardDescription.toLowerCase().trim().includes(val)
        ){
          cardInfo.card.classList.remove("hide")
        }else{
          cardInfo.card.classList.add("hide")
        }
    }
    }
  })
}


// Main Logic

populateCards(myCardArray);
collectFilterTags(myCardArray);
populateFilterTags();
searchFunc(myCardArray)

// filter logic