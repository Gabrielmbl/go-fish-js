class LoginView {
  constructor(onSubmit) {
    this.onSubmit = onSubmit
  }

  draw(container) {
    container.innerHTML = `
      <form id="login-form">
        <label for="name">Name:</label>
        <input type="text" class="name" name="name" required>
        <label for="number-of-players">Number of Players:</label>
        <input type="number" class="number-of-players" name="number-of-players" required>
        <input type="submit" value="Start Game">
      </form>
    `
    container.querySelector('form').addEventListener('submit', this.onSubmitForm.bind(this))
  }

  onSubmitForm(event) {
    event.preventDefault()
    const name = event.target.querySelector('.name').value
    const numberOfPlayers = event.target.querySelector('.number-of-players').value
    this.onSubmit(name, numberOfPlayers)
  }
}