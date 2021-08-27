import { IamportInstance, PaymentRequest, ResCallback } from "./interface";

declare const window: any;

export interface Initilize {}

/**
 * 추후에 추가할 인스턴스 옵션입니다.
 * 현재는 사용하지 않습니다.
 */
export interface IamportOption {
  /** ...TODO Options */
}

function logging(...str: any[]) {
  const now = new Date().toUTCString();
  console.log(`Iamport DEBUG: ${now} => `, ...str);
}

class Iamport {
  /**
   * script 태그에 추가 attribute 로 임의의 값.
   */
  private static SCRIPT_ATTR_NAME = "imp-lib";

  /**
   * 디버깅 여부
   */
  public static debug: boolean = false;

  /**
   * 아임포트 인스턴스
   */
  private IMP: IamportInstance;

  /**
   * 아임포트 가맹점 식별코드
   */
  private impCode: string;

  /**
   * 아임포트 스크립트를 초기화.
   *
   * head 태그에 jquery 와 iamport 를 넣어준다.
   * 만약, head 태그에 직접 넣었다면, 이 함수를 호출하지 않아도 된다.
   */
  public static async initialize() {
    return this.loadScript();
  }

  /**
   * 아임포트 를 사용하기 위해, 인스턴스화 시킨다.
   *
   * @param impCode 가맹점 식별 코드
   */
  constructor(impCode: string, options: IamportOption = {}) {
    this.impCode = impCode;

    if (typeof window === "undefined") {
      throw new Error("반드시 브라우저에서 호출해야 합니다.");
    }

    window.IMP.init(impCode);
    this.IMP = window.IMP;

    if (Iamport.debug) {
      logging("Install Iamport instance, ", this.impCode);
    }
  }

  /**
   * 일반결제
   *
   * @param param - https://docs.iamport.kr/implementation/payment
   */
  requestPay(param: PaymentRequest): Promise<ResCallback> {
    return new Promise((resolve, reject) => {
      if (Iamport.debug) {
        logging(`일반결제 호출 => `, param);
      }
      this.IMP.request_pay(param, (rsp: ResCallback) => {
        if (rsp.success || rsp.imp_success) {
          if (Iamport.debug) {
            logging(`일반결제 호출 => 성공`, rsp);
          }
          resolve(rsp);
        } else {
          logging(`일반결제 호출 => 실패`, rsp);
          reject(rsp);
        }
      });
    });
  }

  /**
   * check aleady jquery, iamport library load
   */
  private static checkScript() {
    return {
      jquery: !!document.querySelector(
        `script[${this.SCRIPT_ATTR_NAME}="jquery"]`
      ),
      iamport: !!document.querySelector(
        `script[${this.SCRIPT_ATTR_NAME}="iamport"]`
      ),
    };
  }

  /**
   * require script load
   */
  private static async loadScript() {
    try {
      const { jquery, iamport } = this.checkScript();

      if (!jquery) {
        await this.createLoadScript(
          "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
          "jquery"
        );
      } else {
        if (this.debug) {
          logging(`Jquery Aleady Installed`);
        }
      }

      if (this.debug) {
        logging(`Installed Jquery`);
      }

      if (!iamport) {
        await this.createLoadScript(
          "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js",
          "iamport"
        );
      } else {
        if (this.debug) {
          logging(`Jquery Aleady Installed`);
        }
      }

      if (this.debug) {
        logging(`Installed Iamport SDK`);
      }
    } catch (e) {
      console.error(e);
    }
  }

  private static async createLoadScript(src: string, attr: string) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.setAttribute(this.SCRIPT_ATTR_NAME, attr);
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.querySelector("head")?.appendChild(script);
    });
  }
}

export * from "./interface";
export default Iamport;
