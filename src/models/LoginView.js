class LoginView {
  constructor(onSubmitCallback) {
    this.onSubmitCallback = onSubmitCallback
  }

  draw(container) {
    container.innerHTML = `
      <form class="login-form">
        <label for="name">Name:</label>
        <input type="text" class="name" name="name" required>
        <label for="number-of-opponents">Number of Players:</label>
        <input type="number" class="number-of-opponents" name="number-of-opponents" min="1" max="8" required>
        <input type="submit" value="Start Game">
      </form>
    `
    const form = container.querySelector('.login-form')
    form.addEventListener('submit', function(event) {
      event.preventDefault()

      const name = form.querySelector('.name').value
      const opponentCount = form.querySelector('.number-of-opponents').value
      this.onSubmitCallback(name, opponentCount)
    }.bind(this))
  }
}