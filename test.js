
let main = document.querySelector("main");
let seasonsButton = document.getElementById("seasonsButton");
let dataButton = document.getElementById("dataButton");
let seasonButtons = document.getElementById("seasonButtons");


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
        divId.textContent = `${num}. ${person.name}`

        let divName = document.createElement("div");
        divName.textContent = person.name;

        //clan
        let randomNumber = Math.floor(Math.random() * 6);
        let divClan = document.createElement("div");
        divClan.textContent = clan[randomNumber].name;

        div.append(divId, divName, divClan);
        divParticioants.append(div);
    }
};

let seasong_year_0 = seasons.find(d => d.year === 0);
let seasong_year_1 = seasons.find(d => d.year === 1);
let seasong_year_2 = seasons.find(d => d.year === 2);
let seasong_year_3 = seasons.find(d => d.year === 3);
let seasong_year_4 = seasons.find(d => d.year === 4);
let seasong_year_5 = seasons.find(d => d.year === 5);
let seasong_year_6 = seasons.find(d => d.year === 6);
let seasong_year_7 = seasons.find(d => d.year === 7);
let seasong_year_8 = seasons.find(d => d.year === 8);
let seasong_year_9 = seasons.find(d => d.year === 9);


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


