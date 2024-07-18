const autoReactions = {
  reactionButtons: {
    '💖': '//*[contains(@aria-label, "💖")]',
    '👍': '//*[contains(@aria-label, "👍")]',
    '🎉': '//*[contains(@aria-label, "🎉")]',
    '👏': '//*[contains(@aria-label, "👏")]',
    '😂': '//*[contains(@aria-label, "😂")]',
    '😮': '//*[contains(@aria-label, "😮")]',
    '😢': '//*[contains(@aria-label, "😢")]',
    '🤔': '//*[contains(@aria-label, "🤔")]',
    '👎': '//*[contains(@aria-label, "👎")]'
  },
  intervalId: null,

  startReacting(emoji, delay) {
    const reactionPaletteOpener = document.querySelector('[role=button][aria-label="Send a reaction"]');
    if (reactionPaletteOpener && reactionPaletteOpener.getAttribute('aria-pressed') === 'false') {
      reactionPaletteOpener.click();
    }

    if (!(emoji in this.reactionButtons)) {
      throw new Error(`Invalid emoji: ${emoji}. Valid emojis are 💖, 👍, 🎉, 👏, 😂, 😮, 😢, 🤔, 👎.`);
    }

    const reactionButtonXPath = this.reactionButtons[emoji];
    const result = document.evaluate(reactionButtonXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const reactionButton = result.singleNodeValue;

    if (!reactionButton) {
      throw new Error(`Reaction button for ${emoji} not found.`);
    }

    this.stopReacting();

    this.intervalId = setInterval(() => {
      reactionButton.click();
    }, delay);
  },

  stopReacting() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
};


try {
  autoReactions.startReacting('💖', 2000); 
} catch (error) {
  console.error('Error starting reactions:', error);
}
