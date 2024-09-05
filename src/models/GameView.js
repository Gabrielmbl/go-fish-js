class GameView {
  constructor(game) {
    this.game = game
  }
  
  // TODO: Work on game logic
  // TODO: Create a player view and bot view

  draw(container) {
    container.innerHTML = `
      <h1>Go Fish</h1>
      <h2>Players</h2>
      <ul>
        ${this.game.players.map(player => 
          `<li class="player-name">
            ${player.name}
            <br><span>Hand:</span>
            <ul class="player-hand">
              ${player instanceof Bot ? 
                '<li>[Hand is hidden]</li>' : 
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
  }
}
