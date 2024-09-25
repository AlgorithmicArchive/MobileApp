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
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<number>(0);
  const [applicationId, setApplicationId] = useState<string>(''); // Assuming you have an application ID

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
            const duplicateMsg = await duplicateAccountNumber(value, applicationId);
            if (duplicateMsg) errorMessages.push(duplicateMsg);
            break;
          case 'CapitalizeAlphabets':
            newValue = capitalizeAlphabets(value);
            break;
          default:
            break;
        }
      }
    }
    
    // Update form values
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));

    // Update form errors
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessages.join(' '),
    }));

  };

  const handleNext = async () => {
    let formHasErrors = false;
    let newFormErrors: Record<string, string> = {};
  
    // Validate all fields in the current form
    for (const field of currentForm) {
      const name = field.type=="radio"?field.label:field.name;
      if (field.validationFunctions && field.validationFunctions.length > 0) {
        for (const validationFn of field.validationFunctions) {
          let errorMsg = '';
          switch (validationFn) {
            case 'notEmpty':
              errorMsg = notEmpty(field, formValues[name] || '');
              break;
            case 'onlyAlphabets':
              errorMsg = onlyAlphabets(field, formValues[name] || '');
              break;
            case 'onlyDigits':
              errorMsg = onlyDigits(field, formValues[name] || '');
              break;
            case 'specificLength':
              errorMsg = specificLength(field, formValues[name] || '');
              break;
            case 'isAgeGreaterThan':
              errorMsg = isAgeGreaterThan(field, formValues[name] || '');
              break;
            case 'isEmailValid':
              errorMsg = isEmailValid(field, formValues[name] || '');
              break;
            case 'isDateWithinRange':
              errorMsg = isDateWithinRange(field, formValues[name] || '');
              break;
            case 'duplicateAccountNumber':
              errorMsg = await duplicateAccountNumber(formValues[name] || '', applicationId);
              break;
            case 'CapitalizeAlphabets':
              formValues[name] = capitalizeAlphabets(formValues[name] || '');
              break;
            default:
              break;
          }
          if (errorMsg) {
            newFormErrors[name] = errorMsg;
            formHasErrors = true;
          }
        }
      }
    }
    // If there are validation errors, stop the user from proceeding
    if (formHasErrors) {
      setFormErrors(newFormErrors);
      return;
    }
  
    // Prepare FormData and set dynamic URL
    const formData = new FormData();
    let url = ''; // Dynamic URL based on current form
  
    if (step === 0) {
      // General Form
      generalForm.forEach((field) => {
        formData.append(field.name, formValues[field.name] || '');
        if(field.type=='radio')formData.append(field.label,formValues[field.label] || '');
      });
      url = `${serverUrl}/User/InsertGeneralDetails`;
    } else if (step === 1 || step === 2) {
      // Address Form (Present + Permanent Address)
      preAddressForm.forEach((field) => {
        formData.append(field.name, formValues[field.name] || '');
      });
      perAddressForm.forEach((field) => {
        formData.append(field.name, formValues[field.name] || '');
      });
      url = `${serverUrl}/User/InsertAddressDetails`;
    } else if (step === 3) {
      // Bank Form
      bankForm.forEach((field) => {
        formData.append(field.name, formValues[field.name] || '');
      });
      url = `${serverUrl}/User/InsertBankDetails`;
    } else if (step === 4) {
      // Documents Form
      documents.forEach((field) => {
        formData.append(field.name, formValues[field.name] || '');
      });
      url = `${serverUrl}/User/InsertDocuments`;
    }
  
    console.log(formData);
    // Send the form data via fetch to the dynamic URL
    // try {
    //   const response = await fetch(url, {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   if (!response.ok) {
    //     throw new Error('Failed to submit the form.');
    //   }
    //   // If the submission is successful, proceed to the next step
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
  
    // Move to the next step if everything is valid
    if (step === 0) {
      setCurrentForm(preAddressForm);
    } else if (step === 1) {
      setCurrentForm(perAddressForm);
    } else if (step === 2) {
      setCurrentForm(bankForm);
    } else if (step === 3) {
      setCurrentForm(documents);
    }
    setStep((prev) => prev + 1);
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
    
    // Preserve the form values across steps
    setFormValues((prevValues) => ({ ...prevValues }));
    
    setStep((prev) => prev - 1);
  };
  

  // Determine if the "Next" button should be enabled
  const canGoNext = step < 4;

  return (
    <StepForm
      serviceName={serviceName}
      currentForm={currentForm}
      formValues={formValues}
      formErrors={formErrors} // Pass formErrors to StepForm
      handleInputChange={handleInputChange}
      step={step}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      canGoNext={canGoNext}
    />
  );
};

export default Form;
