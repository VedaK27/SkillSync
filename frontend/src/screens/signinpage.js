import React, { useState } from "react";
import { Platform, Alert } from "react-native";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login_post } from "../services/users_api.js";


const Signin = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert("Please fill all the details.");
      return;
    }

    try {
      const response = await login_post({ emailOrUsername: username, password });
      console.log("Login Response:", response);

      if (response.error) {
        Alert.alert("Login Failed", response.error);
      } else {
        // Store token in AsyncStorage (already handled in login_post)
        const userId = response.user?._id; 
        const token = response.token ;
        console.log("Token :" , token) ;
        await AsyncStorage.setItem('token', token); // Ensure backend sends the user object
        props.navigation.navigate("Home", { userId });
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", "An unexpected error occurred. Please try again.");
    }
  };

  
  const goToSignUp = () => {
    props.navigation.navigate("SignUp");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/img/Sign_in_up/Sign_in_bg.png")} style={styles.bg_image} />
      
      <View>
        <Image source={require("../../assets/img/s_logo1_dbg3.png")} style={styles.image} />
        <Text style={styles.tagline}>Where Skills meets colloboration!</Text>
      </View>

      <View>
        {/* <Text style={styles.line}>Sign in to Your Account!</Text> */}
        <Text style={{ fontSize: 18, textAlign: "left", marginLeft: 30, marginTop: 70 }}>
        Sign in to Your Account!
        </Text>
      </View>

      <View style={styles.box}>
        <TextInput
          style={styles.TextBoxes}
          placeholder="Username"
          onChangeText={(text) => setUserName(text)}
          value={username}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                isPasswordVisible
                  ? require("../../assets/img/Sign_in_up/open_eyelid_4.png")
                  : require("../../assets/img/Sign_in_up/close_eyelid.png")
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity >
            <Text style={styles.forgot_pss}>Forgot Password ?</Text>
          </TouchableOpacity>
          
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.underscore}>___________________________________________</Text>

        <Text style={styles.line2}>Or Sign In with</Text>
      </View>
      <View style = {styles.gl_logo}>
              
              <TouchableOpacity>
                <Image style={styles.gg_logo}
                  source = {require('../../assets/img/Sign_in_up/google_logo.png')}
                />
              </TouchableOpacity>
      
              <TouchableOpacity>
                <Image style={styles.ll_logo}
                  source = {require('../../assets/img/Sign_in_up/linkedIn_logo.png')}
                />
              </TouchableOpacity>
            </View>
      
            <View style={styles.last}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={goToSignUp}><Text> Sign Up</Text></TouchableOpacity>
            </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  bg_image : {
    position: "absolute",
    width: "100%",
    height : 600 ,
    resizeMode: "cover",
  },
  image: {
    height: 120,
    width: 200,
    marginTop: Platform.OS === "ios" ? 5 : 30, // Adjust margin for iOS
    marginLeft: 20,
  },
  line: {
    marginTop: 100,
    marginLeft: 30,
    textAlign: "left",
    fontSize: 18,
  },
  line2: {
    textAlignVertical: "center",
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
    fontWeight: "500",
  },
  TextBoxes: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: "#F1F1F6",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
  },
  box: {
    margin: 15,
    paddingLeft : 10,
    paddingRight : 10
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F6",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
  },
  icon: {
    width: 30,  // Adjust width as needed
    height: 20, // Adjust height as needed
    marginLeft: 10,
    resizeMode: 'contain', // Ensures the image scales properly
  },
  
  loginButton: {
    marginTop: 15,
    backgroundColor: "#7164B4",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "90%", // Adjust width
    alignSelf: "center", // Centers the button
  },
  
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  line: {
    textAlignVertical: "center",
    textAlign: "center",
  },
  line2: {
    textAlignVertical: "center",
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
    fontWeight: "500",
  },
  forgot_pss : {
    textAlign : 'right' ,
    color : 'blue'

  },
  tagline: {
    margin: 10,
    marginLeft: 30,
    color: "white",
    fontWeight: "bold",
    marginTop: Platform.OS === "ios" ? 0 : 10, // Adjust positioning for iOS
  },
  gg_logo : 
  {
    height : 50 ,
    width : 50 ,
    margin : 20
  },
  underscore : {
    textAlign : 'center' ,
    marginTop: 10
  },
  ll_logo : 
  {
    height : 50 ,
    width : 65 ,
    margin : 20

  },
  gl_logo: {
    flexDirection: "row",         // Arrange the logos in a row
    justifyContent: "center", // Distribute the logos evenly with space between them
   
                    // Add top margin to create some space from the previous section
    paddingVertical: 10,          // Add vertical padding to the container
    width: '100%',                // Use full width to allow the icons to be spaced out properly
    alignItems: 'center',         // Vertically center the icons
    alignContent: 'center',  
    marginTop : 15     // Ensure the content is aligned in the center (for flexbox)
  },
  last : {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop : 10 ,
    textAlignVertical : 'center'
  }
});

export default Signin;


