import Swal from 'sweetalert2';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Ukrainian } from '../../node_modules/flatpickr/dist/l10n/uk';
require('flatpickr/dist/themes/dark.css');

let selectedTime = null;

const inputDeadlineData = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const btnStart = document.querySelector('button[data-start]');
btnStart.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: Ukrainian,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      btnStart.setAttribute('disabled', 'true');
      Swal.fire({
        title: 'Error!',
        text: 'Please choose a date in the future',
        icon: 'error',
      });
    } else {
      btnStart.removeAttribute('disabled');
      selectedTime = selectedDates[0];
      console.log(selectedTime);
    }
  },
};

flatpickr(inputDeadlineData, options);

function convertMs(ms) {
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
  return value.toString().padStart(2, '0');
}

btnStart.addEventListener('click', () => {
  let timerID = setInterval(() => {
    btnStart.setAttribute('disabled', 'true');
    let countdown = selectedTime - Date.now();
    console.log(countdown);
    if (countdown >= 0) {
      let objectTime = convertMs(countdown);
      console.log(objectTime);
      days.textContent = addLeadingZero(objectTime.days);
      hours.textContent = addLeadingZero(objectTime.hours);
      minutes.textContent = addLeadingZero(objectTime.minutes);
      seconds.textContent = addLeadingZero(objectTime.seconds);
      if (countdown <= 10000) {
        timer.style.color = 'red';
      }
    } else {
      Swal.fire({
        title: 'Countdown finished!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Cool',
      }),
        clearInterval(timerID);
    }
  }, 1000);
});
