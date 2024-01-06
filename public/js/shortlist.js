document.addEventListener("DOMContentLoaded", function () {
    const shortlistGallery = document.getElementById("shortlistGallery");

    // Fetch three random images from the 'all' subfolder in the 'photos' folder
    fetchRandomImages();

    function fetchRandomImages() {
        fetch('/photos/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch random images');
                }
                return response.json();
            })
            .then(randomImages => {
                const limitedImages = getRandomElements(randomImages, 3); // Get only 3 random images
                displayRandomImages(limitedImages);
            })
            .catch(error => {
                console.error('Error fetching random images:', error.message);
            });
    }

    function displayRandomImages(images) {
        images.forEach(imageUrl => {
            const imageElement = document.createElement("img");
            imageElement.src = `photos/all/${imageUrl}`;
            imageElement.alt = "Shortlisted Photo";
            imageElement.classList.add("shortlist-photo"); // Adding class for the defined size in styles.css

            imageElement.addEventListener("click", () => {
                displayLargePhoto(`photos/all/${imageUrl}`);
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
});

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
