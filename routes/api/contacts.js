const express = require('express')

const {getContacts, getContactById, removeContact, addContact, updateContact} = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    res.json( await getContacts() )
  } catch (err) {
    res.status(500).json({message: "Server error"});
    console.log('Error get >>', err);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    res.json( await getContactById(req.params.contactId) )
  } catch (err) {
    res.status(500).json({message: "Server error"});
    console.log('Error getID >>', err);
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
