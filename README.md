<h1 align="center">Playwright Web Testing Framework</h1>
<p align= "center">
<img src="https://svglogos.net/wp-content/uploads/playwright.svg" alt="playwright logo">
</p>

## Overview
This is a web testing framework for testing the functionality of the [Sauce Demo](https://www.saucedemo.com/) webpage

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

## Test Metrics

## Additional Information