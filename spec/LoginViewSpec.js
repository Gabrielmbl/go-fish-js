describe('LoginView', function () {
  let container

  beforeEach(function() {
    container = document.createElement('div')
    container.id = 'main'
    document.body.appendChild(container)
  })

  afterEach(function() {
    document.body.removeChild(container)
  })


  it('should show a form', function () {
    const loginView = new LoginView(() => {})
    loginView.draw(container)

    const form = container.querySelector('form')
    expect(form).not.toBeNull()

    const label = form.querySelector('label')
    expect(label).not.toBeNull()

    const input = form.querySelector('input[type="text"]')
    expect(input).not.toBeNull()

    const numberOfPlayers = form.querySelector('input[type="number"]')
    expect(input).not.toBeNull()

    const button = form.querySelector('input[type="submit"]')
    expect(button).not.toBeNull()
  })
})
