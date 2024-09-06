describe('Player', () => {
  let player

  beforeEach(() => {
    player = new Player('Gabriel')
  })

  describe('handHasRanks', () => {
    it('should return true if the player has the rank', () => {
      player.setHand([new Card('3', 'Hearts')])
      expect(player.handHasRanks('3')).toEqual(true)
    })

    it('should return false if the player does not have the rank', () => {
      player.setHand([new Card('3', 'Hearts')])
      expect(player.handHasRanks('4')).toEqual(false)
    })
  })

  describe('addToHand', () => {
    it('should add cards to the player hand', () => {
      player.addToHand([new Card('3', 'Hearts'), new Card('3', 'Clubs')])
      expect(player.hand().length).toEqual(2)
    })
  })

  describe('removeByRank', () => {
    it('should remove cards from the player hand by rank', () => {
      player.setHand([new Card('3', 'Hearts'), new Card('3', 'Clubs')])
      expect(player.hand().length).toEqual(2)
      player.removeByRank('3')
      expect(player.hand().length).toEqual(0)
    })
  })

  describe('addToBooks', () => { 
    it('should add books to the player books', () => {
      const book = new Book(new Card('2', 'Hearts'), new Card('2', 'Clubs'), new Card('2', 'Diamonds'), new Card('2', 'Spades'))
      player.addToBooks(book)
      expect(player.books().length).toEqual(1)
      expect(player.books()[0]).toBeInstanceOf(Book)
    })
  })
})