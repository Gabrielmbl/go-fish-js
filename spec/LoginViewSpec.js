describe('LoginView', () => {
  let container
  let params

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'main'
    document.body.appendChild(container)
    params = {}
  })

  afterEach(() => {
    document.body.removeChild(container)
  })


  it('should show a form', () => {
    const loginView = new LoginView(() => { })
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

  it('should store the name and number of opponents when the form is submitted', () => {
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

    expect(params).toEqual({ name: 'gabriel', opponentCount: '2' })
  })

  describe('validations', () => {
    let submitButton
    let nameInput
    let numberOfOpponentsInput

    beforeEach(() => {
      const callBackFunction = (name, opponentCount) => {
        params = { name, opponentCount }
      }

      const loginView = new LoginView(callBackFunction)
      loginView.draw(container)

      const form = container.querySelector('form')
      submitButton = form.querySelector('input[type="submit"]')
      nameInput = form.querySelector('.name')
      numberOfOpponentsInput = form.querySelector('.number-of-opponents')
    })
    
    

    it('should ensure that the name is not empty', () => {
      nameInput.value = ''
      numberOfOpponentsInput.value = 2
      expect(params).toEqual({})

      submitButton.click();

      expect(params).toEqual({})
    })

    it('should ensure that the number of opponents is within 1-8', () => {
      nameInput.value = 'gabriel'
      numberOfOpponentsInput.value = 0
      expect(params).toEqual({})

      submitButton.click();

      expect(params).toEqual({})
    })

  })

})
