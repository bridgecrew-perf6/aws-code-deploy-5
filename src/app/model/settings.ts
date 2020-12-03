export class Settings {
  pf: number;
  esi: number;
  basic: number;
  hra: number;
  allowance: number;
  profTax: number;
  welfareFund: number;

  constructor(pf: number,esi: number,basic: number,hra: number,allowance: number,profTax: number,
    welfareFund: number) {
    this.pf = pf;
    this.esi = esi;
    this.basic = basic;
    this.hra = hra;
    this.allowance = allowance;
    this.profTax = profTax;
    this.welfareFund = welfareFund;
  }

}