class Bot extends Player {
  constructor(name, memory = {}) {
    super(name)
    this._memory = memory
  }

  memory() {
    return this._memory
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

  updateMemory(roundResult) {
    const { roundPlayer, opponentName, rank, booksMadeArrayIntegers } = this.setVariablesForMemory(roundResult)
    this.createMemory(roundPlayer, opponentName)

    this.memory()[roundPlayer].push(rank)

    if (roundResult.cardFished() === null) this.memory()[opponentName] = this.memory()[opponentName].filter(memoryRank => memoryRank !== rank)

    if (this.memory()[roundPlayer].some(memoryRank => booksMadeArrayIntegers.includes(memoryRank))) this.memory()[roundPlayer] = this.memory()[roundPlayer].filter(memoryRank => !booksMadeArrayIntegers.includes(memoryRank))
  }

  setVariablesForMemory(roundResult) {
    const roundPlayer = roundResult.playerName()
    const opponentName = roundResult.opponentName()
    const rank = roundResult.rankAsked()
    const booksMadeArrayIntegers = roundResult.booksMade().map(rank => rank)
    return { roundPlayer, opponentName, rank, booksMadeArrayIntegers }
  }

  createMemory(roundPlayer, opponentName) {
    if (!this.memory()[roundPlayer]) {
      this.memory()[roundPlayer] = []
    }
    if (!this.memory()[opponentName]) {
      this.memory()[opponentName] = []
    }
  }

  chooseRankAndOpponentFromMemory(players, difficulty) {
    if (difficulty === 'medium') this.shortenMemory()
    const myRanks = this.hand().map(card => card.rank())
    const opponent = players.find(opponent => opponent !== this && (this.memory()[opponent.name()] || []).some(rank => myRanks.includes(rank)))
    const rank = opponent ? this.memory()[opponent.name()].find(rank => myRanks.includes(rank)) : this.chooseRandomRank()
    return { rank, opponent: opponent || this.chooseRandomOpponent(players) }
  }

  shortenMemory() {
    for (let player in this.memory()) {
      this.memory()[player] = this.memory()[player].slice(-2)
    }
  }
}