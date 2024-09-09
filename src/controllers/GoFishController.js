class GoFishController {
  container() {
    return document.getElementById('main')
  }

  login() {
    const view = new LoginView(this.startGame.bind(this))
    view.draw(this.container())
  }

  startGame(name, opponentCount) {
    const player = new Player(name)
    this.game = new Game(player, opponentCount)
    this.game.deal()
    const view = new GameView(this.game)
    // const view = new GameView(game, this.playRound.bind(this))
    view.draw(this.container())
  }

  playRound(opponent, rank) {
    this.game.playRound(opponent, rank)
    const view = new GameView(this.game, this.playRound.bind(this))
    view.draw(this.container())
  }

}

window.controller = new GoFishController();
window.onload = controller.login.bind(window.controller)