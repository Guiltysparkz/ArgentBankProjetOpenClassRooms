const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const tokenValidation = require('../middleware/tokenValidation');

router.post(
  '/generateAccount',
  tokenValidation.validateToken,
  accountController.createAccount
);

router.get(
  '/getAccounts',
  tokenValidation.validateToken,
  accountController.getAccounts
);

router.put(
  '/updateTransactionDetail',
  tokenValidation.validateToken,
  accountController.updateTransactionDetail
);

module.exports = router;
