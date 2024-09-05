describe('Game', () => {
  let player
  let bot
  let game

  beforeEach(() => {
    player = new Player('Gabriel')
    bot = new Bot('Lucas')
    game = new Game([player, bot])
  })
  
  describe('switchPlayers', () => {
    it ('should switch the current player', () => {
      expect(game.currentPlayer).toEqual(player)
      game.switchPlayers()
      expect(game.currentPlayer).toEqual(bot)
    })
  })

  describe('deal', () => {
    it ('should deal cards to players', () => {
      game.deal()
      expect(player.hand.length).toEqual(Game.INITIAL_HAND_SIZE)
      expect(bot.hand.length).toEqual(Game.INITIAL_HAND_SIZE)
    })
  })

  describe('moveCardsFromOpponentToPlayer', () => {
    it ('should take cards from an opponent if they have the rank you are asking for', () => {
      player.hand = [new Card('3', 'Hearts')]
      bot.hand = [new Card('3', 'Clubs'), new Card('3', 'Diamonds')]
      game.moveCardsFromOpponentToPlayer(player, bot, '3')
      expect(player.hand.length).toEqual(3)
      expect(bot.hand.length).toEqual(0)
    })

    it ('should not take cards from an opponent if they do not have the rank you are asking for', () => {
      player.hand = [new Card('3', 'Hearts')]
      bot.hand = [new Card('A', 'Clubs')]
      game.moveCardsFromOpponentToPlayer(player, bot, '3')
      expect(player.hand.length).toEqual(1)
      expect(bot.hand.length).toEqual(1)
    })
  })

  describe('playRound', () => {
    it ('should take cards from an opponent if they have the rank you are asking for', () => {
      player.hand = [new Card('3', 'Hearts')]
      bot.hand = [new Card('3', 'Clubs')]
      game.playRound(player, bot.name, '3')
      expect(player.hand.length).toEqual(2)
      expect(bot.hand.length).toEqual(0)
    })

    it ('should make player go fish if opponent does not have the rank you are asking for', () => {
      player.hand = [new Card('3', 'Hearts')]
      bot.hand = [new Card('A', 'Clubs')]
      game.playRound(player, bot.name, '3')
      expect(player.hand.length).toEqual(2)
      expect(bot.hand.length).toEqual
    })

    it ('should switch turns if player goes fish for a card that they did not ask for', () => {
      player.hand = [new Card('3', 'Hearts')]
      bot.hand = [new Card('A', 'Clubs')]
      game.deck.cards = [new Card('4', 'Hearts')]
      game.playRound(player, bot.name, '3')
      expect(player.hand.length).toEqual(2)
      expect(bot.hand.length).toEqual
      expect(game.currentPlayer).toEqual(bot)
    })

    it ('should not switch turns if player goes fish for a card that they asked for', () => {
      player.hand = [new Card('3', 'Hearts')]
      bot.hand = [new Card('A', 'Clubs')]
      game.deck.cards = [new Card('3', 'Diamonds')]
      game.playRound(player, bot.name, '3')
      expect(player.hand.length).toEqual(2)
      expect(bot.hand.length).toEqual
      expect(game.currentPlayer).toEqual(player)
    })
  })

})