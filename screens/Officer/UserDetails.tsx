import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchApplicationDetails } from '../../assets/functions/fetch';
import { useThemedStyles } from '../../styles/styles';
import { Image } from 'react-native-elements';
import Constants from 'expo-constants';
import { useTheme } from '@react-navigation/native';
import WebViewModal from '../../components/WebViewModal';
import CustomSelect from '../../components/FormComponents/CustomSelect';
import { useForm } from 'react-hook-form';
import CustomTable from '../../components/CustomTable';
import CutomButton from '../../components/CustomButton';
import CustomInput from '../../components/FormComponents/CustomInput';
import CustomFileSelector from '../../components/FormComponents/CustomFileSelector';
const { SERVER_URL } = Constants.expoConfig?.extra || {};

// Define the type for generalDetail
type GeneralDetails = {
  applicationId: string;
  applicantImage: string;
  applicantName: string;
  email: string;
  relation: string;
  relationName: string;
  serviceSpecific: { [key: string]: any }; // serviceSpecific is an object with dynamic keys and any value type
  dateOfBirth: string;
  category: string;
  submissionDate: string;
};

type AddressDetails = {
    address:string,
    district:string,
    tehsil:string,
    block:string,
    panchayatMuncipality:string,
    village:string,
    ward:string,
    pincode:string
};

type BankDetails = {
    bankName:string,
    branchName:string,
    ifscCode:string,
    accountNumber:string,
}

type Document = {
    Label: string;
    Enclosure: string;
    File: string;
  };

const UserDetails = ({ route }) => {
  // Initial state with default values
  const [generalDetails, setGeneralDetails] = useState<GeneralDetails | null>(null);
  const [preAddressDetail,setPreAddressDetails] = useState<AddressDetails | null>(null)
  const [perAddressDetail,setPerAddressDetails] = useState<AddressDetails | null>(null)
  const [bankDetails,setBankDetails] = useState<BankDetails |null>(null);
  const [documents,setDocuments] = useState<Document[] | []>([]);
  const [actionOptions,setActionOptions] = useState([])
  const [previousActions,setPreviousActions] = useState({columns:[],data:[]});
  const [documentUrl, setDocumentUrl] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const { control, formState: { errors },getValues,watch } = useForm<any>({ mode: 'all', reValidateMode: 'onChange' });
  const action = watch('action');
  const {colors} = useTheme();

  const { applicationId } = route.params;
  const { containerStyles } = useThemedStyles();

  const handleDocumentModel=(documentUrl)=>{
    setDocumentUrl(documentUrl);
    setModalVisible(true);
  }

  const handleTakeAction = ()=>{
    console.log("Form Data",getValues());
  }


  // Function to format keys for display
  const formatKey = (key: string): string => {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before capital letters
      .replace(/_/g, ' ') // Replace underscores with space (for snake_case support)
      .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
  };

  // Fetch application details on component mount
  useEffect(() => {
    fetchApplicationDetails(applicationId, setGeneralDetails,setPreAddressDetails,setPerAddressDetails,setBankDetails,setDocuments,setActionOptions,setPreviousActions);
  }, [applicationId]);

  // Helper function to render values safely within <Text> components
  const renderValue = (key: string, value: any) => {
    if (key === 'serviceSpecific') {
      // If serviceSpecific is a string, parse it into an object
      const serviceSpecific = typeof value === 'string' ? JSON.parse(value) : value;

      return (
        <View style={{ marginVertical: 5 }} key={key}>
          {Object.entries(serviceSpecific).map(([serviceKey, serviceValue]) => {
            // If the value is a digit (number), do not render it
            if (!isNaN(serviceValue as number)) return null;

            return (
              <View key={serviceKey} style={{ marginVertical: 5,flexDirection:'row',alignItems:'center',justifyContent:'space-between', borderWidth: 0, borderRadius: 5,borderColor: colors.primary,padding:5 }}>
                <Text style={{ fontWeight: 'bold',color:colors.primary }}>{formatKey(serviceKey)}:</Text>
                <Text style={{ fontSize: 18,color:colors.text,padding: 5 }}>
                  {String(serviceValue)}
                </Text>
              </View>
            );
          })}
        </View>
      );
    } 
    else if(key == 'applicantImage'){
        return (
            <View style={{ marginVertical: 5,flexDirection:'row',alignItems:'center',justifyContent:'space-between', borderWidth: 0, borderRadius: 5,borderColor: colors.primary,padding:5 }} key={key}>
            <Text style={{ fontWeight: 'bold', fontSize: 16,color:colors.primary }}>
              {formatKey(key)}
            </Text>
          
            <View style={{ alignItems: 'center' }}>
              <Image
                source={{ uri: `${SERVER_URL}/${value}` }}
                style={{ width: 100, height: 100, borderRadius: 20 }}
              />
            </View>
          </View>
        )
    }
    else {
      return (
        <View style={{ marginVertical: 5,flexDirection:'row',alignItems:'center',justifyContent:'space-between', borderWidth: 0, borderRadius: 5,borderColor: colors.primary,padding:5,flexWrap:key=="bankName"?'wrap':'nowrap' }} key={key}>
          <Text style={{ fontWeight: 'bold', fontSize: 16,color:colors.primary }}>{formatKey(key)}:</Text>
          <Text style={{ fontSize: 18,color:colors.text, padding: 5 }}>
            {String(value)}
          </Text>
        </View>
      );
    }
  };

  const renderDocument = (doc) =>{
    return(
        <View style={{ marginVertical: 5 }} key={doc.Label}>
            <Text style={{ fontWeight: 'bold', fontSize: 16,color:colors.primary }}>{doc.Label}:</Text>
            <Text style={{ fontSize: 18, color:colors.text }} onPress={()=>{handleDocumentModel(doc.File)}}>
            {doc.Enclosure}
            </Text>
        </View>
    )
  }

  return (
    <ScrollView>
      <View style={[containerStyles.fullScreen,{paddingVertical:5,paddingHorizontal:20}]}>

        <View style={[styles.section,{backgroundColor:colors.card}]}>
          <Text style={{fontSize:24,fontWeight:'bold',marginBottom:10,color:colors.primary}}>General Details</Text>
          {generalDetails && Object.entries(generalDetails).map(([key, value]) => (
            <View key={key} style={{  width: '100%' }}>
              {renderValue(key, value)}
            </View>
          ))}
        </View>
        <View style={[styles.section,{backgroundColor:colors.card}]}>
          <Text style={{fontSize:24,fontWeight:'bold',marginBottom:10,color:colors.primary,marginTop:10}}>Present Address Details</Text>
          {preAddressDetail && Object.entries(preAddressDetail).map(([key, value]) => (
            <View key={key} style={{  width: '100%' }}>
              {renderValue(key, value)}
            </View>
          ))}
        </View>
       
        <View style={[styles.section,{backgroundColor:colors.card}]}>
          <Text style={{fontSize:24,fontWeight:'bold',marginBottom:10,color:colors.primary,marginTop:10}}>Permanent Address Details</Text>
          {perAddressDetail && Object.entries(perAddressDetail).map(([key, value]) => (
            <View key={key} style={{  width: '100%' }}>
              {renderValue(key, value)}
            </View>
          ))}
        </View>
        
        <View style={[styles.section,{backgroundColor:colors.card}]}>
          <Text style={{fontSize:24,fontWeight:'bold',marginBottom:10,color:colors.primary,marginTop:10}}>Bank Details</Text>
          {bankDetails && Object.entries(bankDetails).map(([key, value]) => (
            <View key={key} style={{  width: '100%' }}>
              {renderValue(key, value)}
            </View>
          ))}
        </View>
        

        <View style={[styles.section,{backgroundColor:colors.card}]}>
          <Text style={{fontSize:24,fontWeight:'bold',marginBottom:10,color:colors.primary,marginTop:10}}>Previous Actions</Text>
          {previousActions && <CustomTable columns={previousActions.columns} data={previousActions.data} onButtonPress={function (...args: any[]): void {
            throw new Error('Function not implemented.');
          } }/>}
        </View>
       
        <View style={[styles.section,{backgroundColor:colors.card}]}>
          <Text style={{fontSize:24,fontWeight:'bold',marginBottom:10,color:colors.primary,marginTop:10}}>Bank Details</Text>
          {documents && documents.map((item,index)=>(
            <View key={index} style={{  width: '100%' }}>
              {renderDocument(item)}
            </View>
          ))}
        </View>
       

        <View style={{width:'100%',borderWidth:1,borderRadius:5,borderColor:colors.primary,padding:5}}>
            <View style={{backgroundColor:colors.primary,padding:10,borderRadius:5}}>
                <Text style={{fontSize:14,fontWeight:'bold',color:colors.background}}>Action To Take</Text>
            </View>
            <View style={{padding:5,backgroundColor:colors.background,flexDirection:'column',gap:10}}>
                <CustomSelect name={'action'} control={control} placeholder={'Choose Action'} options={actionOptions} label={'Choose Action'} onChange={()=>{}}/>
                {action === "Forward" && (
                  <CustomFileSelector
                    control={control}
                    label="Certificate by TSWO"
                    name="certificate" // Ensure to give a unique name here
                    errors={errors}
                  />
                )}
                <CustomInput name={'remarks'} control={control} placeholder={'Remarks'}/>
                <CutomButton name={'Take Action'} onPress={handleTakeAction}/>
            </View>
        </View>
      </View>

    
      {isModalVisible && (
        <WebViewModal
          documentUrl={documentUrl}
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </ScrollView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  section:{
    width:'100%',
    backgroundColor:'#fff',
    padding:10,
    borderRadius:10,
    elevation:5,
    alignItems:'center',
    marginTop:10,
    marginBottom:10,
  }
})
