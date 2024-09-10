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

  handEmpty() {
    return this.hand().length === 0
  }

  checkForBooks() {
    const rankCounts = this.rankCountMap()
    let booksMade = []
  
    this.makeBook(rankCounts, booksMade)
    return booksMade
  }

  makeBook(rankCounts, booksMade) {
    Object.keys(rankCounts).forEach(rank => {
      if (rankCounts[rank] === 4) {
        const book = this.hand().filter(card => card.rank() === rank)
        this.addToBooks(new Book(...book))
        booksMade.push(rank)
        this.removeByRank(rank)
      }
    })
  }

  chooseRandomRank() {
    const randomIndex = Math.floor(Math.random() * this.hand().length)
    return this.hand()[randomIndex].rank()
  }

  chooseRandomOpponent(players) {
    const opponents = players.filter(player => player !== this)
    const randomIndex = Math.floor(Math.random() * opponents.length)
    return opponents[randomIndex]
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