class Game {
  static INITIAL_HAND_SIZE = 7

  constructor(players) {
    this.players = players
    this.deck = new Deck()
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
      this._moveCardsFromOpponentToPlayer(player, opponent, rank)
    } else {
      player.hand.push(this.deck.cards.pop())
    }
  }

  _moveCardsFromOpponentToPlayer(player, opponent, rank) {
    const cards = opponent.hand.filter(card => card.rank === rank)
    player.addToHand(cards)
    opponent.removeByRank(rank)
  }
}