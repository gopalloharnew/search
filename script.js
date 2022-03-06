const cardArray = [
    {
        cardTitle: "Title",
        cardLink: "#",
        cardTags: ["HTML", "CSS"],
        cardDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, commodi.",
        card: null
    },
    {
        cardTitle: "New Card",
        cardLink: "https://youtube.com",
        cardTags: ["CSS"],
        cardDescription: "Another Card",
        card: null
    },
]

const search = document.querySelector("#search");
const mycardTemplet = document.querySelector(".mycard-templet");
const cardContainer = document.querySelector(".card-container");

for (let i = 0; i < cardArray.length; i++) {
    const cardInfo = cardArray[i];

    // creating card with cardArray
    const cardTemplet = mycardTemplet.content.cloneNode(true).children[0];
    cardTemplet.querySelector(".card-title").textContent = cardInfo.cardTitle;
    cardTemplet.querySelector(".card-title").href = cardInfo.cardLink;
    for (const cardTag of cardInfo.cardTags) {
        let cardTagLi = document.createElement("li")
        cardTagLi.classList.add("card-tag", "flex", "center")
        cardTagLi.innerHTML = cardTag;
        cardTemplet.querySelector(".card-tag-box").append(cardTagLi);
    }
    cardTemplet.querySelector(".card-description").textContent = cardInfo.cardDescription;
    cardTemplet.querySelector(".card-link").href = cardInfo.cardLink;

    cardContainer.append(cardTemplet);
    cardInfo.card = cardTemplet;
}


search.addEventListener("input", ()=>{
    let inputVal = search.value.trim().toLowerCase();
})

