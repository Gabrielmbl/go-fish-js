describe ('Deck',() => {
  let deck

  beforeEach(() => {
    deck = new Deck()
  })

  describe('create', () => {
    it('should create a deck of cards', () => {
      expect(deck.cards.length).toEqual(52)
      expect(deck.cards[0]).toBeInstanceOf(Card)
    })
  })

  describe('shuffle', () => {
    it('should shuffle the deck of cards', () => {
      deck.create()
      const originalCards = [...deck.cards]
      deck.shuffle()
      expect(deck.cards).not.toEqual(originalCards)
    })
  })
})