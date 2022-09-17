// importing the required modules
const fetch = require("node-fetch");

// defining the utils class
class Constant {
  constructor() {
    // messages
    this.constant = {
      '.mp4': 'Video',
      Video: '.mp4',
      Music: '.mp3',
      Picture: '.jpg',
      Picture: '.jpeg',
      Picture: '.png',
      Video: '.mkv',
      Document: '.doc',
      Document: '.docx',
      Document: '.pdf'
    };
  }

  /**
   *
   * @param {*} that JSON object
   * @returns {object} boolean whether the object is empty or not
   */
  isEmpty(that) {
    for (const key in that) {
      if (key) {
        return false;
      }
    }
  }

  /**
   * @description This is used to return the error or success message
   *
   * @param {*} message the error or success identifier
   * @returns {string} The corresponding error or success message
   */
  getMessage(message) {
    return this.messages[message] || message.toLowerCase();
  }

 
}

module.exports = {
    Constant,
};
