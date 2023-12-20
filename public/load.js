document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const resultScreen = document.getElementById("resultScreen");
    const longestGazedPhoto = document.getElementById("longestGazedPhoto");
    const gallery = document.getElementById("gallery");
    const largePhotoContainer = document.getElementById("largePhotoContainer");
    const largePhoto = document.getElementById("largePhoto");
    const allButton = document.getElementById("allButton");
    const menButton = document.getElementById("menButton");
    const womenButton = document.getElementById("womenButton");

    allButton.addEventListener("click", () => fetchPhotos('all'));
    menButton.addEventListener("click", () => fetchPhotos('men'));
    womenButton.addEventListener("click", () => fetchPhotos('women'));

    startButton.addEventListener("click", () => {
        startButton.disabled = true;
        startButton.textContent = "Processing...";
    
        simulateEyeTracking(10 * 1000);
    
        setTimeout(() => {
            const longestGazed = getLongestGazedPhoto();
            longestGazedPhoto.textContent += longestGazed;
            resultScreen.style.display = "block";
        }, 10 * 1000);
    });

    function simulateEyeTracking(duration) {
        // Simuliere eine Ausgabe der betrachteten Bilder in der Konsole
        console.log("Eye tracking läuft für 10 Sekunden...");
    
        // Simulieren des zufällig am längsten betrachteten Bilds nach der Zeit
        setTimeout(() => {
            const randomPhoto = `Pic ${Math.floor(Math.random() * 9) + 1}`;
            console.log(`Längste Blickzeit auf: ${randomPhoto}`);
        }, duration);
    }

    function getLongestGazedPhoto() {
        // Beispiel für die Rückgabe eines zufälligen Bilds als das am längsten betrachtete Bild
        return `Pic ${Math.floor(Math.random() * 9) + 1}`;
    }
    

    // Initialize to show all photos
    fetchPhotos('all');

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

                // Randomly select 8 images
                const selectedPhotos = getRandomElements(allPhotos, 9);

                // Show Pictures
                selectedPhotos.forEach((photoUrl, index) => {
                    const photoElement = document.createElement("img");
                    photoElement.src = `photos/${gender}/${photoUrl}`;
                    photoElement.alt = `Photo ${index + 1}`;
                    photoElement.classList.add("photo");

                    photoElement.addEventListener("click", () => {
                        displayLargePhoto(`photos/${gender}/${photoUrl}`);
                    });

                    gallery.appendChild(photoElement);
                });
            })
            .catch(error => {
                console.error(`Error fetching ${gender} photo list:`, error.message);
            });
    }

    function displayLargePhoto(photoUrl) {
        largePhoto.src = photoUrl;
        largePhotoContainer.style.display = "flex";
    }

    // Get a specified number of random elements
    function getRandomElements(array, count) {
        const shuffled = array.slice(0); // Create a copy in case the original array is modified
        let i = array.length;
        let temp, index;

        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }

        return shuffled.slice(0, count);
    }

    // Remove existing photos
    function removeAllPhotos() {
        while (gallery.firstChild) {
            gallery.removeChild(gallery.firstChild);
        }
    }
});
