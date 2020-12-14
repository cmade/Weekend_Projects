const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const inception = document.getElementById('inception');
const memento = document.getElementById('memento');
const mulholland = document.getElementById('mulholland');
const fight = document.getElementById('fight');
const interstellar = document.getElementById('interstellar');
const screen = document.getElementById('screen');

populateUI();

let ticketPrice = +movieSelect.value;

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}
// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  //Copy selected seats into an arr
  //Map through array
  // Return a new array
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  console.log(seatsIndex);
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  console.log(ticketPrice);
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}
//Display each movie option trailer on big screen
function screenDisplay(e) {
  switch (e.target.item(e.target.selectedIndex).innerText) {
    case 'Inception (12)':
      inception.style.display = 'block';
      screen.style.display = 'none';
      memento.style.display = 'none';
      mulholland.style.display = 'none';
      fight.style.display = 'none';
      interstellar.style.display = 'none';
      break;
    case 'Memento (14)':
      memento.style.display = 'block';
      screen.style.display = 'none';
      inception.style.display = 'none';
      mulholland.style.display = 'none';
      fight.style.display = 'none';
      interstellar.style.display = 'none';
      break;
    case 'Mulholland Dr. (13)':
      mulholland.style.display = 'block';
      memento.style.display = 'none';
      screen.style.display = 'none';
      inception.style.display = 'none';
      fight.style.display = 'none';
      interstellar.style.display = 'none';
      break;
    case 'Fight Club (10)':
      fight.style.display = 'block';
      mulholland.style.display = 'none';
      memento.style.display = 'none';
      screen.style.display = 'none';
      inception.style.display = 'none';
      interstellar.style.display = 'none';
      break;
    case 'Interstellar (9)':
      interstellar.style.display = 'block';
      fight.style.display = 'none';
      mulholland.style.display = 'none';
      memento.style.display = 'none';
      screen.style.display = 'none';
      inception.style.display = 'none';
      break;
    default:
      screen.style.display = 'block';
      inception.style.display = 'none';
      memento.style.display = 'none';
      mulholland.style.display = 'none';
      fight.style.display = 'none';
      interstellar.style.display = 'none';
  }
}

// Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  }
}
// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  screenDisplay(e);
  updateSelectedCount();
});
// Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
updateSelectedCount();
