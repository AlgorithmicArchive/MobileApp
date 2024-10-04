import React, { useEffect, useState } from 'react';
import { Text, View, Alert, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useThemedStyles } from '../../styles/styles';
import CustomCard from '../../components/CustomCard';
import Constants from 'expo-constants';
import CustomSelect from '../../components/FormComponents/CustomSelect';
import { useForm } from 'react-hook-form';

interface IndexProps {}

const Index = (props: IndexProps) => {
  const { SERVER_URL } = Constants.expoConfig?.extra || {};
  const { colors } = useTheme();
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [cardVisible, setCarVisible] = useState(false);
  const [canSanction, setCanSanction] = useState(false);
  const [canForward, setCanForward] = useState(false);
  const [count, setCount] = useState({ pending: 0, forward: 0, reject: 0, return: 0, sanction: 0 });

  const { control, setValue } = useForm<any>();
  const { containerStyles } = useThemedStyles();

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

  const handleServiceChange = async (selectedValue: any) => {
    try {
      const result = await fetch(`${SERVER_URL}/Officer/GetApplicationsList?ServiceId=${selectedValue}`);
      const data = await result.json();
      console.log('Application Data', data.countList);

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
    <>
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ marginTop: 20 }}>
            <View style={[containerStyles.fullScreen, { backgroundColor: colors.background }]}>
              {/* Card Container for proper alignment */}
              <View style={styles.cardContainer}>
                {/* Pending Applications Card */}
                <CustomCard
                  bgColor="#FFC107"
                  textColor="#000"
                  title="Pending Applications"
                  icon="hourglass-outline"
                  value={count.pending}
                  onPress={() => Alert.alert('Pending Applications', `Pending: ${count.pending}`)}
                />

                {/* Rejected Applications Card */}
                <CustomCard
                  bgColor="#DC3545"
                  textColor="#FFF"
                  title="Rejected Applications"
                  icon="close-circle-outline"
                  value={count.reject}
                  onPress={() => Alert.alert('Rejected Applications', `Rejected: ${count.reject}`)}
                />

                {/* Returned Applications Card */}
                <CustomCard
                  bgColor="#FD7E14"
                  textColor="#FFF"
                  title="Returned Applications"
                  icon="arrow-undo-outline"
                  value={count.return}
                  onPress={() => Alert.alert('Returned Applications', `Returned: ${count.return}`)}
                />

                {/* Forwarded Applications Card - Show only if `canForward` is true */}
                {canForward && (
                  <CustomCard
                    bgColor="#007BFF"
                    textColor="#FFF"
                    title="Forwarded Applications"
                    icon="arrow-forward-outline"
                    value={count.forward}
                    onPress={() => Alert.alert('Forwarded Applications', `Forwarded: ${count.forward}`)}
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
                    onPress={() => Alert.alert('Sanctioned Applications', `Sanctioned: ${count.sanction}`)}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        ) : null}
      </View>
    </>
  );
};

export default Index;

// StyleSheet for Index Component
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',  // Enable wrapping of cards
    justifyContent: 'space-between',
    width:'100%',  // Space between cards
  },
});

