import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useThemedStyles } from '../../styles/styles';
import { useNavigation, useTheme } from '@react-navigation/native';
import Constants from 'expo-constants';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomTable from '../../components/CustomTable';
interface ServicesProps {}

const Services = (props: ServicesProps) => {
  const [columns, setColumns] = useState([{"title": "S.No."}, {"title": "Service Name"}, {"title": "Department"}, {"title": "Action"}]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState<string | null>(null); // Add an error state
  const { colors } = useTheme();
  const { containerStyles } = useThemedStyles();
  const serverUrl = Constants?.expoConfig?.extra?.SERVER_URL;
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleFunction = async(serviceId:string) =>{
    const formdata = new FormData();
    formdata.append("serviceId",serviceId);
    const response = await fetch(`${serverUrl}/User/SetServiceForm`,{method:'post',body:formdata});
    const result = await response.json();
    if(result.status) navigation.navigate('Form');
  }

  useEffect(() => {
    const fetchServie = async () => {
      try {
        if (!serverUrl) {
          throw new Error('Server URL is not defined');
        }

        const response = await fetch(`${serverUrl}/User/GetServices`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setColumns(result.obj.columns);
        setData(result.obj.data);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServie();
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
