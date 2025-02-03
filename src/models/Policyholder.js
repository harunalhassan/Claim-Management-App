class Policyholder {
  constructor(id, name, dob, contactDetails) {
      this.id = id;
      this.name = name;
      this.dob = dob;
      this.contactDetails = contactDetails;
      this.policies = []; // Stores associated policy IDs
  }
}

module.exports = Policyholder;
