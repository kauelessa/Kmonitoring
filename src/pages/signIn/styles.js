import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'//'#F5F5F5'
    },
    Logo: { 
        width: 300,
        height: 200,
        marginBottom: 30,
        borderColor: 'gray',
        // borderWidth: 1,
        // borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#FFF'
      },
      Logo2: { 
        width: 200,
        height: 200,
        marginBottom: 30,
        // borderColor: 'gray',
        // borderWidth: 1,
        // borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#FFF'
      },
    Input: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#FFF',
        alignSelf: 'center',
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 14,
        height: 45,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1
    },
    ErrorMessage: {
        textAlign: 'center',
        color: '#ce2029',
        fontSize: 16,
        marginBottom: 15,
        marginHorizontal: 20
    },

    Button: {
        width: 200,
        // height: 100,
        padding: 20,
        borderRadius: 5,
        backgroundColor: 'rgb(00, 97, 74)',
        alignSelf: 'center',
        margin: 10,
        marginHorizontal: 20
    },
    ButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    TitleCjc:{
        color:'gray',
        marginBottom: 30,
        marginTop:30,
        alignSelf: 'center',
        fontSize: 33,
        fontWeight: 'bold',
    },
    checkBox: {
        color: 'gray',
        // flex: 1,
        // alignItems: 'center',
        alignSelf:'flex-start',
        // justifyContent: 'flex-start',
        // backgroundColor: '#FFF'//'#F5F5F5'
        
    },
    randomText: {
        color: 'gray',
        alignSelf:'center'
    },
    randomView:{
        alignItems:'flex-start',
        flexDirection:'row',
        justifyContent: 'flex-start',
    }
  });

  export default styles;