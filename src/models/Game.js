class Game {
  static INITIAL_HAND_SIZE = 7

  constructor(players, deck = new Deck()) {
    this._players = players
    this._deck = deck
    this._currentPlayer = players[0]
    this._playersWithHighestNumberOfBooks = []
    this._gameWinners = []
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

  setPlayers(players) {
    this._players = players
  }
  
  setDeck(deck) {
    this._deck = deck
  }
  
  setCurrentPlayer(player) {
    this._currentPlayer = player
  }
  
  isItHumanPlayerTurn() {
    return this.currentPlayer() === this.players()[0]
  }

  deal() {
    this.deck().shuffle()
    this.players().forEach(player => {
      for (let i = 0; i < Game.INITIAL_HAND_SIZE; i++) {
        player.addToHand([this.deck().cards().pop()])
      }
    })
  }

  playRound(opponentName, rank) {
    if (!(this.currentPlayerHasCards())) return null
    const opponent = this.setOpponent(opponentName)
    if (opponent.handHasRanks(rank)) {
      this.moveCardsFromOpponentToCurrentPlayer(opponent, rank)
    } else {
      this.handleGoFish(rank)
    }
    this.finalizeTurn()
  }

  currentPlayerHasCards() {
    if (this.currentPlayer().hand().length === 0) {
      this.switchPlayers()
      return false
    }
    return true
  }
  
  finalizeTurn() {
    this.currentPlayer().checkForBooks()
    this.checkForWinner()
    if (this.gameWinners().length > 0) return
    this.checkEmptyHandOrDraw()
    while (!this.isItHumanPlayerTurn() && this.currentPlayer().hand().length > 0) this.botTakeTurn()
  }

  checkEmptyHandOrDraw() {
    if (this.players().every(player => player.hand().length > 0)) return

    this.players().forEach(player => {
      if (player.hand().length === 0) {
        while (this.deck().cards().length > 0 && player.hand().length < Game.INITIAL_HAND_SIZE) {
          player.addToHand([this.deck().cards().pop()])
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
    // TODO: Make .cards().length its own method deckEmpty() on Deck 
    if (this.deck().cards().length === 0) {
      this.switchPlayers()
      return
    }

    const card = this.fishForCard()
    if (card.rank() !== rank) {
      this.switchPlayers()
    }
  }

  fishForCard() {
    // TODO: Have method to call pop on deck ->.cards().pop()
    // TODO: Play game all the way
    const card = this.deck().cards().pop()
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
    if (!(this.deck().cards().length === 0)) return null

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