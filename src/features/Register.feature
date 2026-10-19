Feature: Dropdown Handling

  Background:
    Given user is on the register page

  @dropdown
  Scenario: Select dropdown option by visible text
    When user selects "India" from country dropdown
    Then selected country should be "India"

  @dropdown
  Scenario: Verify all dropdown options
    When user retrieves all country dropdown options
    Then country dropdown should contain "India"
    And country dropdown should contain "Australia"



 