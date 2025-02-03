class Policy {
  constructor(id, policyNumber, policyholderId, coverageAmount, validityPeriod) {
      this.id = id;
      this.policyNumber = policyNumber;
      this.policyholderId = policyholderId;
      this.coverageAmount = coverageAmount;
      this.validityPeriod = validityPeriod; // only date no need to {startDate, endDate}
  }
}

module.exports = Policy;
