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
}