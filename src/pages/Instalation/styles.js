import { StyleSheet, ColorPropType } from 'react-native';
import { color } from 'react-native-reanimated';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    ViewTop:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFF'
    },
    ViewInterna:{
        // flex : 2,
        borderColor : 'gray',
        borderWidth : 0.5,
        borderRadius: 20,
        margin:15,
        padding:5,
    },
    ViewData:{
        flex:30,
        padding:5,
        // backgroundColor:'pink'
    },
    ViewLatLong:{
        flex:1,
        padding:10,
        justifyContent:'space-between',
        borderColor : 'gray',
        borderWidth : 0.5,
        borderRadius: 20,
    },
    ViewBottom:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#FFF'
    },
    Input: {
        borderRadius: 5,
        backgroundColor: '#FFF',
        margin:5,
        fontSize: 14,
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5
    },
    Button: {
        width: 200,
        padding: 20,
        borderRadius: 5,
        backgroundColor: 'rgb(60, 110, 200)',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom:20,
        marginHorizontal: 20
    },
    ButtonCatch:{
        // width: 100,
        padding: 10,
        borderRadius: 30,
        backgroundColor: 'rgb(60, 110, 200)',
        margin: 15,
    },
    ButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    ButtonTextCatch:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },
    TitleGeneric:{
        color:'gray',
        fontSize: 25,
        fontWeight: 'bold',
    },
  });

  export default styles;