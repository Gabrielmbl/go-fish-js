class Game {
  static INITIAL_HAND_SIZE = 7

  constructor(players) {
    this.players = players
    this.deck = new Deck()
    this.currentPlayer = players[0]
  }

  deal() {
    this.deck.shuffle()
    this.players.forEach(player => {
      for (let i = 0; i < Game.INITIAL_HAND_SIZE; i++) {
        player.hand.push(this.deck.cards.pop())
      }
    })
  }

  playRound(player, opponent, rank) {
    opponent = this.players.find(player => player.name === opponent)
    if (opponent.handHasRanks(rank)) {
      this.moveCardsFromOpponentToPlayer(player, opponent, rank)
    } else {
      this.handleGoFish(rank)
    }
  }

  moveCardsFromOpponentToPlayer(player, opponent, rank) {
    const cards = opponent.hand.filter(card => card.rank === rank)
    player.addToHand(cards)
    opponent.removeByRank(rank)
  }

  switchPlayers() {
    const currentPlayerIndex = this.players.indexOf(this.currentPlayer)
    const nextPlayerIndex = (currentPlayerIndex + 1) % this.players.length
    this.currentPlayer = this.players[nextPlayerIndex]
  }

  handleGoFish(rank) {
    const card = this.fishForCard()
    if (card.rank !== rank) {
      this.switchPlayers()
    }
  }

  fishForCard() {
    const card = this.deck.cards.pop()
    this.currentPlayer.addToHand(card)
    return card
  }
}