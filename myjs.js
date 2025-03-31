import { DataJson } from "./data.js";

let selectedNavElement = "None"

// Create class structure for the metadata entries in the library
class DataSource {
    constructor(VISERname, title, formalname, citation, description, onPlatform, cat) {
        this.VISERname = VISERname;
        this.title = title;
        this.formalName = formalname;
        this.citation = citation;
        this.description = description;
        this.onPlatform = onPlatform;
        this.cat = cat;
    }
}

var headerMapping = {
    "citation": "Citation",
    "description": "Description",
    "onPlatform": "Available on Platform",
    "cat": "Categories",
    "title": "Dataset Title",
    "formalName": "Formal Name"
}

//Initialise list that will contain DataSource classes
var metadataSources = [];
var categoriesToDraw = [];
var categoriesOpened = [];

// Read in json data of the metadata library
var jsonData = JSON.parse(DataJson)

// Iterate through the json data and turn them into DataSource classes
for (var i in jsonData) {
    var dataArray = [];
    var title = i;
    var data = jsonData[i];
    dataArray.push(title)
    for (var j in data) {
        var subKey = j;
        var subData = data[j]
        dataArray.push(subData)
    }
    metadataSources.push(new DataSource(
        dataArray[0], 
        dataArray[1],
        dataArray[2],
        dataArray[3],
        dataArray[4],
        dataArray[5],
        dataArray[6])
    )
    if (categoriesToDraw.indexOf(dataArray[6]) == -1) {
        categoriesToDraw.push(dataArray[6])
    }
}

// Give an onclick effect to all elements of the navigation panel on the left
var buttons = document.querySelectorAll("div.navEntry");
for (i = 0; i < buttons.length; i++) {
    buttons[i].onclick = navSelector
}


// This function redraws the table on the right containing the metadata
function redrawDataWindow(selectedElement) {
    var drawNode;
    for (var i in metadataSources) {
        if (metadataSources[i].VISERname == selectedElement) {
            drawNode = metadataSources[i]
        }
    }
    document.getElementById('display').innerHTML = ''
    document.getElementById('display').innerHTML += '<table class="table-class" id="display-table">';
    var colorTurn = 0;
    for (var i in drawNode) {  
        if (i != "VISERname"){
            if (colorTurn == 1){
                document.getElementById('display-table').innerHTML += ` 
                <tr> 
                    <td class="table-light-left">${headerMapping[i]} </td>
                    <td class="table-light-right">${drawNode[i]} </td>
                </tr>
                `
                colorTurn = 0;
            } else {
                document.getElementById('display-table').innerHTML += ` 
                <tr> 
                    <td class="table-heavy-left">${headerMapping[i]} </td>
                    <td class="table-heavy-right">${drawNode[i]} </td>
                </tr>
                `
                colorTurn = 1;
            }
        }
        
    }
}

// This function returns the text of whatever element is clicked in the left hand side navigation 
// panel
function navSelector(e) {
    selectedNavElement = e.target.innerText
    redrawDataWindow(selectedNavElement);
}

function headerSelector(e) {
    //TODO add removal if reclicked
    selectedNavElement = e.target.innerText;
    if (categoriesOpened.indexOf(selectedNavElement) > -1){
        categoriesOpened.splice(categoriesOpened.indexOf(selectedNavElement))
    } else {
        categoriesOpened.push(selectedNavElement);
    }
    drawUnsearchedNavPanel()
}

// Establish the search box as a variable
const searchField = document.getElementById("metadata-search")

// Draw the left hand side navigation panel when something is searched
function drawSearchedNavPanel(e){
    document.getElementById('Navigator').innerHTML = ''
    for (var key in metadataSources) {
        // Gives index : object pairs
        for (var data in metadataSources[key]) {
            if(metadataSources[key][data].toLowerCase().includes(e.target.value)) {
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button">
                        <div class="navEntry">
                            <p class="inter-nav" id="${metadataSources[key].VISERname}"> ${metadataSources[key].VISERname} </p>
                        </div>
                    </button>
                </div>`
                break;
            }
        }
    }
    var buttons = document.querySelectorAll("div.navEntry");

    for (i = 0; i < buttons.length; i++) {
        buttons[i].onclick = navSelector
    }
}

// Draw the left hand side navigation panel when nothing is searched
function drawUnsearchedNavPanel(e){
    document.getElementById('Navigator').innerHTML = ''
    for (var i in categoriesToDraw){
        document.getElementById('Navigator').innerHTML += 
            `<div class="unpadded-div">
                <button class="nav-entry-button">
                    <div class="navHeader">
                        <p class="inter-nav" id="${categoriesToDraw[i]}"> ${categoriesToDraw[i]} </p>
                    </div>
                </button>
            </div>`
        if (categoriesOpened.indexOf(categoriesToDraw[i]) != -1) {
            for (var j in metadataSources) {
                if (metadataSources[j].cat.includes(categoriesToDraw[i])) {
                    document.getElementById('Navigator').innerHTML +=
                        `<div class="unpadded-div">
                            <button class="nav-entry-button">
                                <div class="navEntry">
                                    <p class="inter-nav" id="${metadataSources[j].VISERname}"> ${metadataSources[j].VISERname} </p>
                                </div>
                            </button>
                        </div>`
                }
            }
        }
    }

    var buttons = document.querySelectorAll("div.navEntry");

    for (i = 0; i < buttons.length; i++) {
        buttons[i].onclick = navSelector
    }

    var headers = document.querySelectorAll("div.navHeader");

    for (i = 0; i < headers.length; i++) {
        headers[i].onclick = headerSelector
    }
}

// Initial draw of the navigation panel on the left of the screen
drawUnsearchedNavPanel();

searchField.addEventListener('input', function(e) {
    if (e.target.value == '') {
        drawUnsearchedNavPanel(e);
    } else {
        drawSearchedNavPanel(e)
        }
    }
)

// Function to handle resizing some elements of the page
function imageWidthHandler() {
    if (window.innerWidth < 1135){
        document.getElementById("body").innerHTML = `
        <p> Mobile is not supported at this time </p>
        `
    } else {
        document.getElementById("body").innerHTML = `
        <div class="mainHeader">
            <div class="left-float-div">
                <p class="inter-main-header">Moreton Bay Knowledge Hub Metadata Library</p>
            </div>
            <div class="right-float-div">
                <img src="images/QUT.png" class="header-image">
                <img src="images/MSQ.png" class="header-image">
                <img src="images/MBF.png" class="header-image">
                <img src="images/PnW.png" class="header-image">
                <img src="images/RCA.png" class="header-image">
                <img src="images/UQ_LOGO.png" class="header-image">
            </div>
        </div> 
        <div class="left-column">
            <input type="search" id="metadata-search" name="q" class="search-box" placeholder="Search">
            <nav class="sideNav" id="Navigator">
            
            </nav>
        </div>
        <div class="right-column">
            <div class="data-display" id="display">
                <p> To get started, click a link on the left. </p>
            </div>
        </div>
        `
        drawUnsearchedNavPanel();
    }
}

window.addEventListener("resize", imageWidthHandler)