# kyc-iframe-sample

# main sample source code (index.html)
- sample code
  - index.html : https://github.com/useb-inc/kyc-iframe-sample/blob/main/index.html
  - kyc.js : https://github.com/useb-inc/kyc-iframe-sample/blob/main/js/kyc.js
---

# Explanation of parameters in postMessage 
- Format 
```
{
  "result": ["success" | "failed"],
  "detail": {
    "request_time": "2021-12-25T03:55:31.918Z",
    "name": "홍길동",
    "phone_number": "01012345678",
    "birthday": "2000-01-01",
    "result_type": only for reviewer function in Admin page   // 
    "rejected_reason": only for reviewer function in Admin page
    "reviewer_name": only for reviewer function in Admin page
    "module": { The functions that a customer uses
      "id_card_ocr": whether to use id_card OCR function [true | false],
      "id_card_verification": whether to use id_card verification funciton [true | false],
      "face_authentication": whether to use comparison function between id_card face and selfie face [true | false],
      "account_verification": wheter to use 1KRW account verification function [true | false],
      "liveness": whether to use face liveness verification function [true | false],
    },
    "id_card": { id_card verification result
      "modified": whether to be modified additionaly after id_card OCR result [true | false],
      "verified": whether to be verified in government [true | false],
      "is_uploaded": whether id_card to having been not captured but uploaded  [true | false], 
      "is_manual_input": whether to having been not OCR but manually written  [true | false], 
      "id_card_image": masked id_card image ["/9j/4AAQSkZ..."],
      "id_crop_image": face image which is cropped out of id_card ["/9j/4AAQSkZ..."],
      "id_card_origin": original id_card image ["/9j/4AAQSkZ..."],
      "original_ocr_data": id_card OCR result (json format) ["{\"idType\":\"2\",\"userName\":\"홍길동\",\"driverNo\":[\"12\",\"03\",\"123456\",\"12\"],\"juminNo1\":\"990101\",\"juminNo2\":\"1001234\",\"_juminNo2\":\"1\",\"issueDate\":\"2017-01-01\",\"transaction_id\":\"4dd9c67508fb9e4489ec683dddd3f519\",\"driverNo1\":\"\",\"driverNo2\":\"11-03-123123-11\"}"],
      "modified_ocr_data": id card result modified by a user after OCR ["{\"idType\":\"2\",\"userName\":\"임꺽정\",\"driverNo\":[\"12\",\"03\",\"123456\",\"12\"],\"juminNo1\":\"990101\",\"juminNo2\":\"1001234\",\"_juminNo2\":\"1\",\"issueDate\":\"2017-01-01\",\"transaction_id\":\"4dd9c67508fb9e4489ec683dddd3f519\",\"driverNo1\":\"\",\"driverNo2\":\"11-03-123123-11\"}"]
    },
    "face_check": { face authentication result
      "is_same_person": whether id_card face and selfie face are same [true | false],
      "is_live": whether selfie face is live  [true | false]
      "selfie_image": selfie face image ["/9j/4AAQSkZ..."]
    },
    "account": { Bank account verification result
      "verified": whether bank account is verified [true | false],
      "finance_company": bank or financial company name ["OO은행"],
      "finance_code": bank or financial company code ["O12"],
      "account_number": bank account number ["987654321012",],
      "account_holder": account holder`s name ["홍길동"],
      "mod_account_holder": account holder`s name which is modified in case that user name is different from account holder`s name ["Hong Gil Dong"]
    }
  },
  "api_response": {  
    "result_code": "N100",
    "result_message": "OK."
  }
}
```
---
- sample (the example of success case)
```json
{
  "result": "success",
  "detail": {
    "request_time": "2021-12-25T03:55:31.918Z",
    "name": "홍길동",
    "phone_number": "01012345678",
    "birthday": "1990-01-01",
    "result_type": 1,
    "rejected_reason": null,
    "reviewer_name": null,
    "module": {
      "id_card_ocr": true,
      "id_card_verification": true,
      "face_authentication": true,
      "account_verification": true,
      "liveness": false
    },
    "id_card": {
      "modified": false,
      "verified": true,
      "is_uploaded": false,
      "is_manual_input": false,
      "id_card_image": "/9j/4AAQSkZ...",
      "id_crop_image": "/9j/4AAQSkZ...",
      "id_card_origin": "/9j/4AAQSkZ...",
      "original_ocr_data": "{\"idType\":\"2\",\"userName\":\"홍길동\",\"driverNo\":[\"12\",\"03\",\"123456\",\"12\"],\"juminNo1\":\"990101\",\"juminNo2\":\"1001234\",\"_juminNo2\":\"1\",\"issueDate\":\"2017-01-01\",\"transaction_id\":\"4dd9c67508fb9e4489ec683dddd3f519\",\"driverNo1\":\"\",\"driverNo2\":\"11-03-123123-11\"}",
      "modified_ocr_data": ""
    },
    "face_check": {
      "is_same_person": true,
      "selfie_image": "data:image/jpeg;base64,/9j/4AAQSkZ..."
    },
    "account": {
      "verified": true,
      "finance_company": "OO은행",
      "finance_code": "O12",
      "account_number": "987654321012",
      "user_name": "홍길동"
    }
  },
  "api_response": {
    "result_code": "N100",
    "result_message": "OK."
  }
}
```
---
- sample (the example of failure case)
```json
{
  "result": "failed",
  "detail": {
    "request_time": "2021-12-25T04:18:23.755Z",
    "name": "홍길동",
    "phone_number": "01012345678",
    "birthday": "2021-12-25",
    "result_type": 1,
    "rejected_reason": null,
    "reviewer_name": null,
    "module": {
      "id_card_ocr": true,
      "id_card_verification": true,
      "face_authentication": true,
      "account_verification": true,
      "liveness": false
    },
    "id_card": {
      "verified": false,
      "is_uploaded": false,
      "is_manual_input": false,
      "id_card_image": "/9j/4AAQSkZ...",
      "id_crop_image": "/9j/4AAQSkZ...",
      "id_card_origin": "/9j/4AAQSkZ...",
    },
    "face_check": null,
    "account": null,
  },
  "api_response": {
    "result_code": "N100",
    "result_message": "OK."
  }
}
```

# Setup guide of sample source code
- Step 0) Establishment of development environment (Node.js, NPM, http-server) Installation 
  - Install the latest version of LTS from https://nodejs.org/ko/download/ 
  - Check whether it is installed properly or not
  - ![image](https://user-images.githubusercontent.com/87741912/147377915-3369c5a7-2649-4721-92a5-87d93e15f7b1.png)
  - Install http-server : 
    - Linux, MAC : 
    ```shell 
    sudo npm install -g http-server 
    ```
    - Windows : 
    ```batch
    npm install -g http-server
    ```
---
- Step 1) Download sample source code
  - https://github.com/useb-inc/kyc-iframe-sample/archive/refs/heads/main.zip
---
- Step 2) unzip a file 
---
- Step 3) execute and test (execute https server and utilize randomly generated sample certificate) 
  - command : npm start
  - ![image](https://user-images.githubusercontent.com/87741912/147376429-76c7f13f-0c4a-4a09-bdf2-f03355622392.png)
---
- Step 4) Connect and test (in case of PC, id_card should not be captured but uploaded as a file)
  - ![image](https://user-images.githubusercontent.com/87741912/147376672-27953201-6715-4da8-ac1d-00ada39ca397.png)
  - Access to one of server addresses of Step 3 from your browser to suit your environment
  - The sample source code does not use an authorized CA certificate to run the HTTPs server, so a warning screen appears
  - click Advanced -> Click the "go to server address(insecure)" link on the screen below
  - ![image](https://user-images.githubusercontent.com/87741912/147376538-a338f52e-86f1-4a32-8796-c3baee18d230.png)
  - ![image](https://user-images.githubusercontent.com/87741912/147376556-bcf43b90-3191-4a98-b49e-68f9696fc574.png)
  - If you see the "Select id_card" as shown in the screen below, it means that it works properly(it might be different in according to service type)
  - As shown in the screen below, iframe is linked to the entire screen (width:100%, height:100%, border: none) on the KYC service mobile web.
  - ![image](https://user-images.githubusercontent.com/87741912/147376596-8c633ab2-6ad9-4d7e-a886-3a258e893e29.png)
---
- Step 5) DEBUG window
  - During the test, when a specific event ("KYC authentication success" or "failure" or "termination" (e.g. middle departure) occurs in the KYC service operating within the iframe, the result is delivered in a postMessage manner.
  - The data (in json format) transmitted as postMessage can be viewed through the DEBUG window.
  - ![image](https://user-images.githubusercontent.com/87741912/147376633-15a4b9d6-72c9-4a65-9e47-f98061858272.png)
---
