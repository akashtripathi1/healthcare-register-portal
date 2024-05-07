# Healthcare Registration Portal

Welcome to the Healthcare Registration Portal! This is a MERN (MongoDB, Express.js, React, Node.js) stack project aimed at providing a platform for user registration of healthcare workers and professionals.

Live Demo - [Healthcare Registration Portal](https://limitless-tor-92113-f49db8bf78f3.herokuapp.com/)


## Features

- **User Authentication:** Users can log in using their username and password. New users can register using their Aadhaar card information.
- **Aadhaar Validation:** Aadhaar card validation is done during registration. The default OTP for Aadhaar validation is `000000`. Captcha validation is also integrated with a default value of `0`.
- **Sample User for Testing:** For testing purposes, a sample user is provided. Use the following data to log in:

  ```json
  {
    "aadhaarNumber": "123456789012",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "dateOfBirth": "1990-05-15",
    "mobileNumber": "9876543210",
    "district": "District A",
    "subDistrict": "Sub-District B",
    "role": "Healthcare Professional",
    "category": "Category X",
    "subCategory": "Sub-Category Y",
    "username": "johndoe"
  }

## Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akashtripathi1/healthcare-register-portal.git

2. **Install dependencies**
   ```bash
   cd healthcare-register-portal
   npm install
   
3. **Run the development server:**
   ```bash
   npm run dev

4. **Access the application in your browser at 'http://localhost:3000'**





