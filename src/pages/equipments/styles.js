import { StyleSheet, ColorPropType } from 'react-native';
import { color } from 'react-native-reanimated';


const styles = StyleSheet.create({
    containerSuperior: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFF',
        alignItems:'center',
    },
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'flex-start',
    },
    ViewInterna:{
        flex: 10,
        // justifyContent: 'space-around',
        // borderColor : 'gray',
        // borderWidth : 0.5,
        // borderRadius: 25,
        margin: 20,
        // padding: 10,
        backgroundColor:'#FFF'
    },
    ViewTop:{
        flex:1,
        backgroundColor:'#FFF'
    },
    ViewTitle:{
        flex:1,
        backgroundColor:'#FFF'
    },
    ViewBottom:{
        flex:2,
        justifyContent:'center',
        backgroundColor:'#FFF'
    },
    containerMenu: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#FFF'
    },
    Logo: { 
        width: 150,
        height: 60,
        padding:20,
      },
      ViewLogo:{
        flex:1,
        justifyContent:'center',
      },
      ViewButtonsMenu:{
          flex:6,
          paddingTop:10,
          justifyContent:'flex-start',
          backgroundColor:'#FFF',
      },
      ViewVersion:{
        backgroundColor:'#FFF',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
    Button: {
        width: 200,
        padding: 20,
        borderRadius: 15,
        backgroundColor: 'rgb(60, 110, 200)',
        alignSelf: 'center',
    },
    ButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    ButtonMenu: {
        padding: 25,
    },
    Hamburger:{
        height:30,
        width:30,
        margin:10,
    },
    TitleGeneric:{
        color:'gray',
        flex:1,
        alignSelf: 'center',
        fontSize: 35,
        fontWeight: 'bold',
    },
    TextMenu:{
        fontWeight: 'bold',
        fontSize: 17,
    },
    FieldNameText:{
        color:'gray',
        
    },
    // Dropdown:{
    //     marginBottom:20,
    //     height: 37,
    //     // width: 300
    // },
    // DropdownItem:{
    //     borderColor:'gray',
    //     borderWidth: 1,
    //     height: 50,
    //     width: 300,
    //     fontWeight: 'bold',
    //     color: 'gray',
    //     marginTop:60,
    // },
    
  });

  export default styles;