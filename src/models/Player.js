class Player {
  constructor(name) {
    this.name = name
    this.hand = []
    this.books = []
  }

  handHasRanks(rank) {
    return this.hand.some(card => card.rank === rank)
  }

  addToHand(cards) {
    this.hand = this.hand.concat(cards)
  }

  removeByRank(rank) {
    this.hand = this.hand.filter(card => card.rank !== rank)
  }
}