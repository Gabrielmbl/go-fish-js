beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          const player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          };
        }
      };
    }
  });

  jasmine.addMatchers({
    toMatchHTMLContent: () => {
      return {
        compare: function(actual, expectedRegex) {
          const result = {}
          result.pass = expectedRegex.test(actual)
          if (result.pass) {
            result.message = `Expected HTML content to match the regular expression ${expectedRegex}`
          } else {
            result.message = `Expected HTML content to match the regular expression ${expectedRegex}, but it did not`
          }
          return result
        }
      }
    }
  })
});
