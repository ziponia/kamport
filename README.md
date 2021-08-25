# 아임포트 typescript SDK

## install package

```
$ npm i kamport
// or yarn
$ yarn add kamport
```

## Usage Example

```jsx
import Iamport, { PaymentRequest } from "kamport";

function App() {
  const handlePayment = async () => {
    // debug 모드 ( 기본 : false )
    Iamport.debug = true;

    // jquery 와, iamport sdk 를 이미 script 로 임포트 했을 경우, 아래 줄을 생략합니다.
    await Iamport.initialize();

    // 아임포트 프로세스
    const imp = new Iamport("iamport"); // your iamport key

    // merchant_uid 생성
    const merchant_uid = `ORDER_${new Date().getTime()}`;

    // request 객체 생성
    const req = new PaymentRequest({
      // param
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: merchant_uid,
      name: "노르웨이 회전 의자",
      amount: 100,
      buyer_email: "gildong@gmail.com",
      buyer_name: "홍길동",
      buyer_tel: "010-4242-4242",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "01181",
    });

    try {
      // 결제요청
      const payment = await imp.requestPay(req);
      console.log("결제성공");
    } catch (e) {
      // 결제실패
      console.log("결제 실패");
      console.error(e);
    }
  };

  // ...
}
```
