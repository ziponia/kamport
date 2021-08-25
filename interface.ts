export type PG =
  | "html5_inicis"
  | "inicis"
  | "kcp"
  | "kcp_billing"
  | "uplus"
  | "nice"
  | "jtnet"
  | "kicc"
  | "bluewalnut"
  | "kakaopay"
  | "danal"
  | "danal_tpay"
  | "mobilians"
  | "chai"
  | "syrup"
  | "payco"
  | "paypal"
  | "eximbay"
  | "naverpay"
  | "naverco"
  | "smilepay"
  | "alipay";

export type PaymentMethod =
  | "card"
  | "trans"
  | "vbank"
  | "phone"
  | "samsung"
  | "kpay"
  | "kakaopay"
  | "payco"
  | "lpay"
  | "ssgpay"
  | "tosspay"
  | "cultureland"
  | "smartculture"
  | "happymoney"
  | "booknlife"
  | "point";

export type Currency = "KRW" | "USD" | "EUR" | "JPY";

export class PaymentRequest {
  pg?: PG;
  pay_method: PaymentMethod = "card";
  escrow?: boolean = false;
  merchant_uid!: string;
  name?: string;
  amount!: number;
  custom_data?: {
    [key: string]: any;
  };
  tax_free?: number;
  currency?: Currency = "KRW";
  language?: string = "ko";
  buyer_name?: string;
  buyer_tel!: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  notice_url?: string | string[];
  display?: {
    card_quota: number[];
  };
  digital?: boolean = false;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;

  constructor(req?: PaymentRequest) {
    Object.assign(this, req);
  }
}

export interface ResCallback {
  success?: boolean;
  imp_success?: boolean;
  error_code: string;
  error_msg: string;
  imp_uid?: string;
  merchant_uid?: string;
  pay_method?: PaymentMethod;
  paid_amount?: number;
  status?: "ready" | "paid" | "failed";
  name?: string;
  pg_provider?:
    | "html5_inicis"
    | "inicis"
    | "kakaopay"
    | "uplus"
    | "nice"
    | "jtnet"
    | "danal";
  emb_pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: {
    [key: string]: any;
  };
  paid_at?: number;
  receipt_url?: string;
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string;
  vbank_date?: number;
}

export class CertificationParam {
  merchant_uid?: string;
  min_age?: number;
  name?: string;
  phone?: string;
  carrier?: "SKT" | "KTF" | "LGT" | "MVNO";
  company?: string;
  m_redirect_url?: string;
  popup: boolean = false;
}

export interface CertificationCallback {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string;
  merchant_uid: string;
}

export interface IamportInstance {
  debug?: boolean;
  init: (code: string) => void;
  request_pay: (
    param: PaymentRequest,
    callback: (rsp: ResCallback) => void
  ) => void;
  // ...TODO 본인인증
}
