class RoundResult {
  constructor({ playerName, opponentName, rankAsked, cardFished = null, booksMade, gameWinners = [] }) {
    this._playerName = playerName
    this._opponentName = opponentName
    this._rankAsked = rankAsked
    this._cardFished = cardFished
    this._booksMade = booksMade
    this._gameWinners = gameWinners
  }

  playerName() {
    return this._playerName
  }

  opponentName() {
    return this._opponentName
  }

  rankAsked() {
    return this._rankAsked
  }

  cardFished() {
    return this._cardFished
  }

  booksMade() {
    return this._booksMade
  }

  gameWinners() {
    return this._gameWinners
  }

  describeAskAction() {
    return `${this.playerName()} asked ${this.opponentName()} for ${this.rankAsked()}s`
  }

  describeFishResult() {
    if (this.cardFished()) {
      return ` and fished a ${this.cardFished().rank()} of ${this.cardFished().suit()}`
    } else {
      return ` and took ${this.rankAsked()}s from ${this.opponentName()}`
    }
  }

  describeBooksMade() {
    if (this.booksMade().length > 0) {
      const bookRanks = this.booksMade().map(rank => `${rank}s`)
      return ` ${this.playerName()} made books of ${bookRanks.join(', ')}.`
    } else {
      return ''
    }
  }

  displayResult() {
    return `${this.describeAskAction()}${this.describeFishResult()}.${this.describeBooksMade()}`
  }
}
