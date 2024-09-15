const accountService = require('../services/accountService');

module.exports.createAccount = async (req, res) => {
  let response = {};

  try {
    const userId = req.user.id;
    const accountData = req.body;

    console.log(
      'Account data received in controller:',
      JSON.stringify(accountData, null, 2)
    );

    const responseFromService = await accountService.createAccount(
      userId,
      accountData
    );

    response.status = 200;
    response.message = 'Account successfully created';
    response.body = responseFromService;
  } catch (error) {
    console.error('Error in createAccount - accountController.js', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getAccounts = async (req, res) => {
  let response = {};

  try {
    const userId = req.user.id;
    console.log('User ID in getAccounts:', userId);

    const responseFromService = await accountService.getAccounts(userId);

    response.status = 200;
    response.message = 'Successfully retrieved accounts';
    response.body = responseFromService;
  } catch (error) {
    console.error('Error in getAccounts - accountController.js', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.updateTransactionDetail = async (req, res) => {
  let response = {};

  try {
    const userId = req.user.id;
    const transactionData = req.body;

    const responseFromService = await accountService.updateTransactionDetail(
      userId,
      transactionData
    );
    response.status = 200;
    response.message = 'Successfully updated Transaction Detail';
    response.body = responseFromService;
  } catch (error) {
    console.log('Error in updateTransactionDetail - accountController.js');
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};
