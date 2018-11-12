import React from 'react';
import { Picker,TouchableOpacity,ActivityIndicator,ListView,Alert,StyleSheet, Text, View,TextInput } from 'react-native';
import { createStackNavigator} from 'react-navigation';
import MyFood from './MyFood';

class ViewDataDiet extends React.Component{
  static navigationOptions = {
    title:'View Diets'
}

  constructor(props){
    super(props)
    this.state = {
      isLoading:true,
      grado_dieta:this.props.navigation.state.params.grado_dieta
      
    }
  }
  componentDidMount(){
    fetch('http://weaweawea.atwebpages.com/viewMyDiet.php',{
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          grado_dieta:this.state.grado_dieta,
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
  Action_Click(id_dieta,nombre_dieta,detalle_dieta,grado_dieta){
    this.props.navigation.navigate('Second',{
      id_dieta:id_dieta,
      nombre_dieta:nombre_dieta,
      detalle_dieta:detalle_dieta,
      grado_dieta:grado_dieta
    })
    Alert.alert(nombre_dieta,detalle_dieta);
  }

  ListViewItemSeparator=()=>{
    return(
      <View
      style = {{
        height:.5,
        width:'100%',
        backgroundColor:'#2196F3'
      }}
      />
    )
  }
  
  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex:1,paddingTop:1}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={styles.ContainerDataUsers}>
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={(rowData)=>
            <Text style={styles.rowViewContainer} onPress={this.Action_Click.bind(this,
                rowData.id_dieta,
                rowData.nombre_dieta,
                rowData.detalle_dieta,
                rowData.grado_dieta
              )}>
              {rowData.nombre_dieta}
            </Text>
          }
        />
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle3} onPress={this.reload}>
          <Text style={styles.TextStyle}>Reload List</Text>
        </TouchableOpacity> 
      </View>
    )
  }
}
class UpdateAndDeleteDiet extends React.Component{
  static navigationOptions={
    title:'Update And Delete Diets'
  }
  constructor(props){
    super(props)
    this.state = {
      InputId:'',
      InputNombre:'',
      InputDetalle:'',
      InputGrado:''
    }
  }
  AddFood=()=>{
    console.log(this.state.InputId)
    this.props.navigation.navigate('Thire',{InputId:this.state.InputId})
  }
  componentDidMount(){
    this.setState({
      InputId: this.props.navigation.state.params.id_dieta,
      InputNombre: this.props.navigation.state.params.nombre_dieta,
      InputDetalle: this.props.navigation.state.params.detalle_dieta,
      InputGrado: this.props.navigation.state.params.grado_dieta,
    })
  }
  render(){
    return(
      <View style={styles.Container}>
        <TextInput 
        value = {this.state.InputNombre} 
        placeholder="Diet Name"
        onChangeText={InputNombre => this.setState({InputNombre})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle2}/>

        <TextInput 
        value = {this.state.InputDetalle} 
        placeholder="Diet Detail"
        onChangeText={InputDetalle => this.setState({InputDetalle})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>

        <Picker
            value = {this.state.InputGrado} 
            placeholder="IMC"
            selectedValue={this.state.InputGrado}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({InputGrado: itemValue})}>
            <Picker.Item label="Desnutrición" value="Desnutrido" />
            <Picker.Item label="Sobrepeso " value="Sobrepeso" />
            <Picker.Item label="Obesidad Grado 1" value="Obesidad Grado 1" />
            <Picker.Item label="Obesidad Grado 2" value="Obesidad Grado 2" />
            <Picker.Item label="Obesidad Grado 2" value="Obesidad Grado 2" />
        </Picker>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.AddFood}>
          <Text style={styles.TextStyle}>Show Food</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default App=createStackNavigator({
  First:{screen:ViewDataDiet},
  Second:{screen:UpdateAndDeleteDiet},
  Thire:{screen:MyFood}
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