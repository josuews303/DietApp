import React from 'react';
import { TouchableOpacity,ActivityIndicator,ListView,Alert,Button,StyleSheet, Text, View,AppRegistry,TextInput } from 'react-native';
import { createStackNavigator} from 'react-navigation';
import DatePicker from 'react-native-datepicker'
//Insert
class InputUsers extends React.Component{
  static navigationOptions={
    header: null
  }
    constructor(props){
        super(props);
        this.state={
            InputNombre:'',
            InputApellido:'',
            InputMail:'',
            InputCedula:'',
            InputDireccion:'',
            InputTelefono:'',
            InputNick:'',
            InputPass:'',
            isLoading: true,
            mailvalidate:false
        }
    }

    InsertDataToServer = () =>{
      
      if(this.state.mailvalidate==true){
        const {InputNombre} =this.state;
        const {InputApellido} =this.state;
        const {InputMail} =this.state;
        const {InputCedula} =this.state;
        const {InputDireccion} =this.state;
        const {InputTelefono} =this.state;
        const {InputNick} =this.state;
        const {InputPass} =this.state;

      
        fetch('http://weaweawea.atwebpages.com/insert.php',{
          method: 'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            nombre_usuario:InputNombre,
            apellido_usuario:InputApellido,
            mail_usuario: InputMail,
            cedula_usuario:InputCedula,
            direccion_usuario:InputDireccion,
            telefono_usuario:InputTelefono,
            nick_usuario:InputNick,
            pass_usuario:InputPass
          })
        }).then((response)=>response.json())
        .then((responseJson)=>{
          Alert.alert(responseJson);
          this.props.navigation.navigate('Second');
        }).catch((error)=>{
          console.error(error);
        });
      }else{
        Alert.alert('Error','Asegurese de ingresar bien los datos');
      }
        
    }


  mailvalidate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
    console.log("Email is Not Correct");
    this.setState({InputMail:text})
    return false;
      }
    else {
      this.setState({InputMail:text,mailvalidate:true})
      console.log("Email is Correct");
    }
    }
  render() {
    return (
      
      <View style={styles.Container}>
        <TextInput 
        placeholder="Name"
        onChangeText={InputNombre => this.setState({InputNombre})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle2}/>

        <TextInput 
        placeholder="Lastname"
        onChangeText={InputApellido => this.setState({InputApellido})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>

        <TextInput 
        placeholder="ID"
        onChangeText={InputCedula => this.setState({InputCedula})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}
        keyboardType='numeric'
        maxLength={10}/>

        <TextInput 
        placeholder="Address"
        onChangeText={InputDireccion => this.setState({InputDireccion})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>

        <TextInput 
        placeholder="Mail"
        onChangeText={(text) => this.mailvalidate(text)} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>

        <TextInput 
        placeholder="Phone"
        onChangeText={InputTelefono=> this.setState({InputTelefono})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}
        keyboardType='numeric'
        maxLength={10}/>

        <TextInput 
        placeholder="Username"
        onChangeText={InputNick => this.setState({InputNick})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>

        <TextInput 
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={InputPass => this.setState({InputPass})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="placeholder"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          
          onDateChange={(date) => {this.setState({date: date});}}
        />
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.InsertDataToServer}>
          <Text style={styles.TextStyle}>SAVE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default App=createStackNavigator({
  First:{screen:InputUsers}
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