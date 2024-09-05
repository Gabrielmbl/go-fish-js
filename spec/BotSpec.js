describe ('Bot', () => {
  let bot

  beforeEach(() => {
    bot = new Bot('Lucas')
  })

  describe('getRandomRank', () => {
    it ('should return a random rank', () => {
      bot.hand = [new Card('3', 'Hearts'), new Card('5', 'Clubs'), new Card('7', 'Diamonds')]
      const rank = bot.getRandomRank()
      expect(rank.length).toEqual(1)
      expect(['3', '5', '7']).toContain(rank)
    })
  })

  describe('getRandomOpponent', () => {
    it ('should return a random opponent', () => {
      const players = [new Player('Gabriel'), new Player('Pedro'), bot]
      const opponent = bot.getRandomOpponent(players)
      expect(players).toContain(opponent)
      expect(opponent).not.toEqual(bot)
    })
  })
})