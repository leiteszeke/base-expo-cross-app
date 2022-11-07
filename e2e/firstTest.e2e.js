describe('Testing Login Screen', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    if (process.env.NODE_ENV === 'local') {
      await device.reloadReactNative()
    }
  })

  it('should have login screen', async () => {
    await expect(element(by.id('login-text'))).toBeVisible()
  })

  it('should show login text', async () => {
    await expect(element(by.text('Login'))).toBeVisible()
  })
})
