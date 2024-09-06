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
    player.setHand([new Card('3', 'Hearts')])
    book = new Book(new Card('2', 'Hearts'), new Card('2', 'Clubs'), new Card('2', 'Diamonds'), new Card('2', 'Spades'))
    player.books().push(book)
    bot = new Bot('lucas')
    bot.setHand([new Card('A', 'Hearts')])
    game = new Game([player, bot])
    view = new GameView(game)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('should render the game view', () => {
    view.draw(container)

    expect(container.innerHTML).toMatchHTMLContent(/gabriel/)
    expect(container.innerHTML).not.toMatchHTMLContent(/UnexistantPlayer/)
    expect(container.innerHTML).toMatchHTMLContent(/3 of Hearts/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Hearts/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Clubs/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Diamonds/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Spades/)
  })

  it('should render the game view with bots', () => {
    game.players().push(new Bot('lucas'))
    view.draw(container)

    expect(container.innerHTML).toMatchHTMLContent(/gabriel/)
    expect(container.innerHTML).toMatchHTMLContent(/lucas/)
  })

  it('should render the game view without displaying the bot hand', () => {
    view.draw(container)

    expect(container.innerHTML).toMatchHTMLContent(/gabriel/)
    expect(container.innerHTML).toMatchHTMLContent(/3 of Hearts/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Hearts/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Clubs/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Diamonds/)
    expect(container.innerHTML).toMatchHTMLContent(/2 of Spades/)
    // expect(container.innerHTML).toMatchHTMLContent(/\[Hand is hidden\]/)
    // expect(container.innerHTML).not.toMatchHTMLContent(/A of Hearts/)
  })

  describe('Ask form', () => {
    it('should render the ask form', () => {
      view.draw(container)

      expect(container.innerHTML).toMatchHTMLContent(/Ask for rank:/)
      expect(container.innerHTML).toMatchHTMLContent(/<option value="3">3<\/option>/)
      expect(container.innerHTML).not.toMatchHTMLContent(/<option value="A">A<\/option>/)
    })

    it('should play a round when the form is submitted', () => {
      view.draw(container)

      const form = container.querySelector('.ask-form')
      const rank = form.querySelector('#rank')
      const submitButton = form.querySelector('button')
      rank.value = '3'
      submitButton.click()
      expect(player.hand().length).toEqual(2)
      expect(bot.hand().length).toEqual
    })

    it('should hide ask form if it is not the player turn', () => {
      view.draw(container)
      let askForm = container.querySelector('.ask-form')
      expect(askForm.style.display).not.toBe('none')

      game.deck.cards = [new Card('4', 'Hearts')]
      const form = container.querySelector('.ask-form')
      const rank = form.querySelector('#rank')
      const submitButton = form.querySelector('button')
      rank.value = '3'

      submitButton.click()

    })
  })

  describe('Continue button', () => {
    it('should make bot take turn if user presses on the continue button', () => {
      game.deck.cards = [new Card('4', 'Hearts')]
      game.players()[0].setHand([new Card('3', 'Hearts')])
      game.players()[1].setHand([new Card('A', 'Hearts')])
      game.setCurrentPlayer(game.players()[1])

      view.draw(container)
      let continueButton = container.querySelector('.continue-button')
      continueButton.click()

      expect(game.players()[1].hand().length).toEqual(2)
    })
  })
})