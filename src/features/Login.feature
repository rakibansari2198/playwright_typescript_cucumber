Feature: User Authentication

  @smoke @login
  Scenario Outline: Validate login functionality with multiple users
    Given the user navigates to the login page
    When the user enters username "<username>" and password "<password>"
    And clicks the login button
    Then the user should see "<expected_result>"

    Examples:
      | username        | password     | expected_result      |
      | Admin    | admin123 | Dashboard            |
      | Admin    | admin123 | User is locked out     |
      | Admin    | admin123 | Dashboard            |
      | Admin    | admin123   | Invalid credentials  |
