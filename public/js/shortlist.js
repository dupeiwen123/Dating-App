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
    let topThreeImages = picCountArray.slice(0, 3).map(entry => entry[0]); // Verwenden der global Variable

    // null rausfiltern falls da
    topThreeImages = topThreeImages.filter(imageName => imageName !== null);

    console.log(topThreeImages);

    // Wenn weniger als 3 Bilder vorhanden sind, fülle mit weiteren Bildern auf
    while (topThreeImages.length < 3) {
        const remainingImages = Array.from(window.picsValueMap.keys()).filter(image => !topThreeImages.includes(image) && image !== null);
        if (remainingImages.length > 0) {
            // Füge das nächste Bild mit dem höchsten Count-Wert hinzu
            const nextImage = remainingImages.reduce((a, b) => window.picsValueMap.get(a) > window.picsValueMap.get(b) ? a : b);
            topThreeImages.push(nextImage);
        } else {
            // Keine weiteren Bilder verfügbar
            break;
        }
    }

    // Aktualisiere window.topThreeImages
    window.topThreeImages = topThreeImages;

    // Setze localStorage["topThree"] auf topThreeImages
    localStorage["topThree"] = JSON.stringify(topThreeImages);

    displayTopImages(topThreeImages);
    console.log(topThreeImages);
});

function displayTopImages(images) {
    const gallery = document.getElementById("shortlistGallery");

    // Filtere null aus der Liste der Bilder
    images = images.filter(imageName => imageName !== null);

    // Sortieren des Arrays absteigend nach den Werten (Count)
    images.sort((a, b) => window.picsValueMap.get(b) - window.picsValueMap.get(a));

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

        gallery.appendChild(photoContainer);
    });
}

function displayLargePhoto(photoUrl) {
    const largePhoto = document.getElementById("largePhoto");
    const largePhotoContainer = document.getElementById("largePhotoContainer");

    largePhoto.src = photoUrl;
    largePhotoContainer.style.display = "flex";
}
