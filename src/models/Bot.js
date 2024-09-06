class Bot extends Player {
  constructor(name) {
    super(name)
  }

  chooseRandomRank() {
    const randomIndex = Math.floor(Math.random() * this.hand().length)
    return this.hand()[randomIndex].rank
  }

  chooseRandomOpponent(players) {
    const opponents = players.filter(player => player !== this)
    const randomIndex = Math.floor(Math.random() * opponents.length)
    return opponents[randomIndex]
  }
}