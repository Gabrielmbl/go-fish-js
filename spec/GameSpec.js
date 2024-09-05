describe('Game', () => {
  let player
  let bot
  let game

  beforeEach(() => {
    player = new Player('Gabriel')
    bot = new Bot('Lucas')
    game = new Game([player, bot])
  })
  

  describe('deal', () => {
    it ('should deal cards to players', () => {
      game.deal()
      expect(player.hand.length).toEqual(Game.INITIAL_HAND_SIZE)
      expect(bot.hand.length).toEqual(Game.INITIAL_HAND_SIZE)
    })
  })

})