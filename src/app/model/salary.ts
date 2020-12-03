export class Salary {
  id: number;
  name: String;
  type: String;
  date: String;
  status: String;
  designation: String;
  salary: number;
  incentives: number;
  momthlySalary: number;
  incomeTax: number;
  totalDeductions80C: number;
  montlyDeductions: number;
  othAllowance: number;
  lta: number;
  bonus: number;
  payableDays: number;
  fiveyear: number;
  lic: number;
  ppf: number;
  mf: number;
  totalDeductions80D: number;
  medicalIns: number;
  medicalTreat: number;
  totalDeductions80DD: number;
  donations: number;
  treatment: number;
  totalRent: number;
  rent: number;
  totalHRA: number;
  houseProperty: number;
  selfOccupied: number;
  totalDeductions: number;
  monthlySalary: number;
  basic: number;
  hra: number;
  allowance: number;
  netSalary: number;
  totalDays: number;
  lop: number;
  constructor(id: number, name: String, type: String, date: String,
    status: String, designation: String,
    salary: number, incentives: number, momthlySalary: number, incomeTax: number,
    totalDeductions80C: number, montlyDeductions: number, othAllowance: number, lta: number,
    bonus: number, payableDays: number, fiveyear: number, lic: number, ppf: number, mf: number,
    totalDeductions80D: number, medicalIns: number, medicalTreat: number, totalDeductions80DD: number,
    donations: number, treatment: number, totalRent: number, rent: number, totalHRA: number,
    houseProperty: number, selfOccupied: number, totalDeductions: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.date = date;
    this.status = status;
    this.designation = designation;
    this.salary = salary;
    this.incentives = incentives;
    this.momthlySalary = momthlySalary;
    this.incomeTax = incomeTax;
    this.totalDeductions80C = totalDeductions80C;
    this.montlyDeductions = montlyDeductions;
    this.othAllowance = othAllowance;
    this.lta = lta;
    this.bonus = bonus;
    this.payableDays = payableDays;
    this.fiveyear = fiveyear;
    this.lic = lic;
    this.ppf = ppf;
    this.mf = mf;
    this.totalDeductions80D = totalDeductions80D;
    this.medicalIns = medicalIns;
    this.medicalTreat = medicalTreat;
    this.totalDeductions80DD = totalDeductions80DD;
    this.donations = donations;
    this.treatment = treatment;
    this.totalRent = totalRent;
    this.rent = rent;
    this.totalHRA = totalHRA;
    this.houseProperty = houseProperty;
    this.selfOccupied = selfOccupied;
    this.totalDeductions = totalDeductions;
  }

}