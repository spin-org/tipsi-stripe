import test from 'tape-async'
import helper from 'tipsi-appium-helper'

const { driver, select, idFromXPath, idFromAccessId } = helper

test('Test if user can use Custom Bank Account params', async(t) => {
  const bankAccountFormTabId = select({
    ios: idFromXPath('//*/XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeOther[5]'),
    android: idFromAccessId('headerTab_4'),
  })
  const bankAccountFormButtonId = idFromAccessId('customBankAccountButton')
  const tokenId = idFromAccessId('customBankAccountToken')

  try {
    await driver.waitForVisible(bankAccountFormTabId, 70000)
    await driver.click(bankAccountFormTabId)

    await driver.waitForVisible(bankAccountFormButtonId, 10000)

    t.pass('User should see `Pay with custom params` button')

    await driver.click(bankAccountFormButtonId)

    t.pass('User should be able to tap on `Pay with custom params` button')

    await driver.waitForVisible(tokenId, 500000)

    t.pass('User should see token')
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})
