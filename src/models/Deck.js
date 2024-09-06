class Deck {
  static SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
  static RANKS = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']

  constructor(cards = this.create()) {
    this._cards = cards
  }

  cards() {
    return this._cards
  }

  create() {
    const cards = []
    Deck.SUITS.forEach(suit => {
      Deck.RANKS.forEach(rank => {
        cards.push(new Card(rank, suit))
      })
    })
    return cards
  }

  shuffle() {
    for (let i = this.cards().length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = this.cards()[i]
      this.cards()[i] = this.cards()[j]
      this.cards()[j] = temp
    }
  }
}