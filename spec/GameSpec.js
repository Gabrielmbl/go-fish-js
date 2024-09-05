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
    it ('should switch the current player', () => {
      expect(game.currentPlayer).toEqual(player)
      game.switchPlayers()
      expect(game.currentPlayer).toEqual(bot1)
    })
  })

  describe('deal', () => {
    it ('should deal cards to players', () => {
      game.deal()
      expect(player.hand.length).toEqual(Game.INITIAL_HAND_SIZE)
      expect(bot1.hand.length).toEqual(Game.INITIAL_HAND_SIZE)
    })
  })

  describe('moveCardsFromOpponentToPlayer', () => {
    it ('should take cards from an opponent if they have the rank you are asking for', () => {
      player.hand = [new Card('3', 'Hearts')]
      bot1.hand = [new Card('3', 'Clubs'), new Card('3', 'Diamonds')]
      game.moveCardsFromOpponentToPlayer(player, bot1, '3')
      expect(player.hand.length).toEqual(3)
      expect(bot1.hand.length).toEqual(0)
    })

    it ('should not take cards from an opponent if they do not have the rank you are asking for', () => {
      player.hand = [new Card('3', 'Hearts')]
      bot1.hand = [new Card('A', 'Clubs')]
      game.moveCardsFromOpponentToPlayer(player, bot1, '3')
      expect(player.hand.length).toEqual(1)
      expect(bot1.hand.length).toEqual(1)
    })
  })

  describe('playRound', () => {
    it ('should take cards from an opponent if they have the rank you are asking for', () => {
      player.hand = [new Card('3', 'Hearts')]
      bot1.hand = [new Card('3', 'Clubs')]
      game.playRound(player.name, bot1.name, '3')
      expect(player.hand.length).toEqual(2)
      expect(bot1.hand.length).toEqual(0)
    })

    it ('should make player go fish if opponent does not have the rank you are asking for', () => {
      player.hand = [new Card('3', 'Hearts')]
      bot1.hand = [new Card('A', 'Clubs')]
      game.playRound(player.name, bot1.name, '3')
      expect(player.hand.length).toEqual(2)
      expect(bot1.hand.length).toEqual
    })

    it ('should switch turns if player goes fish for a card that they did not ask for', () => {
      player.hand = [new Card('3', 'Hearts')]
      bot1.hand = [new Card('A', 'Clubs')]
      game.deck.cards = [new Card('4', 'Hearts')]
      game.playRound(player.name, bot1.name, '3')
      expect(player.hand.length).toEqual(2)
      expect(bot1.hand.length).toEqual
      expect(game.currentPlayer).toEqual(bot1)
    })

    it ('should not switch turns if player goes fish for a card that they asked for', () => {
      player.hand = [new Card('3', 'Hearts')]
      bot1.hand = [new Card('A', 'Clubs')]
      game.deck.cards = [new Card('3', 'Diamonds')]
      game.playRound(player.name, bot1.name, '3')
      expect(player.hand.length).toEqual(2)
      expect(bot1.hand.length).toEqual
      expect(game.currentPlayer).toEqual(player)
    })
  })

  describe('botTakeTurn', () => {
    it ('should make the bot take a turn', () => {
      game.currentPlayer = bot1
      player.hand = [new Card('3', 'Hearts')]
      bot1.hand = [new Card('3', 'Clubs')]
      bot2.hand = [new Card('3', 'Diamonds')]
      game.botTakeTurn()
      expect(bot1.hand.length).toEqual(2)
    })
  })

})