class LoginView {
  constructor(onSubmitCallback) {
    this.onSubmitCallback = onSubmitCallback
  }

  _renderSelect() {
    return `
    <label class="form-label" for="number-of-opponents">Number of Opponents</label>
    <select class="form-control form-control--large" id="number-of-opponents">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
    </select>
    `
  }

  _renderHeader() {
    return `
    <div class="app__header">
      <div class="navbar">
        <nav class="navbar__content navbar__content--justify-start">
          <span>Go Fish</span>
        </nav>
      </div>
    </div>
    `
  }

  _renderForm() {
    return `
    ${this._renderHeader()}
    <div class="flex justify-center full-height items-center">
      <form class="form-group login-container">
        <label class="form-label" for="player-name">Your name</label>
        <input type="Text" placeholder="Name" id="player-name" class="form-control form-control--large">
        ${this._renderSelect()}
        <input class="btn" type="submit" value="Start Game">
      </form>
    </div>
    `
  }

  draw(container) {
    container.innerHTML = `
      ${this._renderForm()}
    `

    const form = container.querySelector('.form-group')
    form.addEventListener('submit', function(event) {
      console.log('here')
      event.preventDefault()

      const name = form.querySelector('#player-name').value
      const opponentCount = form.querySelector('#number-of-opponents').value
      this.onSubmitCallback(name, opponentCount)
    }.bind(this))
  }
}