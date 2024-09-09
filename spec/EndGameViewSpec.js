describe('LoginView', () => {
  let container
  let params
  let game
  let player
  let view

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'main'
    document.body.appendChild(container)
    params = {}
    player = new Player('gabriel')
    game = new Game(player, 1)
    game.gameWinners().push(player)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })


  it('should show the winner', () => {
    const endGameView = new EndGameView(player)
    endGameView.draw(container)

    expect(container.innerHTML).toMatchHTMLContent(/gabriel/)
  })

  it('should show the winners if there are more than one', () => {
    const bot = new Bot('lucas')
    game.gameWinners().push(bot)
    const endGameView = new EndGameView([player, bot])
    endGameView.draw(container)

    expect(container.innerHTML).toMatchHTMLContent(/gabriel, lucas/)
  })

})
