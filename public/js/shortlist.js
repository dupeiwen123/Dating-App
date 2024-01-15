document.addEventListener("DOMContentLoaded", function () {
    const shortlistGallery = document.getElementById("shortlistGallery");

    // Die picCountMap aus load.js verwenden
    window.picsValueMap = new Map(JSON.parse(localStorage["name"]));

    console.log(window.picsValueMap);

    // Test, ob defined ist
    if (!window.picsValueMap) {
        console.error('picCountMap is not defined. Make sure it is set in load.js.');
        return;
    }

    // Umwandlung der Map in ein Array von Schlüssel-Wert-Paaren
    const picCountArray = Array.from(window.picsValueMap.entries());

    // Sortieren des Arrays absteigend nach den Werten (Count)
    picCountArray.sort((a, b) => b[1] - a[1]);

    // Die 3 Bilder mit den höchsten currentCount-Werten erhalten
    const topThreeImages = picCountArray.slice(0, 3).map(entry => entry[0]);
    console.log(topThreeImages);

    displayTopImages(topThreeImages);
});

function displayTopImages(images) {
    images.forEach(imageName => {
        const photoContainer = document.createElement("div");
        const imageElement = document.createElement("img");
        const countOverlay = document.createElement("div");

        photoContainer.classList.add("shortlist-photo-container");
        imageElement.src = `photos/all/${imageName}`;
        imageElement.alt = "Shortlisted Photo";
        imageElement.classList.add("shortlist-photo");

        countOverlay.classList.add("count-overlay");
        countOverlay.textContent = `Count: ${window.picsValueMap.get(imageName)}`;

        imageElement.addEventListener("click", () => {
            displayLargePhoto(`photos/all/${imageName}`);
        });

        photoContainer.appendChild(imageElement);
        photoContainer.appendChild(countOverlay);

        shortlistGallery.appendChild(photoContainer);
    });
}


function displayLargePhoto(photoUrl) {
    const largePhoto = document.getElementById("largePhoto");
    const largePhotoContainer = document.getElementById("largePhotoContainer");

    largePhoto.src = photoUrl;
    largePhotoContainer.style.display = "flex";
}
