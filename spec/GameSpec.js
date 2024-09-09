describe('Game', () => {
  let player
  let bot1
  let bot2
  let game

  beforeEach(() => {
    player = new Player('Gabriel')
    bot1 = new Bot('Lucas')
    bot2 = new Bot('Pedro')
    game = new Game([player, bot1, bot2])
  })

  describe('switchPlayers', () => {
    it('should switch the current player', () => {
      expect(game.currentPlayer()).toEqual(player)
      game.switchPlayers()
      expect(game.currentPlayer()).toEqual(bot1)
    })
  })

  describe('deal', () => {
    it('should deal cards to players', () => {
      game.deal()
      expect(player.hand().length).toEqual(Game.INITIAL_HAND_SIZE)
      expect(bot1.hand().length).toEqual(Game.INITIAL_HAND_SIZE)
    })
  })

  describe('moveCardsFromOpponentToCurrentPlayer', () => {
    it('should take cards from an opponent if they have the rank you are asking for', () => {
      player.setHand([new Card('3', 'Hearts')])
      bot1.setHand([new Card('3', 'Clubs'), new Card('3', 'Diamonds')])
      game.setDeck(new Deck([]))
      game.moveCardsFromOpponentToCurrentPlayer(bot1, '3')
      expect(player.hand().length).toEqual(3)
      expect(bot1.hand().length).toEqual(0)
    })

    it('should not take cards from an opponent if they do not have the rank you are asking for', () => {
      player.setHand([new Card('3', 'Hearts')])
      bot1.setHand([new Card('A', 'Clubs')])
      game.moveCardsFromOpponentToCurrentPlayer(bot1, '3')
      expect(player.hand().length).toEqual(1)
      expect(bot1.hand().length).toEqual(1)
    })
  })

  describe('playRound', () => {
    it('should take cards from an opponent if they have the rank you are asking for', () => {
      player.setHand([new Card('3', 'Hearts')])
      bot1.setHand([new Card('3', 'Clubs')])
      game.setDeck(new Deck([]))
      game.playRound(bot1.name(), '3')
      expect(player.hand().length).toEqual(2)
      expect(bot1.hand().length).toEqual(0)
    })

    it('should make player go fish if opponent does not have the rank you are asking for', () => {
      player.setHand([new Card('3', 'Hearts')])
      bot1.setHand([new Card('A', 'Clubs')])
      game.setDeck(new Deck([new Card('4', 'Diamonds')]))
      game.playRound(bot1.name(), '3')
      expect(player.hand().length).toEqual(2)
    })

    it('should switch turns if player goes fish for a card that they did not ask for', () => {
      player.setHand([new Card('3', 'Hearts')])
      bot1.setHand([new Card('A', 'Clubs')])
      game.setDeck(new Deck([new Card('4', 'Diamonds')]))
      game.playRound(bot1.name(), '3')
      expect(player.hand().length).toEqual(2)
      expect(game.currentPlayer()).toEqual(bot2)
    })

    it('should not switch turns if player goes fish for a card that they asked for', () => {
      player.setHand([new Card('3', 'Hearts')])
      bot1.setHand([new Card('A', 'Clubs')])
      game.setDeck(new Deck([new Card('3', 'Diamonds')]))
      game.playRound(bot1.name(), '3')
      expect(player.hand().length).toEqual(2)
      expect(bot1.hand().length).toEqual
      expect(game.currentPlayer()).toEqual(player)
    })

    it('should make a book if there is one to be made after a round', () => {
      player.setHand([new Card('3', 'Hearts'), new Card('3', 'Clubs'), new Card('3', 'Diamonds'), new Card('4', 'Spades'), new Card('4', 'Hearts'), new Card('4', 'Clubs'), new Card('4', 'Diamonds')])
      bot1.setHand([new Card('3', 'Spades')])
      bot2.setHand([])
      game.setDeck(new Deck([]))
      game.playRound(bot1.name(), '3')
      expect(player.hand().length).toEqual(0)
      expect(player.books().length).toEqual(2)
    })

    describe('There are two bots', () => {
      it('should make bots play until it is a player turn', () => {
        deck = new Deck([new Card('8', 'Diamonds'), new Card('7', 'Hearts'), new Card('4', 'Clubs')])
        game.setDeck(deck)
        player.hand().push(new Card('2', 'Hearts'))
        bot1.hand().push(new Card('5', 'Diamonds'))
        bot2.hand().push(new Card('6', 'Clubs'))
        game.playRound(bot1.name(), '2')
        expect(player.hand().length).toEqual(2)
        expect(bot1.hand().length).toEqual(2)
        expect(bot2.hand().length).toEqual(2)
      })
    })
  })

  describe('checkForWinner', () => {
    it ('should return null if deck is not empty', () => {
      game.setDeck(new Deck([new Card('3', 'Hearts')]))
      expect(game.checkForWinner()).toEqual(null)
    })

    it ('should return null if a player has cards', () => {
      player.setHand([new Card('3', 'Hearts')])
      expect(game.checkForWinner()).toEqual(null)
    })

    it ('should return winner if all players have no cards and deck is empty', () => {
      game.setDeck(new Deck([]))
      player.setHand([])
      bot1.setHand([])
      bot2.setHand([])
      player.setBooks([new Book(new Card('2', 'Hearts'), new Card('2', 'Diamonds'), new Card('2', 'Clubs'), new Card('2', 'Spades'))])
      game.checkForWinner()
      expect(game.gameWinners()).toEqual([player])
    })
  })

  describe('compareBookValues', () => {
    it('should set game winner the player with the highest book score', () => {
      player.setBooks([new Book(new Card('2', 'Hearts'), new Card('2', 'Diamonds'), new Card('2', 'Clubs'), new Card('2', 'Spades'))])
      bot1.setBooks([new Book(new Card('3', 'Hearts'), new Card('3', 'Diamonds'), new Card('3', 'Clubs'), new Card('3', 'Spades'))])
      game.compareBookValues([player, bot1])
      expect(game.gameWinners()).toEqual([bot1])
    })
  })

  describe('checkEmptyHandOrDraw', () => {
    it('should check if the player has an empty hand and draw a card if they do', () => {
      player.setHand([])
      game.setDeck(new Deck([new Card('3', 'Hearts')]))
      game.checkEmptyHandOrDraw(player)
      expect(player.hand().length).toEqual(1)
    })

    it('should draw until deck is empty', () => {
      player.setHand([])
      game.setDeck(new Deck([new Card('3', 'Hearts'), new Card('4', 'Hearts'), new Card('5', 'Hearts')]))
      game.checkEmptyHandOrDraw(player)
      expect(player.hand().length).toEqual(3)
    })

    it('should draw until player has initial hand size', () => {
      player.setHand([])
      game.setDeck(new Deck([new Card('3', 'Hearts'), new Card('4', 'Hearts'), new Card('5', 'Hearts'), new Card('6', 'Hearts'), new Card('7', 'Hearts'), new Card('8', 'Hearts'), new Card('9', 'Hearts'), new Card('10', 'Hearts')]))
      game.checkEmptyHandOrDraw(player)
      expect(player.hand().length).toEqual(Game.INITIAL_HAND_SIZE)
    })

    it('should not add to hand of player that has cards', () => { 
      player.setHand([new Card('3', 'Hearts')])
      bot1.setHand([])
      game.setDeck(new Deck([new Card('3', 'Hearts')]))
      game.checkEmptyHandOrDraw(player)
      expect(player.hand().length).toEqual(1)
      expect(bot1.hand().length).toEqual(1)
    })
  })

  describe('createRoundResult', () => {
    it('it should create a round result', () => {
      // createRoundResult(roundPlayer = player, opponent = bot1, cardRank = '3')
      // expect(game.roundResults.length).toEqual(1)
    })
  })

})