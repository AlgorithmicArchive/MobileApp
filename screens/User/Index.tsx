import  React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useThemedStyles } from '../../styles/styles';

interface IndexProps {}

const Index = (props: IndexProps) => {
    const {colors} =useTheme();
    const { containerStyles, buttonStyles } = useThemedStyles();
    const [counts,setCounts] = useState({
      initiated:0,
      incomplete:0,
      sanctioned:0,
    })


    useEffect(()=>{
     const fetchUserDetails = async()=>{
        
     }

    },[])

  return (
    <View style={[containerStyles.fullScreen,{backgroundColor:colors.background,gap:10}]}>
        <View style={{width:'100%',backgroundColor:colors.primary,padding:10,paddingHorizontal:20,borderRadius:25,flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontWeight:'bold',color:colors.background}}>Initiated Applictions</Text>
          <Text style={{fontWeight:'bold',color:colors.background}}>{counts.initiated}</Text>
        </View>
        <View style={{width:'100%',backgroundColor:colors.text,padding:10,paddingHorizontal:20,borderRadius:25,flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontWeight:'bold',color:colors.card}}>Incomplete Applictions</Text>
          <Text style={{fontWeight:'bold',color:colors.card}}>{counts.incomplete}</Text>
        </View>
        <View style={{width:'100%',backgroundColor:'#78C8A1',padding:10,paddingHorizontal:20,borderRadius:25,flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontWeight:'bold',color:colors.card}}>Sanctioned Applictions</Text>
          <Text style={{fontWeight:'bold',color:colors.card}}>{counts.sanctioned}</Text>
        </View>
    </View>
  );
};

export default Index;

