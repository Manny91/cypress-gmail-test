// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const debug = require("debug");
const path = require("path");
const gmail_tester = require("../../node_modules/gmail-tester");

module.exports = (on, config) => {
  // on("before:browser:launch", (browser = {}, args) => {
  //   if (browser.name === "chrome") {
  //     args.push("--remote-debugging-port=9221");
  //     return args;
  //   }
  // });
  on("task", {
    "gmail:check": async args => {


      const email = await gmail_tester.check_inbox(
        path.resolve("", "credentials.json"), // Assuming credentials.json is in the current directory.
        path.resolve("", "gmail_token.json"), // Look for gmail_token.json in the current directory (if it doesn't exists, it will be created by the script).
        "test", // We are looking for 'Activate Your Account' in the subject of the message.
        "manuelcasancho@gmail.com", // We are looking for a sender header which has 'no-reply@domain.com' in it.
        "manuelcasancho@gmail.com", // Which inbox to poll. credentials.json should contain the credentials to it.
        10, // Poll interval (in seconds).
        30 // Maximum poll time (in seconds), after which we'll giveup.
      );
      if (email) {
        console.log("Email was found!");
        // return true;
      } else {
        console.log("Email was not found!");
        // return false;
      }
      return email;
    }
  });

  on("task", {
    "gmail:get-messages": async args => {
      const messages = await gmail_tester.get_messages(
        path.resolve("", "credentials.json"),
        path.resolve("", "token.json"),
        args.options
      );
      return messages;
    }
  });
};