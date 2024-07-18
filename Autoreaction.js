const autoReactions = {
    reactionButtons: {
        '💖': '[aria-label="💖"]',
        '👍': '[aria-label="👍"]',
        '🎉': '[aria-label="🎉"]',
        '👏': '[aria-label="👏"]',
        '😂': '[aria-label="😂"]',
        '😮': '[aria-label="😮"]',
        '😢': '[aria-label="😢"]',
        '🤔': '[aria-label="🤔"]',
        '👎': '[aria-label="👎"]'
    },
    intervalId: null,
    

    startReacting(emoji, delay) {
        const reactionPaletteOpener = document.querySelector('[role=button][aria-label="Send a reaction"]');
        if (reactionPaletteOpener.getAttribute('aria-pressed') === 'false') {
            reactionPaletteOpener.click();
        }
        if (!(emoji in this.reactionButtons)) {
            throw new Error(`Invalid emoji: ${emoji}. Valid emojis are 💖, 👍, 🎉, 👏, 😂, 😮, 😢, 🤔, 👎.`);
        }
  
        const reactionButtonSelector = this.reactionButtons[emoji];
  
        const reactionButton = document.querySelector(`[role=button] ${reactionButtonSelector}`);
  
        if (!reactionButton) {
            throw new Error(`Reaction button for ${emoji} not found.`);
        }
  
       
        if (reactionPaletteOpener && reactionPaletteOpener.getAttribute('aria-pressed') === 'false') {
            reactionPaletteOpener.click();
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
  
