class Book {
  constructor(...cards) {
    this._cards = cards
  }

  cards() {
    return this._cards
  }
}