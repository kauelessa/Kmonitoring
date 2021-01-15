import React, { Component } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import style from './styles'
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import SideMenu from 'react-native-side-menu' 
import icon from '../../images/icon_menu.jpg'; 
import logo from '../../images/Grupo_633.png';
import api from '../../services/api';
import Containers from '../../components/Containers'
import Card from '../../components/VisitCards'

export default class Main extends Component{

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
    municipios: [],
    bairros: [],
    ruas: [],
    open: false,
    errors:[],
    visitas:[],
    cards:[],
    idVisita:'',
    statusVisita:'',
    isVisible: false,
    visita:[],
    startedVisits:{visitas:[]},
  }

  // const [selectedValue, setSelectedValue]
  setSelectedValueCity = (selectedValueCity) => 
  {
    this.setState({ selectedValueCity });
  };

  setSelectedValueNeighborhood = (selectedValueNeighborhood) =>
  {
    this.setState( {selectedValueNeighborhood} );
  }

  setSelectedValueAddress = (selectedValueAddress) => 
  {
    this.setState( {selectedValueAddress} );
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
    var status;
    if(visita.nm_coluna != 'Em Monitoramento')
    {
      status='AGENDADA'
    }
    else
    {
      status='EM ANDAMENTO'
    }

    if(visita.nm_coluna=='Em Correção')
    {
      status='EM CORREÇÃO'
    }

     return <Card 
              key={visita.id}
              VisitPress={ ()=>
                {
                  if(visita.nm_coluna != 'Em Monitoramento')
                  {
                    this.setState({ visita:visita })
                    // console.log('LOAD VISIT:',this.state.visita)
                    console.log(visita.nm_coluna)
                    this.setState({ isVisible: true })
                  }
                  else 
                  {
                    console.log(visita.nm_coluna)
                    
                    // console.log(visita)
                    this.iniciarVisita(visita)
                  }
                }
              }
              NomeAgricultor={visita.nm_agricultor}
              NomeRtv={visita.nm_representante}
              NomePropriedade={visita.fazendas[0].nm_fazenda}
              DataHoraVisita={visita.fazendas[0].dt_agendamento +' - '+ visita.fazendas[0].hr_agendamento}
              NumVisita={visita.code}
              Cpf={visita.cpf_cnpj_agricultor}
              NomeOperacao={visita.nm_operacao}
              EnderecoPropriedade={visita.fazendas[0].endereco}
              StatusVisita={status}
              //'AGENDADA'
            />   
  }

  loadNeighborhood = async (id) =>
  {
    var bairrosTemp = JSON.parse(await AsyncStorage.getItem('@bairros'))
    bairrosTemp = bairrosTemp.filter(b => b.iD_MUNICIPIO == id)
    if (bairrosTemp != null)
      this.setState({bairros:bairrosTemp})
  };

  loadAddress = async (id) =>
  {
    var ruasTemp = JSON.parse(await AsyncStorage.getItem('@ruas'))
    ruasTemp = ruasTemp.filter(b => b.iD_BAIRRO == id)
    if (ruasTemp != null)
      this.setState({ruas:ruasTemp})
  };

  onPressVisitCard = async (key)=>
  {
    console.log(key)
    // await AsyncStorage.setItem('@data:visita:id_visita', this.state.idVisita)
    // await AsyncStorage.setItem('@data:visita:status', this.state.statusVisita)
    
    this.props.navigation.navigate('ConfirmData',{data: ''}) 
  }

  handleMenuPress = async (open)=>
  {
    console.log('Apertou')
    this.setState({open})
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

  iniciarVisita = async (visita)=>
  {
    var started = JSON.parse(await AsyncStorage.getItem('@data:startedVisits'));
    var userdata = JSON.parse(await AsyncStorage.getItem('@user:data'));
    var AUTH_TOKEN = userdata.data.token.replace(/"/g,'');
    var fazendas=visita.fazendas.map(f => {return f.fazenda_id});

    var Json = {token:AUTH_TOKEN,propostas:[visita.id],fazendas:fazendas}

    // console.log(JSON.stringify(Json))

    if(started !== "undefined")
    {
      var startedVisit = started.startedVisits.visitas.find(s => s.id==visita.id)

      if (startedVisit.async_offline !== "undefined")
      {
        if(startedVisit.async_offline == 0)
        {
          
        }
      }
    }  
    //const id_bairro = this.state.ruas.find(r => r.id == id_rua).id_bairro;

    var response = await api.post('/api/propostas/confirm-received-on-tablet',JSON.stringify(Json)) 
                  .then(async function (response) {
                    if (typeof visita.async_offline === "undefined")
                      visita.async_offline = 0;
                    console.log(response);
                    return response;
                    })
                  .catch(function (error) {
                    if (error.response) {
                      // The request was made, but the server responded with a status code
                      // that falls out of the range of 2xx
                      console.log('Server Error!')
                      console.log('Response Status:',error.response.status);
                      console.log('Response Message:',error.response.data.message);
                      // console.log('Response Headers',error.response.headers);
                    } else {
                      // Something happened in setting up the request that triggered an Error
                      console.log('Error', error.message);
                      alert('Error 19: '+ error.message);
                    }
                    if (typeof visita.async_offline === "undefined")
                      visita.async_offline = 1;
                  });
    
    visita.iniciada = 1;
    console.log('INICIAR VISITA: ',visita)
    await AsyncStorage.setItem('@data:visita',JSON.stringify(visita))
    await AsyncStorage.setItem('@data:startedVisits',JSON.stringify(started))
    this.props.navigation.navigate('ConfirmData')
    this.setState({ isVisible: false }) 
  }



  render(){ 
    return (
      <View style={style.containerSuperior}>
        <SideMenu 
            menu={<Containers Token={this.refreshToken} Exportar={this.onPressExportarDados} Logout={this.logout}/>}
            isOpen={this.state.open}
        >
            <View style={style.container}>
              <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.state.isVisible}
                onRequestClose={() => {
                  this.setState({ isVisible: false });
                }}
              >
                <View style={style.containerModal}>

                  <View style={style.boxModal}>

                    <View style={style.titleModal}>
                      <Text style={style.text}>Deseja iniciar a visita?</Text>
                    </View>

                    <View style={style.buttonsModal}>                  
                      <TouchableOpacity
                          style={style.buttonModalWhite}
                          title="Cancelar"
                          onPress={() => {
                            this.setState({ isVisible: false });
                          }}
                        >
                          <Text style={{color:'rgb(00, 97, 74)'}}>Cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={style.buttonModalGreen}
                        title="Abrir"
                        onPress={
                          ()=>this.iniciarVisita(this.state.visita)
                        }
                      >
                        <Text style={{color:'#FFF'}}>Abrir</Text>
                      </TouchableOpacity>
                    </View>

                  </View>

                </View>
              </Modal>

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
                <ScrollView>
                  {
                    this.state.visitas.map(v => {return this.loadVisitCards(v)})
                  }
                </ScrollView>
              </View>
              <View style={style.ViewBottom}>
                
              </View>
            </View>
        </SideMenu>
      </View>
    );
  }
}