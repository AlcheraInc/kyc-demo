
function UserException(msg) {
    this.message = msg;
    this.name = 'UserException';
}

function Tester() {

    this.testOnLoad = () => {
        let resp;
        try {
            resp = this.__parseParams();

            if (resp) {
                if (resp?.params?.userinfo_type === "params") {
                    // ui control
                    paramBox.click();

                    // param set
                    document.getElementById('userinfo_name').value = resp.params.name;
                    document.getElementById('userinfo_birthday').value = resp.params.birthday;
                    document.getElementById('userinfo_phone_number').value = resp.params.phone_number;
                    document.getElementById('userinfo_email').value = resp.params.email;
                } else if (resp?.params?.userinfo_type === "use_input_ui"){
                    useInputUiBox.click();
                } else {
                    throw UserException("Invalid userinfo_type\n\n" + resp?.params);
                }

                if (resp?.params?.access_token) {
                    // ui control
                    document.getElementById('customerinfo_credential_type_div').style.display = 'none';
                    document.getElementById('customerinfo_access_token_div').style.display = 'inline-block';

                    // param set
                    document.getElementById('customerinfo_access_token').value = resp.params.access_token;
                } else if (resp?.params?.customer_id){
                    // ui control
                    document.getElementById('customerinfo_credential_type_div').style.display = 'inline-block';
                    document.getElementById('customerinfo_access_token_div').style.display = 'none';

                    // param set
                    document.getElementById('customerinfo_customer_id').value = resp.params.customer_id;
                    if (resp?.params?.id && resp?.params?.key) {
                        document.getElementById('customerinfo_id').value = resp.params.id;
                        document.getElementById('customerinfo_key').value = resp.params.key;
                    } else {
                        alert("[Warning] 연결 계정 정보를 입력후 테스트를 시작해주세요.");
                        document.getElementById("customerinfo_id").focus();
                    }
                } else {
                    throw UserException("Invalid cridential or access_token\n\n" + resp?.params);
                }

                this.encodedParams = resp?.encodedParams;
                this.params = resp?.params;
            }
        } catch (e) {
            alert("[ERROR] " + e.message);
            console.error(e.message);
        }
    }

    this.testStartBtnOnClick = () => {
        try {
            if (!!this?.params?.access_token) {
                // update credential info "id(client_id), key(client_secret)"
                this.params.id = document.getElementById('customerinfo_access_token').value;
            } else if (!!this?.params?.customer_id) {
                // update credential info "id(client_id), key(client_secret)"
                this.params.id = document.getElementById('customerinfo_id').value;
                this.params.key = document.getElementById('customerinfo_key').value

                if (!this.__validateCredentialInfo(this.params)) {
                    throw new UserException("Invalid Credential Info ['customer_id' and 'id' and 'key']\n\n"
                        + JSON.stringify(this.params));
                }
            }

            this.kycIframe = document.getElementById("kyc_iframe");
            const __this__ = this;

            this.kycIframe.onload = function () {
                __this__.kycIframe.contentWindow.postMessage(__this__.encodedParams, KYC_TARGET_ORIGIN);
                hideLoadingUI();
                startKYC();
                __this__.onload = null;
            };

            this.kycIframe.src = KYC_URL;
            showLoadingUI();

        } catch (e) {
            alert("[ERROR] " + e.message);
            console.error(e.message);
        }
    }

    this.__paramsToObject = (entries) => {
        const result = {}
        for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
            result[key] = value;
        }
        return result;
    }

    this.__parseParams = () => {
        let errorMsg, encodedParams, params;

        const searchParams = new URLSearchParams(location.search);

        const encoded = searchParams.get("encoded") === "true";

        if (encoded) {
            encodedParams = searchParams.get("encodedParams");
            params = this.__decodeParams(encodedParams)
        } else {
            params = this.__paramsToObject(searchParams.entries());
            encodedParams = btoa(encodeURIComponent(JSON.stringify(params)));
        }

        if (!this.__validateUIType(params)) {
            errorMsg ="[ERROR] Invalid userinfo_type ['params' or 'use_input_ui']\n\n" + JSON.stringify(params);
            throw new UserException(errorMsg);
        }

        if (!this.__validateAccessInfo(params)) {
            errorMsg = "[ERROR] Invalid Access Info ['access_token' or 'customer_id']\n\n" + JSON.stringify(params);
            throw new UserException(errorMsg);
        }

        if (!this.__validateParamsDetail(params)) {
            errorMsg = "[ERROR] Invalid params!\n\n" + JSON.stringify(params);
            throw new UserException(errorMsg);
        }

        return {encodedParams: encodedParams, params: params};
    }

    this.__decodeParams = (encodedParams) => {
        return JSON.parse(decodeURIComponent(atob(encodedParams)));
    }

    this.__validateAccessInfo = (params) => {
        return !!params.access_token || !!params.customer_id;
    }

    this.__validateCredentialInfo = (params) => {
        return !!params.customer_id && !!params.id && !!params.key;
    }

    this.__validateUIType = (params) => {
        return (params.userinfo_type === "params") || (params.userinfo_type === "use_input_ui");
    }

    this.__validateParamsDetail = (params) => {
        let valid = true;

        if (params.userinfo_type === "params") {
            valid = !!params.name && !!params.birthday && !!params.phone_number && !!params.email;
        } else if (params.userinfo_type === "use_input_ui") {
            // nothing to do
        } else {
            throw new UserException("Unknown Error");
        }

        return valid;
    }
}

function initTest() {
    window.tester = new Tester();
    window.tester.testOnLoad();
}

function startTest() {
    window.tester.testStartBtnOnClick();
}

/** exam **
 * credential : https://127.0.0.1:8000/test.html?customer_id=9&id=demoUser&key=demoUser0000!&userinfo_type=params&name=%EC%96%91%EB%8F%99%ED%98%84&birthday=1984-11-23&phone_number=01012345678&email=dh.yang@useb.co.kr
 * access_token : https://127.0.0.1:8000/test.html?access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjEzMjE4NzMsIm9yaWdfaWF0IjoxNjYxMjM1NDczLCJwYXlsb2FkIjp7ImN1c3RvbWVyX2lkIjo5LCJjdXN0b21lcl9uYW1lIjoiKHBhcmFtKSBpZCIsImluZHVzdHJ5IjoyLCJpZCI6MywidXNlcm5hbWUiOiJkZW1vVXNlciIsInJvbGUiOjJ9fQ.LnbsTpd0ZfbVk1oRCqrlq4uBX2-eiYhWmv6brp8asFocH7qFVNpjqRGBXdV_X7R1gZg-eqMvlncEswk5ljAEDpNLEXsmKp5G-zzUebB3bHjIutVALySR0csLPzR9_QW-JMTtPLqO6CTfbiDE3XM5eIlzompAo20lLMTvbUgQOJweePZqmpB6BKE7IW-VaKnlh5gO7F1SbkzWn_33rau589_HPSzYXiqqxuG_upjb7qmnrzRg-NX5BqX0PrVdZu1qD256wVyxD4AwUxSOXEbh5-47dV9ibFQpDZS4WxAchOnQGnH9gUq058lUAtx9yBb-WHcZFNfs5nlr0FccyCCoiA&userinfo_type=params&name=%EC%96%91%EB%8F%99%ED%98%84&birthday=1984-11-23&phone_number=01012345678&email=rozig@nate.com
 */

