import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

import Constants from 'expo-constants';
import { useTheme } from '@react-navigation/native';
import CustomTable from './CustomTable';
const { SERVER_URL } = Constants.expoConfig?.extra || {};
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Phase {
  ReceivedOn: string;
  Officer: string;
  ActionTaken: string;
  Remarks: string;
  HasApplication: boolean;
}

interface TimelineModalProps {
  visible: boolean;
  onClose: () => void;
  applicationId: string;
}

const TimelineModal: React.FC<TimelineModalProps> = ({ visible, onClose, applicationId }) => {
  const [columns,setColumns] = useState(["Date","Officer","Action Taken","Remarks"]);
  const [data,setData] = useState<string[][]>([]);
  const [sanctioned, setSanctioned] = useState(false);
  const [returnedToEdit, setReturnedToEdit] = useState(false);
  const {colors} = useTheme();
  useEffect(() => {
    // Fetch phases when the modal becomes visible
    if (visible) {
      const fetchPhases = async () => {
        try {
          const res = await fetch(`${SERVER_URL}/User/GetPhases?ApplicationId=${applicationId}`);
          const data = await res.json();
          const parsedPhases: Phase[] = JSON.parse(data.phase);
          const tempColumns = ["ReceivedOn","Officer","ActionTaken","Remarks"];
          const tempdata:string[][] = parsedPhases.map(obj=>tempColumns.map(key=>obj[key]));
          setData(tempdata)
          // Determine if the application is sanctioned or returned to edit
          let isSanctioned = false;
          let isReturnedToEdit = false;

          for (let i = 0; i < parsedPhases.length; i++) {
            const item = parsedPhases[i];
            if (item.ActionTaken.trim() === 'Sanction') {
              isSanctioned = true;
            }
            if (item.ActionTaken.trim() === 'ReturnToEdit') {
              isReturnedToEdit = true;
            }
            if (item.HasApplication || item.ActionTaken === 'ReturnToEdit') {
              break;
            }
          }

          setSanctioned(isSanctioned);
          setReturnedToEdit(isReturnedToEdit);
        } catch (error) {
          console.error('Error fetching phases:', error);
        }
      };

      fetchPhases();
    }
  }, [visible, applicationId]);


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent,{backgroundColor:colors.card}]}>
          {/* Close Button */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name='close-circle-outline' color={colors.primary} size={30}/>
          </Pressable>

          {/* Display Application ID */}
          <Text style={[styles.applicationId,{color:colors.primary}]}>Application Number: {applicationId}</Text>

          {/* Render Timeline with Border and Scrollability */}
          <CustomTable columns={columns} data={data} onButtonPress={()=>{}} />

          {/* Action Buttons */}
          <View style={styles.statusButtons}>
            {returnedToEdit && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => EditForm(applicationId, returnedToEdit)}
              >
                <Text style={styles.buttonText}>Edit Form</Text>
              </TouchableOpacity>
            )}
            {sanctioned && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => downloadFile(applicationId)}
              >
                <Text style={styles.buttonText}>Download Sanction Letter</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Example of placeholder functions for EditForm and downloadFile
const EditForm = (applicationId: string, returnedToEdit: boolean) => {
  console.log(`Edit Form for Application ID: ${applicationId}, Returned to Edit: ${returnedToEdit}`);
};

const downloadFile = (applicationId: string) => {
  console.log(`Download file for Application ID: ${applicationId}`);
};

// Styles for the component
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '80%', // Increase height to allow scrollable content
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  applicationId: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 8,
    width: '100%', // Ensure header takes full width
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  phaseRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1, // Add bottom border for each row
    borderBottomColor: '#ccc',
  },
  phaseCell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  flatList: {
    flexGrow: 0,
    maxHeight: '60%', // Limit height to allow scrolling if content is large
    width: '100%', // Full width for FlatList
    borderWidth: 1, // Add border around the FlatList
    borderRadius: 8,
  },
  flatListContent: {
    paddingVertical: 8, // Add padding inside the FlatList
  },
  statusButtons: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TimelineModal;
