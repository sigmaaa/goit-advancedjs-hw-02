import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const { delay, state } = event.currentTarget.elements;
  const promise = createPromise(delay, state);
  promise
    .then(delay =>
      iziToast.success({
        title: 'Fulfilled',
        message: `✅ Fulfilled promise in ${delay} ms`,
      })
    )
    .catch(delay =>
      iziToast.error({
        title: `Rejected`,
        message: `❌ Rejected promise in ${delay} ms`,
      })
    );
}

function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state.value === 'fulfilled') {
        resolve(delay.value);
      } else {
        reject(delay.value);
      }
    }, delay.value);
  });
  return promise;
}
