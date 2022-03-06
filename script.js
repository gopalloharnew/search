// Array for card data
const myCardArray = [
  {
    cardTitle: "Youtube",
    cardLink: "https://youtube.com",
    cardTags: ["Youtube", "Video", "Social Media", "Google"],
    cardDescription:
      `YouTube is an American online video sharing and social media platform owned by Google. It was launched on February 14, 2005, by Steve Chen, Chad Hurley, and Jawed Karim. It is the second most visited website, right after Google itself.`,
    card: null,
    searchable: true,
  },
  {
    cardTitle: "Instagram",
    cardLink: "https://instagram.com",
    cardTags: ["Instagram", "Social Media", "Facebook Inc", "Meta Platforms Inc"],
    cardDescription: `Instagram is an American photo and video sharing social networking service founded by Kevin Systrom and Mike Krieger. In April 2012, Facebook Inc. acquired the service for approximately US$1 billion in cash and stock`,
    card: null,
    searchable: true,
  },
  {
    cardTitle: "Facebook",
    cardLink: "https://facebook.com",
    cardTags: ["Facebook", "Facebook Inc", "Social Media", "Meta Platforms Inc"],
    cardDescription: `Meta Platforms Inc., doing business as Meta and formerly known as Facebook Inc, is an American multinational technology conglomerate based in Menlo Park, California. The company is the parent organization of Facebook, Instagram, and WhatsApp, among other subsidiaries.`,
    card: null,
    searchable: true,
  },
  {
    cardTitle: "WhatsApp",
    cardLink: "https://whatsApp.com",
    cardTags: ["WhatsApp", "Social Media", "Meta Platforms Inc", "Facebook Inc"],
    cardDescription: `WhatsApp Messenger, or simply WhatsApp, is an internationally available American freeware, cross-platform centralized instant messaging and voice-over-IP service owned by Meta Platforms.`,
    card: null,
    searchable: true,
  },
  {
    cardTitle: "WhatsApp",
    cardLink: "https://whatsApp.com",
    cardTags: ["Google", "Search Engine"],
    cardDescription: `Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include a search engine, online advertising technologies, cloud computing, software, and hardware.`,
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