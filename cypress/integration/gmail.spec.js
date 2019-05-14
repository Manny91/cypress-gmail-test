/// <reference types="Cypress" />

describe("Email assertion:", () => {
  it("Look for an email with specific subject and link in email body", function () {
    // debugger; //Uncomment for debugger to work...
    cy.task("gmail:get-messages", {
      options: {
        include_body: true
      }
    }).then(emails => {
      // debugger;
      console.log('emails', emails);
      assert.isTrue(emails, "tesstss");
    });

    // cy.task("gmail:check", {})

    // const incoming_mailbox = "manuelcasancho@gmail.com";
    // cy
    //   .task("gmail:check", {
    //     from: incoming_mailbox,
    //     to: incoming_mailbox,
    //     subject: "test"
    //   })
    //   .then(email => {
    //     assert.isNotNull(email, `Email was not found`);
    //   });

  });
});