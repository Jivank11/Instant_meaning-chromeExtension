chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "getWordMeaning",
    title: "Get Word Meaning",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "getWordMeaning") {
    const selectedWord = info.selectionText;
    if (selectedWord) {
      const response = await fetch(``); // `your-api-key-here${selectedWord}`
      const data = await response.json();
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: showDefinition,
        args: [selectedWord, data]
      });
    }
  }
});

function showDefinition(word, data) {
  const meaning = data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.";
  const message = `Word: ${word}\nMeaning: ${meaning}`;
  alert(message);
}

