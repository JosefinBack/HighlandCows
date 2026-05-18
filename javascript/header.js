let header = document.getElementById("header");

let contentNav = `
<nav>
        <div id="left-side">
            <h1>Highland Cow</h1>
            <h5>Tournament</h5>
        </div>
        <div id="right-side">
            <a href="nav.html" id="start-Button">Start</a>
            <a href="season.html" id="season-Button">Season</a>
            <a href="event_page.html" id="event-Button">Event</a>
            <a href="clanPage.html" id="clans-Button">Clans</a>
            <a href="history.html" id="history-Button">History</a>
        </div>
    </nav>
`

function createHeader() {
    header.innerHTML = contentNav;
};
createHeader()


let clanLinks = document.querySelectorAll(".clanLink");
let homePage = document.getElementById("start-button");

for (let link of clanLinks) {

    link.addEventListener("click", function (event) {
        event.preventDefault();
        let selectedClan = link.dataset.clan;
        localStorage.setItem("selectedClan", selectedClan);
        window.location.href = "../html/clanPage.html";
    });
};
