describe ('Player', () => {
  let player

  beforeEach(() => {
    player = new Player('Gabriel')
  })

  describe('handHasRanks', () => {
    it ('should return true if the player has the rank', () => {
      player.hand = [new Card('3', 'Hearts')]
      expect(player.handHasRanks('3')).toEqual(true)
    })

    it ('should return false if the player does not have the rank', () => {
      player.hand = [new Card('3', 'Hearts')]
      expect(player.handHasRanks('4')).toEqual(false)
    })
  })

  describe('addToHand', () => {
    it ('should add cards to the player hand', () => {
      player.addToHand([new Card('3', 'Hearts'), new Card('3', 'Clubs')])
      expect(player.hand.length).toEqual(2)
    })
  })

  describe ('removeByRank', () => {
    it ('should remove cards from the player hand by rank', () => {
      player.hand = [new Card('3', 'Hearts'), new Card('3', 'Clubs')]
      expect(player.hand.length).toEqual(2)
      player.removeByRank('3')
      expect(player.hand.length).toEqual(0)
    })
  })
})