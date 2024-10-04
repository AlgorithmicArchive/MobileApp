import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useThemedStyles } from '../../styles/styles';
import {  useTheme } from '@react-navigation/native';
import CustomTable from '../../components/CustomTable';
import { fetchApplicationStatus } from '../../assets/functions/fetch';
import TimelineModal from '../../components/Timeline';
interface ApplicationStatusProps {}

const ApplicationStatus = (props: ApplicationStatusProps) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState<string | null>(null); // Add an error state
  const [isModalVisible, setModalVisible] = useState(false);
  const [applicationId,setApplicationId] = useState('');
  const { colors } = useTheme();
  const { containerStyles } = useThemedStyles();

  const handleFunction = async(applicationId:string) =>{
    setModalVisible(true);
    setApplicationId(applicationId);
  }

    useEffect(() => {
    fetchApplicationStatus(setColumns,setData,setError,setLoading);
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
      <TimelineModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        applicationId={applicationId}
      />
    </View>
  );
};

export default ApplicationStatus;
