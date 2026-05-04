
//URL
let params = new URLSearchParams(window.location.search);
let clanName = params.get("clan");

console.log(clanName);

//Variabler
let main = document.querySelector("main");
let contentClanHomepage = document.getElementById("content");
let backButton = document.getElementById("backButton");


backButton.addEventListener("click", function () {
    window.location.href = "highlansCow.html?page=clans";
});

