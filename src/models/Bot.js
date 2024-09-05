class Bot extends Player {
  constructor(name) {
    super(name)
  }

  getRandomRank() {
    const randomIndex = Math.floor(Math.random() * this.hand.length)
    return this.hand[randomIndex].rank
  }

  getRandomOpponent(players) {
    const opponents = players.filter(player => player !== this)
    const randomIndex = Math.floor(Math.random() * opponents.length)
    return opponents[randomIndex]
  }
}