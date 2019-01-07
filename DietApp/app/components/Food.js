import React from 'react';
import { ImageBackground,Picker,TouchableOpacity,ActivityIndicator,ListView,Alert,StyleSheet, Text, View,TextInput } from 'react-native';
import { createStackNavigator} from 'react-navigation';
//Insert
class InputFood extends React.Component{
  static navigationOptions={
    title:'Add Food'
  }
    constructor(props){
        super(props);
        this.state={
            InputNombre:'',
            InputPorcion:'',
            InputOrden:'Primera Comida',
            InputNumero:'',
            InputDiet:this.props.navigation.state.params.InputId,
            isLoading: true
        }
    }

    InsertDataToServer = () =>{
      if(!this.state.InputNombre || !this.state.InputPrecio || !this.state.InputNumero ){
        Alert.alert('Error','Asegurese de ingresar bien los datos');
      }else{
        console.log(this.state.InputDiet)
        console.log(this.state.InputNumero)
        const {InputNombre} =this.state;
        const {InputPorcion} =this.state;
        const {InputNumero} =this.state;

        switch(this.state.InputNumero){
            case "0":
            console.log("Entro al 1")
                this.state.InputOrden="Primera Comida"
                break;
            case "1":
                console.log("Entro al 2")
                this.state.InputOrden="Segunda Comida"
                break;
            case "2":
            console.log("Entro al 3")
                this.state.InputOrden="Tercera Comida"
                break;
        }
        fetch('http://weaweawea.atwebpages.com/insertFood.php',{
          method: 'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            nombre_comida:InputNombre,
            porcion_comida:InputPorcion,
            orden_comida:this.state.InputOrden,
            numero_comida: InputNumero,
            id_dieta: this.state.InputDiet
          })
        }).then((response)=>response.json())
        .then((responseJson)=>{
          Alert.alert(responseJson);
          this.props.navigation.navigate('Second',{InputDiet:this.state.InputDiet});
        }).catch((error)=>{
          console.error(error);
        });
      }
        
    }
  ViewUsersList=()=>{
    this.props.navigation.navigate('Second',{InputDiet:this.state.InputDiet});
  }

  render() {
    return (
      <ImageBackground source={require('../../img/menu1.jpg')} style={styles.imageContainer}>
      <View style={styles.Container}>
        <TextInput 
        placeholder="Food Name"
        onChangeText={InputNombre => this.setState({InputNombre})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle2}/>

        <TextInput 
        placeholder="Food Portion Kg"
        onChangeText={InputPorcion => this.setState({InputPorcion})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}
        keyboardType='numeric'
        maxLength={3}/>

        <Picker
            placeholder="Order"
            selectedValue={this.state.InputNumero}
            style={{ height: 50, width: "85%" }}
            onValueChange={(itemValue, itemIndex) => this.setState({InputNumero: itemValue})}>
            <Picker.Item label="Primera Comida" value="0" />
            <Picker.Item label="Segunda Comida " value="1" />
            <Picker.Item label="Tercera Comida" value="2" />
        </Picker>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.InsertDataToServer}>
          <Text style={styles.TextStyle}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.ViewUsersList}>
          <Text style={styles.TextStyle}>Food</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    );
  }
}
class ViewDataFood extends React.Component{
  static navigationOptions = {
    title:'View Food'
}

  constructor(props){
    super(props)
    this.state = {
      isLoading:true,
      InputDiet:this.props.navigation.state.params.InputDiet
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
addFood = () => 
{
    this.props.navigation.navigate('First',{InputId:this.state.InputDiet})
};
  Action_Click(id_comida,nombre_comida,porcion_comida,orden_comida,numero_comida,id_dieta){
    this.props.navigation.navigate('Thire',{
        id_comida:id_comida,
        nombre_comida:nombre_comida,
        porcion_comida:porcion_comida,
        orden_comida:orden_comida,
        numero_comida:numero_comida,
        id_dieta:id_dieta,
    })
    Alert.alert(nombre_comida,porcion_comida);
  }

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
            <Text style={styles.rowViewContainer} onPress={this.Action_Click.bind(this,
                rowData.id_comida,
                rowData.nombre_comida,
                rowData.porcion_comida,
                rowData.orden_comida,
                rowData.numero_comida,
                rowData.id_dieta
              )}>
              {rowData.orden_comida}{rowData.nombre_comida}
            </Text>
          }
        />
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle3} onPress={this.addFood}>
          <Text style={styles.TextStyle}>Add Food</Text>
        </TouchableOpacity> 
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle3} onPress={this.reload}>
          <Text style={styles.TextStyle}>Reload List</Text>
        </TouchableOpacity> 
      </View>
      </ImageBackground>
    )
  }
}
class UpdateAndDeleteFood extends React.Component{
  static navigationOptions={
    title:'Update And Delete Food'
  }
  constructor(props){
    super(props)
    this.state = {
      InputId:'',
      InputNombre:'',
      InputPorcion:'',
      InputOrden:'',
      InputNumero:'',
      InputDiet:''
    }
  }
  componentDidMount(){
    this.setState({
      InputId: this.props.navigation.state.params.id_comida,
      InputNombre: this.props.navigation.state.params.nombre_comida,
      InputPorcion: this.props.navigation.state.params.porcion_comida,
      InputOrden: this.props.navigation.state.params.orden_comida,
      InputNumero:this.props.navigation.state.params.numero_comida,
      InputDiet:this.props.navigation.state.params.id_dieta,
    })
  }
  UpdateUsers=()=>{
    if(!this.state.InputNombre || !this.state.InputPrecio || !this.state.InputNumero ){
      Alert.alert('Error','Asegurese de ingresar bien los datos');
    }else{
      const {InputNumero} =this.state;

      switch(this.state.InputNumero){
          case "0":
          console.log("Entro al 1")
              this.state.InputOrden="Primera Comida"
              break;
          case "1":
              console.log("Entro al 2")
              this.state.InputOrden="Segunda Comida"
              break;
          case "2":
          console.log("Entro al 3")
              this.state.InputOrden="Tercera Comida"
              break;
      }
    fetch('http://weaweawea.atwebpages.com/updateFood.php',{
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        id_comida:this.state.InputId,
        nombre_comida:this.state.InputNombre,
        porcion_comida:this.state.InputPorcion,
        orden_comida: this.state.InputOrden,
        numero_comida:this.state.InputNumero,
        id_dieta:this.state.InputDiet
      })
    }).then((response)=>response.json())
    .then((responseJson)=> {
      Alert.alert(responseJson);
      this.props.navigation.navigate('Second',{InputDiet:this.state.InputDiet});
    }).catch((error)=> {
      console.error(error);
    })
    this.props.navigation.navigate('Second',{InputDiet:this.state.InputDiet})

    }    
  }
  DeleteUsers=()=>{
    fetch('http://weaweawea.atwebpages.com/deleteFood.php',{
          method: 'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            id_comida:this.state.InputId
          })
        }).then((response)=>response.json())
        .then((responseJson)=>{
          Alert.alert(responseJson);
          this.props.navigation.navigate('Second');
        }).catch((error)=>{
          console.error(error);
        })
        this.props.navigation.navigate('Second')
  }
  render(){
    return(
      <ImageBackground source={require('../../img/menu1.jpg')} style={styles.imageContainer}>
      <View style={styles.Container}>
        <TextInput 
        value = {this.state.InputNombre} 
        placeholder="Food Name"
        onChangeText={InputNombre => this.setState({InputNombre})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle2}/>

        <TextInput 
        value = {this.state.InputPorcion} 
        placeholder="Food Portion Kg"
        onChangeText={InputPorcion => this.setState({InputPorcion})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}
        keyboardType='numeric'
        maxLength={3}/>

        <Picker
            placeholder="Order"
            selectedValue={this.state.InputNumero}
            style={{ height: 50, width: "85%" }}
            onValueChange={(itemValue, itemIndex) => this.setState({InputNumero: itemValue})}>
            <Picker.Item label="Primera Comida" value="0" />
            <Picker.Item label="Segunda Comida " value="1" />
            <Picker.Item label="Tercera Comida" value="2" />
        </Picker>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.UpdateUsers}>
          <Text style={styles.TextStyle}>UPDATE</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle2} onPress={this.DeleteUsers}>
          <Text style={styles.TextStyle}>DELETE</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    )
  }
}
export default App=createStackNavigator({
  First:{screen:InputFood},
  Second:{screen:ViewDataFood},
  Thire:{screen:UpdateAndDeleteFood}
  //<Button title='GUARDAR' onPress={this.InsertDataToServer} color='#2196F3'/>
        
});


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop:5,
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInputStyle:{
    backgroundColor: '#fff',
    textAlign:'center',
    marginBottom:7,
    height:40,
    width:'85%',
    borderWidth:1,
    borderColor:'#2196F3',
    borderRadius:5
  },
  TextInputStyle2:{
    backgroundColor: '#fff',
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
    marginRight:5,
    alignItems: 'center',
    width:'100%'
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