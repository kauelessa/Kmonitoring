import style from './styles/stylesCard'
import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

export default props => 
    // {props.key}
    <TouchableOpacity onPress={props.VisitPress} >
        <View style={style.ViewVisita}>
                
                <View style={style.ViewInternaVisita1}>

                    <Text style={style.FieldSubTitleText} >Agricultor</Text> 
                    <Text style={style.FieldNameText} >Nome: {props.NomeAgricultor} </Text> 
                    
                    <Text style={style.FieldSubTitleText}>RTV/RCI</Text>
                    <Text style={style.FieldNameText} >Nome: {props.NomeRtv}</Text>
                    
                    <Text style={style.FieldSubTitleText}>Propriedade</Text>
                    <Text style={style.FieldNameText} >Nome: {props.NomePropriedade}</Text>
                    
                    <View style={style.ViewBottomVisita1}>
                    <Text style={{color:'#0873A3', fontWeight:'bold'}} >{props.DataHoraVisita}</Text>
                    </View>

                </View>

                <View style={style.ViewInternaVisita1}>
                    
                    <View>
                        <Text style={{fontWeight:'bold',color:'rgb(00, 97, 74)',marginRight:10,fontSize:12,alignSelf:'flex-end'}} >VISITA {props.NumVisita}</Text>
                    </View>

                    <View style={{alignItems:'flex-start',marginTop:8}}>
                        <Text style={{color:'gray',fontWeight:'bold'}} >CPF: {props.Cpf}</Text>  
                    </View>

                    <View style={{alignItems:'flex-start',marginTop:8}}>
                        <Text style={style.FieldSubTitleText}>Operação</Text>
                        <Text style={style.FieldNameText}>Nome: {props.NomeOperacao}</Text>
                    </View>

                    <View style={{alignItems:'flex-start',marginTop:21}}>
                        <Text style={style.FieldNameText}>Endereço: {props.EnderecoPropriedade}</Text>
                    </View>

                    <View style={style.ViewBottomVisita2}>
                        <Text style={{color:'rgba(0,151,116,255)', fontWeight:'bold'}} >{props.StatusVisita}</Text>
                    </View>
                
                </View>
        </View> 
    </TouchableOpacity>

