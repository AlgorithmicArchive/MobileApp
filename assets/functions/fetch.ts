import Constants from 'expo-constants';
const serverUrl = Constants.expoConfig?.extra?.SERVER_URL;

export const fetchDistricts = async () => {
    try {
      const response = await fetch(`${serverUrl}/Base/GetDistricts`);
      const data = await response.json();
      if (data.status) {
        return data.districts;
      } else {
        throw new Error('Failed to fetch districts');
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
      return [];
    }
  };

// fetch.ts

export const fetchTehsils = async (districtId:number) => {
  try {
    const response = await fetch(`${serverUrl}/Base/GetTeshilForDistrict?districtId=${districtId}`);
    const data = await response.json();
    return data.tehsils;
    // return data.tehsils.map((tehsil: any) => ({ label: tehsil.tehsilName, value: tehsil.tehsilId }));
  } catch (error) {
    console.error('Error fetching tehsils:', error);
    return [];
  }
};

export const fetchBlocks = async (districtId:number) => {
  try {
    const response = await fetch(`${serverUrl}/Base/GetBlockForDistrict?districtId=${districtId}`);
    const data = await response.json();
    return data.blocks;
    // return data.blocks.map((block: any) => ({ label: block.blockName, value: block.blockId }));
  } catch (error) {
    console.error('Error fetching blocks:', error);
    return [];
  }
};



export async function fetchServiceContent(setServiceName:any,setGeneralForm:any,setPreAddressForm:any,setPerAddressForm:any,setBankForm:any,setDocuments:any,setCurrentForm:any) {
    try {
      const response = await fetch(`${serverUrl}/User/GetServiceContent`);
      const result = await response.json();
      const elements = JSON.parse(result.formElement);
      setServiceName(result.serviceName);
      setGeneralForm(elements[0].fields);
      setPreAddressForm(elements[1].fields);
      setPerAddressForm(elements[2].fields);
      setBankForm(elements[3].fields); // Bank form fields
      setDocuments(elements[4].fields); // Documents fields
      setCurrentForm(elements[0].fields); // Initialize currentForm based on the first step
    } catch (error) {
      console.error('Error fetching service content:', error);
    }
  }
  

  export async function fetchService() {
    try {
      const response = await fetch(`${serverUrl}/User/GetServiceContent`);
      const result = await response.json();
      const elements = JSON.parse(result.formElement);
      return elements;
    } catch (error) {
      console.error('Error fetching service content:', error);
    }
  }