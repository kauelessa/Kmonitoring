import style from './styles/stylesContainers'
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import logo from '../images/logo_kmonitoring.png'; 

export default props => 
    <View
    navigator={navigator}
    style={style.containerMenu}
    >
        <View style={style.ViewLogo}>
            <Image style={style.Logo} source={logo} resizeMode='contain'/>
        </View>
        <View style={style.ViewButtonsMenu}>
            <TouchableOpacity style={style.ButtonMenu} onPress={props.Token}>
                    <Text style={style.TextMenu}>Renovar token</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.ButtonMenu} onPress={props.Listar}>
                    <Text style={style.TextMenu}>Listar Equipamentos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.ButtonMenu} onPress={props.Exportar}>
                    <Text style={style.TextMenu}>Exportar Dados</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.ButtonMenu} onPress={props.Logout}>
                    <Text style={style.TextMenu}>Logout</Text>
            </TouchableOpacity>
        </View>
        <View style={style.ViewVersion}>
            <Text style={{color:'gray'}}>Versão 1.0.2</Text>
        </View>
    </View>