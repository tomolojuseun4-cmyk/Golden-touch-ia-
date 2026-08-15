const input = document.getElementById('question');
const button = document.getElementById('askButton');
const response = document.getElementById('response');

button.addEventListener('click', function () {
  const question = input.value.trim();

  if (question === '') {
    response.textContent = 'Please type a question first.';
    return;
  }

  response.textContent = 'Golden Touch AI is thinking...';

  setTimeout(function () {
    const lowerQuestion = question.toLowerCase();

    let answer;

    if (lowerQuestion.includes('hello') ||
        lowerQuestion.includes('hi') ||
        lowerQuestion.includes('hey')) {
      answer = 'Hello! 👋 Welcome to Golden Touch AI. How can I help you today?';
    } 
    else if (lowerQuestion.includes('graphic design') ||
             lowerQuestion.includes('design')) {
      answer = '🎨 Golden Touch AI can help you with graphic design ideas, flyers, logos, branding, social media designs, and creative projects.';
    } 
    else if (lowerQuestion.includes('business')) {
      answer = '💼 Golden Touch AI can help you develop business ideas, marketing strategies, branding plans, and digital business solutions.';
    } 
    else if (lowerQuestion.includes('ai')) {
      answer = '🤖 AI can help you create content, generate ideas, improve designs, automate tasks, and build smarter digital solutions.';
    } 
    else {
      answer = '✨ Golden Touch AI received your question: "' + question + '"\n\nI’m ready to help you with design, business, technology, AI, and creative ideas.';
    }

    response.textContent = answer;
  }, 800);
});
