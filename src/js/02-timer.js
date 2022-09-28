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
    console.log(selectedDates[0]);
  },
};

flatpickr(inputDeadLineData, options);
