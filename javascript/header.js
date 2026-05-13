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
            <a href="" id="clans-Button">Clans</a>
            <a href="" id="history-Button">History</a>
        </div>
    </nav>
`

function createHeader() {
    header.innerHTML = contentNav;
};
createHeader()
