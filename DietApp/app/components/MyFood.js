import React from 'react';
import { ImageBackground,Picker,TouchableOpacity,ActivityIndicator,ListView,Alert,StyleSheet, Text, View,TextInput } from 'react-native';
import { createStackNavigator} from 'react-navigation';

class ViewDataFood extends React.Component{
  static navigationOptions = {
    title:'View Food'
}

  constructor(props){
    super(props)
    this.state = {
        InputDiet:this.props.navigation.state.params.InputId,
      isLoading:true,
      
    }
  }
  componentDidMount(){
    return fetch('http://weaweawea.atwebpages.com/viewFood.php',{
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id_dieta:this.state.InputDiet,
        })
      })
            .then((response)=>response.json())
            .then((responseJson)=>{
              let ds =  new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2})
              this.setState({
                isLoading:false,
                dataSource: ds.cloneWithRows(responseJson)
              },function(){})
            }).catch((error)=>{
              console.error(error);
            })
  }
  reload = () => 
{
    //RELOAD COMPONENT
    this.componentDidMount();
};

  ListViewItemSeparator=()=>{
    return(
      <ImageBackground source={require('../../img/menu1.jpg')} style={styles.imageContainer}>
      <View
      style = {{
        height:.5,
        width:'100%',
        backgroundColor:'#2196F3'
      }}
      />
      </ImageBackground>
    )
  }
  
  render(){
    if(this.state.isLoading){
      return(
        <ImageBackground source={require('../../img/menu1.jpg')} style={styles.imageContainer}>
        <View style={{flex:1,paddingTop:1}}>
          <ActivityIndicator/>
        </View>
        </ImageBackground>
      )
    }
    return(
      <ImageBackground source={require('../../img/menu1.jpg')} style={styles.imageContainer}>
      <View style={styles.ContainerDataUsers}>
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={(rowData)=>
            <Text style={styles.rowViewContainer} >
              {rowData.orden_comida} {rowData.nombre_comida} {rowData.porcion_comida} kg
            </Text>
          }
        />
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle3} onPress={this.reload}>
          <Text style={styles.TextStyle}>Reload List</Text>
        </TouchableOpacity> 
      </View>
      </ImageBackground>
    )
  }
}

export default App=createStackNavigator({
  First:{screen:ViewDataFood}
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
  imageContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    width: '100%', height: '100%'
    //justifyContent: 'center',
  }
});