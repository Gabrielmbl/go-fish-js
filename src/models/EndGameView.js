class EndGameView {
  constructor(winnersCallback) {
    this.winners = Array.isArray(winnersCallback) ? winnersCallback : [winnersCallback]
  }

  draw(container) {
    container.innerHTML = `
      <h1>Game Over!</h1>
      <p>The winner(s): ${this._winnerNames()}</p>
    `
  }

  _winnerNames() {
    return this.winners.map(winner => winner.name()).join(', ')
  }
}
