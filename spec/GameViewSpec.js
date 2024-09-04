describe('GameView', () => {
  let container
  let game
  let player
  let view

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'main'
    document.body.appendChild(container)
    player = new Player('gabriel')
    player.hand = [new Card('2', 'Hearts'), new Card('3', 'Hearts')]
    game = new Game([player])
    view = new GameView(game)

    jasmine.addMatchers({
      toMatchHTMLContent: () => {
        return {
          compare: function(actual, expectedRegex) {
            const result = {}
            result.pass = expectedRegex.test(actual)
            if (result.pass) {
              result.message = `Expected HTML content to match the regular expression ${expectedRegex}`
            } else {
              result.message = `Expected HTML content to match the regular expression ${expectedRegex}, but it did not`
            }
            return result
          }
        }
      }
    })
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it ('should render the game view', () => {
    view.draw(container)

    expect(container.innerHTML).toMatchHTMLContent(/gabriel/)
    expect(container.innerHTML).not.toMatchHTMLContent(/lucas/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Hearts/)
  })

  it ('should render the game view with bots', () => {
    game.players.push(new Bot('lucas'))
    view.draw(container)

    expect(container.innerHTML).toMatchHTMLContent(/gabriel/)
    expect(container.innerHTML).toMatchHTMLContent(/lucas/)
  })
})