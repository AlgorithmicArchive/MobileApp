// Form.tsx
import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import StepForm from '../../components/Forms/StepForm';
import { Field } from '../../types'; // Import the Field interface
  // Import validation functions
  import {
    notEmpty,
    onlyAlphabets,
    onlyDigits,
    specificLength,
    isAgeGreaterThan,
    isEmailValid,
    isDateWithinRange,
    duplicateAccountNumber,
    capitalizeAlphabets,
  } from '../../assets/functions/formvalidations'; // Adjust the path as necessary
import { fetchServiceContent } from '../../assets/functions/fetch';
import { useForm } from 'react-hook-form';

interface FormProps {}

const Form: React.FC<FormProps> = (props) => {
  const serverUrl = Constants.expoConfig?.extra?.SERVER_URL;
  const [serviceName, setServiceName] = useState<string>('');
  const [generalForm, setGeneralForm] = useState<Field[]>([]);
  const [preAddressForm, setPreAddressForm] = useState<Field[]>([]);
  const [perAddressForm, setPerAddressForm] = useState<Field[]>([]);
  const [bankForm, setBankForm] = useState<Field[]>([]);
  const [documents, setDocuments] = useState<Field[]>([]);
  const [currentForm, setCurrentForm] = useState<Field[]>([]);
  const [step, setStep] = useState<number>(0);
  const [applicationId, setApplicationId] = useState<string>(''); // Assuming you have an application ID

  const { control, handleSubmit, formState: { errors } } = useForm<any>({mode:'onChange',reValidateMode:'onBlur'});


  useEffect(() => {
    fetchServiceContent(setServiceName,setGeneralForm,setPreAddressForm,setPerAddressForm,setBankForm,setDocuments,setCurrentForm);
  }, [serverUrl]);


  const handleInputChange = async (name: string, value: string, field: Field) => {
    let errorMessages: string[] = [];
    let newValue = value;
    if (field.validationFunctions && field.validationFunctions.length > 0) {
      for (const validationFn of field.validationFunctions) {
        switch (validationFn) {
          case 'notEmpty':
            const notEmptyMsg = notEmpty(field, value);
            if (notEmptyMsg) errorMessages.push(notEmptyMsg);
            break;
          case 'onlyAlphabets':
            const onlyAlphabetsMsg = onlyAlphabets(field, value);
            if (onlyAlphabetsMsg) errorMessages.push(onlyAlphabetsMsg);
            break;
          case 'onlyDigits':
            const onlyDigitsMsg = onlyDigits(field, value);
            if (onlyDigitsMsg) errorMessages.push(onlyDigitsMsg);
            break;
          case 'specificLength':
            const specificLengthMsg = specificLength(field, value);
            if (specificLengthMsg) errorMessages.push(specificLengthMsg);
            break;
          case 'isAgeGreaterThan':
            const isAgeGreaterThanMsg = isAgeGreaterThan(field, value);
            if (isAgeGreaterThanMsg) errorMessages.push(isAgeGreaterThanMsg);
            break;
          case 'isEmailValid':
            const isEmailValidMsg = isEmailValid(field, value);
            if (isEmailValidMsg) errorMessages.push(isEmailValidMsg);
            break;
          case 'isDateWithinRange':
            const isDateWithinRangeMsg = isDateWithinRange(field, value);
            if (isDateWithinRangeMsg) errorMessages.push(isDateWithinRangeMsg);
            break;
          case 'duplicateAccountNumber':
            const duplicateMsg = await duplicateAccountNumber(field,value, applicationId);
            if (duplicateMsg) errorMessages.push(duplicateMsg);
            break;
          case 'CapitalizeAlphabets':
            newValue = capitalizeAlphabets(field,value);
            break;
          default:
            break;
        }
      }
    }
    
  };

  const handleNext = async (data:any) => {
  
    // Create FormData from the `data` object
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    console.log("FORM DATA",formData);
    try {
      // const response = await fetch(`${serverUrl}/your-api-endpoint`, {
      //   method: 'POST',
      //   body: formData,
      // });
  
      // if (!response.ok) {
      //   throw new Error('Failed to submit');
      // }
  
      setStep((prevStep) => prevStep + 1);
      if(step===0)
        setCurrentForm(preAddressForm);
      else if(step==1)
        setCurrentForm(perAddressForm)
      else if(step==2)
        setCurrentForm(bankForm)
      else if(step==3)
        setCurrentForm(documents)
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  const handlePrevious = () => {
    if (step === 4) {
      setCurrentForm(bankForm);
    } else if (step === 3) {
      setCurrentForm(perAddressForm);
    } else if (step === 2) {
      setCurrentForm(preAddressForm);
    } else if (step === 1) {
      setCurrentForm(generalForm);
    }
    
    setStep((prev) => prev - 1);
  };
  

  // Determine if the "Next" button should be enabled
  const canGoNext = step < 4;

  return (
    <StepForm
      serviceName={serviceName}
      currentForm={currentForm}
      control={control}
      errors={errors}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      step={step}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      canGoNext={canGoNext}
    />
  );
};

export default Form;
