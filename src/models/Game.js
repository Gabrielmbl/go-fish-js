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
    const cards = opponent.hand.filter(card => card.rank === rank)
    if (cards.length > 0) {
      player.hand = player.hand.concat(cards)
      opponent.hand = opponent.hand.filter(card => card.rank !== rank)
    } else {
      player.hand.push(this.deck.cards.pop())
    }
  }
}