import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import FormContainer from '../../components/Forms/FormContainer';
import ServiceName from './ServiceName';
import FormButtons from './FormButtons';

interface StepFormProps {
  serviceName: string;
  currentForm: any[];
  formValues: any;
  handleInputChange: (label: string, value: string) => void;
  step: number;
  handlePrevious: () => void;
  handleNext: () => void;
  canGoNext: boolean;
}

const StepForm: React.FC<StepFormProps> = ({
  serviceName,
  currentForm,
  formValues,
  handleInputChange,
  step,
  handlePrevious,
  handleNext,
  canGoNext,
}) => {
  const renderItem = ({ item }: { item: any }) => {
    switch (item.type) {
      case 'serviceName':
        return <ServiceName name={item.value} />;
      case 'formContainer':
        return (
          <FormContainer
            formElements={item.formElements}
            formValues={formValues}
            step={step}
            handleInputChange={handleInputChange}
          />
        );
      case 'buttons':
        return (
          <FormButtons
            step={step}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoNext={canGoNext}
          />
        );
      default:
        return null;
    }
  };

  // Preparing data for FlatList
  const data = [
    { id: '1', type: 'serviceName', value: serviceName },
    { id: '2', type: 'formContainer', formElements: currentForm },
    { id: '3', type: 'buttons' },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    flexGrow: 1,
    padding: 16,
  },
});

export default StepForm;
