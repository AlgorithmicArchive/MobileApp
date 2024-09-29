import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';

const AcknowledgementScreen = () => {

  // Function to handle PDF generation
  const downloadFile = () => {
    Alert.alert("Export PDF", "This functionality can be implemented using a PDF generation library.");
  };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const serverUrl = Constants.expoConfig?.extra?.SERVER_URL;


  useEffect(() => {
    const fetchAcknowledgement = async () => {
      try {
        const response = await fetch(`${serverUrl}/User/GetAcknowledgement`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json(); // Assuming result is a dictionary like { "KEY": "VALUE" }
        setData(result); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching acknowledgement details:', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchAcknowledgement();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.fullScreenSection}>
      <View style={styles.container}>
        {/* Image */}
        <Image
          source={require('../../assets/emblem.png')} // Use the correct path to your image
          style={styles.image}
          resizeMode="contain"
        />
        {/* Text */}
        <Text style={styles.heading}>Union Territory of Jammu and Kashmir</Text>
        <Text style={styles.subheading}>Acknowledgement</Text>

        {/* Dynamic Table */}
        <View style={styles.table}>
          {Object.keys(data).map((key, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{key}</Text>
              <Text style={styles.tableCell}>{data[key]}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={downloadFile}>
        <Text style={styles.buttonText}>Export as PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles for the React Native component
const styles = StyleSheet.create({
  fullScreenSection: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AcknowledgementScreen;
