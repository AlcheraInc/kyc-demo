# kyc-iframe-sample

# 주요 샘플 코드 (index.html)
https://github.com/AlcheraInc/kyc-iframe-sample/blob/main/index.html
---

# 샘플 코드 셋업 가이드
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
