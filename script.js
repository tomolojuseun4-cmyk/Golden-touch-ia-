/* ==========================================
   GOLDEN TOUCH AI ACADEMY
   AI ASSISTANT CONNECTION
   ========================================== */

const SUPABASE_URL = "https://rckzabllsauazwgokqzr.supabase.co";

// The AI key must remain securely on the server.
// This script calls the existing Supabase Edge Function.
const AI_ENDPOINT = `${SUPABASE_URL}/functions/v1/ai-chat`;

document.addEventListener("DOMContentLoaded", () => {
  const form =
    document.querySelector("#ai-chat-form") ||
    document.querySelector("#chat-form");

  const input =
    document.querySelector("#ai-chat-input") ||
    document.querySelector("#user-input") ||
    document.querySelector("#message-input");

  const messages =
    document.querySelector("#ai-chat-messages") ||
    document.querySelector("#chat-messages") ||
    document.querySelector("#messages");

  const sendButton =
    document.querySelector("#ai-send-button") ||
    document.querySelector("#send-button");

  if (!form || !input || !messages) {
    console.warn(
      "Golden Touch AI: Chat elements were not found. " +
      "The HTML element IDs must match this script."
    );
    return;
  }

  const conversation = [];

  function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `chat-message ${sender}`;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  }

  async function sendMessage(event) {
    event.preventDefault();

    const question = input.value.trim();
    if (!question) return;

    input.value = "";
    addMessage(question, "user");

    const loading = addMessage("Thinking...", "assistant");

    if (sendButton) sendButton.disabled = true;

    try {
      const response = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question,
          messages: [
            ...conversation,
            { role: "user", content: question }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message ||
          `AI service returned HTTP ${response.status}`
        );
      }

      // Support common response formats.
      const answer =
        data.reply ||
        data.answer ||
        data.response ||
        data.message ||
        data.content ||
        data.choices?.[0]?.message?.content ||
        data.candidates?.[0]?.content?.parts
          ?.map(part => part.text || "")
          .join("\n");

      if (!answer || typeof answer !== "string") {
        throw new Error(
          "The AI service returned no readable answer. " +
          "Check the ai-chat function response format."
        );
      }

      loading.textContent = answer;

      conversation.push(
        { role: "user", content: question },
        { role: "assistant", content: answer }
      );

    } catch (error) {
      console.error("Golden Touch AI error:", error);
      loading.textContent =
        "Sorry, I couldn't get an answer right now. " +
        "Please try again shortly.";
    } finally {
      if (sendButton) sendButton.disabled = false;
      input.focus();
    }
  }

  form.addEventListener("submit", sendMessage);

  // Support chat forms that use a button without a form submit.
  if (sendButton && !form.contains(sendButton)) {
    sendButton.addEventListener("click", sendMessage);
  }

  console.log("Golden Touch AI Assistant initialized.");
});
