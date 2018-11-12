import React from 'react';
import { TouchableOpacity,ActivityIndicator,ListView,Alert,Button,StyleSheet, Text, View,AppRegistry,TextInput } from 'react-native';
import { createStackNavigator} from 'react-navigation';
import Measure from "./Measures";
import Diet from "./Diet";
class MainMenu extends React.Component{
    static navigationOptions={
      title:'Main Menu'
    }
      constructor(props){
          super(props);
          this.state={
              Input_username:this.props.navigation.state.params.Input_username,
          }
      }

    ViewDiet=()=>{
        this.props.navigation.navigate('Thire');
    }
    ViewMeasure=()=>{
      this.props.navigation.navigate('Second',{id_usuario:this.state.Input_username});
    }
    render() {
      return (
        
        <View style={styles.Container}>
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.ViewMeasure}>
            <Text style={styles.TextStyle}>MEASURES</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.ViewDiet}>
            <Text style={styles.TextStyle}>DIETS</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  export default App=createStackNavigator({
      First:{screen:MainMenu},
      Second:{
        screen: Measure,
        navigationOptions: () => ({
          //title: `A`,
          header: null,
          headerBackTitle: null
        }),
      },
      Thire:{
        screen: Diet,
        navigationOptions: () => ({
          //title: `A`,
          header: null,
          headerBackTitle: null
        }),
      }
    //<Button title='GUARDAR' onPress={this.InsertDataToServer} color='#2196F3'/>
          
  });
  
  
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      marginTop:5,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    TextInputStyle:{
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
    tittle:{
      fontSize:30,
      marginTop:50,
      color:'white',
      //backgroundColor:'rgba{0,0,0,0}'
    },
  });