import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import style from './styles'
import { openDatabase } from 'react-native-sqlite-storage';
import PropTypes from 'prop-types';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import SideMenu from 'react-native-side-menu'
import logo from '../../images/logoPoste2.png'; 
import icon from '../../images/icon_menu.jpg'; 
import api from '../../services/api';

var db = openDatabase({ name: 'DatabaseCJC.db'});

export default class Equipments extends Component{

  async componentDidMount()
  {
    await this.loadNeighborhood();
    await this.loadAddress();
    await this.loadEquipments();
    await this.loadEquipmentGrid();
    // console.log('Ruas: ',JSON.stringify( this.state.ruas))
    // console.log('Bairros ',this.state.bairros)
    // console.log('equipments: ',this.state.equipments);
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
    ruas: [],
    bairros: [],

    rua: '',
    bairro: '',
    tag:'',
    
    equipments: [],
    equipmentsList: [],

    errors:[],
  }

  
  loadEquipmentGrid = async () =>
  {
    console.log('equipments:',this.state.equipments);
    // console.log(this.state.ruas)
    // console.log(this.state.bairros)
    for(let i=0;i<this.state.equipments.length;i++)
    {
      const id_rua = this.state.equipments[i].iD_RUA;
      const id_bairro = this.state.ruas.find(r => r.id == id_rua).id_bairro;
      console.log(id_rua)
      console.log(id_bairro)

      this.setState({rua:this.state.ruas.find(r => r.id == id_rua).nm_rua})
      this.setState({bairro:this.state.bairros.find(b => b.id == id_bairro).nm_bairro})
      this.setState({tag:this.state.equipments[i].tag});
      
      var NewRow = 
      {
        // Rua : this.state.rua,
        // Bairro : this.state.bairro,
        // Tag : this.state.tag,
        Concat: this.state.rua + ' | ' + this.state.bairro + ' | TAG: ' + this.state.tag
      }

      console.log(NewRow)

      this.state.equipmentsList.push(NewRow);
    }
    console.log(this.state.equipmentsList)
  }
    
  loadEquipments = async () => 
  {
    const temp = await AsyncStorage.getItem('@equipments');
      
    if (temp != null)
    {
      var Equipments = JSON.parse(temp)
      this.setState({equipments:Equipments});
      // console.log('equipments: ',this.state.equipments);
    }
  }

  loadNeighborhood = async () =>
  {
    return new Promise
        (
            async (resolve,reject)=>
            {
                // alert('antes da transação')
                // console.log(params)
               (await db).transaction
               (
                   function (txn)
                   {
                    //    alert('antes da execução do comando insert')
                       txn.executeSql
                        (
                           'SELECT * FROM Bairro', 
                            [],
                            (tx,results)=>
                            {
                                // alert('Ok deu certo')
                                // console.log('Resolve select Municipio',results)
                                // alert(results)
                                resolve(results)
                                // console.log(results.rows.item)
                            },
                            (error)=>
                            {
                                // alert('ixi, deu erro')
                                console.log('Error select Bairro:',error)
                                reject(error)
                                throw error
                            }
                        )
                   }
               )
            }
        )
        .then
        (
          resp => 
          {
            var bairros =[];
            for(let i=0;i<resp.rows.length;i++)
            {
              bairros.push(resp.rows.item(i))
            }
            
            this.setState({bairros})
            // console.log(JSON.stringify(this.state.bairros))
          }
        )
        .catch
        (
            err =>
            { 
                // alert(err)
                console.log(err) 
            }
        )
  };

  loadAddress = async () =>
  {
    return new Promise
    (
        async (resolve,reject)=>
        {
            // alert('antes da transação')
            // console.log(params)
           (await db).transaction
           (
               function (txn)
               {
                //    alert('antes da execução do comando insert')
                   txn.executeSql
                    (
                       'SELECT * FROM Rua', 
                        [],
                        (tx,results)=>
                        {
                            // alert('Ok deu certo')
                            // console.log('Resolve select Municipio',results)
                            // alert(results)
                            resolve(results)
                            // console.log(results.rows.item)
                        },
                        (error)=>
                        {
                            // alert('ixi, deu erro')
                            console.log('Error select Rua:',error)
                            reject(error)
                            throw error
                        }
                    )
               }
           )
        }
    )
    .then
    (
      resp => 
      {
        var ruas =[];
        for(let i=0;i<resp.rows.length;i++)
        {
          ruas.push(resp.rows.item(i))
        }
        
        this.setState({ruas})
        // console.log(JSON.stringify(this.state.ruas))
      }
    )
    .catch
    (
        err =>
        { 
            // alert(err)
            console.log(err) 
        }
    )
  };

  onPressBack = async ()=>
  {
    this.props.navigation.navigate('Main')
  }

  render(){ 


    return (
      <View style={style.containerSuperior}>
          <View style={style.container}>
            <View style={style.ViewTitle}>
              <Text style={style.TitleGeneric}>Equipamentos</Text>
            </View>
              <View style={style.ViewInterna}>
              <ScrollView>
                {this.state.equipmentsList.map(a => {return <Text key={a.Concat}> {a.Concat} </Text> } )} 
              </ScrollView>
              </View>
            {/* label={a.Rua, a.Bairro, a.Tag} */}
            <View style={style.ViewBottom}>
              <TouchableOpacity style={style.Button} onPress={this.onPressBack}>
                  < Text style={style.ButtonText}>
                      Voltar
                  </Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    );
  }
}