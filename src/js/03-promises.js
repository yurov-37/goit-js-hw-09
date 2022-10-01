import Notiflix from 'notiflix';

const promiseForm = document.querySelector('.form');
promiseForm.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromise = { position, delay };

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(objectPromise);
    }
    reject(objectPromise);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();

  let delay = Number(evt.currentTarget.delay.value);
  const delayStep = Number(evt.currentTarget.step.value);
  const amount = Number(evt.currentTarget.amount.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) =>
        setTimeout(() => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`,
            {
              cssAnimationStyle: 'from - right',
              timeout: 5000,
              fontSize: '18px',
            }
          );
        }, delay)
      )
      .catch(({ position, delay }) =>
        setTimeout(() => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`,
            {
              cssAnimationStyle: 'from - right',
              timeout: 5000,
              fontSize: '18px',
            }
          );
        }, delay)
      );
    delay += delayStep;
  }
}
