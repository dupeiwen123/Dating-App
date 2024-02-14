document.addEventListener('DOMContentLoaded', function() {
    const dislikedImages = JSON.parse(localStorage.getItem('dislikedImages'));
    const likedImages = JSON.parse(localStorage.getItem('likedImages'));
    if (likedImages.length > 0) {
        const likedSection = createSection("Liked Images");
        likedImages.forEach(entry => {
            const photoContainer = createPhotoContainer(entry[0], entry[1])
            likedSection.appendChild(photoContainer);
        });
        document.getElementById("resultsGallery").appendChild(likedSection);
    }

    if (dislikedImages.length > 0) {
        const dislikedSection = createSection("Disliked Images");
        dislikedImages.forEach(entry => {
            const photoContainer = createPhotoContainer(entry[0], entry[1]);
            dislikedSection.appendChild(photoContainer);
        });
        document.getElementById("resultsGallery").appendChild(dislikedSection);
    }
})
    
    function createSection(title) {
        const section = document.createElement("div");
        const titleElement = document.createElement("h2");

        section.classList.add("results-section");
        titleElement.textContent = title;

        section.appendChild(titleElement);
        
        return section;
    }

    function createPhotoContainer(imageSrc, expressions) {
        const photoContainer = document.createElement("div");
        const imageElement = document.createElement("img");
        const emotionList = document.createElement("ul");

        photoContainer.classList.add("results-photo-container");
        imageElement.src = `photos/all/${imageSrc}`;
        imageElement.classList.add("results-photo");

        const emotionConfidences = new Map();
        expressions.forEach(expression => {
            expression.forEach(emotionData => {
                const emotion = emotionData[0];
                const confidence = emotionData[1];
                if (emotionConfidences.has(emotion)) {
                    emotionConfidences.get(emotion).push(confidence);
                } else {
                    emotionConfidences.set(emotion, [confidence]);
                }
            });
        });

        const averageConfidences = new Map();
        emotionConfidences.forEach((confidences, emotion) => {
            const averageConfidence = confidences.reduce((acc, val) => acc + val, 0) / confidences.length;
            averageConfidences.set(emotion, averageConfidence);
        });
    
        const sortedEmotions = Array.from(averageConfidences.entries()).sort((a, b) => b[1] - a[1]);
    
        sortedEmotions.forEach((emotionData, index) => {
            const emotion = emotionData[0];
            const averageConfidence = emotionData[1];
            
            const emotionItem = document.createElement("li");
            emotionItem.textContent = `Rank ${index + 1}: ${emotion} - Average Confidence: ${(averageConfidence*100).toFixed(1)}%`;
            emotionList.appendChild(emotionItem);
        });
    
        photoContainer.appendChild(imageElement);
        photoContainer.appendChild(emotionList);
        console.log(emotionList);
        return photoContainer;
        
    }
