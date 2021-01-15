import { StyleSheet, ColorPropType } from 'react-native';
import { color } from 'react-native-reanimated';


const styles = StyleSheet.create({    
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
    ButtonMenu: {
        padding: 25,
    },
    TextMenu:{
        fontWeight: 'bold',
        fontSize: 17,
    },    
  });

  export default styles;