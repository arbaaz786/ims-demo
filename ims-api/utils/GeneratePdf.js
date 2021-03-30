var fs = require('fs');
var pdf = require('dynamic-html-pdf');

const generatePdf = (pdfData) => {
  var options = {
    format: 'A4',
    orientation: 'portrait',
    border: '22mm',
  };
  console.log('///////////////// Invoice PDF SECTION //////////////////');

  var html;

  //html = fs.readFileSync('./view/invoice-pdf.html', 'utf8');
  html = fs.readFileSync('./view/invoice-demo-pdf.html', 'utf8');

  console.log('********** PDF Threading *************');
  let date_ob = new Date();
  let date = ('0' + date_ob.getDate()).slice(-2);
  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  var dateSigned = date + '-' + month + '-' + year;

  var document = {
    type: 'buffer',
    template: html,
    context: {
      options: {
        address: 'Bavdhan',
        amount: '',
        balanceAmount: 380000,
        buyersOrderNo: '',
        contactNo: '08483054848',
        content: '18',
        date: '2021-03-16T09:38:20.639Z',
        deliveryNote: 'Credit',
        deliveryNoteDate: '2021-03-16T09:37:45.689Z',
        destination: '',
        discount: '',
        dispatchDocumentNo: '',
        dispatchedThrough: '',
        disriptionOfGoods: 'TV',
        emailId: 'arbazshikalgar@gmail.com',
        hsnsac: '',
        invoiceNo: '2',
        modelNo: 'WHOOOO786',
        otherRef: '',
        per: '',
        quantity: '',
        rate: '',
        sirNo: '4245678',
        srNo: '20000',
        supplierRef: '',
        termsOfDelivery: '',
        title: 'Zeenat Shikalgar',
        totalAmount: '400000',
        totalAmountInWords: '',
        __typename: 'JdentBuyer',
        _id: '60507c8cc6c17b5dc65b3b2b',
      },
    },
    path: './output.pdf',
  };
  return pdf
    .create(document, options)
    .then((resp) => {
      console.log(resp);
      var buff = resp;
      console.log(buff);
      const base64data = buff.toString('base64');
      return base64data;
    })
    .catch((error) => {
      console.error(error);
      console.log('xxxxxxxxxxxx Error in PDF xxxxxxxxxxxx');
      return 'Error in PDF';
    });
};

module.exports = {
  generatePdf,
};

// export default generatePdf;
