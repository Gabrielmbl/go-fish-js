class Game {
  static INITIAL_HAND_SIZE = 7

  constructor(players) {
    this.players = players
    this.deck = new Deck()
    this.currentPlayer = players[0]
  }

  isItHumanPlayerTurn() {
    return this.currentPlayer === this.players[0]
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
    ({ player, opponent } = this.setPlayerAndOpponent(player, opponent))
    if (opponent.handHasRanks(rank)) {
      this.moveCardsFromOpponentToPlayer(player, opponent, rank)
    } else {
      this.handleGoFish(rank)
    }
  }

  setPlayerAndOpponent(player, opponent) {
    player = this.players.find(p => p.name === player)
    opponent = this.players.find(p => p.name === opponent)
    return { player, opponent }
  }

  moveCardsFromOpponentToPlayer(player, opponent, rank) {
    const cards = opponent.hand.filter(card => card.rank === rank)
    player.addToHand(cards)
    opponent.removeByRank(rank)
  }

  switchPlayers() {
    const currentPlayerIndex = this.players.indexOf(this.currentPlayer)
    const nextPlayerIndex = (currentPlayerIndex + 1) % this.players.length
    this.currentPlayer = this.players[nextPlayerIndex]
  }

  handleGoFish(rank) {
    const card = this.fishForCard()
    if (card.rank !== rank) {
      this.switchPlayers()
    }
  }

  fishForCard() {
    const card = this.deck.cards.pop()
    this.currentPlayer.addToHand(card)
    return card
  }

  botTakeTurn() {
    const bot = this.currentPlayer
    const opponent = bot.getRandomOpponent(this.players)
    const rank = bot.getRandomRank()
    this.playRound(bot.name, opponent.name, rank)
  }
}