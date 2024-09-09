class Book {
  constructor(...cards) {
    this._cards = cards
  }

  cards() {
    return this._cards
  }

  value() {
    return this.cards()[0].numericalRank()
  }
}