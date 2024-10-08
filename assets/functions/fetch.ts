import Constants from 'expo-constants';
const { SERVER_URL } = Constants.expoConfig?.extra || {};

export const fetchDistricts = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/Base/GetDistricts`);
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

export const fetchTehsils = async (districtId:number) => {
  try {
    const response = await fetch(`${SERVER_URL}/Base/GetTeshilForDistrict?districtId=${districtId}`);
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
    const response = await fetch(`${SERVER_URL}/Base/GetBlockForDistrict?districtId=${districtId}`);
    const data = await response.json();
    return data.blocks;
    // return data.blocks.map((block: any) => ({ label: block.blockName, value: block.blockId }));
  } catch (error) {
    console.error('Error fetching blocks:', error);
    return [];
  }
};

export async function fetchServiceContent(setServiceName:any,setGeneralForm:any,setPreAddressForm:any,setPerAddressForm:any,setBankForm:any,setDocuments:any,setCurrentForm:any,setServiceId:any) {
    try {
      const response = await fetch(`${SERVER_URL}/User/GetServiceContent`);
      const result = await response.json();
      const elements = JSON.parse(result.formElement);
      setServiceName(result.serviceName);
      setServiceId(result.serviceId)
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
      const response = await fetch(`${SERVER_URL}/User/GetServiceContent`);
      const result = await response.json();
      const elements = JSON.parse(result.formElement);
      return elements;
    } catch (error) {
      console.error('Error fetching service content:', error);
    }
  }

  export async function fetchApplicationStatus(setColumns:any,setData:any,setError:any,setLoading:any) {
    try {
      const response = await fetch(`${SERVER_URL}/User/GetApplicationStatus?type=ApplicationStatus&start=0&length=10`);
      const result = await response.json();
      let col = result.obj.columns;
      col = col.map((obj: { title: any; })=>obj.title)
      setColumns(col);
      setData(result.obj.data);
    } catch (error) {
      setError(error.message)
      console.error('Error fetching service content:', error);
    }
    finally{
      setLoading(false);
    }
  }

  export async function fetchAcknowledgement(setData:any,setLoading:any) {
    try {
      const response = await fetch(`${SERVER_URL}/User/GetAcknowledgement`);
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
  }


export async function fetchApplicationDetails(applicationId:string,setGeneralDetails:any,setPreAddressDetails:any,setPerAddressDetails:any,setBankDetails:any,setDocumnets:any,setActionOptions,setPreviousActions:any,setCurrentOfficer:any,setServiceId:any) {
  try {
    const response = await fetch(`${SERVER_URL}/Officer/GetApplicationDetails?ApplicationId=${applicationId[0]}`);
    const result = await response.json();
    const bankDetails = JSON.parse(result.generalDetails.bankDetails);
    const documents = JSON.parse(result.generalDetails.documents);
    setGeneralDetails(prevDetails => ({
      ...prevDetails, // Keep existing values in case some are not present in the response
      applicantionId: result.generalDetails.applicationId,
      applicantImage: result.generalDetails.applicantImage,
      applicantName: result.generalDetails.applicantName,
      email: result.generalDetails.email,
      relation: result.generalDetails.relation,
      relationName: result.generalDetails.relationName,
      serviceSpecific: result.generalDetails.serviceSpecific,
      dateOfBirth: result.generalDetails.dateOfBirth,
      category: result.generalDetails.category,
      submissionDate: result.generalDetails.submissionDate,
    }));
    
    setPreAddressDetails(prevDetails=>({
      ...prevDetails,
      address:result.preAddressDetails.address,
      district:result.preAddressDetails.district,
      tehsil:result.preAddressDetails.tehsil,
      block:result.preAddressDetails.block,
      panchayatMuncipality:result.preAddressDetails.panchayatMuncipality,
      village:result.preAddressDetails.village,
      pincode:result.preAddressDetails.pincode,
    }));

    setPerAddressDetails(prevDetails=>({
      ...prevDetails,
      address:result.perAddressDetails.address,
      district:result.perAddressDetails.district,
      tehsil:result.perAddressDetails.tehsil,
      block:result.perAddressDetails.block,
      panchayatMuncipality:result.perAddressDetails.panchayatMuncipality,
      village:result.perAddressDetails.village,
      pincode:result.perAddressDetails.pincode,
    }));

    setBankDetails(prev=>({
      bankName:bankDetails.BankName,
      branchName:bankDetails.BranchName,
      ifscCode:bankDetails.IfscCode,
      accountNumber:bankDetails.AccountNumber
    }))

    setDocumnets(documents);
    setCurrentOfficer(result.currentOfficer);
    setServiceId(result.serviceContent.serviceId);
    const workForceOfficers = JSON.parse(result.serviceContent.workForceOfficers);
    let officer;
    let currentIndex;
    workForceOfficers.map((item,index) => {
      if (item.Designation == result.currentOfficer) {
        officer = item;
        currentIndex = index;
      }
    });

    const options:any =[];

    if(officer.canForward) options.push({label:`Forward To ${workForceOfficers[currentIndex+1].Designation}`,value:"Forward"});
    if(officer.canReturn) options.push({label:`Return To ${workForceOfficers[currentIndex+1].Designation}`,value:"Return"});
    if(officer.canReturnToEdit) options.push({label:`Return To Citizen for editing`,value:"ReturnToEdit"});
    if(officer.canSanction) options.push({label:`Issue Sanction Letter`,value:"Sanction"});
    if(officer.canUpdate) options.push({label:`Update and Forward To ${workForceOfficers[currentIndex+1].Designation}`,value:"Update"});
    options.push({label:"Reject",value:"Reject"});
    setActionOptions(options);


    

    let previousActionData = result.previousActions;
    let previousActionColumns = ["ActionTaker","ActionTaken","DateTime","Remarks","File"];
    previousActionData =previousActionData.map(obj => previousActionColumns.map(key => obj[key]));
    setPreviousActions({columns:previousActionColumns,data:previousActionData});

  } catch (error) {
    console.error('Error fetching service content:', error);
  }
  finally{
  }
}