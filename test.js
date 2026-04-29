
let main = document.querySelector("main");
let seasonsButton = document.getElementById("seasonsButton");
let dataButton = document.getElementById("dataButton");
let seasonButtons = document.getElementById("seasonButtons");
let testButton = document.getElementById("testButton");
let buttonsDiv = document.getElementById("buttons");


function skillsDataset() {
    let divSkills = document.createElement("div");
    divSkills.classList.add("bigDiv");
    main.append(divSkills);

    let SkillName = document.createElement("div");
    SkillName.textContent = "Skills"
    divSkills.append(SkillName);

    let headerRow = document.createElement("div");
    headerRow.classList.add("row")
    let divId = document.createElement("div");
    divId.textContent = "ID";
    let divName = document.createElement("div");
    divName.textContent = "Name";

    headerRow.append(divId);
    headerRow.append(divName);
    divSkills.append(headerRow);

    for (let skill of skills) {
        let div = document.createElement("div");
        div.classList.add("divContent");

        let divId = document.createElement("div");
        divId.textContent = skill.id;

        let divName = document.createElement("div");
        divName.textContent = skill.name;

        div.append(divId, divName);
        divSkills.append(div);
    };
}

function locationDataset() {
    let divLocation = document.createElement("div");
    divLocation.classList.add("bigDiv");
    main.append(divLocation);

    let locationName = document.createElement("div");
    locationName.textContent = "Locations";
    divLocation.append(locationName);

    let headerRow = document.createElement("div");
    headerRow.classList.add("row")
    let divId = document.createElement("div");
    divId.textContent = "ID";
    let divName = document.createElement("div");
    divName.textContent = "Name";

    headerRow.append(divId);
    headerRow.append(divName);
    divLocation.append(headerRow);

    for (let place of locations) {
        let div = document.createElement("div");
        div.classList.add("divContent");

        let divId = document.createElement("div");
        divId.textContent = place.id;

        let divName = document.createElement("div");
        divName.textContent = place.name;

        div.append(divId, divName);
        divLocation.append(div);
    }
}

function disciplinesDataset() {
    let divDiscipline = document.createElement("div");
    divDiscipline.classList.add("bigDiv");
    main.append(divDiscipline);

    let disciplineName = document.createElement("div");
    disciplineName.textContent = "Disciplines (grenar)";
    divDiscipline.append(disciplineName);

    // hämta skill-namn dynamiskt
    let skillNames = Object.keys(disciplines[0].skillFactors);

    // HEADER
    let headerRow = document.createElement("div");
    headerRow.classList.add("row");

    let divId = document.createElement("div");
    divId.textContent = "ID";

    let divName = document.createElement("div");
    divName.textContent = "Name";

    headerRow.append(divId, divName);

    for (let skillName of skillNames) {
        let skillDiv = document.createElement("div");
        skillDiv.textContent = skillName;
        headerRow.append(skillDiv);
    }

    divDiscipline.append(headerRow);

    disciplines.sort(function (a, b) {
        return a.id - b.id;
    });

    // RADER
    for (let discipline of disciplines) {

        let row = document.createElement("div");
        row.classList.add("row");

        // id
        let idDiv = document.createElement("div");
        idDiv.textContent = discipline.id;
        row.append(idDiv);

        // name
        let nameDiv = document.createElement("div");
        nameDiv.textContent = discipline.name;
        row.append(nameDiv);

        // skillFactors
        for (let skillName of skillNames) {
            let skillDiv = document.createElement("div");
            skillDiv.textContent = discipline.skillFactors[skillName];
            row.append(skillDiv);
        }

        divDiscipline.append(row);
    }
};


function trainersDataset() {
    let divTrainers = document.createElement("div");
    divTrainers.classList.add("bigDiv");
    main.append(divTrainers);

    let trainerName = document.createElement("div");
    trainerName.textContent = "Trainers";
    divTrainers.append(trainerName);

    let headerRow = document.createElement("div");
    headerRow.classList.add("row")
    let divId = document.createElement("div");
    divId.textContent = "ID";
    let divName = document.createElement("div");
    divName.textContent = "Name";
    let divDisciplineId = document.createElement("div");
    divDisciplineId.textContent = "DisciplineId";

    headerRow.append(divId);
    headerRow.append(divName);
    headerRow.append(divDisciplineId);
    divTrainers.append(headerRow);

    for (let trainer of trainers) {
        let div = document.createElement("div");
        div.classList.add("divContent");

        let divId = document.createElement("div");
        divId.textContent = trainer.id;

        let divName = document.createElement("div");
        divName.textContent = trainer.name;

        let divDiciplineId = document.createElement("div");
        divDiciplineId.textContent = trainer.disciplineId;

        div.append(divId, divName, divDiciplineId);
        divTrainers.append(div);
    }
};

function coachesDataset() {
    let divCoaches = document.createElement("div");
    divCoaches.classList.add("bigDiv");
    main.append(divCoaches);

    let coachesName = document.createElement("div");
    coachesName.textContent = "Coaches";
    divCoaches.append(coachesName);

    let headerRow = document.createElement("div");
    headerRow.classList.add("row")
    let divId = document.createElement("div");
    divId.textContent = "ID";
    let divName = document.createElement("div");
    divName.textContent = "Name";
    let divSkillId = document.createElement("div");
    divSkillId.textContent = "SkillId";

    headerRow.append(divId);
    headerRow.append(divName);
    headerRow.append(divSkillId);
    divCoaches.append(headerRow);

    for (let coach of coaches) {
        let div = document.createElement("div");
        div.classList.add("divContent");

        let divId = document.createElement("div");
        divId.textContent = coach.id;

        let divName = document.createElement("div");
        divName.textContent = coach.name;

        let divskillID = document.createElement("div");
        divskillID.textContent = coach.skillId;

        div.append(divId, divName, divskillID);
        divCoaches.append(div);
    }
};


function participantsDataset() {
    let divParticioants = document.createElement("div");
    divParticioants.classList.add("bigDiv");
    main.append(divParticioants);

    let headerRow = document.createElement("div");
    headerRow.classList.add("row");
    let participantName = document.createElement("div");
    participantName.textContent = "Participants (tävlande)";
    divParticioants.append(participantName);

    let divId = document.createElement("div");
    divId.textContent = "ID";
    let divName = document.createElement("div");
    divName.textContent = "Name";
    let divClan = document.createElement("div");
    divClan.textContent = "Clan";

    headerRow.append(divId);
    headerRow.append(divName);
    headerRow.append(divClan);
    divParticioants.append(headerRow);


    let num = 0;

    for (let person of participants) {
        let div = document.createElement("div");
        div.classList.add("divContent");

        num++;

        let divId = document.createElement("div");
        divId.textContent = `${num}. ${person.id}`

        let divName = document.createElement("div");
        divName.textContent = person.name;

        let divClan = document.createElement("div");
        divClan.textContent = person.clan;

        div.append(divId, divName, divClan);
        divParticioants.append(div);
    }
};


function seasonCompetition(year) {
    let competition_this_yaer = seasons.find(d => d.year === year);

    let coaches = competition_this_yaer.coaches;
    let trainers = competition_this_yaer.trainers;
    let competitionDays = competition_this_yaer.competitionDays;

    //coaches
    let coachesDIV = document.createElement("div");
    coachesDIV.classList.add("bigDiv");
    main.append(coachesDIV);

    let coachesName = document.createElement("div");
    coachesName.textContent = "Coaches";
    coachesDIV.append(coachesName);

    let headerRow = document.createElement("div");
    headerRow.classList.add("row");
    let divId = document.createElement("div");
    divId.textContent = "Player ID";
    let coachID = document.createElement("div");
    coachID.textContent = "coach ID";

    headerRow.append(divId);
    headerRow.append(coachID);
    coachesDIV.append(headerRow);

    for (let coach of coaches) {
        let divContent = document.createElement("div");
        divContent.classList.add("row");

        let playersID = document.createElement("div");
        playersID.textContent = coach.participantId;

        let coachID = document.createElement("div");
        coachID.textContent = coach.coachId;

        divContent.append(playersID, coachID);
        coachesDIV.append(divContent);
    }

    //trainers
    let trainerDIV = document.createElement("div");
    trainerDIV.classList.add("bigDiv");
    main.append(trainerDIV);

    let trainerName = document.createElement("div");
    trainerName.textContent = "Trainers";
    trainerDIV.append(trainerName);

    let headerRowTrainer = document.createElement("div");
    headerRowTrainer.classList.add("row");
    let divIdTrainer = document.createElement("div");
    divIdTrainer.textContent = "Player ID";
    let trainerID = document.createElement("div");
    trainerID.textContent = "Trainer ID";

    headerRowTrainer.append(divIdTrainer);
    headerRowTrainer.append(trainerID);
    trainerDIV.append(headerRowTrainer);

    for (let trainer of trainers) {
        let divContent = document.createElement("div");
        divContent.classList.add("row");

        let playersID = document.createElement("div");
        playersID.textContent = trainer.participantId;

        let trainerID = document.createElement("div");
        trainerID.textContent = trainer.trainerId;

        divContent.append(playersID, trainerID);
        trainerDIV.append(divContent);
    }


    //competitionDays

    let daysMenu = document.createElement("div");
    daysMenu.classList.add("daysMenu");
    main.append(daysMenu);

    for (let compDay of competitionDays) {
        let btn = document.createElement("button");

        btn.textContent = `${compDay.date.day}/${compDay.date.month}`;

        btn.addEventListener("click", function () {
            showDay(compDay);
        });

        daysMenu.append(btn);
    }
    function showDay(compDay) {

        let existing = document.querySelector(".dayContainer");
        if (existing) existing.remove();

        let dayContainer = document.createElement("div");
        dayContainer.classList.add("dayContainer");
        main.append(dayContainer);

        let locationObj = locations.find(l => l.id === compDay.locationId);

        for (let event of compDay.events) {

            let game1 = document.createElement("div");
            game1.classList.add("bigDiv");

            let title = document.createElement("div");
            title.textContent = `Discipline ${event.disciplineId}`;

            let info = document.createElement("div");
            info.textContent = `${compDay.date.day}/${compDay.date.month} - ${locationObj.name}`;

            let headerRow = document.createElement("div");
            headerRow.classList.add("row");

            let p = document.createElement("div");
            p.textContent = "Player";

            let s = document.createElement("div");
            s.textContent = "Score";

            headerRow.append(p, s);

            game1.append(title, info, headerRow);

            for (let score of event.scores) {
                let row = document.createElement("div");
                row.classList.add("row");

                let id = document.createElement("div");
                id.textContent = score.participantId;

                let val = document.createElement("div");
                val.textContent = score.score;

                row.append(id, val);
                game1.append(row);
            }

            dayContainer.append(game1);
        }
    }
}


dataButton.addEventListener("click", function () {
    main.innerHTML = "";
    buttonsDiv.style.display = "none";
    main.style.display = "grid";
    seasonButtons.style.display = "none";

    skillsDataset();
    locationDataset();
    disciplinesDataset();
    trainersDataset();
    coachesDataset();
    participantsDataset();
});


let buttonYear = [];
seasonsButton.addEventListener("click", function () {
    main.innerHTML = "";
    main.style.display = "grid";
    buttonsDiv.style.display = "none";
    seasonButtons.style.display = "block";

    let existing = document.querySelector(".buttonMeny");

    if (!existing) {
        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("buttonMeny");
        seasonButtons.append(buttonDiv);
        for (let i = 0; i < 10; i++) {
            let button = document.createElement("button");
            button.textContent = `Season ${i}`;

            button.addEventListener("click", function () {
                main.innerHTML = "";
                let year = Number(button.textContent.split(" ")[1]);
                seasonCompetition(year);
            });

            buttonDiv.append(button);
        }
    }
});



testButton.addEventListener("click", function () {
    buttonsDiv.style.display = "flex";
    main.innerHTML = "";
    main.style.display = "flex";
    main.style.flexDirection = "column";
    seasonButtons.style.display = "none";
    let h1 = document.createElement("h1");
    h1.textContent = "Område för att testa kod";
    h1.style.textAlign = "center";
    main.append(h1);
    buttonsDiv.append(playerButton);
    buttonsDiv.append(coachesButton);
    buttonsDiv.append(trainerButton);

    clanMembersDiagram();

});

let playerButton = document.createElement("button");
playerButton.textContent = "Player Info";

playerButton.addEventListener("click", function () {
    playerInfo(148);
});

let coachesButton = document.createElement("button");
coachesButton.textContent = "Coaches";

coachesButton.addEventListener("click", function () {
    coachInfo();
});

let trainerButton = document.createElement("button");
trainerButton.textContent = "Trainers";

trainerButton.addEventListener("click", function () {
    trainerInfo()
});


//test av kod

function trainerInfo() {
    main.innerHTML = "";
    let contentDIV = document.createElement("div");
    contentDIV.style.display = "flex";
    contentDIV.style.gap = "15px";
    contentDIV.style.border = "none";

    let trainerCount = {};

    for (let season of seasons) {
        for (let trainer of season.trainers) {
            if (!trainerCount[trainer.trainerId]) {
                trainerCount[trainer.trainerId] = 0;
            }
            trainerCount[trainer.trainerId]++;
        }
    }


    let resultDiv = document.createElement("div");
    resultDiv.style.width = "300px";

    let h2 = document.createElement("h2");
    h2.textContent = "Antal tävlande per tränare (alla säsonger)";
    resultDiv.append(h2);

    let trainerID = 1;

    for (let person in trainerCount) {
        let div = document.createElement("div");
        div.textContent = `TrainerID: ${trainerID} : ${trainerCount[person]}`;
        trainerID++;
        resultDiv.append(div);
    }
    contentDIV.append(resultDiv);

    //antal tävlande per tränare per år
    let result = {};

    for (let season of seasons) {
        let year = season.year;
        result[year] = {};

        for (let trainer of season.trainers) {
            if (!result[year][trainer.trainerId]) {
                result[year][trainer.trainerId] = 0;
            }
            result[year][trainer.trainerId]++;
        }
    }


    let resultDivYEAR = document.createElement("div");
    let divInsideResultYear = document.createElement("div");
    divInsideResultYear.style.display = "flex";
    divInsideResultYear.style.gap = "5px";

    let h2Year = document.createElement("h2");
    h2Year.textContent = "Antal tävlande per tränare per säsong";
    resultDivYEAR.append(h2Year);

    for (let year in result) {
        let rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";
        rowDiv.style.gap = "10px";

        let yearTitle = document.createElement("div");
        yearTitle.textContent = `Year ${year}:`;
        yearTitle.style.fontWeight = "bold";

        rowDiv.append(yearTitle);

        for (let trainerId in result[year]) {
            let div = document.createElement("div");
            div.textContent = `${trainerId}, (${result[year][trainerId]})`;

            rowDiv.append(div);
        }
        resultDivYEAR.append(rowDiv);
        contentDIV.append(resultDivYEAR);
    }
    main.append(contentDIV);

};




function coachInfo() {
    main.innerHTML = "";
    let contentDIV = document.createElement("div");
    contentDIV.style.display = "flex";
    contentDIV.style.gap = "15px";
    contentDIV.style.border = "none";

    let coachCount = {};

    for (let season of seasons) {
        for (let coach of season.coaches) {
            if (!coachCount[coach.coachId]) {
                coachCount[coach.coachId] = 0;
            }
            coachCount[coach.coachId]++;
        }
    }

    let resultDiv = document.createElement("div");
    resultDiv.style.width = "300px";

    let h2 = document.createElement("h2");
    h2.textContent = "Antal tävlande per coach (alla säsonger)";
    resultDiv.append(h2);

    let coachID = 1;

    for (let person in coachCount) {
        let div = document.createElement("div");
        div.textContent = `CoachID: ${coachID} : ${coachCount[person]}`;
        coachID++;
        resultDiv.append(div);
    }
    contentDIV.append(resultDiv);

    //antal tävlande per coach per år
    let result = {};

    for (let season of seasons) {
        let year = season.year;
        result[year] = {};

        for (let coach of season.coaches) {
            if (!result[year][coach.coachId]) {
                result[year][coach.coachId] = 0;
            }
            result[year][coach.coachId]++;
        }
    }

    let resultDivYEAR = document.createElement("div");
    let divInsideResultYear = document.createElement("div");
    divInsideResultYear.style.display = "flex";
    divInsideResultYear.style.gap = "5px";

    let h2Year = document.createElement("h2");
    h2Year.textContent = "Antal tävlande per coach per säsong";
    resultDivYEAR.append(h2Year);

    for (let year in result) {
        let rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";
        rowDiv.style.gap = "10px";

        let yearTitle = document.createElement("div");
        yearTitle.textContent = `Year ${year}:`;
        yearTitle.style.fontWeight = "bold";

        rowDiv.append(yearTitle);

        for (let coachId in result[year]) {
            let div = document.createElement("div");
            div.textContent = `${coachId}, (${result[year][coachId]})`;

            rowDiv.append(div);
        }
        resultDivYEAR.append(rowDiv);
        contentDIV.append(resultDivYEAR);
    }
    main.append(contentDIV);
};



function playerInfo(player_id) {
    main.innerHTML = "";
    let playerID;
    let coachesArray = [];
    let trainerArray = [];
    let eventsArray = [];

    for (let player of participants) {
        if (player_id === player.id) {
            playerID = player.id;
        }
    }

    //loopa igenom en säsong i taget (game = en säsong)
    for (let game of seasons) {
        for (let coach of game.coaches) {
            if (coach.participantId === playerID) {
                let obj = {
                    "year": game.year,
                    "coach": coach.coachId
                }
                coachesArray.push(obj);
            }
        }
    }

    //loopa igenom en säsong i taget (game = en säsong)
    for (let game of seasons) {
        for (let trainer of game.trainers) {
            if (trainer.participantId === playerID) {
                let obj = {
                    "year": game.year,
                    "trainer": trainer.trainerId
                }
                trainerArray.push(obj);
            }
        }
    }


    for (let game of seasons) {
        for (let playerPart of game.competitionDays) {
            for (let event of playerPart.events) {

                let scoreObj = event.scores.find(function (s) {
                    return s.participantId === playerID;
                });

                if (scoreObj) {
                    let obj = {
                        year: game.year,
                        day: playerPart.date,
                        locationId: playerPart.locationId,
                        event: event
                    };

                    eventsArray.push(obj);
                }
            }
        }
    }

    main.innerHTML = "";

    let title = document.createElement("h2");
    title.textContent = `Spelare ${player_id}`;
    main.append(title);

    let contentDiv = document.createElement("div");
    contentDiv.style.display = "flex";
    contentDiv.style.gap = "20px";
    let coachDiv = document.createElement("div");
    let trainerDiv = document.createElement("div");

    for (let item of coachesArray) {
        let div = document.createElement("div");
        div.style.width = "300px";
        div.textContent = `Year: ${item.year}, Coach: ${item.coach}`;
        coachDiv.append(div);
    }

    for (let item of trainerArray) {
        let div = document.createElement("div");
        div.style.width = "300px";
        div.textContent = `Year: ${item.year}, Trainer: ${item.trainer}`;
        trainerDiv.append(div);
    };
    contentDiv.append(coachDiv);
    contentDiv.append(trainerDiv);
    main.append(contentDiv);

    let thisDIV = document.createElement("div");
    thisDIV.classList.add("dayContainer");

    for (let item of eventsArray) {

        let gameDiv = document.createElement("div");
        gameDiv.classList.add("bigDiv");

        let title = document.createElement("div");
        title.textContent = `Discipline ${item.event.disciplineId}`;

        let info = document.createElement("div");
        info.textContent = `${item.day.day}/${item.day.month} - Year: ${item.year}`;

        gameDiv.append(title, info);
        let sortedScores = item.event.scores.slice().sort(function (a, b) {
            return b.score - a.score;
        });

        for (let score of sortedScores) {
            let row = document.createElement("div");

            row.textContent = `Player: ${score.participantId}, Score: ${score.score}`;

            // markera din spelare
            if (score.participantId === playerID) {
                row.style.backgroundColor = "yellow";
            }

            gameDiv.append(row);
            thisDIV.append(gameDiv);
        }
        main.append(thisDIV);
    }

};


//medlemar i varje clan
function membersOfClan() {
    let countClan = {};

    for (let person of participants) {
        if (!countClan[person.clan]) {
            countClan[person.clan] = 0;
        }
        countClan[person.clan]++;
    };
    return countClan;
};

membersOfClan()

//diagram
function clanMembersDiagram() {

    let hSvg = 400;
    let wSvg = 800;
    let wPad = 50;
    let hPad = 50;

    let dataset = membersOfClan();

    let dataGraph = [];

    for (let key in dataset) {
        dataGraph.push({
            Name: key,
            Count: dataset[key]
        });
    }

    let allClans = dataGraph.map(x => x.Name);

    console.log(allClans)


    let xScale = d3.scaleBand()
        .domain(allClans)
        .range([wPad, wSvg - wPad])
        .paddingInner(0.3)
        .paddingOuter(0.2)

    let yScale = d3.scaleLinear()
        .domain([0, 15])
        .range([hSvg - hPad, hPad]);

    let hScale = d3.scaleLinear()
        .domain([0, 15])
        .range([0, hSvg - 2 * hPad])

    let svg = d3.select("main")
        .append("svg")
        .attr("height", hSvg)
        .attr("width", wSvg)
        .style("border", "1px solid black")

    let xAxel = d3.axisBottom(xScale);
    let yAxel = d3.axisLeft(yScale);

    svg.append("g")
        .call(xAxel)
        .attr("transform", `translate(0, ${hSvg - hPad})`);

    svg.append("g")
        .call(yAxel)
        .attr("transform", `translate(${hPad}, 0 )`);

    svg.append("g")
        .selectAll("rect")
        .data(dataGraph)
        .enter()
        .append("rect")
        .attr("height", d => hScale(d.Count))
        .attr("width", xScale.bandwidth())
        .attr("x", d => xScale(d.Name))
        .attr("y", d => yScale(d.Count))
        .attr("fill", "green")

    svg.append("g")
        .selectAll("text")
        .data(dataGraph)
        .enter()
        .append("text")
        .text(d => d.Count)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("x", d => xScale(d.Name) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.Count) - 5)
};



function threeYears(yearOne, yearTwo, yearThree) {

    function getParticipants(year) {
        let arr = [];
        let season = seasons.find(function (x) {
            return x.year === year;
        });

        for (let day of season.competitionDays) {
            for (let event of day.events) {
                for (let person of event.scores) {

                    if (!arr.includes(person.participantId)) {
                        arr.push(person.participantId);
                    }

                }
            }
        }

        return arr;
    }

    let y1 = getParticipants(yearOne);
    let y2 = getParticipants(yearTwo);
    let y3 = getParticipants(yearThree);

    let commonParticipants = [];

    for (let id of y1) {
        if (y2.includes(id) && y3.includes(id)) {
            commonParticipants.push(id);
        }
    }
    console.log(commonParticipants);

    let notInCompetition = [];

    for (let person of participants) {
        if (!commonParticipants.includes(person.id)) {
            notInCompetition.push(person.id);
        }
    }

    console.log(notInCompetition);
};

threeYears(0, 1, 2)