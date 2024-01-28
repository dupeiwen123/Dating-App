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
  const imageUrls = JSON.parse(shortlistImages);

  let cardCount = 0;

  function createCard(imageUrl) {
    const card = new Card({
      imageUrl: imageUrl,
      onDismiss: appendNewCard,
      onLike: () => {
        like.style.animationPlayState = 'running';
        like.classList.toggle('trigger');
        handleLike(expressions);
      },
      onDislike: () => {
        dislike.style.animationPlayState = 'running';
        dislike.classList.toggle('trigger');
        handleDislike(expressions);
      }
    });

    return card.element;
  }

  function appendNewCard() {
    if (!imageUrls || imageUrls.length === 0) {
      console.error('No shortlist images available.');
      // Entferne die Event-Listener für Like und Dislike
      likeButton.removeEventListener('click', handleLike);
      dislikeButton.removeEventListener('click', handleDislike);
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

  // Like- und Dislike-Arrays für die gespeicherten Bilder
  const likedImages = new Map();
  const dislikedImages = new Map();

  function handleLike(expressions) {
    const likedImageUrl = imageUrls[cardCount % imageUrls.length];
    // Hier LIKED PICS speichern zb
    likedImages.set(likedImageUrl, expressionsHistory);

    console.log('Liked:', likedImageUrl);
    removeCurrentCard();
    expressionsHistory = [];
  }

  function handleDislike(expressions) {
    const dislikedImageUrl = imageUrls[cardCount % imageUrls.length];
    // Hier DISLIKED PICS speichern zb
    dislikedImages.set(dislikedImageUrl, expressionsHistory);

    console.log('Disliked:', dislikedImageUrl);
    removeCurrentCard();
    expressionsHistory = [];
  }

  function removeCurrentCard() {
    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    const currentCard = cards[0]; // Annahme: Das vorderste sichtbare Bild ist das aktuelle Bild

    if (currentCard) {
      currentCard.classList.add('dismissing');
      currentCard.addEventListener('transitionend', () => {
        currentCard.remove();
        appendNewCard(); // Nachdem das Bild entfernt wurde, füge das nächste Bild hinzu
      }, { once: true });
      setTimeout(() => {
        currentCard.style.opacity = '0'; // Setze die Opazität auf 0 für den Verschwinden-Effekt
      }, 50);
    } else {
      // Entferne die Event-Listener für Like und Dislike, da keine Bilder mehr vorhanden sind
      likeButton.removeEventListener('click', handleLike);
      dislikeButton.removeEventListener('click', handleDislike);
      stopDetection();
      console.log(dislikedImages);
      console.log(likedImages);
    }
  }

  // Like- und Dislike-Buttons
  const likeButton = document.getElementById('like');
  const dislikeButton = document.getElementById('dislike');

  likeButton.addEventListener('click', handleLike);
  dislikeButton.addEventListener('click', handleDislike);

  // 3 Karten erstellen
  for (let i = 0; i < 3; i++) {
    appendNewCard();
  }

} else {
  console.error('Invalid or empty shortlist images string in localStorage.');
}
