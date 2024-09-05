describe('GameView', () => {
  let container
  let game
  let player
  let bot
  let book
  let view

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'main'
    document.body.appendChild(container)
    player = new Player('gabriel')
    player.hand = [new Card('3', 'Hearts')]
    book = new Book(new Card('2', 'Hearts'), new Card('2', 'Clubs'), new Card('2', 'Diamonds'), new Card('2', 'Spades'))
    player.books.push(book)
    bot = new Bot('lucas')
    bot.hand = [new Card('A', 'Hearts')]
    game = new Game([player, bot])
    view = new GameView(game)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it ('should render the game view', () => {
    view.draw(container)

    expect(container.innerHTML).toMatchHTMLContent(/gabriel/)
    expect(container.innerHTML).not.toMatchHTMLContent(/UnexistantPlayer/)
    expect(container.innerHTML).toMatchHTMLContent(/3 of Hearts/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Hearts/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Clubs/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Diamonds/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Spades/)
  })

  it ('should render the game view with bots', () => {
    game.players.push(new Bot('lucas'))
    view.draw(container)

    expect(container.innerHTML).toMatchHTMLContent(/gabriel/)
    expect(container.innerHTML).toMatchHTMLContent(/lucas/)
  })

  it ('should render the game view without displaying the bot hand', () => {
    view.draw(container)

    expect(container.innerHTML).toMatchHTMLContent(/gabriel/)
    expect(container.innerHTML).toMatchHTMLContent(/3 of Hearts/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Hearts/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Clubs/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Diamonds/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Spades/)
    expect(container.innerHTML).toMatchHTMLContent(/\[Hand is hidden\]/)
    expect(container.innerHTML).not.toMatchHTMLContent(/A of Hearts/)
  })
})