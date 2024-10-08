// dummyData.ts
const indianFemaleNames = [
    "PRIYA SHARMA",
    "ANJALI VERMA",
    "KAVITA MEHTA",
    "NEHA GUPTA",
    "RITU SINGH",
    "SONALI JOSHI",
    "MEGHA PATEL",
    "SNEHA NAIR",
    "SHRUTI MISHRA",
    "NISHA AGARWAL",
    "RUPALI KUMAR",
    "ANITA RAO",
    "LATA IYER",
    "VASUNDHARA REDDY",
    "KIRAN DESAI",
    "RADHA CHOUDHARY",
    "PALLAVI PANDEY",
    "VIDYA MENON",
    "REKHA RATHORE",
    "MADHURI SAXENA",
  ];
  
  const indianMaleNames = [
    "RAHUL SHARMA",
    "AMIT VERMA",
    "VIKAS MEHTA",
    "RAJEEV GUPTA",
    "ROHIT SINGH",
    "SUNIL JOSHI",
    "KARTIK PATEL",
    "ARJUN NAIR",
    "SAURABH MISHRA",
    "NIKHIL AGARWAL",
    "RAHUL KUMAR",
    "ANIL RAO",
    "VIKRAM IYER",
    "SURESH REDDY",
    "NITIN DESAI",
    "ASHISH CHOUDHARY",
    "PRANAV PANDEY",
    "VINAY MENON",
    "RAJESH RATHORE",
    "DEEPAK SAXENA",
  ];
  
  const districts = [5, 14, 1];
  const tehsils = { 5: [78, 79, 81], 14: [73, 75, 72], 1: [55, 53, 57] };
  const blocks = { 5: [56, 57, 58], 14: [124, 125, 126], 1: [1, 2, 3] };
  
  const getRandomName = (namesArray: string[]) => {
    const randomIndex = Math.floor(Math.random() * namesArray.length);
    return namesArray[randomIndex];
  };
  
  const getRandomBirthDate = () => {
    const currentDate = new Date();
    const minAge = 20;
    const maxAge = 30;
  
    const minYear = currentDate.getFullYear() - maxAge;
    const maxYear = currentDate.getFullYear() - minAge;
  
    const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    const randomMonth = Math.floor(Math.random() * 12);
    const randomDay = Math.floor(Math.random() * 28) + 1;
  
    const randomDate = new Date(randomYear, randomMonth, randomDay);
  
    return randomDate.toISOString().split('T')[0]; // Return date in 'YYYY-MM-DD' format
  };
  
  const generateRandomAccountNumber = () => {
    let accountNumber = '';
    for (let i = 0; i < 16; i++) {
      accountNumber += Math.floor(Math.random() * 10);
    }
    return accountNumber;
  };
  
  const generalDummyData = {
    ApplicantName: getRandomName(indianFemaleNames),
    DateOfBirth: getRandomBirthDate(),
    ApplicantImage: 'https://path/to/your/image.png',
    RelationName: getRandomName(indianMaleNames),
    MotherName: getRandomName(indianFemaleNames),
    MobileNumber: '9149653661',
    Email: 'momin.rather@gmail.com',
  };
  
  const addressDummyData = {
    PresentAddress: '161 GUJJAR NAGAR',
    PresentDistrict: districts[Math.floor(Math.random() * districts.length)],
    PresentTehsil: tehsils[districts[0]][Math.floor(Math.random() * tehsils[districts[0]].length)],
    PresentBlock: blocks[districts[0]][Math.floor(Math.random() * blocks[districts[0]].length)],
    PresentPincode: 180001,
  };
  
  const bankdummyDetails = {
    BranchName: 'RESIDENCY ROAD',
    IfscCode: 'JAKA0KEEPER',
    AccountNumber: generateRandomAccountNumber(),
  };
  
  export { generalDummyData, addressDummyData, bankdummyDetails };
  