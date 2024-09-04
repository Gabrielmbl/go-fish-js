describe('LoginView', function () {
  let container
  let params

  beforeEach(function() {
    container = document.createElement('div')
    container.id = 'main'
    document.body.appendChild(container)
    params = {}
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

  it ('should store the name and number of players when the form is submitted', function () {
    const callBackFunction = (name, opponentCount) => {
      params = { name, opponentCount }
    }

    const loginView = new LoginView(callBackFunction)
    loginView.draw(container)

    const form = container.querySelector('form')
    const submitButton = form.querySelector('input[type="submit"]')
    form.querySelector('.name').value = 'gabriel'
    form.querySelector('.number-of-opponents').value = 2
    expect(params).toEqual({})

    submitButton.click();

    expect(params).toEqual({name: 'gabriel', opponentCount: '2'})
  })
})
