const input = document.getElementById("question");
const button = document.getElementById("askButton");
const response = document.getElementById("response");

button.addEventListener("click", function () {
  const question = input.value.trim();

  if (question === "") {
    response.textContent = "Please type a question first.";
    return;
  }

  response.textContent = "Golden Touch AI is thinking...";

  setTimeout(function () {
    response.textContent =
      "Golden Touch AI is ready to help with your question: " + question;
  }, 1200);
});

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    button.click();
  }
});
