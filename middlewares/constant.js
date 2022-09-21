// importing the required modules
const fetch = require("node-fetch");

// defining the utils class
class Constant {
  constructor() {
    // messages
    this.constants = {
      mp4: "Video",
      mkv: "Video",
      mp3: "Music",
      png: "Picture",
      jpeg: "Picture",
      jpg: "Picture",
      doc: "Document",
      docx: "Document",
      pdf: "Document"

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
  getMessage(constant) {
    return this.constants[constant] || constant.toLowerCase();
  }

 
}

module.exports = {
    Constant,
};
