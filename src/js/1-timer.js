// Описаний в документації
import flatpickr from 'flatpickr';
import iziToast from "izitoast";
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');

startButton.disabled = true;
let choosenDate = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosenDate = selectedDates[0];
    if (choosenDate < new Date()) {
      startButton.disabled = true;
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future!',
        position: 'topCenter',
        color: 'red',
      });
    } else {
      startButton.disabled = false;
      iziToast.show({
        title: 'Success',
        message: 'Timer is ready',
        position: 'topCenter',
        color: 'green',
      });
    }
  },
};

startButton.addEventListener('click', event => {
  startButton.disabled = true;
  const timerId = setInterval(() => {
    const timeDifference = choosenDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(
      timeDifference
    );
    if (timeDifference <= 0) {
      day.textContent = addLeadingZero(0);
      hour.textContent = addLeadingZero(0);
      min.textContent = addLeadingZero(0);
      sec.textContent = addLeadingZero(0);
      clearInterval(timerId);
      return;

    } 
    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    min.textContent = addLeadingZero(minutes);
    sec.textContent = addLeadingZero(seconds);
  }, 1000);
});

flatpickr(dateInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
