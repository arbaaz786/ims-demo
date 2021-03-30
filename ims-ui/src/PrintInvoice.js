import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import logo from './images/jdent.png';
import moment from 'moment';

const BUYER_QUERY = gql`
  query getJdentBuyer($_id: ID!) {
    getJdentBuyer(_id: $_id) {
      title
      date
      content
      address
      emailId
      contactNo
      invoiceNo
      deliveryNote
      supplierRef
      otherRef
      buyersOrderNo
      dispatchDocumentNo
      deliveryNoteDate
      dispatchedThrough
      destination
      termsOfDelivery
      srNo
      disriptionOfGoods
      modelNo
      sirNo
      hsnsac
      quantity
      rate
      per
      discount
      amount
      totalAmount
      totalAmountInWords
    }
  }
`;

const printOrder = () => {
  const printableElements = document.getElementById('printme').innerHTML;
  const oldPage = document.body.innerHTML;
  const orderHtml =
    '<html><head><title></title></head><body>' +
    printableElements +
    '</body></html>';
  document.body.innerHTML = orderHtml;
  window.print();
  document.body.innerHTML = oldPage;
  window.location.reload(false);
};

const PrintInvoice = ({ match }) => {
  const { loading, error, data } = useQuery(BUYER_QUERY, {
    variables: {
      _id: match.params.id,
    },
  });

  if (loading) return <div>Fetching invoice</div>;
  if (error) return <div>Error fetching invoice</div>;

  // set the  result gotten from rhe GraphQL server into the invoice variable.
  console.log('print data', data);

  // const invoice = data;

  var price = parseInt(data.getJdentBuyer.totalAmount);
  var sglDigit = [
      'Zero',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
    ],
    dblDigit = [
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ],
    tensPlace = [
      '',
      'Ten',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ],
    handle_tens = function (dgt, prevDgt) {
      return 0 == dgt
        ? ''
        : ' ' + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt]);
    },
    handle_utlc = function (dgt, nxtDgt, denom) {
      return (
        (0 != dgt && 1 != nxtDgt ? ' ' + sglDigit[dgt] : '') +
        (0 != nxtDgt || dgt > 0 ? ' ' + denom : '')
      );
    };

  var priceInWord;

  var str = '',
    digitIdx = 0,
    digit = 0,
    nxtDigit = 0,
    words = [];
  if (((price += ''), isNaN(parseInt(price)))) str = '';
  else if (parseInt(price) > 0 && price.length <= 10) {
    for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--)
      switch (
        ((digit = price[digitIdx] - 0),
        (nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0),
        price.length - digitIdx - 1)
      ) {
        case 0:
          words.push(handle_utlc(digit, nxtDigit, ''));
          break;
        case 1:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 2:
          words.push(
            0 != digit
              ? ' ' +
                  sglDigit[digit] +
                  ' Hundred' +
                  (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2]
                    ? ' and'
                    : '')
              : ''
          );
          break;
        case 3:
          words.push(handle_utlc(digit, nxtDigit, 'Thousand'));
          break;
        case 4:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 5:
          words.push(handle_utlc(digit, nxtDigit, 'Lakh'));
          break;
        case 6:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 7:
          words.push(handle_utlc(digit, nxtDigit, 'Crore'));
          break;
        case 8:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 9:
          words.push(
            0 != digit
              ? ' ' +
                  sglDigit[digit] +
                  ' Hundred' +
                  (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2]
                    ? ' and'
                    : ' Crore')
              : ''
          );
      }
    str = words.reverse().join('');
    priceInWord = str + ' Rupee Only ';
    console.log('New ', priceInWord);
  } else {
    str = '';
    console.log(str);
    priceInWord = str + ' Rupee Only ';
  }
  var price = parseInt(data.getJdentBuyer.totalAmount);
  var gstRatePer = parseInt(data.getJdentBuyer.content);
  const SGSTPer = gstRatePer / 2;
  const CGSTPer = gstRatePer / 2;
  console.log('gstRatePer', gstRatePer);

  var totalGSTAmt = price - price * (100 / (100 + gstRatePer));
  var originalCost = price - totalGSTAmt;
  const SGSTAmt = totalGSTAmt / 2;
  const CGSTAmt = totalGSTAmt / 2;

  console.log('price', price.toFixed(2));
  console.log('tgstAMt', totalGSTAmt.toFixed(2));
  console.log('oricost', originalCost.toFixed(2));
  console.log('SGSTAmt', SGSTAmt.toFixed(2));
  console.log('CGSTAmt', CGSTAmt.toFixed(2));

  return (
    <div className='container m-t-20'>
      <h1 className='page-title'>
        <button
          className='button is-link is-large is-fullwidth'
          onClick={() => printOrder()}
        >
          Print
        </button>
      </h1>
      <div id='printme' className='newnote-page m-t-40'>
        <table border='1px' width='100%' id='cssTable'>
          <caption>GST Invoice</caption>
          <tbody>
            <tr>
              <td rowSpan='4' text-align='center'>
                <div className='column'>
                  {/* <p className="cgst-title"><b>J D ENTERPRISES &nbsp; जे डी एन्टरप्राइझेस </b></p> */}
                  <img src={logo} alt={'logo'} />
                  <p>Azad Chowk Koregaon, District Satara 415501</p>
                  <p> GSTIN/UIN: 27AEBPA1115P1ZT</p>
                  <p> State Name : Maharashtra, Code : 27 </p>
                  <p>
                    {' '}
                    Office.No: (02163) 220987, Mobile No. 9700220987 /
                    9394987987{' '}
                  </p>
                  <p> E-Mail : jdenterprises0987@gmail.com </p>
                </div>
              </td>
              <td>
                Invoice No.<p>{data.getJdentBuyer.invoiceNo}</p>
              </td>
              {/* <td>Dated<p>{new Date(data.getJdentBuyer.date).toLocaleDateString()}</p></td> */}
              <td>
                Dated{' '}
                <p>
                  {moment(data.getJdentBuyer.deliveryNoteDate).format(
                    'DD/MM/YYYY'
                  )}
                </p>
              </td>
            </tr>
            <tr>
              <td>Delivery Note : </td>
              <td>
                Mode/Terms of Payment :{' '}
                <p className='cgst-title'>{data.getJdentBuyer.deliveryNote}</p>
              </td>
            </tr>
            <tr>
              <td>
                Supplier Ref.<p>{data.getJdentBuyer.supplierRef}</p>
              </td>
              <td>
                Other Ref. <p>{data.getJdentBuyer.otherRef}</p>
              </td>
            </tr>
            <tr>
              <td>
                Buyer's Order No.<p>{data.getJdentBuyer.buyersOrderNo}</p>
              </td>
              <td>
                Dated.
                <p>
                  {moment(data.getJdentBuyer.deliveryNoteDate).format(
                    'DD/MM/YYYY'
                  )}
                </p>
              </td>
            </tr>
            <tr>
              <td rowSpan='3'>
                <div className='column'>
                  <p>Buyer</p>
                  <p>
                    <b>{data.getJdentBuyer.title}</b>
                  </p>
                  <p> {data.getJdentBuyer.address}</p>
                  <p> Mobile No. :{data.getJdentBuyer.contactNo} </p>
                  <p> Email Id. : {data.getJdentBuyer.emailId}</p>
                </div>
              </td>
              <td>
                Dispatch Doc. No.<p>{data.getJdentBuyer.dispatchDocumentNo}</p>
              </td>
              <td>
                Delivery Date.
                <p>
                  {' '}
                  {moment(data.getJdentBuyer.deliveryNoteDate).format(
                    'DD/MM/YYYY'
                  )}
                </p>
              </td>
            </tr>

            {/* <tr>
      <td>Dispatch Document No.

          <p >{data.getJdentBuyer.dispatchDocumentNo}</p>
         
      </td>
      <td>Delivery Note Date.
      <p >{data.getJdentBuyer.deliveryNoteDate}</p>
         
      </td>
    </tr> */}

            <tr>
              <td>
                Dispatched through<p>{data.getJdentBuyer.dispatchedThrough}</p>
              </td>
              <td>
                Destination.<p>{data.getJdentBuyer.destination}</p>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                {' '}
                Terms Of Delivery<p>No Return, No Refund Policies</p>
              </td>
            </tr>
          </tbody>
        </table>
        <table border='1px' width='100%' id='cssTable'>
          <tbody>
            <tr>
              <th>Sr.no</th>
              <th>Discription of Goods</th>
              <th>HSN/SAC</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Per</th>
              <th>Disc%</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <b>
                  <p className='card-header-title'>
                    {data.getJdentBuyer.disriptionOfGoods}{' '}
                  </p>
                </b>
                <b>Model No. : </b>{' '}
                <p className='cgst-title'>{data.getJdentBuyer.modelNo}</p>
                <b>SIR. No. :</b>{' '}
                <p className='cgst-title'>{data.getJdentBuyer.sirNo}</p>
              </td>
              <td>
                <p>{data.getJdentBuyer.hsnsac}</p>
              </td>
              <td>
                <p>1</p>
              </td>
              <td>
                <p>{originalCost.toFixed(2)}</p>
              </td>
              <td>
                <p>1</p>
              </td>
              <td>
                <p>0 %</p>
              </td>
              <td>{originalCost.toFixed(2)}</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <p> CGST @{CGSTPer}%</p>
                <p> SGST @{SGSTPer}%</p>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <p>{SGSTAmt.toFixed(2)}</p>
                <p>{CGSTAmt.toFixed(2)}</p>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>Total Expense:</td>
              <td></td>
              <td>1 Nos</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <p className='cgst-title'>{price.toFixed(2)}</p>
              </td>
            </tr>
            <tr>
              <td colSpan='8'>
                <div className='columns'>
                  <div className='column'>
                    &nbsp;<b>Amount in words.</b>
                    <p className='cgst-title'> &nbsp;{priceInWord}</p>
                  </div>
                  {/* <div className="columns">
                   <p >E. & O.E</p>
                  </div> */}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table border='1px' width='100%' id='cssTable'>
          <tbody>
            <tr>
              <th rowSpan='2'>HSN/SAC</th>
              <th rowSpan='2'>Taxable Value</th>
              <th colSpan='2'>Central Tax</th>
              <th colSpan='2'>Sales tax</th>
              <th rowSpan='2'>Total Tax Amount</th>
            </tr>
            <tr>
              <td>Rate</td>
              <td>Amount</td>
              <td>Rate</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>{data.getJdentBuyer.hsnsac}</td>
              <td>{originalCost.toFixed(2)}</td>
              <td>{CGSTPer} %</td>
              <td>{CGSTAmt.toFixed(2)}</td>
              <td>{SGSTPer} %</td>
              <td>{SGSTAmt.toFixed(2)}</td>
              <td>
                <p className='cgst-title'>{totalGSTAmt.toFixed(2)}</p>
              </td>
            </tr>
            <tr>
              <td colSpan='8'>
                <div className='columns' id='field-left'>
                  <div className='column'>
                    <p>
                      <u>
                        <b>Declaration</b>
                      </u>
                    </p>
                    <div className='field'>
                      <span>
                        We declare that this invoice shows the actual price of
                        the goods described and that all particulars are true
                        and correct.
                      </span>
                    </div>
                  </div>
                  <div className='column'>
                    <p>
                      <u>
                        <b>Bank Details</b>
                      </u>
                    </p>
                    <p>
                      {' '}
                      <b>Bank A/c : </b> IDBI Bank
                    </p>
                    <p>
                      <b>A/c No : </b> 473102000000365
                    </p>
                    <p>
                      <b>Branch & IFS Code : </b> Koregaon & IBKL0000473
                    </p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan='3'>
                <p> &nbsp; </p>
                <p> &nbsp; </p>
                <p>Customer Seal And Signature</p>{' '}
              </td>
              <td colSpan='4'>
                <p> &nbsp; </p>
                <p> &nbsp; </p>
                <p className='cgst-title'> For J. D. ENTERPRISES </p>
              </td>
            </tr>
            <tr>
              <td colSpan='8'>
                <p>Subject to SATARA JURISDICTION</p>
                <p>this is Computer Generated Invoice</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintInvoice;

// const price_in_words = (price) => {
//   var sglDigit = [
//       'Zero',
//       'One',
//       'Two',
//       'Three',
//       'Four',
//       'Five',
//       'Six',
//       'Seven',
//       'Eight',
//       'Nine',
//     ],
//     dblDigit = [
//       'Ten',
//       'Eleven',
//       'Twelve',
//       'Thirteen',
//       'Fourteen',
//       'Fifteen',
//       'Sixteen',
//       'Seventeen',
//       'Eighteen',
//       'Nineteen',
//     ],
//     tensPlace = [
//       '',
//       'Ten',
//       'Twenty',
//       'Thirty',
//       'Forty',
//       'Fifty',
//       'Sixty',
//       'Seventy',
//       'Eighty',
//       'Ninety',
//     ],
//     handle_tens = function (dgt, prevDgt) {
//       return 0 == dgt
//         ? ''
//         : ' ' + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt]);
//     },
//     handle_utlc = function (dgt, nxtDgt, denom) {
//       return (
//         (0 != dgt && 1 != nxtDgt ? ' ' + sglDigit[dgt] : '') +
//         (0 != nxtDgt || dgt > 0 ? ' ' + denom : '')
//       );
//     };

//   var str = '',
//     digitIdx = 0,
//     digit = 0,
//     nxtDigit = 0,
//     words = [];
//   if (((price += ''), isNaN(parseInt(price)))) str = '';
//   else if (parseInt(price) > 0 && price.length <= 10) {
//     for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--)
//       switch (
//         ((digit = price[digitIdx] - 0),
//         (nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0),
//         price.length - digitIdx - 1)
//       ) {
//         case 0:
//           words.push(handle_utlc(digit, nxtDigit, ''));
//           break;
//         case 1:
//           words.push(handle_tens(digit, price[digitIdx + 1]));
//           break;
//         case 2:
//           words.push(
//             0 != digit
//               ? ' ' +
//                   sglDigit[digit] +
//                   ' Hundred' +
//                   (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2]
//                     ? ' and'
//                     : '')
//               : ''
//           );
//           break;
//         case 3:
//           words.push(handle_utlc(digit, nxtDigit, 'Thousand'));
//           break;
//         case 4:
//           words.push(handle_tens(digit, price[digitIdx + 1]));
//           break;
//         case 5:
//           words.push(handle_utlc(digit, nxtDigit, 'Lakh'));
//           break;
//         case 6:
//           words.push(handle_tens(digit, price[digitIdx + 1]));
//           break;
//         case 7:
//           words.push(handle_utlc(digit, nxtDigit, 'Crore'));
//           break;
//         case 8:
//           words.push(handle_tens(digit, price[digitIdx + 1]));
//           break;
//         case 9:
//           words.push(
//             0 != digit
//               ? ' ' +
//                   sglDigit[digit] +
//                   ' Hundred' +
//                   (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2]
//                     ? ' and'
//                     : ' Crore')
//               : ''
//           );
//       }
//     str = words.reverse().join('');
//   } else str = '';
//   return str;
// };

// export default price_in_words;
