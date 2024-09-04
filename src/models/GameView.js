class GameView {
  constructor(game) {
    this.game = game
  }

  draw(container) {
    container.innerHTML = `
      <h1>Go Fish</h1>
      <h2>Players</h2>
      <ul>
        ${this.game.players.map(player => 
          `<li className="player-name">
            ${player.name}
            <ul className="player-hand">
              ${player.hand.map(card => `<li>${card.rank} of ${card.suit}</li>`).join('')}
            </ul>
          </li>`).join('')}
      </ul>
    `
  }
}