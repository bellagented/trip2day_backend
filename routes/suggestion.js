const express = require('express');
const router = express.Router();
const Suggestion = require('../models/suggestion');

/**
 * GET: restituisce tutte le suggestion che hanno nel campo 'to' il valore
 * passato nell url
 * 
 * Require:
 * http//..../suggestion/pippo 
 */
router.get('/:to', async (req,res)=>{
  try {
    //console.log(req.params.to);
    const queryTo = req.params.to;
    const results = await Suggestion.find({to:queryTo}).exec();
    res.json(results);
  } catch(err) {
    res.status(500).json({message: err.message})
  }
});

/**
 * PATCH: dato un id di una suggestion, il campo accepted viene 
 * trasformato da true a false e viceversa.
 * 
 * Require: 
 * {
 *    "id": ..id di una suggestion..
 * }
 */
router.patch('/change', async (req,res) => {
  try {
    const queryId = req.body.id;
    const targetSuggestion = await Suggestion.findById(queryId).exec();
    if(targetSuggestion != null) {
      targetSuggestion.accepted = !targetSuggestion.accepted;
      const updatedSuggestion = await targetSuggestion.save();
      res.status(201).json(updatedSuggestion);
    }
    else {
      res.status(201).json([]);
    }
  } catch(err) {
    res.status(400).json({message:err.message})
  }
});

/**
 * DELETE: cancella una suggestion pending (accepted:false)
 * 
 * Require: 
 * {
 *    "id": ..id di una suggestion da cancellare..
 * }
 */
router.delete('/delete', async (req,res) => {
  try {
    const queryId = req.body.id;
    const targetSuggestion = await Suggestion.findById(queryId).exec();
    if(targetSuggestion != null) {
      if(targetSuggestion.accepted === false) {
        await targetSuggestion.remove();
        res.status(202).json({message:"Removed!"});
      }
    } else {
      res.status(400).json({message:"Bad Request!"});
    }
  } catch(err) {
    res.status(400).json({message:err.message})
  }
});

/**
 * POST: crea nuove suggestion. Utilizzare solo per popolare db.
 */
router.post('/', async (req,res) => {
  const sugg = new Suggestion({
    from: req.body.from,
    to: req.body.to,
    store: req.body.store,
    accepted: req.body.accepted
  })
  try {
    const newSugg = await sugg.save();
    res.status(201).json(newSugg);
  } catch(err) {
    res.status(400).json({message:err.message})
  }
});

module.exports = router;