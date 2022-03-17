# kyc-iframe-sample

# 주요 샘플 코드 (index.html)
- 샘플코드 
  - index.html : https://github.com/AlcheraInc/kyc-iframe-sample/blob/main/index.html
  - kyc.js : https://github.com/AlcheraInc/kyc-iframe-sample/blob/main/js/kyc.js
---

# postMessage 데이터 설명
- 포멧 
```
{
  "result": 성공 실패 ["success" | "failed"],
  "detail": {
    "request_time": 요청시간 ["2021-12-25T03:55:31.918Z"],
    "name": 이름 ["양동현"],
    "phone_number": 전화번호 ["01012345678]",
    "birthday": 생년월일 ["2000-01-01"],
    "result_type": 사용불필요
    "rejected_reason": 사용불필요
    "reviewer_name": 사용불필요
    "module": { 고객이 사용하고 있는 기능
      "id_card_ocr": 신분증OCR 기능 사용여부 [true | false],
      "id_card_verification": 신분증진위확인 기능 사용여부 [true | false],
      "face_authentication": 신분증얼굴vs셀피얼굴 비교 기능 사용여부 [true | false],
      "account_verification": 1원 계좌인증 사용여부 [true | false],
      "liveness": 얼굴 라이브니스(진위확인) 기능 사용여부 [true | false],
    },
    "id_card": { 신분증인증 결과
      "modified": 신분증 OCR 결과에서 추가 수정여부 [true | false],
      "verified": 신분증 정보 정부기관 진위확인 결과 [true | false],
      "is_uploaded": 신분증을 직접 촬영하지 않고 업로드 했는지 여부 [true | false], 
      "is_manual_input": 신분증 사진을 OCR을 사용하지 않고 직접 입력 여부 [true | false], 
      "id_card_image": 신분증 민감정보 Masking 사진 ["/9j/4AAQSkZ..."],
      "id_crop_image": 신분증에서 얼굴 crop 사진 ["/9j/4AAQSkZ..."],
      "id_card_origin": 신분증 원본 촬영 사진 ["/9j/4AAQSkZ..."],
      "original_ocr_data": 신분증 OCR 결과(json 형식) ["{\"idType\":\"2\",\"userName\":\"홍길동\",\"driverNo\":[\"12\",\"03\",\"123456\",\"12\"],\"juminNo1\":\"990101\",\"juminNo2\":\"1001234\",\"_juminNo2\":\"1\",\"issueDate\":\"2017-01-01\",\"transaction_id\":\"4dd9c67508fb9e4489ec683dddd3f519\",\"driverNo1\":\"\",\"driverNo2\":\"11-03-123123-11\"}"],
      "modified_ocr_data": 신분증 OCR 결과에서 사용자가 직접 수정한 내용 ["{\"idType\":\"2\",\"userName\":\"임꺽정\",\"driverNo\":[\"12\",\"03\",\"123456\",\"12\"],\"juminNo1\":\"990101\",\"juminNo2\":\"1001234\",\"_juminNo2\":\"1\",\"issueDate\":\"2017-01-01\",\"transaction_id\":\"4dd9c67508fb9e4489ec683dddd3f519\",\"driverNo1\":\"\",\"driverNo2\":\"11-03-123123-11\"}"]
    },
    "face_check": { 안면인증 결과
      "is_same_person": 신분증 얼굴사진 vs 셀피 얼굴사진 비교 결과 [true | false],
      "is_live": 셀피 얼굴사진 진위확인 [true | false]
      "selfie_image": 셀피 얼굴사진 ["/9j/4AAQSkZ..."]
    },
    "account": { 1원 계좌인증 결과
      "verified": 1원 계좌인증 성공여부 [true | false],
      "finance_company": 금융사명 ["OO은행"],
      "finance_code": 금융사코드 ["O12"],
      "account_number": 금융사명 ["987654321012",],
      "user_name": 예금주명 ["홍길동"]
    }
  },
  "api_response": { 사용불필요
    "result_code": "N100",
    "result_message": "OK."
  }
}
```
---
- 샘플 (성공케이스 예시)
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
- 샘플 (실패 케이스)
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

# 샘플 코드 셋업 가이드
- Step 0) 개발환경 구축 (Node.js, NPM, http-server) 설치 
  - https://nodejs.org/ko/download/ 에서 LTS 최신버전 설치
  - 정상적으로 설치되었는지 확인
  - ![image](https://user-images.githubusercontent.com/87741912/147377915-3369c5a7-2649-4721-92a5-87d93e15f7b1.png)
  - http-server 설치 : 
    - Linux, MAC : 
    ```shell 
    sudo npm install -g http-server 
    ```
    - Windows : 
    ```batch
    npm install -g http-server
    ```
---
- Step 1) 샘플 코드 다운로드
  - https://github.com/AlcheraInc/kyc-iframe-sample/archive/refs/heads/main.zip
---
- Step 2) 압축 풀기
---
- Step 3) 실행(https server 실행, 임의로 생성한 샘플 인증서 사용) 및 테스트 
  - 명령어 : npm start
  - ![image](https://user-images.githubusercontent.com/87741912/147376429-76c7f13f-0c4a-4a09-bdf2-f03355622392.png)
---
- Step 4) 접속 및 테스트(휴대폰 권장, PC의 경우 웹캠 화질이 충분히 좋아야 함)
  - ![image](https://user-images.githubusercontent.com/87741912/147376672-27953201-6715-4da8-ac1d-00ada39ca397.png)
  - Step 3)에서 나온 서버주소 중 본인의 환경에 맞게 브라우저에서 접속
  - 샘플코드에서는 공인된 CA 인증서를 사용하여 HTTPS 서버를 돌리는 것이 아니기 때문에 경고화면 나옴 : 고급 클릭
  - 아래 화면에서 "서버주소(안전하지 않음)(으)로 이동" 링크 클릭
  - ![image](https://user-images.githubusercontent.com/87741912/147376538-a338f52e-86f1-4a32-8796-c3baee18d230.png)
  - ![image](https://user-images.githubusercontent.com/87741912/147376556-bcf43b90-3191-4a98-b49e-68f9696fc574.png)
  - 아래 화면과 같이 "약관동의" 화면이 정상적으로 보이면 정상적으로 실행되는 것 입니다.
  - 아래 화면처럼 iframe으로 KYC 서비스 모바일웹에 전체화면(width:100%, height:100%, border: none)으로 iframe으로 연동이 됩니다.
  - ![image](https://user-images.githubusercontent.com/87741912/147376596-8c633ab2-6ad9-4d7e-a886-3a258e893e29.png)
---
- Step 5) DEBUG 윈도우
  - 테스트를 진행하시면서 iframe 내에서 동작하는 KYC 서비스에서 특정 이벤트("KYC 인증 성공" 또는 "실패", "사용자 종료(중도이탈 등)")가 발생되면 postMessage 방식으로 그 결과를 전달합니다.
  - postMessage로 전달된 데이터(json 형식)를 DEBUG 윈도우를 통해 확인할 수 있습니다.
  - ![image](https://user-images.githubusercontent.com/87741912/147376633-15a4b9d6-72c9-4a65-9e47-f98061858272.png)
---
