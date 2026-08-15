const input = document.getElementById("question");
const button = document.getElementById("askButton");
const response = document.getElementById("response");

button.addEventListener("click", function (event) {
    event.preventDefault();

    const question = input.value.trim();

    if (question === "") {
        response.textContent = "Please type a question first.";
        return;
    }

    response.textContent =
        "✅ Golden Touch AI is working! You asked: " + question;
});
