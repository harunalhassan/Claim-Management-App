class Claim {
  constructor(id, claimNumber, policyId, claimAmount, status, description, dateFiled) {
      this.id = id;
      this.claimNumber = claimNumber;
      this.policyId = policyId;
      this.claimAmount = claimAmount;
      this.status = status; // Pending, Approved, Rejected
      this.description = description;
      this.dateFiled = dateFiled;
  }
}

module.exports = Claim;
