import { StyleSheet, ColorPropType } from 'react-native';
import { color } from 'react-native-reanimated';


const style = StyleSheet.create({
    ViewVisita:{
        // flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
        borderColor : 'gray',
        borderWidth : 0.5,
        borderRadius: 10,
        margin: 2,
        padding: 15,
        backgroundColor:'#FFF'
    },
    ViewInternaVisita1:{
        flex:1,
        // borderColor:'black',
        // borderWidth : 0.5,
        justifyContent:'flex-start',
    },
    ViewBottomVisita1:{
        // flex:1,
        // borderColor:'black',
        // borderWidth : 0.5,
        borderRadius:2,
        marginRight:120,
        marginTop:10,
        padding:5,
        alignItems:'center',
        backgroundColor:'rgba(176,196,222,255)',
    },
    ViewBottomVisita2:{
        // flex:1,
        // borderColor:'black',
        // borderWidth : 0.5,
        borderRadius:2,
        marginLeft:120,
        marginTop:10,
        padding:5,
        alignItems:'center',
        backgroundColor:'rgba(212,233,212,255)',
    },
    FieldSubTitleText:{
        color:'rgb(00, 97, 74)',
        fontWeight:'bold',
        marginTop:6,
        // marginBottom:10,
    },
    FieldNameText:{
        color:'gray',
        fontWeight:'bold',
        marginBottom:5,
    },
    
  });

  export default style;