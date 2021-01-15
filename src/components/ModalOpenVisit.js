import React, { Component } from 'react';
import { View, StyleSheet, Modal, Button, Text } from 'react-native';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {isVisible: false};
  }

  render () {
    return(
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            this.setState({ isVisible: false });
          }}
        >

          <View style={styles.modal}>
            <Text style={styles.text}>MODAL ESTÁ ABERTO!</Text>
            <Button
              title="Clique Para Fechar Modal"
              onPress={() => {
                this.setState({ isVisible: false });
              }}
            />
          </View>
        </Modal>

        <Button
          title="Clique Para Abrir Modal"
          onPress={() => {
            this.setState({ isVisible: true });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ff00',
    padding: 100,
  },
  text: {
    color: '#000000',
    marginTop: 10,
  },
});