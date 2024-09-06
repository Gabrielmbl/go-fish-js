class Game {
  static INITIAL_HAND_SIZE = 7

  constructor(players, deck = new Deck()) {
    this._players = players
    this._deck = deck
    this._currentPlayer = players[0]
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

  setPlayers(players) {
    this._players = players
  }
  
  setDeck(deck) {
    this._deck = deck
  }
  
  setCurrentPlayer(player) {
    this._currentPlayer = player
  }
  
  // TODO: use this.constructor() all around
  // TODO: Have bot to play automatically after switching turns

  isItHumanPlayerTurn() {
    return this.currentPlayer() === this.players()[0]
  }

  deal() {
    this.deck().shuffle()
    this.players().forEach(player => {
      for (let i = 0; i < Game.INITIAL_HAND_SIZE; i++) {
        player.addToHand([this.deck().cards.pop()])
      }
    })
  }

  playRound(opponentName, rank) {
    const opponent = this.setOpponent(opponentName)
    if (opponent.handHasRanks(rank)) {
      this.moveCardsFromOpponentToCurrentPlayer(opponent, rank)
    } else {
      this.handleGoFish(rank)
    }
    // TODO: Call playround until it's not a bot 
  }

  setOpponent(opponentName) {
    const opponent = this.players().find(p => p.name() === opponentName)
    return opponent
  }

  moveCardsFromOpponentToCurrentPlayer(opponent, rank) {
    const cards = opponent.hand().filter(card => card.rank === rank)
    this.currentPlayer().addToHand(cards)
    opponent.removeByRank(rank)
  }

  switchPlayers() {
    const currentPlayerIndex = this.players().indexOf(this.currentPlayer())
    const nextPlayerIndex = (currentPlayerIndex + 1) % this.players().length
    this.setCurrentPlayer(this.players()[nextPlayerIndex])
  }

  handleGoFish(rank) {
    const card = this.fishForCard()
    if (card.rank !== rank) {
      this.switchPlayers()
    }
  }

  fishForCard() {
    const card = this.deck().cards.pop()
    this.currentPlayer().addToHand(card)
    return card
  }

  botTakeTurn() {
    const bot = this.currentPlayer()
    const opponent = bot.chooseRandomOpponent(this.players())
    const rank = bot.chooseRandomRank()
    this.playRound(opponent.name(), rank)
  }

  // createRoundResult(roundPlayer = currentPlayer, opponent, cardRank, bookRank, gameWinnerNames) {
  //   roundResults.push(new RoundResult())
  // }
}