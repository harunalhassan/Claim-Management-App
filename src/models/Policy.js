const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policyNumber: String,
  policyholderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policyholder' },
  coverageAmount: Number,
  validityPeriod: {
    startDate: Date,
    endDate: Date
  }
});

module.exports = mongoose.model('Policy', policySchema);
