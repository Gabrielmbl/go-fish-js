class GameView {
  constructor(game) {
    this.game = game
  }
  
  // TODO: Create a player view and bot view

  _renderAskForm() {
    const uniqueRanks = [...new Set(this.game.players[0].hand.map(card => card.rank))]
    return `
      <form class="ask-form">
      <label for="rank">Ask for rank:</label>
      <select id="rank">
      ${uniqueRanks.map(rank => `<option value="${rank}">${rank}</option>`).join('')}
      </select>
      <select id="opponent">
      ${this.game.players.filter(player => player !== this.game.players[0]).map(player => `<option value="${player.name}">${player.name}</option>`).join('')}
      </select>
      <button type="submit">Ask</button>
      </form>
    `
  }

  draw(container) {
    container.innerHTML = `
      <h1>Go Fish</h1>
      <h2>Players</h2>
      ${this._renderAskForm()}
      <ul>
        ${this.game.players.map(player => 
          `<li class="player-name">
            ${player.name}
            <br><span>Hand:</span>
            <ul class="player-hand">
              ${player instanceof Bot ? 
                player.hand.map(card => `<li>${card.rank} of ${card.suit}</li>`).join('') : 
                player.hand.map(card => `<li>${card.rank} of ${card.suit}</li>`).join('')
              }
            </ul>
            <span>Books:</span>
            <ul class="player-books">
              ${player.books.map(book => 
                book.cards.map(card => `<li>${card.rank} of ${card.suit}</li>`).join('')
              ).join('')}
            </ul>
          </li>`).join('')}
      </ul>
    `
    const askForm = container.querySelector('.ask-form')
    askForm.addEventListener('submit', function(event) {
      event.preventDefault()
      const rank = askForm.querySelector('#rank').value
      const opponent = askForm.querySelector('#opponent').value
      this.game.playRound(this.game.players[0], opponent, rank)
      this.draw(container)
    }.bind(this))
  }

}
