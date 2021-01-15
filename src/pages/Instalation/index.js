import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import style from './styles'
import { openDatabase } from 'react-native-sqlite-storage';
import Geolocation from '@react-native-community/geolocation';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

var db = openDatabase({ name: 'DatabaseCJC.db'});

export default class EquipmentInstalation extends Component{

  async componentDidMount()
  {
    this.state.temp = await AsyncStorage.getItem('tipoEquipamento');
    this.state.tipoEquipamento = JSON.parse(this.state.temp);

    this.state.temp = await AsyncStorage.getItem('tipoPoste');
    this.state.tipoPoste = JSON.parse(this.state.temp)

    this.state.temp = await AsyncStorage.getItem('tipoBraco');
    this.state.tipoBraco = JSON.parse(this.state.temp)

    this.state.temp = await AsyncStorage.getItem('tipoRede');
    this.state.tipoRede = JSON.parse(this.state.temp)

    this.setState({latitude:'',longitude:''})
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
    temp: [],
    tipoEquipamento : [],
    tipoPoste: [],
    tipoBraco: [],
    tipoRede: [],
    equipamento: [],
    tagIdentificacao: '',
    prioridadeAtendimento: '',
    potencia: '',
    pontoReferencia: '',
    observacoes: '',
    selectedValueEquipmentType : '0',
    selectedValueLightPoleType : '0',
    selectedValueArmType : '0',
    selectedValueNetType : '0',
    latitude:'',
    longitude:'',
  }

  setSelectedValueEquipmentType = (selectedValueEquipmentType) => 
  {
    this.setState({ selectedValueEquipmentType });
  };

  setSelectedValueLightPoleType = (selectedValueLightPoleType) =>
  {
    this.setState( {selectedValueLightPoleType} );
  }

  setSelectedValueArmType = (selectedValueArmType) => 
  {
    this.setState( {selectedValueArmType} );
  }

  setSelectedValueNetType = (selectedValueNetType) => 
  {
    this.setState( {selectedValueNetType} );
  }
    
  getLocalization = async ()=>
  {
    Geolocation.getCurrentPosition(info => 
      this.setState({latitude:info.coords.latitude, longitude:info.coords.longitude}));
  }

  handleSavePress = async () =>
  {
    if(this.state.prioridadeAtendimento == '')
      alert('Por favor preencha o campo "Prioridade de atendimento"')
    else
    if(this.state.potencia == '')
      alert('Por favor preencha o campo "Potência"')
    else
    {
      const temp = await AsyncStorage.getItem('@equipments');
      var Equipments = []; 
      
      if (temp != null)
        Equipments = JSON.parse(temp)

      console.log('var Equipments:',Equipments)

      const NewEquipament = 
      {
        iD_TP_EQUIPAMENTO : Number(this.state.selectedValueEquipmentType),
        iD_TP_POSTE : Number(this.state.selectedValueLightPoleType),
        iD_TP_BRACO : Number(this.state.selectedValueArmType),
        iD_TP_REDE : Number(this.state.selectedValueNetType),
        tag : this.state.tagIdentificacao,
        iD_RUA : parseInt(await AsyncStorage.getItem('id_rua')),
        latitude : this.state.latitude.toString(),
        longitude : this.state.longitude.toString(),
        prioridade : Number(this.state.prioridadeAtendimento),
        potencia : Number(this.state.potencia),
        referencia : this.state.pontoReferencia,
        observacoes : this.state.observacoes
      }
    

      console.log('const NewEquipment:',NewEquipament)

      // this.setState({equipamento:NewEquipament})


      // console.log('this.state.equipamento:',this.state.equipamento)

      Equipments.push(NewEquipament)

      console.log('Equipments:',Equipments);

      await AsyncStorage.removeItem('@equipments');

      await AsyncStorage.setItem('@equipments',JSON.stringify(Equipments));

      this.limparCampos();

      alert('Dados gravados com sucesso!');

      this.props.navigation.navigate('Main');
    }
  }

  handleTagchange = (tagIdentificacao) =>
  {
    this.setState({tagIdentificacao})
  }

  handlePrioridadechange = (prioridadeAtendimento) =>
  {
    this.setState({prioridadeAtendimento})
  }

  handlePotenciachange = (potencia) =>
  {
    this.setState({potencia})
  }

  handlePontoRefchange = (pontoReferencia) =>
  {
    this.setState({pontoReferencia})
  }

  handleObschange = (observacoes) =>
  {
    this.setState({observacoes})
  }

  limparCampos = () =>
  {
    this.setState({tagIdentificacao:'',prioridadeAtendimento:'',potencia:'',pontoReferencia:'',observacoes:'',latitude:'',longitude:''})
  }

  render(){ 

    
    return (
      <View style={style.container}>
        <ScrollView style={{width:370, flex:1}}>
          <View style={style.ViewTop}>
            <Text style={style.TitleGeneric}>Instalação de Equipamento</Text>
          </View>
          
          <View style={style.ViewInterna}>

            <View style={style.ViewData}>
              <Text style={{color: 'gray'}} >Tipo de equipamento:</Text>
              <Picker
                selectedValue={this.state.selectedValueEquipmentType}
                onValueChange={(itemValue, itemIndex) => {this.setSelectedValueEquipmentType(itemValue);}}
              >
                {this.state.tipoEquipamento.map(a => {return <Picker.Item key={a.iD_TP_EQUIPAMENTO} label={a.nM_TP_EQUIPAMENTO} value={a.iD_TP_EQUIPAMENTO} /> } )}  
              </Picker>
              
              <Text style={{color: 'gray'}}>Tipo de poste:</Text>
              <Picker
                selectedValue={this.state.selectedValueLightPoleType}
                onValueChange={(itemValue, itemIndex) => {this.setSelectedValueLightPoleType(itemValue);}}
              >
                {this.state.tipoPoste.map(a => {return <Picker.Item key={a.iD_TP_POSTE}  label={a.nM_TIPO_POSTE} value={a.iD_TP_POSTE} /> } )}  
              </Picker>
              <Text style={{color: 'gray'}}>Tipo de braço:</Text>
              <Picker
                selectedValue={this.state.selectedValueArmType}
                onValueChange={(itemValue, itemIndex) => {this.setSelectedValueArmType(itemValue)}}
              >
                {this.state.tipoBraco.map(a => {return <Picker.Item key={a.iD_TP_BRACO} label={a.dS_TP_BRACO} value={a.iD_TP_BRACO} /> } )}  
              </Picker>
              <Text style={{color: 'gray'}}>Tipo de rede:</Text>
              <Picker
                selectedValue={this.state.selectedValueNetType}
                onValueChange={(itemValue, itemIndex) => {this.setSelectedValueNetType(itemValue)}}
              >
                {this.state.tipoRede.map(a => {return <Picker.Item key={a.iD_TP_REDE} label={a.dS_TP_REDE} value={a.iD_TP_REDE} /> } )}  
              </Picker>
              <Text style={{color: 'gray'}}>Tag de identificação:</Text>
              <TextInput style={style.Input}
                value={this.state.tagIdentificacao}
                onChangeText={this.handleTagchange}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={{color: 'gray'}}>Prioridade de atendimento:</Text>
              <TextInput style={style.Input}
                keyboardType={'number-pad'}
                value={this.state.prioridadeAtendimento}
                onChangeText={this.handlePrioridadechange}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={{color: 'gray'}}>Potência (W):</Text>
              <TextInput style={style.Input}
                keyboardType={'number-pad'}
                value={this.state.potencia}
                onChangeText={this.handlePotenciachange}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={{color: 'gray'}}>Ponto de referência:</Text>
              <TextInput style={style.Input}
                value={this.state.pontoReferencia}
                onChangeText={this.handlePontoRefchange}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={{color: 'gray'}}>Observações:</Text>
              <TextInput style={style.Input}
                value={this.state.observacoes}
                onChangeText={this.handleObschange}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={style.ViewLatLong}>
              <TouchableOpacity style={style.ButtonCatch} onPress={this.getLocalization}>
                < Text style={style.ButtonTextCatch}>
                    Capturar
                </Text>
              </TouchableOpacity>
              <Text style={{color: 'gray',margin:5}}>Latitude:  {this.state.latitude}</Text>
              <Text style={{color: 'gray',margin:5}}>Longitude:  {this.state.longitude}</Text>
            </View>

          </View>

          <View style={style.ViewBottom}>
            <TouchableOpacity style={style.Button} onPress={this.handleSavePress}>
                < Text style={style.ButtonText}>
                    Salvar
                </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }
}