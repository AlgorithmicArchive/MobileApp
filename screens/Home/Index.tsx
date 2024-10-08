import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { useThemedStyles} from '../../styles/styles';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CutomButton from '../../components/CustomButton';

interface IndexProps {}

const Index = (props: IndexProps) => {
    const {colors} =useTheme();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { containerStyles, buttonStyles } = useThemedStyles();
  return (
    <View style={[containerStyles.fullScreen,{backgroundColor:colors.background,gap:5}]}>
      <Image source={require('../../assets/socialwelfare.jpg')} style={{width:'100%',height:320,borderRadius:20}} />
      <CutomButton name='Get Started' onPress={()=>navigation.navigate('Login')}/>
    </View>
  );
};

export default Index;


