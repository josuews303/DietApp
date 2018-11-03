import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  View,
  Alert
} from 'react-native';
//Defino la Navegación
let NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index) {

    if(route.name=='Login' || route.name=='Dashboard'){
      return null;
    }
    return(<TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={() => {
              if(index > 0){
                navigator.pop();
              }
          }}>

            <Text style={{marginTop: 10, marginLeft:20, color:'#007AFF'}}>Back</Text>
         </TouchableHighlight>
    )
  },
  RightButton: function(route){
    return null;
  },
  Title: function(route){
    if(route.name == 'Login' || route.name == 'Dashboard'){
      return null;
    }
    return(
      <Text style={{marginTop: 10, color:'#007AFF' }}>
        {route.name}
      </Text>
    )
  },
};
  
//Importo las rutas
const Login = require('./app/components/Login');
const Dashboard = require('./app/components/Dashboard');
const Register = require('./app/components/Register');

//Rutas
class MainView extends Component {
  renderScene (route, navigator) {
    switch (route.name) {
       case 'Login':
        return (
         <Login {...route.props} navigator={navigator} route={route} />
       );
       case 'Dashboard':
        return (
          <Dashboard {...route.props} navigator={navigator} route={route}/>
       );
       case 'Register':
        return (
          <Register {...route.props} navigator={navigator} route={route}/>
       );
    }
  }

  render(){
    return(

      <Navigator style={styles.bar}
         initialRoute={{name: 'Login'}}
         renderScene={this.renderScene}
         configureScene={(route) => {
           if(route.sceneConfig){
             return route.sceneConfig;
           }
           return Navigator.SceneConfigs.FloatFromRight
         }}
         navigationBar={
           <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}/>}
      />
    )
  }

}



//Estilos
  const styles = StyleSheet.create({
    wrapper: {
        flex:1,
    },
    imageContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        width: '100%', height: '100%'
        //justifyContent: 'center',
      },
      container:{
        alignItems: 'center',
      },
      button:{
        width:300,
        height:50,
        backgroundColor:'red',
        alignItems:'center',
        marginTop:40,
        marginBottom:10,
        borderRadius:8,
        borderWidth:1
      },
      buttonText:{
        fontSize:20,
        color:'white',
        textAlign:'center',
        alignSelf:'stretch',
        margin: 10
      },
      tittle:{
        fontSize:30,
        marginTop:50,
        color:'white',
        //backgroundColor:'rgba{0,0,0,0}'
      },
    textInput:{
        marginTop:20,
        alignSelf:'stretch',
        padding: 16,
        backgroundColor:'#fff',
        textAlign:'center',
        marginBottom:7,
        height:50,
        width:300,
        borderWidth:1,
        borderColor:'#2196F3',
        borderRadius:5
    },TextInputStyle:{
      textAlign:'center',
      marginBottom:7,
      height:40,
      width:'85%',
      borderWidth:1,
      borderColor:'#2196F3',
      borderRadius:5
    },
    TextInputStyle2:{
      textAlign:'center',
      marginTop:20,
      marginBottom:7,
      height:40,
      width:'85%',
      borderWidth:1,
      borderColor:'#2196F3',
      borderRadius:5
    },
    TextStyle:{
      color:'#fff',
      textAlign:'center',
  
    },
    TouchableOpacityStyle:{
      paddingTop:10,
      paddingBottom:10,
      borderRadius:5,
      marginBottom:7,
      width:'50%',
      backgroundColor:'#00BCD4',
      
    },
    
    TouchableOpacityStyle2:{
      paddingTop:10,
      paddingBottom:10,
      borderRadius:5,
      marginBottom:7,
      width:'50%',
      backgroundColor:'#FF5722'
    },
    TouchableOpacityStyle3:{
      paddingTop:10,
      paddingBottom:10,
      borderRadius:5,
      marginBottom:7,
      width:'100%',
      backgroundColor:'#00BCD4',
      
    },
    ContainerDataUsers:{
      flex:1,
      paddingTop:20,
      marginLeft:5,
      marginRight:5
    },
    rowViewContainer:{
      textAlign:'center',
      fontSize:20,
      paddingTop:10,
      paddingRight:10,
      paddingBottom:10,
      
    },
   
  });
  