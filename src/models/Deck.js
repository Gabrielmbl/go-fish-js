class Deck {
  static SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
  static RANKS = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
  constructor() {
    this.cards = []
    this.create()
  }

  create() {
    Deck.SUITS.forEach(suit => {
      Deck.RANKS.forEach(rank => {
        this.cards.push(new Card(rank, suit))
      })
    })
  }

  shuffle() {
    this.cards.sort(() => Math.random() - 0.5)
  }
}