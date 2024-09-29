import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import StepForm from '../../components/FormComponents/StepForm';
import { Field } from '../../types';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { fetchServiceContent } from '../../assets/functions/fetch';
import * as FileSystem from 'expo-file-system'; // Import FileSystem to handle file reading
import { StackNavigationProp } from '@react-navigation/stack';

const Form: React.FC = () => {
  const { SERVER_URL } = Constants.expoConfig?.extra || {};
  const navigation = useNavigation<StackNavigationProp<any>>(); // Create navigation object
  const [serviceName, setServiceName] = useState<string>('');
  const [serviceId, setServiceId] = useState<string>('');
  const [generalForm, setGeneralForm] = useState<Field[]>([]);
  const [preAddressForm, setPreAddressForm] = useState<Field[]>([]);
  const [perAddressForm, setPerAddressForm] = useState<Field[]>([]);
  const [bankForm, setBankForm] = useState<Field[]>([]);
  const [documents, setDocuments] = useState<Field[]>([]);
  const [currentForm, setCurrentForm] = useState<Field[]>([]);
  const [step, setStep] = useState<number>(0);
  const [submittedForms, setSubmittedForms] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const [applicationId, setApplicationId] = useState<string>(''); // Store ApplicationId
  const [presentAddressId, setPresentAddressId] = useState<string>(''); // Store PresentAddressId
  const [permanentAddressId, setPermanentAddressId] = useState<string>(''); // Store PermanentAddressId

  const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm<any>({ mode: 'all', reValidateMode: 'onChange' });

  useEffect(() => {
    fetchServiceContent(setServiceName, setGeneralForm, setPreAddressForm, setPerAddressForm, setBankForm, setDocuments, setCurrentForm, setServiceId);
  }, [SERVER_URL]);

  // Update currentForm whenever step changes
  useEffect(() => {
    switch (step) {
      case 0:
        setCurrentForm(generalForm);
        break;
      case 1:
        setCurrentForm(preAddressForm);
        break;
      case 2:
        setCurrentForm(perAddressForm);
        break;
      case 3:
        setCurrentForm(bankForm);
        break;
      case 4:
        setCurrentForm(documents);
        break;
      default:
        setCurrentForm(generalForm);
    }
  }, [step, generalForm, preAddressForm, perAddressForm, bankForm, documents]);

  const getFormData = (data: any, fields: Field[]) => {
    const formData: { [key: string]: any } = {};
    fields.forEach((field) => {
      if (data.hasOwnProperty(field.name)) {
        formData[field.name] = data[field.name];
      }
    });
    return formData;
  };

  const submitForm = async (formData: FormData, url: string): Promise<any> => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error submitting form:', error);
      return null;
    }
  };

  const handleNext = async (data: any) => {
    let formData = new FormData();
    let url = '';
    let shouldSubmit = true;

    switch (step) {
      case 0: // General Form Submission
        if (!submittedForms[step]) {
          const generalData = getFormData(data, generalForm);
          const serviceSpecificData: { [key: string]: any } = {};

          // Segregate ServiceSpecific fields
          generalForm.forEach((field) => {
            if (field.isFormSpecific && generalData[field.name] !== undefined) {
              serviceSpecificData[field.name] = generalData[field.name];
              delete generalData[field.name];
            }
          });

          Object.keys(generalData).forEach((key) => formData.append(key, generalData[key]));

          // Handle image upload using FileSystem
          const imageUri = data.ApplicantImage;
          if (imageUri) {
            try {
              const fileInfo = await FileSystem.getInfoAsync(imageUri);
              const file = {
                uri: imageUri,
                type: 'image/jpeg',
                name: fileInfo.uri.split('/').pop(),
              };
              console.log("Image file",file);
              formData.append('ApplicantImage', file as any);
            } catch (error) {
              console.error('Error converting image:', error);
            }
          }

          if (Object.keys(serviceSpecificData).length > 0) {
            formData.append('ServiceSpecific', JSON.stringify(serviceSpecificData));
          }
          url = `${SERVER_URL}/User/InsertGeneralDetails`;
        } else {
          shouldSubmit = false;
        }
        break;

      case 1: // Skip submission, only switch to perAddressForm
        setCurrentForm(perAddressForm);
        shouldSubmit = false;
        break;

      case 2: // Combined address form submission (preAddressForm + perAddressForm)
        if (!submittedForms[step]) {
          const preAddressData = getFormData(data, preAddressForm);
          const perAddressData = getFormData(data, perAddressForm);

          // Combine preAddress and perAddress data
          const combinedAddressData = { ...preAddressData, ...perAddressData };

          // Append combined address fields
          Object.keys(combinedAddressData).forEach((key) => formData.append(key, combinedAddressData[key]));
          
          // Set URL to submit the combined address data
          url = `${SERVER_URL}/User/InsertAddressDetails`;
        } else {
          shouldSubmit = false;
        }
        break;

      case 3: // Bank form submission
        if (!submittedForms[step]) {
          const bankData = getFormData(data, bankForm);
          Object.keys(bankData).forEach((key) => formData.append(key, bankData[key]));
          url = `${SERVER_URL}/User/InsertBankDetails`;
        } else {
          shouldSubmit = false;
        }
        break;

      case 4: // Document form submission
        if (!submittedForms[step]) {
          const documentData = getFormData(data, documents); // Get the form data based on `documents`
          
          // Iterate over each key-value pair in `documentData`
          for (const key of Object.keys(documentData)) {
            const value = documentData[key];
            
            // Check if the field is a file based on its name or type (e.g., if the key ends with 'File')
            if (key.endsWith('File') && value) { // Assuming all file fields end with 'File'
              try {
                // Use FileSystem to get file information based on the URI
                const fileInfo = await FileSystem.getInfoAsync(value);
                
                // Create a file object with URI, type, and name
                const file = {
                  uri: value, // URI of the file
                  type: 'application/pdf', // Change this dynamically if needed based on the file type
                  name: fileInfo.uri.split('/').pop(), // Extract file name from URI
                };
                
                console.log(`File Object for ${key}:`, file);

                // Append the file to formData using the field name as the key
                formData.append(key, file as any);
              } catch (error) {
                console.error(`Error processing file for ${key}:`, error);
              }
            } else {
              // Append non-file fields as regular form data
              formData.append(key, value);
            }
          }
        
          // Process and append labels to formData
          const labels = documents.map((item) => item.label.split(" ").join(""));
          formData.append('labels', JSON.stringify(labels));
        
          // Append additional fields to formData as required
          formData.append('AccessCode', data.District);
        
          // Set the URL for document submission
          url = `${SERVER_URL}/User/InsertDocuments`;
        } else {
          shouldSubmit = false;
        }
        break;

      default:
        shouldSubmit = false;
        break;
    }

    if (shouldSubmit && url) {
      // Append IDs if available
      if (applicationId) formData.append('ApplicationId', applicationId);
      if (presentAddressId) formData.append('PresentAddressId', presentAddressId);
      if (permanentAddressId) formData.append('PermanentAddressId', permanentAddressId);

      formData.append('ServiceId', serviceId);

      try {
        // console.log("FORM DATA", formData);
        const result = await submitForm(formData, url);
        if (result) {
          console.log('Form submitted successfully:', result);

          if (step === 0) setApplicationId(result.applicationId);
          if (step === 2) {
            setPresentAddressId(result.presentAddressId);
            setPermanentAddressId(result.permanentAddressId);
          }

          // Mark the current step as submitted
          setSubmittedForms((prev) => ({ ...prev, [step]: true }));

          // If this is the final step, navigate to Acknowledgement
          if (step === 4) {
            navigation.navigate("Acknowledgement"); // Navigate to Acknowledgement screen
          }
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }

    // Move to the next step only if submission is not required or successful
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  const canGoNext = step < 4;

  return (
    <StepForm
      serviceName={serviceName}
      currentForm={currentForm}
      control={control}
      errors={errors}
      handleInputChange={() => {}}
      handleSubmit={handleSubmit}
      step={step}
      handlePrevious={handlePrevious}
      setValue={setValue}
      handleNext={handleNext}
      canGoNext={canGoNext}
    />
  );
};

export default Form;
