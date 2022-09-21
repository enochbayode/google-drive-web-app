// importing the required modules
const fetch = require("node-fetch");

// defining the utils class
class Constant {
  constructor() {
    // messages
    this.constants = {
      mp4: "Video",
      mkv: "Video",
      m4v: "Video",
      mov: "Video",
      mpg: "Video",
      rm: "Video",
      avi: "Video",
      asx: "Video",
      asf: "Video",
      srt: "Video",
      swf: "Video",
      vob: "Video",
      wmv: "Video",

      mp3: "Music",
      m4a: "Music",
      iff: "Music",
      mid: "Music",
      aif: "Music",
      mpa: "Music",
      m3u: "Music",
      ra: "Music",
      wav: "Music",
      wma: "Music",

      png: "Image",
      jpeg: "Image",
      gif: "Image",
      bmp: "Image",
      jpg: "Image",
      psd: "Image",
      thm: "Image",
    
      doc: "Document",
      docx: "Document",
      pdf: "Document",
      xlr: "Document",
      xls: "Document",
      xlsx: "Document",
      pdf: "Document",
      db: "Document",
      dbf: "Document",
      msg: "Document",
      wps: "Document",
      wpd: "Document",
      txt: "Document",
      pages: "Document",
      odt: "Document",
      log: "Document",
      tex: "Document",
      rtf: "Document",
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
