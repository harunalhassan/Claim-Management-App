const Policy = require('../models/Policy');
const { policies, policyholders } = require('../data/inMemoryDB');

function createPolicy(req, res) {
    const { policyNumber, policyholderId, coverageAmount, validityPeriod } = req.body;
    const policyholder = policyholders.find(ph => ph.id == policyholderId);
    if (!policyholder) return res.status(404).json({ error: "Policyholder not found" });

    const id = policies.length + 1;
    const policy = new Policy(id, policyNumber, policyholderId, coverageAmount, validityPeriod);
    policies.push(policy);
    policyholder.policies.push(id);

    res.status(201).json(policy);
}

function getAllPolicies(req, res) {
    res.json(policies);
}

module.exports = { createPolicy, getAllPolicies };
