import Swal from 'sweetalert2';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Ukrainian } from '../../node_modules/flatpickr/dist/l10n/uk';
require('flatpickr/dist/themes/dark.css');

const inputDeadLineData = document.querySelector('#datetime-picker');
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
    }
  },
};

flatpickr(inputDeadLineData, options);
