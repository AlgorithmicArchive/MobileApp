import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TextInputField from './TextInputField';
import SelectField from './SelectField';
import FileInputField from './FileInputField';
import DatePickerField from './DatePickerField';
import RadioField from './RadioField';

interface FormContainerProps {
  formElements: any[];
  formValues: any;
  step:number;
  handleInputChange: (label: string, value: any) => void;
}

const FormContainer: React.FC<FormContainerProps> = ({ formElements, formValues, step,handleInputChange }) => {
    const Title = step==0?"General Details":step==1?"Present Address":step==2?"Permanent Address":step==3?"Bank Details":"Documents";
    return (
    <View style={styles.formContainer}>
      <Text style={{fontWeight:'bold',fontSize:24,color:'#fff',marginBottom:10,textAlign:'center'}}>{Title}</Text>  
      {formElements.map((field: any, index: number) => {
        const keyboardType = field.type === "text" ? "default" :
                            field.type === "email" ? "email-address" : "default";
        const secureTextEntry = field.type === "password";
        const options: { label: string; value: string }[] = [{ label: 'Select', value: '' }];

        if (field.type === "select" && Array.isArray(field.options)) {
          field.options.forEach((item: string) => {
            options.push({ label: item, value: item });
          });
        }



        switch (field.type) {
          case "text":
          case "email":
            return (
              <TextInputField
                key={field.label || index}
                label={field.label}
                keyboardType={keyboardType}
                placeholder={field.label}
                secureTextEntry={secureTextEntry}
                onChangeText={(value) => handleInputChange(field.label, value)}
                value={formValues[field.label] || ''}
              />
            );
          case "select":
            return (
              <SelectField
                key={field.label || index}
                label={field.label}
                options={options}
                selectedValue={formValues[field.label] || ''}
                onValueChange={(value) => handleInputChange(field.label, value)}
              />
            );
          case "file":
            return (
              <FileInputField
                key={field.label || index}
                label={field.label}
                onImageSelected={(uri) => handleInputChange(field.label, uri)}
              />
            );
          case "date":
            return (
              <DatePickerField
                key={field.label || index}
                label={field.label}
                onChange={(value) => handleInputChange(field.label, value)}
                value={formValues[field.label] || ''}
              />
            );
          case "radio":
            return (
              <RadioField
                key={field.label || index}
                options={field.options}
              />
            );
          default:
            return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'solid',
    borderRadius: 5,
    width: '90%',
    marginHorizontal: 'auto',
    padding: 20,
  },
});

export default FormContainer;
