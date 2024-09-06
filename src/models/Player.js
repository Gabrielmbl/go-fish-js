class Player {
  constructor(name, hand = [], books = []) {
    this._name = name
    this._hand = hand
    this._books = books
  }

  name() {
    return this._name
  }

  hand() {
    return this._hand
  }

  books() {
    return this._books
  }

  setHand(hand) {
    this._hand = hand
  }

  setBooks(book) {
    this._books = book
  }

  handHasRanks(rank) {
    return this.hand().some(card => card.rank() === rank)
  }

  addToHand(cards) {
    this.setHand(this.hand().concat(cards))
  }

  addToBooks(book) {
    this.setBooks(this.books().concat(book))
  }

  removeByRank(rank) {
    const newHand = this.hand().filter(card => card.rank() !== rank)
    this.setHand(newHand)
  }
}