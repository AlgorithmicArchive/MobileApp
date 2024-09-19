import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import StepForm from '../../components/Forms/StepForm'; // Import the new StepForm component

interface FormProps {}

const Form = (props: FormProps) => {
  const serverUrl = Constants.expoConfig?.extra?.SERVER_URL;
  const [serviceName, setServiceName] = useState<string>('');
  const [generalForm, setGeneralForm] = useState<any[]>([]);
  const [preAddressForm, setPreAddressForm] = useState<any[]>([]);
  const [perAddressForm, setPerAddressForm] = useState<any[]>([]);
  const [currentForm, setCurrentForm] = useState<any[]>([]);
  const [formValues, setFormValues] = useState<any>({});
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    async function fetchServiceContent() {
      try {
        const response = await fetch(`${serverUrl}/User/GetServiceContent`);
        const result = await response.json();
        const elements = JSON.parse(result.formElement);
        setServiceName(result.serviceName);
        setGeneralForm(elements[0].fields);
        setPreAddressForm(elements[1].fields);
        setPerAddressForm(elements[2].fields);
        setCurrentForm(elements[0].fields); // Initialize currentForm based on the first step
      } catch (error) {
        console.error('Error fetching service content:', error);
      }
    }

    fetchServiceContent();
  }, [serverUrl]);

  const handleInputChange = (label: string, value: string) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [label]: value,
    }));
  };

  const handleNext = () => {
    if (step === 0) {
      setCurrentForm(preAddressForm);
      setStep((prev) => prev + 1);
    } else if (step === 1) {
      setCurrentForm(perAddressForm);
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (step === 2) {
      setCurrentForm(preAddressForm);
      setStep((prev) => prev - 1);
    } else if (step === 1) {
      setCurrentForm(generalForm);
      setStep((prev) => prev - 1);
    }
  };

  // Determine if the "Next" button should be enabled
  const canGoNext = step < 2;

  return (
    <StepForm
      serviceName={serviceName}
      currentForm={currentForm}
      formValues={formValues}
      handleInputChange={handleInputChange}
      step={step}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      canGoNext={canGoNext}
    />
  );
};

export default Form;
