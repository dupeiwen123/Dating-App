// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

// Die URLs aus der Shortlist
const shortlistImages = localStorage["topThree"];

console.log(shortlistImages);

// Überprüfen, ob shortlistImages ein String ist
if (typeof shortlistImages === "string" && shortlistImages.length > 0) {
  // Convert den String in ein Array von Bild-URLs
  const imageUrls = shortlistImages.split(',');

  // variables
  let cardCount = 0;

  // functions
  function createCard(imageUrl) {
    const card = new Card({
      imageUrl: imageUrl,
      onDismiss: appendNewCard,
      onLike: () => {
        like.style.animationPlayState = 'running';
        like.classList.toggle('trigger');
      },
      onDislike: () => {
        dislike.style.animationPlayState = 'running';
        dislike.classList.toggle('trigger');
      }
    });

    return card.element;
  }

  function appendNewCard() {
    if (!imageUrls || imageUrls.length === 0) {
      console.error('No shortlist images available.');
      return;
    }

    const imageUrl = imageUrls[cardCount % imageUrls.length];
    const cardElement = createCard(imageUrl);

    swiper.append(cardElement);
    cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
      card.style.setProperty('--i', index);
    });
  }

  // Erste 3 Karten erstellen
  for (let i = 0; i < 3; i++) {
    appendNewCard();
  }
} else {
  console.error('Invalid or empty shortlist images string in localStorage.');
}
