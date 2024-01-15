document.addEventListener("DOMContentLoaded", function () {
    const shortlistGallery = document.getElementById("shortlistGallery");

    // Die picCountMap aus load.js verwenden
    const picsValueMap = new Map(JSON.parse(localStorage["name"]))

    console.log(picsValueMap)

    // test ob defined ist
    if (!picsValueMap) {
        console.error('picCountMap is not defined. Make sure it is set in load.js.');
        return;
    }

    // Umwandlung der Map in ein Array von Schlüssel-Wert-Paaren
    const picCountArray = Array.from(picsValueMap.entries());

    // Sortieren des Arrays absteigend nach den Werten (Count)
    picCountArray.sort((a, b) => b[1] - a[1]);

    // Die 3 Bilder mit den höchsten currentCount-Werten erhalten
    const topThreeImages = picCountArray.slice(0, 3).map(entry => entry[0]);
    console.log(topThreeImages);

    displayTopImages(topThreeImages);
});

function displayTopImages(images) {
    images.forEach(imageName => {
        const imageElement = document.createElement("img");
        imageElement.src = `photos/all/${imageName}`;
        imageElement.alt = "Shortlisted Photo";
        imageElement.classList.add("shortlist-photo"); // Klasse für die definierte Größe in styles.css

        imageElement.addEventListener("click", () => {
            displayLargePhoto(`photos/all/${imageName}`);
        });

        shortlistGallery.appendChild(imageElement);
    });
}

function displayLargePhoto(photoUrl) {
    const largePhoto = document.getElementById("largePhoto");
    const largePhotoContainer = document.getElementById("largePhotoContainer");

    largePhoto.src = photoUrl;
    largePhotoContainer.style.display = "flex";
}
