import  React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useThemedStyles } from '../../styles/styles';
import { useTheme } from '@react-navigation/native';
import CustomTable from '../../components/CustomTable';
import { fetchApplicationStatus } from '../../assets/functions/fetch';

interface IncompleteApplicationsProps {}

const IncompleteApplications = (props: IncompleteApplicationsProps) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState<string | null>(null); // Add an error state
  const [applicationId,setApplicationId] = useState('');
  const { colors } = useTheme();
  const { containerStyles } = useThemedStyles();

  const handleFunction = async(applicationId:string) =>{
    setApplicationId(applicationId);
    console.log(applicationId[0]);
  }

  useEffect(() => {
    fetchApplicationStatus(setColumns,setData,setError,setLoading,"Incomplete");
    }, []); // Empty dependency array ensures this runs only once

    if (loading) {
      return <ActivityIndicator size="large" color={colors.primary} style={containerStyles.fullScreen} />;
    }

    if (error) {
      return <Text style={{ color: colors.text }}>Error: {error}</Text>;
    }

  return (
    <View style={[containerStyles.fullScreen, { backgroundColor: colors.background, width: '100%' }]}>
      <CustomTable columns={columns} data={data} onButtonPress={handleFunction}/>
    </View>
  );
};

export default IncompleteApplications;
