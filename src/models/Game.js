class Game {
  static INITIAL_HAND_SIZE = 7

  constructor(player, numberBots = 1, deck = new Deck()) {
    this._players = [player, ...this.createBots(numberBots)]
    this._deck = deck
    this._currentPlayer = player
    this._playersWithHighestNumberOfBooks = []
    this._gameWinners = []
    this._roundResults = []
    this._roundPlayer = null
  }

  players() {
    return this._players
  }

  deck() {
    return this._deck
  }

  currentPlayer() {
    return this._currentPlayer
  }

  playersWithHighestNumberOfBooks() {
    return this._playersWithHighestNumberOfBooks
  }

  gameWinners() {
    return this._gameWinners
  }

  roundResults() {
    return this._roundResults
  }

  roundPlayer() {
    return this._roundPlayer
  }

  setPlayers(players) {
    this._players = players
  }
  
  setDeck(deck) {
    this._deck = deck
  }
  
  setCurrentPlayer(player) {
    this._currentPlayer = player
  }

  createBots(numberBots) {
    const bots = Array.from({ length: numberBots }, (_, i) => new Bot(`Bot ${i + 1}`))
    return bots
  }
  
  isItHumanPlayerTurn() {
    return this.currentPlayer() === this.players()[0]
  }

  deal() {
    this.deck().shuffle()
    this.players().forEach(player => {
      for (let i = 0; i < Game.INITIAL_HAND_SIZE; i++) {
        player.addToHand([this.deck().popCard()])
      }
    })
  }

  playRound(opponentName, rank) {
    if (!(this.currentPlayerHasCards())) return

    var { opponent, cardFished } = this.setVariablesForPlayRound(opponentName)
    if (opponent.handHasRanks(rank)) {
      this.moveCardsFromOpponentToCurrentPlayer(opponent, rank)
    } else {
      cardFished = this.handleGoFish(rank)
    }
    this.finalizeTurn(opponentName, rank, cardFished)
  }

  setVariablesForPlayRound(opponentName) {
    this._roundPlayer = this.currentPlayer()
    let cardFished = null
    const opponent = this.setOpponent(opponentName)
    return { opponent, cardFished }
  }

  currentPlayerHasCards() {
    if (this.currentPlayer().handEmpty()) {
      this.switchPlayers()
      return false
    }
    return true
  }
  
  finalizeTurn(opponentName, rank, cardFished) {
    const booksMade = this.roundPlayer().checkForBooks()
    this.checkForWinner()
    this.checkEmptyHandOrDraw()
    this.createRoundResult(opponentName, rank, cardFished, booksMade)
    while (!this.isItHumanPlayerTurn() && this.currentPlayer().hand().length > 0) this.botTakeTurn()
  }

  createRoundResult(opponentName, rank, cardFished, booksMade) {
    const roundResult = new RoundResult({playerName: this.roundPlayer().name(), opponentName: opponentName, rankAsked: rank, cardFished: cardFished, booksMade: booksMade, gameWinners: this.gameWinners()})
    this.roundResults().push(roundResult)
  }

  checkEmptyHandOrDraw() {
    if (this.players().every(player => player.hand().length > 0) || this.gameWinners().length > 0) return

    this.players().forEach(player => {
      if (player.hand().length === 0) {
        while (this.deck().cards().length > 0 && player.hand().length < Game.INITIAL_HAND_SIZE) {
          player.addToHand([this.deck().popCard()])
        }
      }
    })
  }

  setOpponent(opponentName) {
    const opponent = this.players().find(p => p.name() === opponentName)
    return opponent
  }

  moveCardsFromOpponentToCurrentPlayer(opponent, rank) {
    const cards = opponent.hand().filter(card => card.rank() === rank)
    this.currentPlayer().addToHand(cards)
    opponent.removeByRank(rank)
  }

  switchPlayers() {
    const currentPlayerIndex = this.players().indexOf(this.currentPlayer())
    const nextPlayerIndex = (currentPlayerIndex + 1) % this.players().length
    this.setCurrentPlayer(this.players()[nextPlayerIndex])
  }

  handleGoFish(rank) {
    if (this.deck().deckEmpty()) {
      this.switchPlayers()
      return
    }

    const card = this.fishForCard()
    if (card.rank() !== rank) {
      this.switchPlayers()
    }
    return card
  }

  fishForCard() {
    const card = this.deck().popCard()
    this.currentPlayer().addToHand(card)
    return card
  }

  botTakeTurn() {
    const bot = this.currentPlayer()
    const opponent = bot.chooseRandomOpponent(this.players())
    const rank = bot.chooseRandomRank()
    this.playRound(opponent.name(), rank)
  }

  checkForWinner() {
    if (!(this.deck().deckEmpty())) return null

    if (this.players().some(player => player.hand().length > 0)) return null
    const maxNumberOfBooks = Math.max(...this.players().map(player => player.books().length))
    const playersWithMaxBooks = this.players().filter(player => player.books().length === maxNumberOfBooks)
    this.playersWithHighestNumberOfBooks().push(...playersWithMaxBooks)
    this.compareBookValues()
  }

  compareBookValues(playersWithHighestNumberOfBooks = this.playersWithHighestNumberOfBooks()) {
    const highestBookScore = Math.max(...playersWithHighestNumberOfBooks.map(player => player.score()))
    const winners = playersWithHighestNumberOfBooks.filter(player => player.score() === highestBookScore)
    this.gameWinners().push(...winners)
  }


  // createRoundResult(roundPlayer = currentPlayer, opponent, cardRank, bookRank, gameWinnerNames) {
  //   roundResults.push(new RoundResult())
  // }
}