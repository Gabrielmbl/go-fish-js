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

  describe('updateMemory', () => {
    it ('should update the bot memory', () => {
      const roundResult = new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3' })
      bot.updateMemory(roundResult)
      expect(bot.memory()['Gabriel']).toEqual(['3'])
      expect(bot.memory()['Lucas']).toEqual([])
    })

    it ('should remove the rank from opponent memory when player takes ranks from opponent', () => {
      bot.memory()['Lucas'] = ['3']
      expect(bot.memory()).toEqual({'Lucas': ['3']})
      bot.updateMemory(new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3' }))
      expect(bot.memory()['Gabriel']).toEqual(['3'])
      expect(bot.memory()['Lucas']).toEqual([])
    })

    it ('should remove the rank from memory if player made a book', () => {
      bot.updateMemory(new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3' }))
      expect(bot.memory()['Gabriel']).toEqual(['3'])
      const roundResult = new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3', booksMade: ['3'] })
      bot.updateMemory(roundResult)
      expect(bot.memory()['Gabriel']).toEqual([])
    })

    it ('should remove all ranks from memory if player made a book', () => {
      bot.updateMemory(new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3' }))
      expect(bot.memory()['Gabriel']).toEqual(['3'])
      bot.updateMemory(new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '5' }))
      expect(bot.memory()['Gabriel']).toEqual(['3', '5'])
      const roundResult = new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3', booksMade: ['3', '5'] })
      bot.updateMemory(roundResult)
      expect(bot.memory()['Gabriel']).toEqual([])
    })

    it ('should remove all ranks from memory for opponent if player took cards from him', () => {
      bot.memory()['Lucas'] = ['3', '3']
      const roundResult = new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3' })
      bot.updateMemory(roundResult)
      expect(bot.memory()['Gabriel']).toEqual(['3'])
      expect(bot.memory()['Lucas']).toEqual([])
    })

  })

  describe('chooseRankAndOpponentFromMemory', () => {
    it ('should choose a rank in your hand that another player has', () => {
      player = new Player('Gabriel')
      bot = new Bot('Lucas')
      player.setHand([new Card('3', 'Hearts'), new Card('5', 'Clubs'), new Card('7', 'Diamonds')])
      bot.setHand([new Card('3', 'Clubs'), new Card('2', 'Clubs'), new Card('9', 'Diamonds')])
      bot.memory()['Gabriel'] = ['3', '5', '7']
      const { rank, opponent } = bot.chooseRankAndOpponentFromMemory([player, bot])
      expect(rank).toEqual('3')
      expect(opponent).toEqual(player)
    })

    it ('should return a random rank if no useful memory exists', () => {
      player = new Player('Gabriel')
      bot = new Bot('Lucas')
      player.setHand([new Card('3', 'Hearts'), new Card('5', 'Clubs'), new Card('7', 'Diamonds')])
      bot.setHand([new Card('4', 'Clubs'), new Card('2', 'Clubs'), new Card('9', 'Diamonds')])
      bot.memory()['Gabriel'] = ['3', '5', '7']
      const { rank, opponent } = bot.chooseRankAndOpponentFromMemory([player, bot])
      expect(['4', '2', '9']).toContain(rank)
      expect(['3', '5', '7']).not.toContain(rank)
    })

    it ('should return a rank and opponent from the ones in memory that matches the bot hand', () => {
      player = new Player('Gabriel')
      bot = new Bot('Lucas')
      const bot2 = new Bot('Pedro')
      player.setHand([new Card('3', 'Hearts'), new Card('5', 'Clubs'), new Card('7', 'Diamonds')])
      bot.setHand([new Card('3', 'Clubs'), new Card('2', 'Clubs'), new Card('Q', 'Diamonds')])
      bot2.setHand([new Card('9', 'Hearts'), new Card('A', 'Clubs'), new Card('2', 'Diamonds')])
      bot.memory()['Gabriel'] = ['3', '5', '7']
      bot.memory()['Pedro'] = ['9', 'A', '2']
      const { rank, opponent } = bot.chooseRankAndOpponentFromMemory([player, bot, bot2])
      expect(['3', '2']).toContain(rank)
      expect(['Gabriel', 'Pedro']).toContain(opponent.name())
    })

    it ('should only have memory of last 3 ranks for each player if difficulty is medium', () => {
      player = new Player('Gabriel')
      bot = new Bot('Lucas')
      bot2 = new Bot('Pedro')
      bot3 = new Bot('Someone')
      bot.setHand([new Card('3', 'Clubs'), new Card('5', 'Clubs'), new Card('7', 'Diamonds')])
      bot.memory()['Gabriel'] = ['3', '5', '7', '2', '9']
      bot.memory()['Pedro'] = ['9', 'A', '2', '3', '5']
      bot.memory()['Someone'] = ['3']
      const { rank, opponent } = bot.chooseRankAndOpponentFromMemory([player, bot], 'medium')
      expect(bot.memory()['Gabriel']).toEqual(['2', '9'])
      expect(bot.memory()['Pedro']).toEqual(['3', '5'])
      expect(bot.memory()['Someone']).toEqual(['3'])
    })

    it ('should not get the memory wiped if difficulty is hard', () => {
      player = new Player('Gabriel')
      bot = new Bot('Lucas')
      bot2 = new Bot('Pedro')
      bot3 = new Bot('Someone')
      bot.setHand([new Card('3', 'Clubs'), new Card('5', 'Clubs'), new Card('7', 'Diamonds')])
      bot.memory()['Gabriel'] = ['3', '5', '7', '2', '9']
      bot.memory()['Pedro'] = ['9', 'A', '2', '3', '5']
      bot.memory()['Someone'] = ['2', '3']
      const { rank, opponent } = bot.chooseRankAndOpponentFromMemory([player, bot], 'hard')
      expect(bot.memory()['Gabriel']).toEqual(['3', '5', '7', '2', '9'])
      expect(bot.memory()['Pedro']).toEqual(['9', 'A', '2', '3', '5'])
      expect(bot.memory()['Someone']).toEqual(['2', '3'])
    })
  })

})