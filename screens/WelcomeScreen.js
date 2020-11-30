import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal, KeyboardAvoidingView, ScrollView } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      isModalVisible:false,
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
    }
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage)
    })
  }

  userSignUp = (emailId, password, confirmPassword) =>{
    if(password!==confirmPassword){
      return alert('Password does not match')
    }
    else{
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
      .then((response)=>{
        return alert("User Added Successfully")
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage)
      });
      db.collection('users').add({
        first_name:this.state.firstName,
        last_name:this.state.lastName,
        address:this.state.address,
        email_id:this.state.emailId,
        contact:this.state.contact
      })
    }
    
  }

showModal=()=>{
return(
  <Modal 
  animationType='fade'
  transparent={true}
  visible={this.state.isModalVisible}
  >
    <View>
      <ScrollView>
        <KeyboardAvoidingView>
          <Text> Sign Up Form</Text>
          <TextInput
          style={styles.loginBox}
          keyboardType='normal'
          placeholder="first name"
          placeholderTextColor = "#ffff"
          maxLength={20}
          onChangeText={(text)=>{
            this.setState({
              firstName:text
            })
          }}
        />
        <TextInput
          style={styles.loginBox}
          keyboardType='normal'
          placeholder="last name"
          placeholderTextColor = "#ffff"
          maxLength={20}
          onChangeText={(text)=>{
            this.setState({
              lastName:text
            })
          }}
        />
        <TextInput
          style={styles.loginBox}
          keyboardType='normal'
          placeholder="address"
          placeholderTextColor = "#ffff"
          multiline={true}
          onChangeText={(text)=>{
            this.setState({
              address:text
            })
          }}
        />
        <TextInput
          style={styles.loginBox}
          keyboardType='numeric'
          placeholder="contact"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              contact:text
            })
          }}
        />
        <TextInput
          style={styles.loginBox}
          keyboardType='email-address'
          placeholder="E-mail"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              emailId:text
            })
          }}
        />
        <TextInput
          style={styles.loginBox}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password:text
            })
          }}
        />
         <TextInput
          style={styles.loginBox}
          secureTextEntry={true}
          placeholder=" Confirm Password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              confirmPassword:text
            })
          }}
        />
         <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)}}
            >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.setState({isModalVisible:false})}}
            >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  </Modal>
) 
}
  render(){
    return(
      <View style={styles.container}>
        <View>
          {this.showModal()}
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Barter System</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@bartersystem.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.setState({isModalVisible:true})}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  }
})