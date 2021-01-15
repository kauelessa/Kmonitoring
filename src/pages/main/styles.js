import { StyleSheet, ColorPropType } from 'react-native';
import { color } from 'react-native-reanimated';


const styles = StyleSheet.create({
    containerSuperior: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#FFF',
        alignItems:'center',
    },
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'flex-start',
    },
    ViewInterna:{
        flex: 12,
        // alignItems:'flex-start',
        justifyContent: 'flex-start',
        margin: 5,
        padding: 3,
        backgroundColor:'#FFF'
    },
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
    ViewTop:{
        flex:1,
        alignItems: "center",
        backgroundColor:'#FFF'
    },
    ViewTitle:{
        flexDirection:"row",
        flex:1,
        backgroundColor:'#FFF'
    },
    ViewBottom:{
        flex:1,
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
        marginLeft :20,
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
    HamburgerImage:{
        height:30,
        width:30,
        margin:15,
    },
    HamburgerButton:{
        marginLeft:360,
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
    Input: {
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: '#FFF',
        alignSelf: 'center',
        margin : 7,
        fontSize: 14,
        height: 45,
        width: 550,
        borderColor: 'gray',
        borderWidth: 1
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        opacity:50,
    },
    boxModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(220,220,220,0.8)',//'#DFE0E6',
        marginTop: 400,
        marginBottom: 400,
        borderRadius: 15,
    },
    titleModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(220,220,220,0.0)',//'#DFE0E6',
    },
    buttonsModal: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(220,220,220,0.0)',//'#DFE0E6',
        marginBottom: 10,
        // padding: 100,
    },
    buttonModalWhite: {
        width: 170,
        margin:20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFF',
        alignSelf: 'center',
        alignItems:'center'
    },
    buttonModalGreen: {
        width: 170,
        margin:20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgb(00, 97, 74)',
        alignSelf: 'center',
        alignItems:'center'
    },
    text: {
        color: '#000000',
        marginTop: 10,
        fontSize:20,
        // color:'rgb(00, 97, 74)',
    },
  });

  export default styles;