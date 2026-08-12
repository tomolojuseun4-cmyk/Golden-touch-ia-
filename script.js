const input = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', function () {
  const question = input.value.trim();

  if (question === '') {
    alert('Please type a question first.');
    return;
  }

  alert('Golden Touch AI received your question: ' + question);
});
