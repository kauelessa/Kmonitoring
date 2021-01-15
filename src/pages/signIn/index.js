import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import style from './styles'
import api from '../../services/api';
import logo from '../../images/logo_kmonitoring.png'; 
import logo2 from '../../images/Grupo_443.png';
import CheckBox from '@react-native-community/checkbox';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

export default class SignIn extends Component {

     componentDidMount()
    {
        this.verifyUser()
    };

    static navigationOptions = {
        headerShown: false,
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };
    
    state = 
    { 
        userData: [],
        username: 'consultorti',
        password: 'con123', 
        stayLogged: 1,
        error: '',
        checked: true,
        enabled: false,

        jsonVisitas: [],
        visitas: [],
        fazendas: [],
        contatos: [],
        resultados: [],
    };

    verifyUser = async () =>
    {
        var hasUser = await AsyncStorage.getItem('@user:token')
        
        if (hasUser != null)
        {
            if(hasUser.length >0 )
            {
                const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: "Main" }),
                ],
                });
                this.props.navigation.dispatch(resetAction);
            }
        }
        else
        {
            this.setState({enabled : !this.state.enabled})
            alert('Olá, para seu primeiro login no aplicativo certifique-se de ter uma conexão com a internet. '
                +'Se futuramente for utilizá-lo sem uma conexão com a internet, por favor mantenha a opção  "Manter conectado"  ativada. ')
        }
    };

    addUser = async (username, password, token) =>
    {
        await AsyncStorage.setItem('@user:username',username)
        await AsyncStorage.setItem('@user:password',password)
        await AsyncStorage.setItem('@user:token',token)
    }

    loadData = async () =>
    {        
        var userdata = JSON.parse(await AsyncStorage.getItem('@user:data'));
        var AUTH_TOKEN = userdata.data.token.replace(/"/g,'');   

        var Json = {token:AUTH_TOKEN}

        // api.defaults.headers['Authorization'] ='Bearer ' + AUTH_TOKEN;
        var response = await api.post('/api/propostas/all-assigned-for-tablet',JSON.stringify(Json)) 
                  .then(async function (response) 
                    {
                        console.log(response);
                        return response;
                    })
                  .catch(function (error) {
                    if (error.response) {
                      // The request was made, but the server responded with a status code
                      // that falls out of the range of 2xx
                      console.log('Error loadData')
                      console.log(error.response.data);
                      console.log(error.response.status);
                      console.log(error.response.headers);
                    } else {
                      // Something happened in setting up the request that triggered an Error
                      console.log('Error', error.message);
                      alert('Error 19: '+ error.message);
                    }
                    console.log(error.config);
                    });            
        const jsonVisitas  = response.data;
        this.setState( { jsonVisitas } );
        console.log('**JSONVISITAS: '+JSON.stringify(this.state.jsonVisitas))

        this.setState({visitas:jsonVisitas.visitas})
        console.log('**VISITAS: '+JSON.stringify(this.state.visitas))

        for(let i=0;i<this.state.visitas.length;i++)
        {
            this.state.contatos.push(this.state.visitas[i].contatos)
            console.log('**CONTATOS: '+JSON.stringify(this.state.contatos))

            this.state.fazendas.push(this.state.visitas[i].fazendas)
            console.log('**FAZENDAS: '+JSON.stringify(this.state.fazendas))

            this.state.resultados.push(this.state.visitas[i].resultados)
            console.log('**RESULTADOS: '+JSON.stringify(this.state.resultados))
        }

        await AsyncStorage.setItem('@data:jsonVisitas',JSON.stringify(this.state.jsonVisitas))
        await AsyncStorage.setItem('@data:visitas',JSON.stringify(this.state.visitas))
        await AsyncStorage.setItem('@data:contatos',JSON.stringify(this.state.contatos))
        await AsyncStorage.setItem('@data:fazendas',JSON.stringify(this.state.fazendas))
        await AsyncStorage.setItem('@data:resultados',JSON.stringify(this.state.resultados))
    }

    setToggleCheckBox = (checked) => {
        this.setState({ checked });
    };

    handleUsernameChange = (username) => {
        this.setState({ username });
    };
      
    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleSignInPress = async () => 
    {
        if (this.state.username.length === 0 || this.state.password.length === 0) 
        {
          this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
        } 
        else 
        {
            try 
            {
                var UserParams = {login: this.state.username.trim(),password: this.state.password.trim()}
                await AsyncStorage.setItem('@user:loginModel',JSON.stringify(UserParams))

                this.setState({enabled : !this.state.enabled});

                await api.post('/api/user/login', UserParams)
                .then(async function (response) 
                {
                    if(response.status = 'success')
                    {
                        console.log(response.data)
                        await AsyncStorage.setItem('@user:data', JSON.stringify(response.data))
                    }
                    else
                    {
                        console.log('Erro ao fazer login: ',response.status,' - ',response.message)
                        throw response.message
                    }
                })
                .catch(function (error) 
                {
                    console.log(error)
                    if (error.response) {
                        alert(JSON.stringify(error.response.data))
                        throw error
                    } else if (error.request) {
                        throw error;
                    } else {
                        throw error.message;
                    }
                });

                var userdata = JSON.parse(await AsyncStorage.getItem('@user:data'));
                var AUTH_TOKEN = userdata.data.token.replace(/"/g,'');

                console.log('token: '+AUTH_TOKEN)

                if (userdata != null)
                {
                    this.setState({userdata})

                    console.log(this.state.checked)
                    if (this.state.checked)
                        this.addUser(this.state.username, this.state.password, AUTH_TOKEN);

                    await this.loadData()

                    console.log('Entrou');

                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Main' }),
                        ],
                        });
                        this.props.navigation.dispatch(resetAction);
                }
                else
                {
                    console.log('não possui usuário cadastrado')
                    this.setState({enabled : !this.state.enabled});
                }                  
            } 
            catch (_err) 
            {
                this.setState({enabled : !this.state.enabled});
                this.setState({ error: 'Houve um problema com o login, verifique suas credenciais! ' + _err });
            }
        }
    };

    render() {
        return (
            <View style={style.container}>
                <Spinner
                    visible={!this.state.enabled}
                    textContent={'Carregando...'}
                    textStyle={{color: '#FFF'}}
                />
                <Image style={style.Logo} source={logo} resizeMode="contain" />
                <TextInput style={style.Input}
                    placeholder="Usuário"
                    value={this.state.username}
                    onChangeText={this.handleUsernameChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={this.state.enabled}
                />
                <TextInput style={style.Input}
                    placeholder="Senha"
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    editable={this.state.enabled}
                />
                
                <View style={style.randomView}>
                    <CheckBox
                        disabled={false}
                        value={this.state.checked}
                        onValueChange={(newValue) => this.setToggleCheckBox(newValue)}
                        editable={this.state.enabled}
                    />
                    <Text style={style.randomText}>Manter conectado</Text>
                </View>
                <TouchableOpacity style={style.Button} onPress={this.handleSignInPress} disabled={!this.state.enabled}>
                    <Text style={style.ButtonText}>
                        Entrar
                    </Text>
                </TouchableOpacity>
                {this.state.error.length !== 0 && <Text>{this.state.error}</Text>}
                <Image style={style.Logo2} source={logo2} resizeMode="contain" />
            </View>
        );
    };
}