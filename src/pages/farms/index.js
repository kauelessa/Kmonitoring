import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import style from './styles'
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import SideMenu from 'react-native-side-menu' 
import icon from '../../images/icon_menu.jpg'; 
import logo from '../../images/Grupo_633.png';
import api from '../../services/api';
import Containers from '../../components/Containers'
import Card from '../../components/VisitCards'

export default class Farm extends Component{

  async componentDidMount()
  {
    await this.loadData()
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
    open: false,
    errors:[],
    visitas:[],
    cards:[],
  }
    
  loadData = async () => 
  {
    var _visitas = JSON.parse(await AsyncStorage.getItem('@data:jsonVisitas'))

    // console.log(_visitas.visitas.length)
    if (_visitas != null)
      this.setState({visitas:_visitas.visitas})
    // console.log(this.state.visitas)
  };

  loadVisitCards(visita)
  {  
    // console.log(this.state.visitas.length)
     return <Card 
              key={visita.id}
              VisitPress={this.onPressFarmCard}
              NomeAgricultor={visita.nm_agricultor}
              NomeRtv={visita.nm_representante}
              NomePropriedade={visita.fazendas[0].nm_fazenda}
              DataHoraVisita={visita.fazendas[0].dt_agendamento +' - '+ visita.fazendas[0].hr_agendamento}
              NumVisita={visita.code}
              Cpf={visita.cpf_cnpj_agricultor}
              NomeOperacao={visita.nm_operacao}
              EnderecoPropriedade={visita.fazendas[0].endereco}
              StatusVisita='AGENDADA'
            />   
  }

  onPressFarmCard = async ()=>
  {
    console.log()
    // await AsyncStorage.setItem('@data:visita:id_visita', this.state.idVisita)
    // await AsyncStorage.setItem('@data:visita:status', this.state.statusVisita)
    
    // this.props.navigation.navigate('EquipmentInstalation') 
  }

  handleMenuPress = async (open)=>
  {
    console.log('Apertou')
    this.setState({open})
  }

  exportData = async (url,object) =>
  {
    try
    {
      var errors=[];
      var userdata = JSON.parse(await AsyncStorage.getItem('token'));
      var AUTH_TOKEN = userdata.user.token.replace(/"/g,'');   

      api.defaults.headers['Authorization'] ='Bearer ' + AUTH_TOKEN;

      await api.post
      (
        url, 
        JSON.stringify(object)
      )
      .then(async function (response) 
      {
          console.log(response);
          await AsyncStorage.setItem('@exportLog', JSON.stringify(response.data));
      })
      .catch(async function (error) 
      {
          errors = error.message;

          if (error.response) {
              // The request was made, but the server responded with a status code
              // that falls out of the range of 2xx
              await AsyncStorage.setItem('@exportLogError', JSON.stringify(error.response));

              console.log(error.response.status);
              console.log(error.response.headers);
              console.log(error.response.data);

              // throw('Erro do servidor. Código: '+error.response.status)
          } else if (error.request) {
              // await AsyncStorage.setItem('@exportLogError', JSON.stringify(error));
              throw error.request.message;
          } else {
              // throw error.message;
          }

          throw error
      });
      // console.log(response)
    }
    catch
    {
      this.setState({errors})
      // alert(JSON.stringify(errors))
    }
  }

  onPressExportarDados = async () =>
  {
    var _errors=[];
    const temp = await AsyncStorage.getItem('@equipments');
    var Equipments = []; 
      
    if (temp != null)
    {
      Equipments = JSON.parse(temp)
      // console.log('var Equipments:',Equipments)

      for(let i=0;i<Equipments.length;i++)
      {
        this.setState({errors:null})
        
        console.log(JSON.stringify(Equipments[i]))
        await this.exportData('/Equipamentoes',Equipments[i])
        
        if(this.state.errors != null)
        {
          _errors.push(this.state.errors)
        }
      }

      if(_errors.length > 0)
      {
        console.log(_errors)
        alert("Ocorreu um erro ao processar sua solicitação:\n"+_errors.toString())
      }
      else
      {
        alert('Dados exportados com sucesso');
        await AsyncStorage.removeItem('@equipments');
      }

      this.setState({errors:null})
    }
    else
      alert('Não há dados a serem exportados!')

    
  }

  logout = async () =>
  {
    Alert.alert
      (
        'Sair',
        'Tem certeza que deseja sair? Você precisará de uma conexão com a internet caso deseje se conectar de novo.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Operação de sair cancelada'),
          style: "cancel"
        },
        {
          text: 'Sair',
          onPress: this.signOut
        }
      ],
      { cancelable: false}
    );  
  }

  signOut = async () =>
  {
    await AsyncStorage.removeItem('@user:token')
    await this.props.navigation.navigate('SignIn');    
  }

  clearDatabase = async () =>
  {
    await AsyncStorage.clear();
    await this.props.navigation.navigate('SignIn');
  }

  refreshToken = async ()=>
  {
    try
    {
      var errorMessage=[];
      var User = await AsyncStorage.getItem('@User:model')
      // var User = JSON.parse(UserTemp)

      await api.post('/Users/Login', User)
      .then(async function (response) 
      {
          console.log(response);
          await AsyncStorage.setItem('token', JSON.stringify(response.data));
          alert('Token renovado com sucesso!');
      })
      .catch(function (error) 
      {
          errorMessage = error.message;

          if (error.response) {
              alert(JSON.stringify(error.response.data))
              throw error
          } else if (error.request) {
              throw error;
          } else {
              throw error.message;
          }
      });
    }
    catch
    {
      if(errorMessage != '')
      {
        await AsyncStorage.setItem('@ErrorRefreshToken', errorMessage)
        // alert('Ocorreu um erro ao processar sua solicitação:\n',errorMessage.toString());
      }
    }
  }

  render(){ 
    return (
      <View style={style.containerSuperior}>
        <SideMenu 
            menu={<Containers Token={this.refreshToken} Exportar={this.onPressExportarDados} Logout={this.logout}/>}
            isOpen={this.state.open}
        >
            <View style={style.container}>

              <View style={style.ViewTop}>
                {/* <TextInput style={style.Input}
                      placeholder="Buscar (Nome cliente / propriedade, endereço, nº pedido / visita)"
                      // value={this.state.email}
                      // onChangeText={this.handleEmailChange}
                      autoCapitalize="none"
                      autoCorrect={false}
                  /> */}
              </View>

              <View style={style.ViewTitle}>
                <Image style={style.Logo} source={logo} resizeMode='contain'/>
                <TouchableOpacity style={style.HamburgerButton} onPress={this.handleMenuPress}>
                    <Image style={style.HamburgerImage} source={icon} resizeMode='contain'/>
                </TouchableOpacity>
              </View>
              <View style={style.ViewInterna}>
                {
                  this.state.visitas.map(v => {return this.loadVisitCards(v)})
                }
              </View>
              <View style={style.ViewBottom}>
                
              </View>
            </View>
        </SideMenu>
      </View>
    );
  }
}