document.addEventListener("DOMContentLoaded", function () {
});


const startButton = document.getElementById("startButton");
const resultScreen = document.getElementById("resultScreen");
const longestGazedPhoto = document.getElementById("longestGazedPhoto");
const gallery = document.getElementById("gallery");
const largePhotoContainer = document.getElementById("largePhotoContainer");
const largePhoto = document.getElementById("largePhoto");
const allButton = document.getElementById("allButton");
const menButton = document.getElementById("menButton");
const womenButton = document.getElementById("womenButton");
const shortlistButton = document.getElementById("shortlistButton");
let currentImageNamesOfCells = []


// Event listeners for gender buttons
allButton.addEventListener("click", () => fetchPhotos('all'));
menButton.addEventListener("click", () => fetchPhotos('men'));
womenButton.addEventListener("click", () => fetchPhotos('women'));

// Start button click event
startButton.addEventListener("click", () => {
    startButton.disabled = true;
    startButton.textContent = "Processing...";

    const duration = 10000; // Total duration in milliseconds
    simulateEyeTrackingResults(duration);

    setTimeout(() => {
        const eyeTrackingResults = simulateEyeTrackingResults(duration);
        displayResults(eyeTrackingResults);
        resultScreen.style.display = "block";
    }, duration);
});

// Event listener for the Shortlist button
shortlistButton.addEventListener("click", () => {
    window.location.href = "shortlist.html"; // Redirect to the Shortlist page
});

// Simulates eye tracking results for given duration
function simulateEyeTrackingResults(duration) {
    console.log(`Eye tracking running for ${duration / 1000} seconds...`);

    const eyeTrackingResults = [];
    let totalDuration = 0;

    // Simulating random gaze durations for each of the 9 images to match the total duration
    for (let i = 1; i <= 9; i++) {
        const maxDuration = duration - totalDuration - (9 - i); // Ensure the total is accurate and distribute the time among images
        const randomDuration = Math.floor(Math.random() * maxDuration); // Random duration up to the remaining time
        eyeTrackingResults.push({ photo: `Pic ${i}`, duration: randomDuration });
        totalDuration += randomDuration;
    }

    // Calculate the remaining duration for the last image to match the total duration
    eyeTrackingResults[8].duration = duration - totalDuration;

    // Output results
    eyeTrackingResults.forEach(result => {
        console.log(`Image: ${result.photo} - Gaze duration: ${result.duration}ms`);
    });

    return eyeTrackingResults;
}

// Displays eye tracking results in the frontend
function displayResults(eyeTrackingResults) {
    const resultDisplay = document.getElementById("resultDisplay");
    resultDisplay.innerHTML = "<h3>Gaze Duration of Images:</h3>";

    eyeTrackingResults.forEach(result => {
        const resultElement = document.createElement("p");
        resultElement.textContent = `${result.photo} - Gaze duration: ${result.duration}ms`;
        resultDisplay.appendChild(resultElement);
    });
}

// Initialize to show all photos
// fetchPhotos('all');

// Fetches photos based on gender
function fetchPhotos(gender) {
    // Get the list of images in the photos folder
    fetch(`/photos/${gender}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${gender} photo list`);
            }
            return response.json();
        })
        .then(allPhotos => {
            // Remove existing photos
            removeAllPhotos();
            
            // shuffle
            allPhotos = allPhotos.sort((a, b) => 0.5 - Math.random());

            const photosToShow = Math.min(9, allPhotos.length); // Limit the number of photos to a maximum of 9

            const photosContainer = document.createElement("div");
            photosContainer.classList.add("photos-container");

            const columnCount = 3; // Number of columns
            const photosPerColumn = Math.ceil(photosToShow / columnCount);

            for (let i = 0; i < columnCount; i++) {
                const column = document.createElement("div");
                column.classList.add("photo-column");
                photosContainer.appendChild(column);

                for (let j = i * photosPerColumn; j < (i + 1) * photosPerColumn && j < photosToShow; j++) {
                    const photoUrl = allPhotos[j];
                    const photoElement = document.createElement("img");
                    photoElement.src = `photos/${gender}/${photoUrl}`;
                    photoElement.alt = `Photo ${j + 1}`;
                    photoElement.classList.add("photo");

                    currentImageNamesOfCells[j] = photoUrl

                    photoElement.addEventListener("click", () => {
                        displayLargePhoto(`photos/${gender}/${photoUrl}`);
                    });

                    column.appendChild(photoElement);
                }
            }

            gallery.appendChild(photosContainer);
        })
        .catch(error => {
            console.error(`Error fetching ${gender} photo list:`, error.message);
        });
}

// Displays larger photo on click
function displayLargePhoto(photoUrl) {
    largePhoto.src = photoUrl;
    largePhotoContainer.style.display = "flex";
}

// Removes existing photos
function removeAllPhotos() {
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }
}

// JavaScript-Funktionen für das Popup
const genderDialog = document.getElementById('genderDialog');

function openGenderDialog() {
    if (!genderDialog.showModal) {
        alert('Das <dialog> Element wird von diesem Browser nicht unterstützt. Verwende stattdessen eine andere Methode für Popups.');
            console.log("penis nein")
        return;
    }
    console.log("penis ja")
    genderDialog.showModal();

}

function selectGender(gender) {
    genderDialog.close();
    fetchPhotos(gender); // Funktion, um Fotos basierend auf dem ausgewählten Geschlecht zu laden
}

function closeLargePhoto() {
    document.getElementById("largePhotoContainer").style.display = "none";
}

// Öffne das Popup, wenn die Seite geladen ist
window.onload = function() {
    console.log("penis")
    openGenderDialog();
};

// ---------------------------- webgaze listener -----
 
window.saveDataAcrossSessions = true

const LEFT_SIDE = window.innerWidth / 3
const RIGHT_SIDE = window.innerWidth - LEFT_SIDE

const TOP_SIDE = window.innerHeight / 3
const BOTTOM_SIDE = window.innerHeight - TOP_SIDE

let horizontal_look_direction = null
let vertical_look_direction = null

// Initialisieren der Map für die Zählung der Aufrufe
const picCountMap = new Map() // leer zu beginn

webgazer.setGazeListener((data, timestamp) => {
    if (data == null) return

    let currentPic = null

    if (data.x < LEFT_SIDE) {
        if (data.y < TOP_SIDE) {
            currentPic = currentImageNamesOfCells[0] // pic1
        } else if (data.y >= BOTTOM_SIDE) {
            currentPic = 'Pic 7'// todo add aaray
        } else {
            currentPic = 'Pic 4'
        }
    } else if (data.x >= RIGHT_SIDE) {
        if (data.y < TOP_SIDE) {
            currentPic = 'Pic 3'
        } else if (data.y >= BOTTOM_SIDE) {
            currentPic = 'Pic 9'
        } else {
            currentPic = 'Pic 6'
        }
    } else {
        if (data.y < TOP_SIDE) {
            currentPic = 'Pic 2'
        } else if (data.y >= BOTTOM_SIDE) {
            currentPic = 'Pic 5'
        } else {
            currentPic = 'Pic 8'
        }
    }

    // Erhöhen Sie den Zähler für den aktuellen Fall in der Map um eins
    const currentCount = picCountMap.get(currentPic)
    if (currentCount != undefined) {
        picCountMap.set(currentPic, currentCount + 1)
    } else {
        picCountMap.set(currentPic, 1)
    }
    

    console.log(`${currentPic} - Count: ${picCountMap.get(currentPic)}`)
})
.begin()
