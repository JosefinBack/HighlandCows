let header = document.getElementById("header");

let contentNav = `
<nav>
        <div id="left-side">
            <h1>Highland Cow</h1>
            <h5>Tournament</h5>
        </div>
        <div id="right-side">
            <a href="" id="start-Button">Start</a>
            <a href="" id="season-Button">Season</a>
            <a href="" id="event-Button">Event</a>

            <div class="dropdown">

            <a href="#" id="clans-Button">
                Clans
            </a>

            <div class="dropdownContent">

                <a href="#"
                   class="clanLink"
                   data-clan="MacThomas">
                   MacThomas
                </a>

                <a href="#"
                   class="clanLink"
                   data-clan="MacLeod">
                   MacLeod
                </a>

                <a href="#"
                   class="clanLink"
                   data-clan="MacQueen">
                   MacQueen
                </a>

                <a href="#"
                   class="clanLink"
                   data-clan="MacDowall">
                   MacDowall
                </a>

                <a href="#"
                   class="clanLink"
                   data-clan="MacKinnon">
                   MacKinnon
                </a>
            </div>
        </div>

            <a href="" id="history-Button">History</a>
        </div>
    </nav>
`

function createHeader() {
    header.innerHTML = contentNav;
};
createHeader()


let clanLinks = document.querySelectorAll(".clanLink");

for (let link of clanLinks) {

    link.addEventListener("click", function (event) {
        event.preventDefault();
        let selectedClan = link.dataset.clan;
        localStorage.setItem("selectedClan", selectedClan);
        window.location.href = "../html/clanPage.html";
    });
};
