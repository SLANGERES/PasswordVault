import { Alert, Clipboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Form } from 'formik'
import { Formik } from 'formik'
import * as Yup from 'yup'
import BouncyCheckbox from "react-native-bouncy-checkbox";
const App = () => {

  //validation 
  const PasswordSchema=Yup.object().shape({
    passwordLength: Yup.number().min(4,'Should be min of 4').max(16,'Should be max of 16').required('Length is required')
  })
  const [password, setPassword]=useState('')
  const [isPassGenerated, setIsPassGenerated]=useState(false)
  const [lowerCase, setLowerCase]=useState(true)
  const [symbols, setSymbols]=useState(false)
  const [upperCase, setUpperCase]=useState(false)
  const [number, useNumber]=useState(false)


  const generatePasswordString=(passwordLength:number)=>{
    let characterList='';

    const upperCaseList='QWERTYUIOPASDFGHJKLZXCVBNM';
    const lowerCaseList='qwertyuiopasdfghjklzxcvbnm';
    const numberList='1234567890';
    const specialChar='!@#$%^&*()_+';

    if(lowerCase){
      characterList+=lowerCaseList;
    }
    if(upperCase){
      characterList+=upperCaseList;
    }
    if(symbols){
      characterList+=specialChar;
    }
    if(number){
      characterList+=numberList;
    }
    const password=createPassword(characterList,passwordLength);
    setPassword(password);
    setIsPassGenerated(true);
  }

  const createPassword=(characters: string,passwordLength:number)=>{
    let result=''
    for(let i=0;i<passwordLength;i++){
      const characterIndex = Math.floor(Math.random() * characters.length)
      result+=characters.charAt(characterIndex)
    }
    return result
  }
  const resetPassword = () =>{
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setSymbols(false);
    setUpperCase(false);
    useNumber(false);

  }
  const CopyToClipBoard=(text:string)=>{
    Clipboard.setString(text);
    Alert.alert('Copied to clipboard!')
    
  }


  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={{backgroundColor:'white'}}>
      <SafeAreaView>
        <View style={styles.FormContainer}>
            <Text style={styles.Headline}>
              Password Generator
            </Text>
            <Formik
                  initialValues={{ passwordLength:'' }}
                  validationSchema={PasswordSchema}
                  onSubmit={(values)=>{
                    //in this if we want to convert string into number we need to just add + in fornt in typescript or other wise we need to wrap things up in Number 
                    generatePasswordString(+values.passwordLength);
                    console.log(values);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    isValid,
                    handleChange,
                    handleSubmit,
                    handleReset,
                 
                  }) => (
                    <>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputColumn}>
                        <Text style={styles.heading}>Password Length</Text>
                        {touched.passwordLength && errors.passwordLength && (
                          <Text style={styles.errorText}>
                            {errors.passwordLength}
                          </Text>
                        )}

                      </View>
                      <TextInput
                        style={styles.inputStyle}
                        value={values.passwordLength}
                        onChangeText={handleChange('passwordLength')}
                        placeholder='Ex 9'
                        keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.Line}></View>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Include Lowecase</Text>
                      <BouncyCheckbox
                        isChecked={lowerCase}
                        onPress={()=>
                          setLowerCase(!lowerCase)
                        }
                        fillColor='blue'
                      />
                    </View>
                    <View style={styles.Line}></View>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Include UpperCase</Text>
                      <BouncyCheckbox
                        isChecked={upperCase}
                        onPress={()=>
                          setUpperCase(!upperCase)
                        }
                        fillColor='blue'
                      />
                    </View>
                    <View style={styles.Line}></View>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Include Symbols</Text>
                      <BouncyCheckbox
                        isChecked={symbols}
                        onPress={()=>
                          setSymbols(!symbols)
                        }
                        fillColor='blue'
                      />
                    </View>
                    <View style={styles.Line}></View>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Include Number</Text>
                      <BouncyCheckbox
                        isChecked={number}
                        onPress={()=>
                          useNumber(!number)
                        }
                        fillColor='blue'
                      />
                    </View>
                    <View style={styles.Line}></View>
                    <View style={styles.formAction}>
                      <TouchableOpacity
                      disabled={!isValid}
                      style={styles.primaryButton}
                      onPress={()=>handleSubmit()}
                      >
                        <Text>Generate Password</Text>

                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.secondaryButton}
                        onPress={()=>{handleReset();
                          resetPassword()
                        }}
                      >
                        <Text>Reset Password</Text>
                      </TouchableOpacity>
                    </View>
                    </>
                    
                  )}
                </Formik>
        </View>
        { isPassGenerated ? 
            (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Result</Text>
                <TouchableOpacity onPress={()=>{CopyToClipBoard(password)}}>
                  <Text style={styles.resultDescription}>Press Me To Copy 📋</Text>
                </TouchableOpacity>
                
                <Text style={styles.password}>{password}</Text>
              </View>
            )
        : null }
      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  FormContainer:{
    flex:1
  },
  Headline:{
    textAlign:'center',
    fontWeight:"bold",
    fontSize:30,
    margin:30,
    
  },
  heading:{
    fontSize:16,
  },
  inputStyle:{
    borderWidth:1,
    width:100,
    textAlign:"center"
  },
  inputContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    


  },
  inputColumn:{
    display:"flex",
    flexDirection:"row",
    margin:10,
    justifyContent:"space-between"
  },
  errorText:{
    color:"red",
    fontSize:14,
    marginLeft:10,
  },
  Line:{
    width:"95%",
    height:1,
    backgroundColor:'black',
    marginLeft:10

  },
  formAction:{
    margin:30,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  primaryButton:{
    display:"flex",
    justifyContent:"center",
    alignContent:"center",
    width:160,
    padding:5,
    alignItems:"center",
    borderWidth:1,
    height:40,
    borderRadius:100,
  },
  secondaryButton:{
    display:"flex",
    justifyContent:"center",
    alignContent:"center",
    width:160,
    padding:5,
    alignItems:"center",
    borderWidth:1,
    height:40,
    borderRadius:100,
  },
  resultContainer:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
    height:150,
  },
  resultText:{
    fontSize:25,
    fontWeight:"bold",
    margin:10,
  },
  resultDescription:{
    margin:10,
  },
  password:{
    margin:10,
    fontSize:25,
    color:"red",
  }
})