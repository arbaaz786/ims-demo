const xml2js = require('xml2js');
// const logger = require('./logger');
const fs = require('fs');
const slash = require('slash');

const convertXMLToJS = (data) => {
  // logger.info(
  //   `${ENTERING_TO} ${FILES.XML_TO_JS} ${UTIL_METHOD} ${METHOD.CONVERT_XML_TO_JS}`
  // );

  var parser = new xml2js.Parser();

  let filename = slash(__dirname + '/foo.xml');

  // console.log(filename);

  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
      console.log('Err1111');
      console.log(err);
    } else {
      //console.log(data);
      // data.toString('ascii', 0, data.length)

      parser.parseString(
        data.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, '&amp;'),
        function (err, result) {
          if (err) {
            console.log('Err');
            console.log(err);
          } else {
            console.log(JSON.stringify(result));
            console.log('Done');
          }
        }
      );
    }
  });
};

module.exports = {
  convertXMLToJS,
};
