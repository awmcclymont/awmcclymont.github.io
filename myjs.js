import { DataJson } from "./data.js";

let selectedNavElement = "None"

// Create class structure for the metadata entries in the library
class DataSource {
    constructor(dataName, citation, description, time_period_of_content, spatial_domain, keywords, access_constraints, use_constraints, point_of_contact, browse_graphic,
        data_set_credit, data_set_size_at_reception, data_category, indirect_spatial_reference, direct_spatial_reference, point_and_vector_object_information,
        horizontal_coordinate_system_definition, vertical_coordinate_system_definition, detailed_description, overview_description, data_custodian, resource_description,
        standard_order_process, technical_prerequisites, metadata_date, metadata_standard_name, metadata_standard_version, metadata_time_conversion, available_in_platform,
        external_metadata_reference
    ) {
        this.dataName = dataName;
        this.citation = citation;
        this.description = description;
        this.time_period_of_content = time_period_of_content;
        this.spatial_domain = spatial_domain;
        this.keywords = keywords;
        this.access_constraints = access_constraints;
        this.use_constraints = use_constraints;
        this.point_of_contact = point_of_contact;
        this.browse_graphic = browse_graphic;
        this.data_set_credit = data_set_credit;
        this.data_set_size_at_reception = data_set_size_at_reception;
        this.data_category = data_category;
        this.indirect_spatial_reference = indirect_spatial_reference;
        this.direct_spatial_reference = direct_spatial_reference;
        this.point_and_vector_object_information = point_and_vector_object_information;
        this.horizontal_coordinate_system_definition = horizontal_coordinate_system_definition;
        this.vertical_coordinate_system_definition = vertical_coordinate_system_definition;
        this.detailed_description = detailed_description;
        this.overview_description = overview_description;
        this.data_custodian = data_custodian;
        this.resource_description = resource_description;
        this.standard_order_process = standard_order_process;
        this.technical_prerequisites = technical_prerequisites;
        this.metadata_date = metadata_date;
        this.metadata_standard_name = metadata_standard_name;
        this.metadata_standard_version = metadata_standard_version;
        this.metadata_time_conversion = metadata_time_conversion;
        this.available_in_platform = available_in_platform;
        this.external_metadata_reference = external_metadata_reference;

    }
}

var headerMapping = {
    "citation": "Citation",
    "description": "Description",
    "time_period_of_content": "Time Period of Content",
    "spatial_domain": "Spatial Domain",
    "keywords": "Keywords",
    "access_constraints": "Access Constraints",
    "use_constraints": "Use Constraints",
    "point_of_contact": "Point of Contact",
    "browse_graphic": "Browse Graphic",
    "data_set_credit": "Data Set Credit",
    "data_set_size_at_reception": "Data Set Size at Reception",
    "data_category": "Data Category",
    "indirect_spatial_reference": "Indirect Spatial Reference",
    "direct_spatial_reference": "Direct Spatial Reference",
    "point_and_vector_object_information": "Point and Vector Object Information",
    "horizontal_coordinate_system_definition": "Horizontal Coordinate System Information",
    "vertical_coordinate_system_definition": "Vertical Coordinate System Definition",
    "detailed_description": "Detailed Description",
    "overview_description": "Overview Description",
    "data_custodian": "Data  Custodian",
    "resource_description": "Resource Description",
    "standard_order_process": "Standard Order Process",
    "technical_prerequisites": "Technical Prerequisites",
    "metadata_date": "Metadata Date",
    "metadata_standard_name": "Metadata Standard Name",
    "metadata_standard_version": "Metadata Standard Version",
    "metadata_time_conversion": "Metadata Time Conversion",
    "available_in_platform": "Available in Platform",
    "external_metadata_reference": "External Metadata Reference"
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
        dataArray[6],
        dataArray[7],
        dataArray[8],
        dataArray[9],
        dataArray[10],
        dataArray[11],
        dataArray[12],
        dataArray[13],
        dataArray[14],
        dataArray[15],
        dataArray[16],
        dataArray[17],
        dataArray[18],
        dataArray[19],
        dataArray[20],
        dataArray[21],
        dataArray[22],
        dataArray[23],
        dataArray[24],
        dataArray[25],
        dataArray[26],
        dataArray[27],
        dataArray[28],
        dataArray[29],
        dataArray[30]
    )
    )
    for (var j in dataArray[12].split(", ")){
        if (categoriesToDraw.indexOf(dataArray[12].split(", ")[j]) == -1) {
            categoriesToDraw.push(dataArray[12].split(", ")[j])
        }
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
        if (metadataSources[i].dataName == selectedElement) {
            drawNode = metadataSources[i]
        }
    }
    document.getElementById('display').innerHTML = ''
    document.getElementById('display').innerHTML += '<table class="table-class" id="display-table">';
    var colorTurn = 0;
    for (var i in drawNode) {  
        if (i != "dataName"){
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
    if (e == "None"){
        selectedNavElement = "None";
        displayWelcome(e);
        if (document.getElementById("metadata-search").value == ""){
            drawUnsearchedNavPanel(e)
        } else {
            drawSearched(e)
        }
    } else if (e.target.innerText == selectedNavElement) {
        selectedNavElement = "None";
        let searchedText = document.getElementById("metadata-search").value
        displayWelcomeNoEscape(e);
        if (searchedText == ""){
            drawUnsearchedNavPanel(e)
        } else {
            document.getElementById("metadata-search").value = searchedText
            drawSearched(e)
        }
    } else {
        selectedNavElement = e.target.innerText
        redrawDataWindow(selectedNavElement);
        if (document.getElementById("metadata-search").value == ""){
            drawUnsearchedNavPanel(e)
        } else {
            drawSearched(e)
        }
    }
}

function headerSelector(e) {
    let oldEle = selectedNavElement
    let text = e.target.parentElement.innerText
    if (text[text.length - 1] == "&#x23F4" || text[text.length - 1] == "&#x23F7") {
        selectedNavElement = text.slice(0, text.length - 2).trim()
    } else {
        selectedNavElement = text.slice(0, text.length - 2).trim()
    }
    if (categoriesOpened.indexOf(selectedNavElement) > -1){
        categoriesOpened.splice(categoriesOpened.indexOf(selectedNavElement), 1)
    } else {
        categoriesOpened.push(selectedNavElement);
    }
    if (categoriesToDraw.includes(selectedNavElement)) {
        selectedNavElement = oldEle
    }
    if (document.getElementById("metadata-search").value == ""){
        drawUnsearchedNavPanel(e)
    } else {
        drawSearched(e)
    }
    
}

// Establish the search box as a variable
const searchField = document.getElementById("metadata-search")

searchField.addEventListener('input', function(e) {
    if (e.target.value == '') {
        drawUnsearchedNavPanel(e);
    } else {
        drawSearched(e)
        }
    }
)

function drawSearched(e) {
    console.log(document.getElementById("metadata-search").value.toLowerCase())
    var searchResults = [];
    var cats = [];
    document.getElementById('Navigator').innerHTML = ''
    for (var key in metadataSources) {
        // Gives index : object pairs
        for (var data in metadataSources[key]) {
            if(metadataSources[key][data].toLowerCase().includes(document.getElementById("metadata-search").value.toLowerCase())) {
                searchResults.push(metadataSources[key])
                break;
            }
        }
    }
    for (var i in searchResults) {
        var catList = searchResults[i].data_category.split(",")
        for (var j in catList){
            if (cats.includes(catList[j].trim()) == 0){
                cats.push(catList[j].trim())
            }
        }
    }
    for (var i in cats){
        if (i == 0) {
            if (categoriesOpened.includes(cats[i])){
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div"  style="margin-top: 50px;">
                    <button class="nav-entry-button">
                        <div class="navHeader">
                            <p class="inter-nav" id="${cats[i]}"> ${cats[i]} </p>
                            <div class="chevron-div">
                                &#x23F7
                            </div>
                        </div>
                    </button>
                </div>`
            } else {
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div"  style="margin-top: 50px;">
                    <button class="nav-entry-button">
                        <div class="navHeader">
                            <p class="inter-nav" id="${cats[i]}"> ${cats[i]} </p>
                            <div class="chevron-div">
                                &#x23F4
                            </div>
                        </div>
                    </button>
                </div>`
            }
        } else {
            if (categoriesOpened.includes(cats[i])){
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button">
                        <div class="navHeader">
                            <p class="inter-nav" id="${cats[i]}"> ${cats[i]} </p>
                            <div class="chevron-div">
                                &#x23F7
                            </div>
                        </div>
                    </button>
                </div>`
            } else {
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button">
                        <div class="navHeader">
                            <p class="inter-nav" id="${cats[i]}"> ${cats[i]} </p>
                            <div class="chevron-div">
                                &#x23F4
                            </div>
                        </div>
                    </button>
                </div>`
            }
        }
        
            
            if (categoriesOpened.indexOf(cats[i]) != -1) {
                for (var j in searchResults) {
                    if (searchResults[j].data_category.includes(cats[i])) {
                        if (searchResults[j].dataName == selectedNavElement) {
                            document.getElementById('Navigator').innerHTML +=
                            `<div class="unpadded-div">
                                <button class="nav-entry-button">
                                    <div class="navEntrySelected">
                                        <p class="inter-nav" id="${searchResults[j].dataName}"> ${searchResults[j].dataName} </p>
                                    </div>
                                </button>
                            </div>`
                        } else {
                            document.getElementById('Navigator').innerHTML +=
                            `<div class="unpadded-div">
                                <button class="nav-entry-button">
                                    <div class="navEntry">
                                        <p class="inter-nav" id="${searchResults[j].dataName}"> ${searchResults[j].dataName} </p>
                                    </div>
                                </button>
                            </div>`
                        }
                    }
                }
            }
        }
    
        var buttons = document.querySelectorAll("div.navEntry");
    
        for (i = 0; i < buttons.length; i++) {
            buttons[i].onclick = navSelector
        }

        var selected = document.querySelectorAll("div.navEntrySelected");

        for (i = 0; i < selected.length; i++) {
            selected[i].onclick = navSelector
        }
    
        var headers = document.querySelectorAll("div.navHeader");
    
        for (i = 0; i < headers.length; i++) {
            headers[i].onclick = headerSelector
        }
     
}

// Draw the left hand side navigation panel when nothing is searched
function drawUnsearchedNavPanel(e){
    document.getElementById('Navigator').innerHTML = ''
    console.log(categoriesToDraw)
    for (var i in categoriesToDraw){
        if (i == 0){
            if (categoriesOpened.includes(categoriesToDraw[i])){
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button" style="margin-top: 50px;">
                        <div class="navHeader">
                            <p class="inter-nav" id="${categoriesToDraw[i]}"> ${categoriesToDraw[i]}</p>
                            <div class="chevron-div">
                                &#x23F7
                            </div>
                        </div>
                    </button>
                </div>`
            } else {
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button"  style="margin-top: 50px;">
                        <div class="navHeader">
                            <p class="inter-nav" id="${categoriesToDraw[i]}"> ${categoriesToDraw[i]}</p>
                            <div class="chevron-div">
                                &#x23F4
                            </div>
                        </div>
                    </button>
                </div>`
            }
        } else {
            if (categoriesOpened.includes(categoriesToDraw[i])){
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button">
                        <div class="navHeader">
                            <p class="inter-nav" id="${categoriesToDraw[i]}"> ${categoriesToDraw[i]}</p>
                            <div class="chevron-div">
                                &#x23F7
                            </div>
                        </div>
                    </button>
                </div>`
            } else {
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button">
                        <div class="navHeader">
                            <p class="inter-nav" id="${categoriesToDraw[i]}"> ${categoriesToDraw[i]}</p>
                            <div class="chevron-div">
                                &#x23F4
                            </div>
                        </div>
                    </button>
                </div>`
            }
        }
        
        if (categoriesOpened.indexOf(categoriesToDraw[i]) != -1) {
            for (var j in metadataSources) {
                if (metadataSources[j].data_category.includes(categoriesToDraw[i])) {
                    if (metadataSources[j].dataName == selectedNavElement) {
                        document.getElementById('Navigator').innerHTML +=
                        `<div class="unpadded-div">
                            <button class="nav-entry-button">
                                <div class="navEntrySelected">
                                    <p class="inter-nav" id="${metadataSources[j].dataName}"> ${metadataSources[j].dataName} </p>
                                </div>
                            </button>
                        </div>`
                    } else {
                        document.getElementById('Navigator').innerHTML +=
                        `<div class="unpadded-div">
                            <button class="nav-entry-button">
                                <div class="navEntry">
                                    <p class="inter-nav" id="${metadataSources[j].dataName}"> ${metadataSources[j].dataName} </p>
                                </div>
                            </button>
                        </div>`
                    }
                }
            }
        }
    }

    var buttons = document.querySelectorAll("div.navEntry");

    for (i = 0; i < buttons.length; i++) {
        buttons[i].onclick = navSelector
    }

    var selected = document.querySelectorAll("div.navEntrySelected");

    for (i = 0; i < selected.length; i++) {
        selected[i].onclick = navSelector
    }

    var headers = document.querySelectorAll("div.navHeader");

    for (i = 0; i < headers.length; i++) {
        headers[i].onclick = headerSelector
    }
}

// Initial draw of the navigation panel on the left of the screen
drawUnsearchedNavPanel();



// Function to handle resizing some elements of the page
function imageWidthHandler() {
    if (window.innerWidth < 800){
        document.getElementById("body").innerHTML = `
        <div class="data-display" id="display">
                <p class="inter-paragraph-white"> 
                Mobile is not currently supported for this platform. Please revisit this platform on a device with a larger screen.
                </p>

                <p class="inter-paragraph-white"> 
                We apologise for the inconvenience.
                </p>
            </div>
        `
    } else {
        document.getElementById("body").innerHTML = `
        <div class="mainHeader">
            <div class="left-float-div">
                <p class="inter-main-header">Moreton Bay Knowledge Hub Metadata Library</p>
            </div>
            <div class="right-float-div">
                <img src="images/QUT.png" class="header-image">
                <img src="images/MBF.png" class="header-image">
            </div>
        </div> 
        <div class="left-column">
            <input type="search" id="metadata-search" name="q" class="search-box" placeholder="Search">
            <nav class="sideNav" id="Navigator">
            
            </nav>
        </div>
        <div class="right-column">
            <div class="data-display" id="display">
                <p class="inter-intro-header"> Welcome to the Moreton Bay Knowledge Metadata Library</p>
                <p class="inter-paragraph-white"> 
                This page serves a metadata library for data pertaining to different aspects of the Moreton Bay region. 
                The metadata featured in this library stretch over several categories as you can see in the navigation panel on the left hand side of the screen.
                As you click on the dark blue buttons on the left, the metadata included in that category will appear as a drop down selection.
                </p>
                <p class="inter-paragraph-white">
                You can also through all metadata in the library by using the search box located in the top left of this page - just above the left hand side navigation panel.
                This search function examines every entry of each metadata entry for whatever text that is typed into the search entry. Due to the nature of keywords,
                and spatial references in the data searching may not not yield the data you are looking for after the first search. You may need to alter your search slightly i.e 
                changing from "Peel Island" to "Moreton Bay" will yield significantly more results.
                </p>
                <p class="inter-paragraph-white">
                This information can be viewed at any time by hitting "Esc" on your keyboard.
                </p>
                
            </div>
        </div>
        `
        drawUnsearchedNavPanel();

        var searchF = document.getElementById("metadata-search")

        searchF.addEventListener('input', function(e) {
            if (e.target.value == '') {
                drawUnsearchedNavPanel(e);
            } else {
                drawSearched(e)
                }
            }
        )
    }
}

imageWidthHandler()

function displayWelcome(e) {
    if (e.key == "Escape") {
        navSelector("None")
        document.getElementById("body").innerHTML = `
        <div class="mainHeader">
            <div class="left-float-div">
                <p class="inter-main-header">Moreton Bay Knowledge Hub Metadata Library</p>
            </div>
            <div class="right-float-div">
                <img src="images/QUT.png" class="header-image">
                <img src="images/MBF.png" class="header-image">
            </div>
        </div> 
        <div class="left-column">
            <input type="search" id="metadata-search" name="q" class="search-box" placeholder="Search">
            <nav class="sideNav" id="Navigator">
            
            </nav>
        </div>
        <div class="right-column">
            <div class="data-display" id="display">
                <p class="inter-intro-header"> Welcome to the Moreton Bay Knowledge Metadata Library</p>
                <p class="inter-paragraph-white"> 
                This page serves a metadata library for data pertaining to different aspects of the Moreton Bay region. 
                The metadata featured in this library stretch over several categories as you can see in the navigation panel on the left hand side of the screen.
                As you click on the dark blue buttons on the left, the metadata included in that category will appear as a drop down selection.
                </p>
                <p class="inter-paragraph-white">
                You can also through all metadata in the library by using the search box located in the top left of this page - just above the left hand side navigation panel.
                This search function examines every entry of each metadata entry for whatever text that is typed into the search entry. Due to the nature of keywords,
                and spatial references in the data searching may not not yield the data you are looking for after the first search. You may need to alter your search slightly i.e 
                changing from "Peel Island" to "Moreton Bay" will yield significantly more results.
                </p>
                <p class="inter-paragraph-white">
                This information can be viewed at any time by hitting "Esc" on your keyboard.
                </p>
                
            </div>
        </div>
        `
        drawUnsearchedNavPanel();

        var searchF = document.getElementById("metadata-search")

        searchF.addEventListener('input', function(e) {
            if (e.target.value == '') {
                drawUnsearchedNavPanel(e);
            } else {
                drawSearched(e)
                }
            }
        )
    }
}

function displayWelcomeNoEscape(e) {
    navSelector("None")
    document.getElementById("body").innerHTML = `
    <div class="mainHeader">
        <div class="left-float-div">
            <p class="inter-main-header">Moreton Bay Knowledge Hub Metadata Library</p>
        </div>
        <div class="right-float-div">
            <img src="images/QUT.png" class="header-image">
            <img src="images/MBF.png" class="header-image">
        </div>
    </div> 
    <div class="left-column">
        <input type="search" id="metadata-search" name="q" class="search-box" placeholder="Search">
        <nav class="sideNav" id="Navigator">
        
        </nav>
    </div>
    <div class="right-column">
        <div class="data-display" id="display">
            <p class="inter-intro-header"> Welcome to the Moreton Bay Knowledge Metadata Library</p>
            <p class="inter-paragraph-white"> 
            This page serves a metadata library for data pertaining to different aspects of the Moreton Bay region. 
            The metadata featured in this library stretch over several categories as you can see in the navigation panel on the left hand side of the screen.
            As you click on the dark blue buttons on the left, the metadata included in that category will appear as a drop down selection.
            </p>
            <p class="inter-paragraph-white">
            You can also through all metadata in the library by using the search box located in the top left of this page - just above the left hand side navigation panel.
            This search function examines every entry of each metadata entry for whatever text that is typed into the search entry. Due to the nature of keywords,
            and spatial references in the data searching may not not yield the data you are looking for after the first search. You may need to alter your search slightly i.e 
            changing from "Peel Island" to "Moreton Bay" will yield significantly more results.
            </p>
            <p class="inter-paragraph-white">
            This information can be viewed at any time by hitting "Esc" on your keyboard.
            </p>
            
        </div>
    </div>
    `
    drawUnsearchedNavPanel();

    var searchF = document.getElementById("metadata-search")

    searchF.addEventListener('input', function(e) {
        if (e.target.value == '') {
            drawUnsearchedNavPanel(e);
        } else {
            drawSearched(e)
            }
        }
    )
}


document.addEventListener('keydown', function(e){
    displayWelcome(e)
})

window.addEventListener("resize", imageWidthHandler)