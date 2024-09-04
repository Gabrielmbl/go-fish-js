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
    const bots = Array.from({ length: opponentCount }, (_, i) => new Bot(`Bot ${i + 1}`))
    const game = new Game([player, ...bots])
    const view = new GameView(game)
    view.draw(this.container())
  }
}

window.controller = new GoFishController();
window.onload = controller.login.bind(window.controller)