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
    player.hand = [new Card('2', 'Hearts'), new Card('3', 'Hearts')]
    player.books.push(new Book(new Card('2', 'Hearts'), new Card('2', 'Clubs'), new Card('2', 'Diamonds'), new Card('2', 'Spades')))
    const bots = Array.from({ length: opponentCount }, (_, i) => new Bot(`Bot ${i + 1}`))
    const game = new Game([player, ...bots])
    const view = new GameView(game)
    view.draw(this.container())
  }
}

window.controller = new GoFishController();
window.onload = controller.login.bind(window.controller)