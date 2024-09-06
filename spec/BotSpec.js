describe ('Bot', () => {
  let bot

  beforeEach(() => {
    bot = new Bot('Lucas')
  })

  describe('chooseRandomRank', () => {
    it ('should return a random rank', () => {
      bot.addToHand([new Card('3', 'Hearts'), new Card('5', 'Clubs'), new Card('7', 'Diamonds')])
      const rank = bot.chooseRandomRank()
      expect(rank.length).toEqual(1)
      expect(['3', '5', '7']).toContain(rank)
    })
  })

  describe('chooseRandomOpponent', () => {
    it ('should return a random opponent', () => {
      const players = [new Player('Gabriel'), new Player('Pedro'), bot]
      const opponent = bot.chooseRandomOpponent(players)
      expect(players).toContain(opponent)
      expect(opponent).not.toEqual(bot)
    })
  })
})