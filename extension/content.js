chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { word, data } = message;

  // Check if definition exists
  const definition = data[0]?.meanings[0]?.definitions[0]?.definition || "Definition not found.";
  const example = data[0]?.meanings[0]?.definitions[0]?.example || "No example available.";

  // Remove any existing popup
  const existingPopup = document.getElementById("word-helper-popup");
  if (existingPopup) existingPopup.remove();

  // Create a popup div
  const popup = document.createElement("div");
  popup.id = "word-helper-popup";
  popup.innerHTML = `
    <strong>Word:</strong> ${word}<br>
    <strong>Definition:</strong> ${definition}<br>
    <strong>Example:</strong> ${example}
  `;

  // Add popup to the body
  document.body.appendChild(popup);

  // Position the popup near the selection
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
  }
});
