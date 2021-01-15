import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import style from './styles'
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import icon from '../../images/icon_menu.jpg'; 
import logo from '../../images/Grupo_633.png';

export default class ConfirmData extends Component{

  async componentDidMount()
  {
    // await this.loadData()
    // var visit = this.props.navigation.state.params;
    var visita = JSON.parse( await AsyncStorage.getItem('@data:visita'))
    
    // console.log(visit)
    // console.log(visita)
  }

  static navigationOptions = {
    headerShown: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    errors:[],
  }
    
  loadData = async () => 
  {
    
  };

  onPressConfirm = async ()=>
  {
    console.log()
    // await AsyncStorage.setItem('@data:visita:id_visita', this.state.idVisita)
    // await AsyncStorage.setItem('@data:visita:status', this.state.statusVisita)
    
    // this.props.navigation.navigate('EquipmentInstalation') 
  }

  render(){ 
    return (
      <View style={style.containerSuperior}>
        
        <View style={style.container}>

          <View style={style.ViewTop}>
            <TextInput style={style.Input}
                  placeholder="Buscar (Nome cliente / propriedade, endereço, nº pedido / visita)"
                  // value={this.state.email}
                  // onChangeText={this.handleEmailChange}
                  autoCapitalize="none"
                  autoCorrect={false}
              />
          </View>

          <View style={style.ViewTitle}>
            <Image style={style.Logo} source={logo} resizeMode='contain'/>
            <TouchableOpacity style={style.HamburgerButton} onPress={this.handleMenuPress}>
                <Image style={style.HamburgerImage} source={icon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          <View style={style.ViewInterna}>
            {
              // this.state.visitas.map(v => {return this.loadVisitCards(v)})
            }
          </View>
          <View style={style.ViewBottom}>
            
          </View>
        </View>
        
      </View>
    );
  }
}