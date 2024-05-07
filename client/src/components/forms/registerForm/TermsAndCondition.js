import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

const TermsAndConditions = () => {
    const [language, setLanguage] = useState('english');

    const englishText = "I, hereby declare that I am voluntarily sharing my Aadhaar Number / Virtual ID and demographic information issued by UIDAI, with National Health Authority (NHA) for the sole purpose of creation of Healthcare Professional ID. I understand that my Healthcare Professional ID can be used and shared for purposes as may be notified by Ayushman Bharat Digital Mission (ABDM) from time to time including provision of healthcare services. Further, I am aware that my personal identifiable information (Name, Address, Age, Date of Birth, Gender and Photograph) may be made available to the entities working in the National Digital Health Ecosystem (NDHE) which inter alia includes stakeholders and entities such as healthcare professional (e.g. doctors), facilities (e.g. hospitals, laboratories) and data fiduciaries (e.g. health programmes), which are registered with or linked to the Ayushman Bharat Digital Mission (ABDM), and various processes there under. I authorize NHA to use my Aadhaar number / Virtual ID for performing Aadhaar based authentication with UIDAI as per the provisions of the Aadhaar (Targeted Delivery of Financial and other Subsidies, Benefits and Services) Act, 2016 for the aforesaid purpose. I understand that UIDAI will share my e-KYC details, or response of \“Yes\” with NHA upon successful authentication. I consciously choose to use Aadhaar number / Virtual ID for the purpose of availing benefits across the NDHE. I am aware that my personal identifiable information excluding Aadhaar number / VID number can be used and shared for purposes as mentioned above. I reserve the right to revoke the given consent at any point of time as per provisions of Aadhar Act and Regulations and other laws, rules and regulations.";
    const hindiText = "मैं यहाँ घोषणा करता/करती हूँ कि मैं स्वेच्छा से अपना आधार नंबर / वर्चुअल आईडी और UIDAI द्वारा जारी की गई जनसांख्यिकीय जानकारी, राष्ट्रीय स्वास्थ्य प्राधिकृति (NHA) के साथ साझा कर रहा/रही हूँ, केवल स्वास्थ्य पेशेवर आईडी बनाने के उद्देश्य से। मुझे इसका अनुभव है कि मेरा स्वास्थ्य पेशेवर आईडी आयुष्मान भारत डिजिटल मिशन (ABDM) द्वारा समय-समय पर सूचित किए जाने वाले उद्देश्यों के लिए उपयोग और साझा किया जा सकता है, जिसमें स्वास्थ्य सेवाएं प्रदान की जा सकती हैं। इसके अलावा, मुझे यह जानकर है कि मेरी व्यक्तिगत पहचान सूची (नाम, पता, आयु, जन्म तिथि, लिंग और फोटो) को आयुष्मान भारत डिजिटल मिशन (ABDM) से जुड़े हुए तथा यहाँ-वहाँ दर्ज अस्पताल, प्रयोगशाला आदि की तरह रजिस्टर किए गए या इससे जुड़े हुए विभिन्न प्रक्रियाओं में काम करने वाले स्वास्थ्य पेशेवर (जैसे कि डॉक्टर), सुविधाएँ (जैसे कि अस्पताल, प्रयोगशाला) और डेटा फिडुशियरीज (जैसे कि स्वास्थ्य कार्यक्रम) के साथ साझा किया जा सकता है। मैं एनएचए को अधिकृत करता/करती हूँ कि वह मेरे आधार नंबर / वर्चुअल आईडी का आधारित प्रमाणीकरण UIDAI के साथ करेगा जैसा कि आधार (लक्षित वित्तीय और अन्य सब्सिडी, लाभ और सेवाओं की पहुँच) अधिनियम, 2016 के प्रावधानों के अनुसार, उपरोक्त उद्देश्य के लिए। मुझे यह समझाया गया है कि यूआईडीएआई सफल प्रमाणीकरण पर मेरा ई-केवाईसी विवरण, या \"हाँ\" का जवाब, एनएचए के साथ साझा करेगा। मैं सावधानीपूर्वक निर्णय लेता/लेती हूँ कि एनडीएचई के लिए लाभ प्राप्त करने के उद्देश्य से मैंने आधार नंबर / वर्चुअल आईडी का चयन किया है। मुझे यह ज्ञात है कि मेरी व्यक्तिगत पहचान सूची (आधार नंबर / वीआईडी नंबर को छोड़कर) का उपयोग उपरोक्त उद्देश्यों के लिए किया जा सकता है और इसे उपरोक्त उद्देश्यों हेतु साझा किया जा सकता है। मैं देखभाल अधिकारी (Act) और नियम निर्देशिका (Regulations) के प्रावधानों के अनुसार किसी भी समय दिए गए सहमति को वापस लेने का अधिकार रखता/रखती हूँ।";

    const buttonStyle = (isActive) => ({
        marginRight: 2,
        color: isActive ? 'white' : '#093c98',
        backgroundColor: isActive ? '#093c98' : 'white',
        borderColor: '#093c98',
        border: 1,
        '&:hover': {
        backgroundColor: isActive ? '#093c98' : 'white', // No change on hover
        color: isActive ? 'white' : '#093c98', // No change on hover
        borderColor: '#093c98', // No change on hover
        }

    });

    return (
        <div>
            <Button
                variant="outlined"
                onClick={() => setLanguage('english')}
                sx={buttonStyle(language === 'english')}
            >
                English
            </Button>
            <Button
                variant="outlined"
                onClick={() => setLanguage('hindi')}
                sx={buttonStyle(language === 'hindi')}
            >
                Hindi
            </Button>
            <Box
                sx={{
                    marginTop: 2,
                    height: 100, // Adjusted height
                    overflowY: 'auto', // Make content scrollable
                    // border: '1px solid black',
                    padding: 2
                }}
            >
                {language === 'english' ? englishText : hindiText}
            </Box>
        </div>
    );
};

export default TermsAndConditions;
