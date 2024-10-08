import  React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useThemedStyles } from '../../styles/styles';
import Constants from 'expo-constants';
import { Image } from 'react-native';

interface IndexProps {}

const Index = (props: IndexProps) => {
    const {colors} =useTheme();
    const { SERVER_URL } = Constants.expoConfig?.extra || {};
    const { containerStyles } = useThemedStyles();
    const [userDetails,setUserDetails] = useState({
      initiated:0,
      incomplete:0,
      sanctioned:0,
      username:'',
      email:'',
      mobileNumber:'',
    })


    useEffect(()=>{
     const fetchUserDetails = async()=>{
        const result = await fetch(`${SERVER_URL}/User/GetUserDetails`);
        const data = await result.json();
        setUserDetails((prev)=>({
          ...prev,
          initiated:data.initiated,
          incomplete:data.incomplete,
          sanctioned:data.sanctioned,
          username:data.userDetails.username,
          email:data.userDetails.email,
          mobileNumber:data.userDetails.mobileNumber,
        }))
     }
     fetchUserDetails();
    },[])

  return (
    <View style={[containerStyles.fullScreen,{backgroundColor:colors.background,gap:10}]}>
       <View style={{backgroundColor:colors.primary,width:'100%',padding:10,borderRadius:10}}>
          <Text style={{color:colors.card,fontWeight:'bold',fontSize:24,marginBottom:10,textAlign:'center'}}>My Profile</Text>
          <View style={{gap:10, alignItems:'center'}}>
            <Image source={require("../../assets/socialwelfare.jpg")} style={{height:100,width:100}}/>
            <View style={{flexDirection:'row',justifyContent: 'space-between',backgroundColor:colors.background,borderRadius:5,padding:10,width:'100%'}}>
              <Text style={{color:colors.text}}>Username:</Text>
              <Text style={{color:colors.text}}>{userDetails.username}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent: 'space-between',backgroundColor:colors.background,borderRadius:5,padding:10,width:'100%'}}>
              <Text style={{color:colors.text}}>Email:</Text>
              <Text style={{color:colors.text}}>{userDetails.email}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent: 'space-between',backgroundColor:colors.background,borderRadius:5,padding:10,width:'100%'}}>
              <Text style={{color:colors.text}}>Mobile Number:</Text>
              <Text style={{color:colors.text}}>{userDetails.mobileNumber}</Text>
            </View>
          </View>
      </View>
      <View style={{backgroundColor:colors.card,width:'100%',padding:20,borderRadius:10,gap:10}}>
          <View style={{width:'100%',backgroundColor:colors.primary,padding:10,paddingHorizontal:20,borderRadius:25,flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontWeight:'bold',color:colors.background}}>Initiated Applictions</Text>
            <Text style={{fontWeight:'bold',color:colors.background}}>{userDetails.initiated}</Text>
          </View>
          <View style={{width:'100%',backgroundColor:colors.text,padding:10,paddingHorizontal:20,borderRadius:25,flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontWeight:'bold',color:colors.card}}>Incomplete Applictions</Text>
            <Text style={{fontWeight:'bold',color:colors.card}}>{userDetails.incomplete}</Text>
          </View>
          <View style={{width:'100%',backgroundColor:'#78C8A1',padding:10,paddingHorizontal:20,borderRadius:25,flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontWeight:'bold',color:colors.card}}>Sanctioned Applictions</Text>
            <Text style={{fontWeight:'bold',color:colors.card}}>{userDetails.sanctioned}</Text>
          </View>
      </View>
    </View>
  );
};

export default Index;

