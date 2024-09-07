<h1 align="center">Playwright Web Testing Framework</h1>
<p align= "center">
<img src="https://svglogos.net/wp-content/uploads/playwright.svg" alt="playwright logo">
</p>

## Overview
This is a web testing framework for testing the functionality of the [Sauce Demo](https://www.saucedemo.com/) webpage.

## Project Setup
In order to correctly set up this project, please adhere to the following steps:
1. <b>Clone this repository onto your local machine</b>
2. <b>Install Playwright dependencies</b> 

    - Open a new terminal window and navigate to where the project is located
    - Enter  `npm init playwright@latest` into the terminal
    - Select <b>TypeScript</b>
    - Keep tests location as <b>tests</b>
    - Keep GitHub Actions workflow as false
    - Install Playwright browsers (keep as true)

3. <b>Create a new .env file within the project</b>
4. <b>Add the following to your .env file</b>
    ```properties
    URL='https://www.saucedemo.com/'
    USERNAME='standard_user'
    PASSWORD='secret_sauce'
    ```
5. <b>Run the test suite through the terminal</b>
    - `npx playwright test` to run all tests
    - `npx playwright test --ui` to access the Playwright UI
    - `npx playwright test --project=chromium` to run all tests on Chrome <b>only</b>
    - `npx playwright test --project=firefox` to run all tests on Firefox <b>only</b>

## Tests performed

This framework performs the following functional tests to ensure the functionality of the sauce demo webpage is as intended:

- Successful login
- Unsuccessful login
- Successful logout
- Add item to cart from inventory and specific item page
- Add multiple different items to cart
- Add multiple same items to cart
- Remove items from cart from inventory, item and cart page
- Proceed to payment with items and no items in cart
- Proceed to payment with invalid user details
- Proceed to payment with missing user details
- Validate subtotal plus tax equals total
- Validate price of all items in cart equals subtotal
- Validate on successful purchase all items from cart are removed

## Test Metrics

## Additional Information

This project was organised through the use of Azure DevOps and any defects found from performing these tests were recorded there as detailed defect reports, an example of which can be seen below

<img src="https://i.imgur.com/homnC0T.png" alt="defect report">

---

Azure DevOps was also used to document user stories and acceptance criteria following a BDD approach

<img src="https://i.imgur.com/TP8EiAu.png" alt="acceptance criteria">

---

For further information please contact one of the members of this repository.