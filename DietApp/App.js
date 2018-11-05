import React from 'react';
import { ActivityIndicator,ListView,AsyncStorage,Alert,TextInput,StyleSheet,TouchableOpacity,ImageBackground,Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Register from './app/components/Register';
import Measures from './app/components/Measures';


class LoginScreen extends React.Component {
    static navigationOptions = {
      header: null
  }
  constructor(props){
    super(props);
    this.state = {
        Input_username:'',
        Input_password:'',
    }
  }
  
  
  render() {
  return (
    <ImageBackground source={require('./img/login.jpg')} style={styles.imageContainer}>
        <View style={styles.container}>
            <Text style={styles.tittle}>Easy Diet</Text>
            <TextInput style={styles.textInput} 
                //value = {this.state.Input_username}
                placeholder='Username' 
                onChangeText={(Input_username) => this.setState({Input_username})} 
                underlineColorAndroid='transparent'/>
  
            <TextInput secureTextEntry={true} 
               style={styles.textInput} 
                //value = {this.state.Input_password}
                placeholder='Password' 
                onChangeText={(Input_password) => this.setState({Input_password})} 
                underlineColorAndroid='transparent'/>
  
            <TouchableOpacity onPress={(this.UserLoginFunction.bind(this))} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={(this.UserRegisterFunction.bind(this))} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
  );
  }
  UserRegisterFunction = () =>{
    
    this.props.navigation.navigate('RegisterScreen');
  }
 
  UserLoginFunction = () =>{
  
  const { Input_username }  = this.state ;
  const { Input_password }  = this.state ;


  fetch('http://weaweawea.atwebpages.com/User_Login.php', {
  method: 'POST',
  headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
  },
  body: JSON.stringify({
  
   nick_usuario: Input_username,
  
   pass_usuario: Input_password
  
  })
  
  }).then((response) => response.json())
     .then((responseJson) => {
  
       // If server response message same as Data Matched
      if(responseJson === 'Data Matched')
       {
        Alert.alert('Your login was successful');
           //Then open Profile activity and send user email to profile activity.
           //this.props.navigation.navigate('Second', { Email: UserEmail });
           console.log(this.state.Input_username);
           this.props.navigation.navigate('InputMeasure',{Input_username:this.state.Input_username});
  
       }
       else{
  
         Alert.alert(responseJson);
       }
  
     }).catch((error) => {
       console.error(error);
     });
  
  }
  }
  class RegisterScreen extends React.Component {
    static navigationOptions = {
      header: null
  }
  constructor(props){
    super(props);
    this.state = {
        Input_username:'',
        Input_password:'',
    }
  }
  
    render() {
    return (
      <Register/>
    );
    }
  
  }

  class ViewDataMeasure extends React.Component{
    static navigationOptions = {
      title:'Your Measures'
  }
  
    constructor(props){
      super(props)
      this.state = {
        isLoading:true,
        id_usuario:this.props.navigation.state.params.id_usuario,
      }
    }
  
    componentDidMount(){
      try {
        return fetch('http://weaweawea.atwebpages.com/viewMeasures.php', {
          method: 'POST',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          
           nick_usuario: this.state.id_usuario
          
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
      } catch (error) {
          console.error(error);
      }

      
    }
    reload = () => 
  {
      //RELOAD COMPONENT
      this.componentDidMount();
  };
  to_add = () =>{
    this.props.navigation.navigate('InputMeasure',{id_usuario:this.state.id_usuario});
  }
    Action_Click(id_medida,fecha_medida,edad_medida,peso_medida,altura_medida,imc_medida,detalle_medida,id_usuario){
      this.props.navigation.navigate('UpdateAndDeleteMeasures',{
          id_medida:id_medida,
          fecha_medida:fecha_medida,
          edad_medida:edad_medida,
          peso_medida:peso_medida,
          altura_medida:altura_medida,
          imc_medida:imc_medida,
          detalle_medida:detalle_medida,
          id_usuario:id_usuario
        
      })
      Alert.alert(fecha_medida,edad_medida);
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
                  rowData.id_medida,
                  rowData.fecha_medida,
                  rowData.edad_medida,
                  rowData.peso_medida,
                  rowData.altura_medida,
                  rowData.imc_medida,
                  rowData.detalle_medida,
                  rowData.id_usuario
                )}>
                {rowData.fecha_medida} {rowData.detalle_medida}
              </Text>
            }
          />
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle3} onPress={this.to_add}>
            <Text style={styles.TextStyle}>Add Measure</Text>
          </TouchableOpacity> 
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle3} onPress={this.reload}>
            <Text style={styles.TextStyle}>Reload List</Text>
          </TouchableOpacity> 
        </View>
      )
    }
  }
  class UpdateAndDeleteMeasures extends React.Component{
    static navigationOptions={
      title:'Update And Delete Users'
    }
    constructor(props){
      super(props)
      this.state = {
          id_medida:'',
          fecha_medida:'',
          edad_medida:'',
          peso_medida:'',
          altura_medida:'',
          imc_medida:'',
          detalle_medida:'',
          id_usuario:'',
          isLoading: true
      }
    }
    componentDidMount(){
      this.setState({
        id_medida: this.props.navigation.state.params.id_medida,
        fecha_medida: this.props.navigation.state.params.fecha_medida,
        edad_medida: this.props.navigation.state.params.edad_medida,
        peso_medida: this.props.navigation.state.params.peso_medida,
        altura_medida: this.props.navigation.state.params.altura_medida,
        imc_medida: this.props.navigation.state.params.imc_medida,
        detalle_medida: this.props.navigation.state.params.detalle_medida,
        id_usuario: this.props.navigation.state.params.id_usuario,
      
      })
    }
    ////////////Update Measure/////
    UpdateMeasure=()=>{
        imc_cal=(this.state.peso_medida/((this.state.altura_medida/100)*(this.state.altura_medida/100)));
         if(imc_cal< 18){
            detalle_medida='Desnutrido';
        }else{
            if(imc_cal>=18 && imc_cal<25){
                detalle_medida='Normal';
            }else{
                if(imc_cal >= 25 && imc_cal < 30){
                    detalle_medida='Sobrepeso';
                }else{
                    if(imc_cal>=30 && imc_cal <35){
                        detalle_medida='Obesidad Grado 1';
                    }else{
                        if(imc_cal >= 35 && imc_cal < 40){
                            detalle_medida='Obesidad Grado 2';
                        }else{
                            detalle_medida='Obesidad Grado 3';
                        }
                    }
                }
            }
        }
        fetch('http://weaweawea.atwebpages.com/updateMeasure.php',{
          method: 'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            id_medida:this.state.id_medida,
            peso_medida:this.state.peso_medida,
            altura_medida:this.state.altura_medida,
            edad_medida:this.state.edad_medida,
            imc_medida:imc_cal,
            detalle_medida:detalle_medida
          })
        }).then((response)=>response.json())
        .then((responseJson)=> {
          Alert.alert(responseJson);
          this.props.navigation.navigate('ViewDataMeasure',{id_usuario:this.state.id_usuario});
        }).catch((error)=> {
          console.error(error);
        })
        this.props.navigation.navigate('ViewDataMeasure',{id_usuario:this.state.id_usuario});
      }
      //////////////////Delete Measure/////////
    DeleteMeasure=()=>{
      fetch('http://weaweawea.atwebpages.com/deleteMeasure.php',{
            method: 'POST',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              id_medida:this.state.id_medida
            })
          }).then((response)=>response.json())
          .then((responseJson)=>{
            Alert.alert(responseJson);
            this.props.navigation.navigate('ViewDataMeasure',{id_usuario:this.state.id_usuario});
          }).catch((error)=>{
            console.error(error);
          })
          this.props.navigation.navigate('ViewDataMeasure',{id_usuario:this.state.id_usuario});
    }
   
    render(){
      return(
        <View style={styles.Container}>
  
          <TextInput 
          value= {this.state.peso_medida}
          placeholder="Enter your Weight as kg"
          onChangeText={peso_medida => this.setState({peso_medida})} 
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle2}
          keyboardType='numeric'
          maxLength={2}/>
  
          <TextInput 
          value={this.state.altura_medida}
          placeholder="Enter your Height as cm"
          onChangeText={altura_medida => this.setState({altura_medida})} 
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle}
          keyboardType='numeric'
          maxLength={3}/>
          <TextInput 
          value={this.state.edad_medida}
          placeholder="Enter your Age"
          onChangeText={edad_medida => this.setState({edad_medida})} 
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle}
          keyboardType='numeric'
          maxLength={2}/>
  
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.UpdateMeasure}>
            <Text style={styles.TextStyle}>UPDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle2} onPress={this.DeleteMeasure}>
            <Text style={styles.TextStyle}>DELETE</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  class InputMeasure extends React.Component{
    static navigationOptions={
      title:'New Measure'
    }
      constructor(props){
          super(props);
          this.state={
              date:"1997-06-10",
              InputEdad:'',
              InputPeso:'',
              InputAltura:'',
              IMC:'',
              detalle_medida:'',
              id_usuario:this.props.navigation.state.params.Input_username,
              isLoading: true,
              mailvalidate:false
          }
      }
 
      InsertDataToServer = () =>{
        
        if(this.state.mailvalidate==false){
          const {date} =this.state;
          const {InputEdad} =this.state;
          const {InputPeso} =this.state;
          const {InputAltura} =this.state;
          const {IMC} =this.state;
          const {detalle_medida} =this.state;
          const {id_usuario} =this.state;
          console.log(id_usuario);
          
        
        fechaActual=new Date();
         imc_cal=(InputPeso/((InputAltura/100)*(InputAltura/100)));
         if(imc_cal< 18){
            detalle_medida='Desnutrido';
        }else{
            if(imc_cal>=18 && imc_cal<25){
                detalle_medida='Normal';
            }else{
                if(imc_cal >= 25 && imc_cal < 30){
                    detalle_medida='Sobrepeso';
                }else{
                    if(imc_cal>=30 && imc_cal <35){
                        detalle_medida='Obesidad Grado 1';
                    }else{
                        if(imc_cal >= 35 && imc_cal < 40){
                            detalle_medida='Obesidad Grado 2';
                        }else{
                            detalle_medida='Obesidad Grado 3';
                        }
                    }
                }
            }
        }
          fetch('http://weaweawea.atwebpages.com/insertMeasure.php',{
            method: 'POST',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              fecha_medida:fechaActual,
              peso_medida: InputPeso,
              altura_medida:InputAltura,
              imc_medida:imc_cal,
              id_usuario:id_usuario,
              edad_medida:InputEdad,
              detalle_medida:detalle_medida
            })
          }).then((response)=>response.json())
          .then((responseJson)=>{
            Alert.alert(responseJson);
            this.props.navigation.navigate('ViewDataMeasure',{id_usuario:this.state.id_usuario});
          }).catch((error)=>{
            console.error(error);
          });
          this.props.navigation.navigate('ViewDataMeasure',{id_usuario:this.state.id_usuario});
        }else{
          Alert.alert('Error','Asegurese de ingresar bien los datos');
        }
          
      }
    ViewMeasuresList=()=>{
      this.props.navigation.navigate('ViewDataMeasure',{id_usuario:this.state.id_usuario});
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
          placeholder="Enter your Weight as kg"
          onChangeText={InputPeso => this.setState({InputPeso})} 
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle2}
          keyboardType='numeric'
          maxLength={2}/>
  
          <TextInput 
          placeholder="Enter your Height as cm"
          onChangeText={InputAltura => this.setState({InputAltura})} 
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle}
          keyboardType='numeric'
          maxLength={3}/>

          <TextInput 
          placeholder="Enter your Age"
          onChangeText={InputEdad => this.setState({InputEdad})} 
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle}
          keyboardType='numeric'
          maxLength={2}/>
  
          
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.InsertDataToServer}>
            <Text style={styles.TextStyle}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.ViewMeasuresList}>
            <Text style={styles.TextStyle}>SHOW MEASURES</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  const RootStack = createStackNavigator(
    {
      
      LoginScreen:LoginScreen,
      RegisterScreen:RegisterScreen,
      InputMeasure:InputMeasure,
      ViewDataMeasure:ViewDataMeasure,
      UpdateAndDeleteMeasures:UpdateAndDeleteMeasures,
      
      
    },
    {
      initialRouteName: 'LoginScreen',
    }
  );
  
  export default class App extends React.Component {
    render() {
      return <RootStack />;
    }
  }
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
  