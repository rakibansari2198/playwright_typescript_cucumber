Feature: File Upload and Download

  This feature verifies the file upload and download functionality of the application.

  @upload
  Scenario: Verify user can upload a file successfully
    Given user navigates to the file upload page
    When user uploads a file
    And user clicks on the upload button
   

  @download
  Scenario: Verify user can download a file successfully
    Given user navigates to the file download page
    When user clicks on the download link
    Then file should be downloaded successfully