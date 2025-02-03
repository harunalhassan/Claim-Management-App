const Policy = require('../models/Policy');
const Policyholder = require('../models/Policyholder');

// Create a new policy and associate it with a policyholder
async function createPolicy(req, res) {
    const { policyNumber, policyholderId, coverageAmount, validityPeriod } = req.body;
    
    try {
        // Find the policyholder in the database
        const policyholder = await Policyholder.findById(policyholderId);
        if (!policyholder) {
            return res.status(404).json({ error: "Policyholder not found" });
        }

        // Create a new policy
        const policy = new Policy({
            policyNumber,
            policyholderId,
            coverageAmount,
            validityPeriod
        });

        // Save the policy to the database
        await policy.save();

        // Add the policy ID to the policyholder's policies array
        policyholder.policies.push(policy._id);
        await policyholder.save();

        res.status(201).json(policy);
    } catch (error) {
        console.error("Error creating policy:", error);
        res.status(500).json({ error: "Failed to create policy" });
    }
}

// Retrieve all policies from the database
async function getAllPolicies(req, res) {
    try {
        const policies = await Policy.find().populate('policyholderId');
        res.json(policies);
    } catch (error) {
        console.error("Error fetching policies:", error);
        res.status(500).json({ error: "Failed to retrieve policies" });
    }
}

module.exports = { createPolicy, getAllPolicies };
