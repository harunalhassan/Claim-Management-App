const Claim = require('../models/Claim');
const { claims, policies } = require('../data/inMemoryDB');
const { validateClaimAmount, isPolicyValid } = require('../utils/validations');

function createClaim(req, res) {
    const { policyId, claimAmount, description } = req.body;
    console.log("Policies List:", policies);  // 🔍 Debugging line
    const policy = policies.find(p => p.id == policyId);
    console.log(req.body)
    
    if (!policy) return res.status(404).json({ error: "Policy not found" });
    if (!isPolicyValid(policy)) return res.status(400).json({ error: "Policy is expired" });
    if (!validateClaimAmount(claimAmount, policy)) return res.status(400).json({ error: "Claim amount exceeds policy limit" });

    const id = claims.length + 1;
    const claim = new Claim(id, `CLM${id}`, policyId, claimAmount, "Pending", description, new Date());
    claims.push(claim);

    res.status(201).json(claim);
    
    
}

function getAllClaims(req, res) {
    res.json(claims);
}

function getClaimById(req, res) {
    const claim = claims.find(c => c.id == req.params.id);
    if (!claim) return res.status(404).json({ error: "Claim not found" });
    res.json(claim);
}

function updateClaimStatus(req, res) {
    const claim = claims.find(c => c.id == req.params.id);
    if (!claim) return res.status(404).json({ error: "Claim not found" });

    const { status } = req.body;
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status update" });
    }

    claim.status = status;
    res.json(claim);
}

function deleteClaim(req, res) {
    const index = claims.findIndex(c => c.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Claim not found" });

    claims.splice(index, 1);
    res.status(204).send();
}

module.exports = { createClaim, getAllClaims, getClaimById, updateClaimStatus, deleteClaim };
