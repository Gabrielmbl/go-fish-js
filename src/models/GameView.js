class GameView {
  // constructor(game) {
  //   this.game = game
  // }
  constructor(game, playRoundCallback) {
    this.game = game
    this.playRoundCallback = playRoundCallback
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

  _renderContinueButton() {
    if (this.game.isItHumanPlayerTurn()) return ''
    return `
      <form class="continue-form">
        <button class="btn continue-button" type="submit">Continue</button>
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
        ${player.hand().map(card => `<li>${card.rank()} of ${card.suit}</li>`).join('')}
      </ul>
    `
  }

  _renderPlayerBooks(player) {
    if (player.books().length === 0) {
      return 'No books yet'
    } else {
      return `
        ${player.books().map(book => 
          book.cards().map(card => `<li>${card.rank()} of ${card.suit}</li>`).join('')
        ).join('')}
      `
    }
  }


  draw(container) {
    container.innerHTML = `
      <h1>Go Fish</h1>
      <h2>Players</h2>
      ${this._renderAskForm()}
      ${this._renderContinueButton()}
      <ul>
        ${this._renderPlayerView()}
        ${this._renderBotView()}
      </ul>
    `
    this.addEventListeners(container)
  }

  addEventListeners(container) {
    const askForm = container.querySelector('.ask-form')
    const continueForm = container.querySelector('.continue-form')
    if (askForm) {
      this.addFormEventListener(askForm, container)
    }
    if (continueForm) {
      this.addContinueEventListener(continueForm, container)
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

  addContinueEventListener(continueForm, container) {
    continueForm.addEventListener('submit', function (event) {
      event.preventDefault()
      this.game.botTakeTurn()
      this.draw(container)
    }.bind(this))
  }
}
