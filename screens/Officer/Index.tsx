import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Alert, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native';
import { useThemedStyles } from '../../styles/styles';
import CustomCard from '../../components/CustomCard';
import Constants from 'expo-constants';
import CustomSelect from '../../components/FormComponents/CustomSelect';
import { useForm } from 'react-hook-form';
import CustomTable from '../../components/CustomTable';
import { StackNavigationProp } from '@react-navigation/stack';

interface IndexProps {}

const Index = (props: IndexProps) => {
  const { SERVER_URL } = Constants.expoConfig?.extra || {};
  const { colors } = useTheme();
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [serviceId, setServiceId] = useState(0);
  const [cardVisible, setCarVisible] = useState(false);
  const [canSanction, setCanSanction] = useState(false);
  const [canForward, setCanForward] = useState(false);
  const [count, setCount] = useState({ pending: 0, forward: 0, reject: 0, return: 0, sanction: 0 });
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const { control, setValue } = useForm<any>();
  const { containerStyles } = useThemedStyles();

  // Create a ref for the ScrollView
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchServiceList = async () => {
      try {
        const result = await fetch(`${SERVER_URL}/Officer/GeServiceList`);
        const data = await result.json();
        const formattedServiceList = data.serviceList.map((service: any) => ({
          label: service.serviceName,
          value: service.serviceId,
        }));

        // Update the serviceList state
        setServiceList(formattedServiceList);
      } catch (error) {
        console.error('Failed to fetch service list:', error);
      }
    };

    fetchServiceList();
  }, []);

  useFocusEffect(
    useCallback(()=>{
      if(scrollViewRef.current){
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    },[])
  )

  const handleViewApplication = (applicationId: string) => {
    navigation.navigate('UserDetails', { applicationId });
  };

  const handlePullApplication = (applicationId: string) => {
    console.log('Pulled Application', applicationId);
  };

  const handleApplication = (applicationId: string, type: string) => {
    type == 'View' ? handleViewApplication(applicationId) : handlePullApplication(applicationId);
  };

  const handleCardChoice = async (type: string, count: number) => {
    if (count == 0) Alert.alert('Response', 'No Records for this.');
    else {
      console.log('Type', type);
      if (type == 'Forward' || type == 'return') type = 'Sent';
      const result = await fetch(
        `${SERVER_URL}/Officer/Applications?type=${type}&start=0&length=10&serviceId=${serviceId}`
      );
      const data = await result.json();
      let list;
      if (type == 'Pending') list = data.applicationList.pendingList;
      else if (type == 'Sent') list = data.applicationList.sentList;
      let col = list.columns;
      col = col.map((obj: { title: any }) => obj.title);
      setColumns(col);
      setData(list.data);

      // Scroll to the CustomTable after setting the columns and data
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 500, animated: true }); // Adjust 'y' value as per your requirement
      }
    }
  };

  const handleServiceChange = async (selectedValue: any) => {
    try {
      const result = await fetch(`${SERVER_URL}/Officer/GetApplicationsList?ServiceId=${selectedValue}`);
      setServiceId(selectedValue);
      const data = await result.json();
      // Update the state with the data from countList
      setCount({
        pending: data.countList.pending,
        forward: data.countList.forward,
        reject: data.countList.reject,
        return: data.countList.return,
        sanction: data.countList.sanction,
      });

      // Update canSanction and canForward state
      setCanSanction(data.countList.canSanction);
      setCanForward(data.countList.canForward);

      setCarVisible(true); // Show card when service is selected
    } catch (error) {
      console.error('Failed to fetch applications list:', error);
    }
  };

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContainer} nestedScrollEnabled>
      <View style={containerStyles.fullScreen}>
        <CustomSelect
          name={'service'}
          control={control}
          placeholder={''}
          options={serviceList}
          label={'Select Service'}
          onChange={(selected) => {
            handleServiceChange(selected); // Call your handler function
            setValue('service', selected); // Update form state with selected value
          }}
        />
        {cardVisible ? (
          <View style={[containerStyles.fullScreen, { backgroundColor: colors.background }]}>
            {/* Card Container for proper alignment */}
            <View style={styles.cardContainer}>
              {/* Pending Applications Card */}
              <CustomCard
                bgColor="#F0C38E"
                textColor="#312C51"
                title="Pending Applications"
                icon="hourglass-outline"
                value={count.pending}
                onPress={() => handleCardChoice('Pending', count.pending)}
              />

              {/* Rejected Applications Card */}
              <CustomCard
                bgColor="#DC3545"
                textColor="#FFF"
                title="Rejected Applications"
                icon="close-circle-outline"
                value={count.reject}
                onPress={() => handleCardChoice('Reject', count.reject)}
              />

              {/* Returned Applications Card */}
              <CustomCard
                bgColor="#FD7E14"
                textColor="#FFF"
                title="Returned Applications"
                icon="arrow-undo-outline"
                value={count.return}
                onPress={() => handleCardChoice('Return', count.return)}
              />

              {/* Forwarded Applications Card - Show only if `canForward` is true */}
              {canForward && (
                <CustomCard
                  bgColor="#007BFF"
                  textColor="#FFF"
                  title="Forwarded Applications"
                  icon="arrow-forward-outline"
                  value={count.forward}
                  onPress={() => handleCardChoice('Forward', count.forward)}
                />
              )}

              {/* Sanctioned Applications Card - Show only if `canSanction` is true */}
              {canSanction && (
                <CustomCard
                  bgColor="#28A745"
                  textColor="#FFF"
                  title="Sanctioned Applications"
                  icon="checkmark-done-outline"
                  value={count.sanction}
                  onPress={() => handleCardChoice('Sanction', count.sanction)}
                />
              )}
            </View>
            {columns.length != 0 && (
              <CustomTable columns={columns} data={data} onButtonPress={handleApplication} />
            )}
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Index;

// StyleSheet for Index Component
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Enable wrapping of cards
    justifyContent: 'space-between',
    width: '100%', // Space between cards
  },
});
