import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useThemedStyles } from '../../styles/styles';
import { useNavigation, useTheme } from '@react-navigation/native';
import Constants from 'expo-constants';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomTable from '../../components/CustomTable';
interface ServicesProps {}

const Services = (props: ServicesProps) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState<string | null>(null); // Add an error state
  const { colors } = useTheme();
  const { containerStyles } = useThemedStyles();
  const { SERVER_URL } = Constants.expoConfig?.extra || {};
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleFunction = async(serviceId:string) =>{
    const formdata = new FormData();
    formdata.append("serviceId",serviceId);
    const response = await fetch(`${SERVER_URL}/User/SetServiceForm`,{method:'post',body:formdata});
    const result = await response.json();
    if(result.status) navigation.navigate('Form');
  }

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (!SERVER_URL) {
          throw new Error('Server URL is not defined');
        }

        const response = await fetch(`${SERVER_URL}/User/GetServices`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        let col = result.obj.columns;
        col = col.map((obj: { title: any; })=>obj.title)
        setColumns(col);
        setData(result.obj.data);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, []); // Empty dependency array ensures this runs only once

    if (loading) {
      return <ActivityIndicator size="large" color={colors.primary} style={containerStyles.fullScreen} />;
    }

    if (error) {
      return <Text style={{ color: colors.text }}>Error: {error}</Text>;
    }

  return (
    <View style={[containerStyles.fullScreen, { backgroundColor: colors.background, width: '100%' }]}>
      {/* <DynamicTable columns={columns} data={data} onButtonPress={handleFunction}/> */}
      <CustomTable columns={columns} data={data} onButtonPress={handleFunction}/>
    </View>
  );
};

export default Services;
