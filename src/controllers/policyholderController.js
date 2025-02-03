const Policyholder = require('../models/Policyholder');
const { policyholders } = require('../data/inMemoryDB');

function createPolicyholder(req, res) {
    const { name, dob, contactDetails } = req.body;
    const id = policyholders.length + 1;
    const policyholder = new Policyholder(id, name, dob, contactDetails);
    policyholders.push(policyholder);
    res.status(201).json(policyholder);
}

function getAllPolicyholders(req, res) {
    res.json(policyholders);
}

function getPolicyholderById(req, res) {
    const policyholder = policyholders.find(ph => ph.id == req.params.id);
    if (!policyholder) return res.status(404).json({ error: "Policyholder not found" });
    res.json(policyholder);
}

module.exports = { createPolicyholder, getAllPolicyholders, getPolicyholderById };
