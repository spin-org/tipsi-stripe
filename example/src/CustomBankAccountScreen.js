import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import stripe from 'tipsi-stripe'
import Button from './Button'

export default class CustomBankAccountScreen extends Component {
  state = {
    loading: false,
    token: null,
    params: {
      accountNumber: '000123456789',
      country: 'US',
      currency: 'usd',
      routingNumber: '110000000',
      accountHolderName: 'Joshua Jones',
      accountHolderType: 'individual',
    },
  }

  handleCustomPayPress = async () => {
    try {
      this.setState({
        loading: true,
        token: null,
      })
      const token = await stripe.createTokenWithBankAccount(this.state.params)
      console.log('Result:', token) // eslint-disable-line no-console
      this.setState({
        loading: false,
        token,
      })
    } catch (error) {
      console.log('Error:', error) // eslint-disable-line no-console
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { loading, token, params } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Custom Bank Account Params Example
        </Text>
        <Text style={styles.instruction}>
          Mandatory
        </Text>
        <View style={styles.params}>
          <Text style={styles.instruction}>
            Account Number: {params.accountNumber}
          </Text>
          <Text style={styles.instruction}>
            Country: {params.country}
          </Text>
          <Text style={styles.instruction}>
            Currency: {params.currency.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.instruction}>
          Optional
        </Text>
        <View style={styles.params}>
          <Text style={styles.optionalParams}>
            Routing Number: {params.routingNumber}
          </Text>
          <Text style={styles.optionalParams}>
            Account Holder Name: {params.accountHolderName}
          </Text>
          <Text style={styles.optionalParams}>
            Account Holder Type: {params.accountHolderType}
          </Text>
        </View>
        <View
          accessible
          accessibilityLabel={'customBankAccountToken'}
          style={styles.token}>
          {token &&
            <Text style={styles.instruction}>
              Token: {token.tokenId}
            </Text>
          }
        </View>
        {!token &&
          <Text style={styles.instruction}>
            Click button to get token based on params.
          </Text>
        }
        <Button
          text="Pay with custom params"
          loading={loading}
          style={styles.button}
          accessible
          accessibilityLabel={'customBankAccountButton'}
          onPress={this.handleCustomPayPress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  optionalParams: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 2,
  },
  button: {
    margin: 10,
    borderWidth: 1,
  },
  token: {
    height: 20,
  },
  params: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'flex-start',
    margin: 5,
  },
})
