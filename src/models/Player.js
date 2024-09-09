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

  checkForBooks() {
    const rankCounts = this.rankCountMap()
  
    Object.keys(rankCounts).forEach(rank => {
      if (rankCounts[rank] === 4) {
        const book = this.hand().filter(card => card.rank() === rank)
        this.addToBooks(new Book(...book))
        this.removeByRank(rank)
      }
    })
  }
  

  rankCountMap() {
    const rankCounts = {}

    this.hand().forEach(card => {
      const rank = card.rank()
      rankCounts[rank] = (rankCounts[rank] || 0) + 1
    })
    return rankCounts
  }

  removeByRank(rank) {
    const newHand = this.hand().filter(card => card.rank() !== rank)
    this.setHand(newHand)
  }

  score() {
    return this.books().reduce((total, book) => total + book.value(), 0)
  }
}