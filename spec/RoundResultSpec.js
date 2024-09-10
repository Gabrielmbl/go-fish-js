describe('RoundResult', () => {
  let roundResult

  beforeEach(() => {
    roundResult = new RoundResult({
      playerName: 'Gabriel',
      opponentName: 'Lucas',
      rankAsked: '3',
      cardFished: new Card('3', 'Hearts'),
      booksMade: ['3'],
      gameWinners: ['Gabriel']
    })
  })

  describe('displayResult', () => {
    it('should return a string with the round result including the fished card and books made', () => {
      const result = roundResult.displayResult()
      expect(result).toContain('Gabriel asked Lucas for 3s')
      expect(result).toContain('fished a 3 of Hearts')
      expect(result).toContain('Gabriel made books of 3s')
    })

    it('should return a string with the round result including the fished card but no books made', () => {
      roundResult = new RoundResult({
        playerName: 'Gabriel',
        opponentName: 'Lucas',
        rankAsked: '3',
        cardFished: new Card('3', 'Hearts'),
        booksMade: [],
        gameWinners: []
      })
      const result = roundResult.displayResult()
      expect(result).toContain('Gabriel asked Lucas for 3s')
      expect(result).toContain('fished a 3 of Hearts')
      expect(result).not.toContain('made books of')
    })

    it('should return a string with the round result if the player did not fish any card', () => {
      roundResult = new RoundResult({
        playerName: 'Gabriel',
        opponentName: 'Lucas',
        rankAsked: '3',
        cardFished: null,
        booksMade: [],
        gameWinners: []
      })
      const result = roundResult.displayResult()
      expect(result).toContain('Gabriel asked Lucas for 3s')
      expect(result).toContain('took 3s from Lucas')
    })

    it('should return a string with the round result including books made and game winners', () => {
      const result = roundResult.displayResult()
      expect(result).toContain('Gabriel asked Lucas for 3s')
      expect(result).toContain('fished a 3 of Hearts')
      expect(result).toContain('Gabriel made books of 3s')
    })

    it('should return a string with the round result and game winners if there are no books made', () => {
      roundResult = new RoundResult({
        playerName: 'Gabriel',
        opponentName: 'Lucas',
        rankAsked: '3',
        cardFished: new Card('3', 'Hearts'),
        booksMade: [],
        gameWinners: ['Gabriel']
      })
      const result = roundResult.displayResult()
      expect(result).toContain('Gabriel asked Lucas for 3s')
      expect(result).toContain('fished a 3 of Hearts')
    })
  })

  describe('describeAskAction', () => {
    it('should return the ask action description', () => {
      expect(roundResult.describeAskAction()).toContain('Gabriel asked Lucas for 3s')
    })
  })

  describe('describeFishResult', () => {
    it('should return the fish result description if card is fished', () => {
      expect(roundResult.describeFishResult()).toContain('and fished a 3 of Hearts')
    })

    it('should return the fish result description if no card is fished', () => {
      roundResult = new RoundResult({
        playerName: 'Gabriel',
        opponentName: 'Lucas',
        rankAsked: '3',
        cardFished: null,
        booksMade: [],
        gameWinners: []
      })
      expect(roundResult.describeFishResult()).toContain('and took 3s from Lucas')
    })
  })

  describe('describeBooksMade', () => {
    it('should return books made description if books are made', () => {
      expect(roundResult.describeBooksMade()).toContain('Gabriel made books of 3s')
    })

    it('should return an empty string if no books are made', () => {
      roundResult = new RoundResult({
        playerName: 'Gabriel',
        opponentName: 'Lucas',
        rankAsked: '3',
        cardFished: new Card('3', 'Hearts'),
        booksMade: [],
        gameWinners: []
      })
      expect(roundResult.describeBooksMade()).toEqual('')
    })
  })
})