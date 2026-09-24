Feature: Login functionality

  @loginWithExcelData
  Scenario: Login with valid credentials using data from Excel sheet
    Given user read login data for test case  
    When user login using Excel credentials



  @loginWithoutExcelData
  Scenario Outline: Login with valid credentials without using Excel sheet
    When user login with "<username>" and "<password>"

    Examples:
      | username | password |
      | Admin    | admin123 |
      | Admin    | admin123 |
      | Admin    | admin123 |
