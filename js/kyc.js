window.addEventListener("message", (e) => {
    console.log("alcherakyc response", e.data); // base64 encoded된 JSON 메시지이므로 decoded해야 함
    console.log("origin :", e.origin);
    try {
        const decodedData = decodeURIComponent(atob(e.data));
        console.log("decoded", decodedData);
        const json = JSON.parse(decodedData);
        const str = JSON.stringify(json, undefined, 4);
        console.log("json", json);

        console.log(json.result + "처리 필요");
        const strHighlight = syntaxHighlight(str);

        if (json.result === "success") {
            output(strHighlight);
            updateKYCResult(strHighlight, json);
        } else if (json.result === "failed") {
            output(strHighlight);
            updateKYCResult(strHighlight, json);
        } else if (json.result === "complete") {
            output(strHighlight);
            updateKYCStatus("KYC가 완료되었습니다.");
            endKYC();
        } else if (json.result === "close") {
            output(strHighlight);
            updateKYCStatus("KYC가 완료되지 않았습니다.");
            endKYC();
        } else {
            // invalid result
        }
    } catch (error) {
        console.log("wrong data", error);
    }
});

function iframeOnLoad(e) {
    const kycIframe = document.getElementById("kyc_iframe");
    if (!kycIframe.src) {
        return;
    }

    // 고객사별 params 정보는 별도로 전달됩니다. 테스트를 위한 임시계정 정보이며, 운영을 위한 계정정보로 변경 필요
    const params = {"customer_id": "2", "id": "user0001", "key": "Alchera0000!"};
    const targetOrigin = "*"
    encodedParams = btoa(JSON.stringify(params))
    
    kycIframe.contentWindow.postMessage(encodedParams, targetOrigin);
}

function startKYC() {
    document.getElementById('customer_start_ui').style.display = 'none';
    document.getElementById('kyc').style.display = 'flex';
    document.getElementById('customer_end_ui').style.display = 'none';
}

function endKYC() {
    document.getElementById('customer_start_ui').style.display = 'none';
    document.getElementById('kyc').style.display = 'none';
    document.getElementById('customer_end_ui').style.display = 'flex';
}

function initKYC() {
    document.getElementById('kyc_result').innerHTML = '';
    document.getElementById('kyc_status').innerHTML = '';

    document.getElementById('customer_start_ui').style.display = 'flex';
    document.getElementById('kyc').style.display = 'none';
    document.getElementById('customer_end_ui').style.display = 'none';

    const kyc_iframe = document.getElementById("kyc_iframe")
    
    kyc_iframe.src="https://kyc.useb.co.kr/auth"
}

function updateKYCResult(data, json) {
    const kycResult = document.getElementById("kyc_result");
    kycResult.innerHTML = "";
    
    const div = document.createElement("div");
    div.className = 'syntaxHighlight bright';
    
    let content = "<center><b>최종 결과 : " + json.result + " </b></center>"

    const detail = json.detail;

    if (detail) {
        if (detail.module.id_card_ocr && detail.module.id_card_verification) {
            content += "<br/><b>=== 신분증 진위확인 === </b>";
            content += "<br/> - 결과 : " + (detail.id_card ? (detail.id_card.verified ? "<span style='color:blue'>성공</span>" : "<span style='color:red'>실패</span>") : "N/A");
            if (detail.id_card) {
                content += "<br/> - 신분증 사진<br/>&nbsp;&nbsp;&nbsp;<img style='max-height:200px;' src='" + detail.id_card.id_card_image_url +"' /></b>";
            }
        }

        if (detail.module.face_authentication) {
            content += "<br/>"
            content += "<br/><b>=== 신분증 얼굴 사진 VS 셀피 촬영 사진 유사도 === </b>";
            content += "<br/> - 결과 : " + (detail.face_check ? (detail.face_check.is_same_person ? "<span style='color:blue'>높음</span>" : "<span style='color:red'>낮음</span>") : "N/A");
            if (detail.face_check) {
                content += "<br/> - 신분증 얼굴 사진<br/>&nbsp;&nbsp;&nbsp;<img style='max-height:100px;' src='" + detail.id_card.id_crop_image_url +"' />";
                content += "<br/> - 셀피 촬영 사진<br/>&nbsp;&nbsp;&nbsp;<img style='max-height:100px;' src='" + detail.face_check.selfie_image_url +"' />";
            }
        }

        if (detail.module.liveness) {
            content += "<br/>"
            content += "<br/><b>=== 얼굴 사진 진위확인 === </b>";
            content += "<br/> - 결과 : " + (detail.face_check ? (detail.face_check.is_live ? "<span style='color:blue'>성공</span>" : "<span style='color:red'>실패</span>") : "N/A");
        }

        if (detail.module.account_verification) {
            content += "<br/>"
            content += "<br/><b>=== 1원 계좌 인증 === </b>";
            content += "<br/> - 결과 : " + (detail.account ? (detail.account.verified ? "<span style='color:blue'>성공</span>" : "<span style='color:red'>실패</span>") : "N/A");
        }
    } 
    
    div.innerHTML = content;
    kycResult.appendChild(div);
    
    const pre = document.createElement("pre");
    pre.className = "syntaxHighlight bright";
    pre.innerHTML = data;
    kycResult.appendChild(pre);
}

function updateKYCStatus(msg) {
    const div = document.getElementById("kyc_status");
    div.innerHTML = msg;
}