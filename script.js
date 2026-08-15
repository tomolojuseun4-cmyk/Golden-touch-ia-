const input = document.getElementById("question");
const button = document.getElementById("askButton");
const response = document.getElementById("response");

// AI Assistant
button.addEventListener("click", function () {
  const question = input.value.trim();

  if (question === "") {
    response.textContent = "Please type a question first.";
    return;
  }

  response.textContent =
    "Golden Touch AI is thinking about: " + question;
});


// Design Resource Hub
const resourceButtons = document.querySelectorAll(".resource-card button");

resourceButtons.forEach(function (resourceButton) {
  resourceButton.addEventListener("click", function () {

    const cardTitle =
      this.parentElement.querySelector("h3").textContent;

    response.textContent =
      "Golden Touch AI Resource Hub: " +
      cardTitle +
      " selected. This resource section is coming soon.";

    document.getElementById("ai-assistant").scrollIntoView({
      behavior: "smooth"
    });
  });
});
