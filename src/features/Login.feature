Feature: Login functionality

  @smoke
  Scenario: Verify Login with valid credentials using data from Excel sheet
    When user login using Excel credentials from "src/testData/TestData.xlsx"
  
   
  @smoke
  Scenario Outline: Verify Login with valid credentials without using Excel sheet
    When user login with "<username>" and "<password>"

    Examples:
      | username | password |
      | Admin    | admin123 |
      | Admin    | admin123 |
      | Admin    | admin123 |
