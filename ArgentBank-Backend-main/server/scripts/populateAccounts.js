const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const tough = require('tough-cookie');

// Users' credentials
const users = [
  { email: 'tony@stark.com', password: 'password123' },
  { email: 'steve@rogers.com', password: 'password456' },
];

// Function to login users and get their IDs and cookies
const loginUsers = async () => {
  const userData = [];

  for (const user of users) {
    // Create a new cookie jar for each user
    const cookieJar = new tough.CookieJar();

    // Wrap axios instance with the cookie jar
    const clientWithCookies = wrapper(
      axios.create({
        baseURL: 'http://localhost:3001',
        jar: cookieJar,
        withCredentials: true,
      })
    );

    try {
      const response = await clientWithCookies.post('/api/v1/user/login', {
        email: user.email,
        password: user.password,
      });

      console.log(`Login response for user ${user.email}:`, response.data);

      // Extract userId from response
      const userId = response.data.body.id;

      console.log(`Logged in user ${userId}`);

      userData.push({ userId, client: clientWithCookies });
    } catch (error) {
      console.error(
        `Error logging in user ${user.email}:`,
        error.response ? error.response.data : error.message
      );
    }
  }

  return userData;
};

const createAccounts = async () => {
  const userData = await loginUsers();

  console.log('User Data:', userData);

  const accounts = [
    {
      account1: {
        accountDetails: {
          accountNumber: 'x0001',
          accountBalance: 100000,
        },
        transactions: [
          {
            date: '10/09/24',
            description: 'Golden Sun Bakery',
            transactionAmount: 100,
            balanceAfterTransaction: 99900,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Golden Sun Bakery',
            transactionAmount: 100,
            balanceAfterTransaction: 99800,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Golden Sun Bakery',
            transactionAmount: 100,
            balanceAfterTransaction: 99700,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Golden Sun Bakery',
            transactionAmount: 100,
            balanceAfterTransaction: 99600,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Golden Sun Bakery',
            transactionAmount: 100,
            balanceAfterTransaction: 99500,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
        ],
      },
      account2: {
        accountDetails: {
          accountNumber: 'x0002',
          accountBalance: 200000,
        },
        transactions: [
          {
            date: '10/09/24',
            description: 'Wagamama FastFood',
            transactionAmount: 100,
            balanceAfterTransaction: 199900,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Wagamama FastFood',
            transactionAmount: 100,
            balanceAfterTransaction: 199800,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Wagamama FastFood',
            transactionAmount: 100,
            balanceAfterTransaction: 199700,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Wagamama FastFood',
            transactionAmount: 100,
            balanceAfterTransaction: 199600,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Wagamama FastFood',
            transactionAmount: 100,
            balanceAfterTransaction: 199500,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
        ],
      },
      account3: {
        accountDetails: {
          accountNumber: 'x0003',
          accountBalance: 300000,
        },
        transactions: [
          {
            date: '10/09/24',
            description: 'EDF Electricity Supplier',
            transactionAmount: 100,
            balanceAfterTransaction: 299900,
            transactionType: 'Electronic',
            transactionCategory: 'Service',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'EDF Electricity Supplier',
            transactionAmount: 100,
            balanceAfterTransaction: 299800,
            transactionType: 'Electronic',
            transactionCategory: 'Service',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'EDF Electricity Supplier',
            transactionAmount: 100,
            balanceAfterTransaction: 299700,
            transactionType: 'Electronic',
            transactionCategory: 'Service',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'EDF Electricity Supplier',
            transactionAmount: 100,
            balanceAfterTransaction: 299600,
            transactionType: 'Electronic',
            transactionCategory: 'Service',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'EDF Electricity Supplier',
            transactionAmount: 100,
            balanceAfterTransaction: 299500,
            transactionType: 'Electronic',
            transactionCategory: 'Service',
            transactionNote: 'Lorem ipsum',
          },
        ],
      },
    },
    {
      account1: {
        accountDetails: {
          accountNumber: 'x0001',
          accountBalance: 100000,
        },
        transactions: [
          {
            date: '10/09/24',
            description: 'Golden Sun Bakery',
            transactionAmount: 100,
            balanceAfterTransaction: 99900,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Golden Sun Bakery',
            transactionAmount: 100,
            balanceAfterTransaction: 99800,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Golden Sun Bakery',
            transactionAmount: 100,
            balanceAfterTransaction: 99700,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Golden Sun Bakery',
            transactionAmount: 100,
            balanceAfterTransaction: 99600,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Golden Sun Bakery',
            transactionAmount: 100,
            balanceAfterTransaction: 99500,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
        ],
      },
      account2: {
        accountDetails: {
          accountNumber: 'x0002',
          accountBalance: 200000,
        },
        transactions: [
          {
            date: '10/09/24',
            description: 'Wagamama FastFood',
            transactionAmount: 100,
            balanceAfterTransaction: 199900,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Wagamama FastFood',
            transactionAmount: 100,
            balanceAfterTransaction: 199800,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Wagamama FastFood',
            transactionAmount: 100,
            balanceAfterTransaction: 199700,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Wagamama FastFood',
            transactionAmount: 100,
            balanceAfterTransaction: 199600,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'Wagamama FastFood',
            transactionAmount: 100,
            balanceAfterTransaction: 199500,
            transactionType: 'Electronic',
            transactionCategory: 'Food',
            transactionNote: 'Lorem ipsum',
          },
        ],
      },
      account3: {
        accountDetails: {
          accountNumber: 'x0003',
          accountBalance: 300000,
        },
        transactions: [
          {
            date: '10/09/24',
            description: 'EDF Electricity Supplier',
            transactionAmount: 100,
            balanceAfterTransaction: 299900,
            transactionType: 'Electronic',
            transactionCategory: 'Service',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'EDF Electricity Supplier',
            transactionAmount: 100,
            balanceAfterTransaction: 299800,
            transactionType: 'Electronic',
            transactionCategory: 'Service',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'EDF Electricity Supplier',
            transactionAmount: 100,
            balanceAfterTransaction: 299700,
            transactionType: 'Electronic',
            transactionCategory: 'Service',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'EDF Electricity Supplier',
            transactionAmount: 100,
            balanceAfterTransaction: 299600,
            transactionType: 'Electronic',
            transactionCategory: 'Service',
            transactionNote: 'Lorem ipsum',
          },
          {
            date: '10/09/24',
            description: 'EDF Electricity Supplier',
            transactionAmount: 100,
            balanceAfterTransaction: 299500,
            transactionType: 'Electronic',
            transactionCategory: 'Service',
            transactionNote: 'Lorem ipsum',
          },
        ],
      },
    },
  ];

  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const { userId, client } = userData[i];

    console.log(`Creating account for userId: ${userId}`);
    console.log('Account data being sent:', JSON.stringify(account, null, 2));

    try {
      // Use client with cookies to create account
      console.log(
        'Account data being sent(try part):',
        JSON.stringify(account, null, 2)
      );

      const response = await client.post(
        '/api/v1/account/generateAccount',
        account,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(`Account created for user ${userId}`);
    } catch (error) {
      console.error(
        `Error creating account for user ${userId}:`,
        error.response ? error.response.data : error.message
      );
    }
  }
};

createAccounts().catch((error) =>
  console.error('Error in createAccounts:', error)
);
