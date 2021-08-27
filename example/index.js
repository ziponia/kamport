import "regenerator-runtime";
import React from "react";
import ReactDOM from "react-dom";

import Iamport, { PaymentRequest } from "../dist";

const Index = () => {
  const handlePayment = async () => {
    Iamport.debug = true;

    await Iamport.initialize();
    const imp = new Iamport("iamport");

    const merchant_uid = `ORDER_${new Date().getTime()}`;

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
      const payment = await imp.requestPay(req);
      alert("결제성공");
    } catch (e) {
      alert("결제를 취소했습니다.");
      console.error(e);
    }
  };
  return (
    <div>
      <button onClick={handlePayment}>결제하기</button>
    </div>
  );
};

ReactDOM.render(Index(), document.getElementById("root"));
