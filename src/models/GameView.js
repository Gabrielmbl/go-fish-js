class GameView {
  constructor(game, playRoundCallback, endGameCallback) {
    this.game = game
    this.playRoundCallback = playRoundCallback
    this.endGameCallback = endGameCallback
  }
  
  _renderAskForm() {
    if (!this.game.isItHumanPlayerTurn()) return ''

    const uniqueRanks = [...new Set(this.game.players()[0].hand().map(card => card.rank()))]
    return `
      <form class="ask-form">
        <label for="rank">Ask for rank:</label>
        <select id="rank">
          ${uniqueRanks.map(rank => `<option value="${rank}">${rank}</option>`).join('')}
        </select>
        <select id="opponent">
          ${this.game.players().filter(player => player !== this.game.players()[0]).map(player => `<option value="${player.name()}">${player.name()}</option>`).join('')}
        </select>
        <button class="btn" type="submit">Ask</button>
      </form>
    `
  }

  _renderPlayerView() {
    const player = this.game.players().filter(player => !(player instanceof Bot))[0]
    return `
      <li class="player-name">
        ${player.name()}
        <br><span>Hand:</span>
        ${this._renderPlayerHand(player)}
        <span>Books:</span>
        <ul class="player-books">
          ${this._renderPlayerBooks(player)}
        </ul>
      </li>
    `
  }

  _renderBotView() {
    const bots = this.game.players().filter(player => player instanceof Bot)
    return `
      ${bots.map(bot => `
        <li class="player-name">
          ${bot.name()}
          <br><span>Hand:</span>
          ${this._renderPlayerHand(bot)}
          <span>Books:</span>
          <ul class="player-books">
            ${this._renderPlayerBooks(bot)}
          </ul>
        </li>
      `).join('')}
    `
  }

  _renderPlayerHand(player) {
    return `
      <ul class="player-hand">
        ${player.hand().map(card => `<li>${card.rank()} of ${card.suit()}</li>`).join('')}
      </ul>
    `
  }

  _renderPlayerBooks(player) {
    if (player.books().length === 0) {
      return 'No books yet'
    } else {
      return `
        ${player.books().map(book => 
          book.cards().map(card => `<li>${card.rank()} of ${card.suit()}</li>`).join('')
        ).join('')}
      `
    }
  }

  _renderHeader() {
    return `
    <div class="app__header">
      <div class="navbar">
        <nav class="navbar__content navbar__content--justify-start">
          <span>Go Fish</span>
        </nav>
      </div>
    </div>
    `
  }

  _renderRoundResults() {
    return `
    <h2>Round Results</h2>
      <div class="round-results">
        <div class="messages">
          <ul>
            ${this.game.roundResults().map(result => `
              <li>${result.displayResult()}</li>
            `).join('')}
          </ul>
        </div>
      </div>
    `
  }
  

  draw(container) {
    container.innerHTML = `
      ${this._renderHeader()}
      <div class="game-view">
      <div class="game-board">
          <h2>Players</h2>
          <ul>
            ${this._renderPlayerView()}
            ${this._renderBotView()}
          </ul>
        </div>
        
        <div class="game-feed">
          ${this._renderRoundResults()}
          ${this._renderAskForm()}
        </div>
        
        <div class="player-hand">
        </div>

        <div class="player-books">
        </div>
      </div>
    `
    this.addEventListeners(container)
    
    if (this.game.gameWinners().length > 0) {
      this.endGameCallback()
    }
  }

  addEventListeners(container) {
    const askForm = container.querySelector('.ask-form')
    if (askForm) {
      this.addFormEventListener(askForm, container)
    }
  }

  addFormEventListener(askForm, container) {
    askForm.addEventListener('submit', function (event) {
      event.preventDefault()
      const rank = askForm.querySelector('#rank').value
      const opponent = askForm.querySelector('#opponent').value
      this.game.playRound(opponent, rank)
      this.draw(container)
    }.bind(this))
  }

}
