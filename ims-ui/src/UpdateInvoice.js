import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { notify } from 'react-notify-toast';
import gql from 'graphql-tag';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BUYER_QUERY = gql`
  query getJdentBuyer($_id: ID!) {
    getJdentBuyer(_id: $_id) {
      _id
      title
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

const UPDATE_INVOICE = gql`
  mutation updateBuyer(
    $_id: ID!
    $title: String
    $content: String
    $address: String
    $emailId: String
    $contactNo: String
    $invoiceNo: String
    $deliveryNote: String
    $supplierRef: String
    $otherRef: String
    $buyersOrderNo: String
    $dispatchDocumentNo: String
    $deliveryNoteDate: String
    $dispatchedThrough: String
    $destination: String
    $termsOfDelivery: String
    $srNo: String
    $disriptionOfGoods: String
    $modelNo: String
    $sirNo: String
    $hsnsac: String
    $quantity: String
    $rate: String
    $per: String
    $discount: String
    $amount: String
    $totalAmount: String
    $totalAmountInWords: String
  ) {
    updateBuyer(
      _id: $_id
      input: {
        title: $title
        content: $content
        address: $address
        emailId: $emailId
        contactNo: $contactNo
        invoiceNo: $invoiceNo
        deliveryNote: $deliveryNote
        supplierRef: $supplierRef
        otherRef: $otherRef
        buyersOrderNo: $buyersOrderNo
        dispatchDocumentNo: $dispatchDocumentNo
        deliveryNoteDate: $deliveryNoteDate
        dispatchedThrough: $dispatchedThrough
        destination: $destination
        termsOfDelivery: $termsOfDelivery
        srNo: $srNo
        disriptionOfGoods: $disriptionOfGoods
        modelNo: $modelNo
        sirNo: $sirNo
        hsnsac: $hsnsac
        quantity: $quantity
        rate: $rate
        per: $per
        discount: $discount
        amount: $amount
        totalAmount: $totalAmount
        totalAmountInWords: $totalAmountInWords
      }
    ) {
      _id
      title
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

const UpdateInvoice = ({ match, history }) => {
  console.log('UpdateInvoice--------->', match);

  let invoiceDate = new Date(match.params.deliveryNoteDate);
  let modeOfPay = match.params.deliveryNote;
  // let totalAmountValue = match.params.totalAmount;
  // let paidAmount = match.params.srNo;

  let isPaidAmountShow = false;
  if (modeOfPay === 'Credit') {
    isPaidAmountShow = true;
    // if (totalAmountValue <= paidAmount) {
    //   isPaidAmountShow = true;
    // } else {
    //   isPaidAmountShow = false;
    // }
  } else {
    isPaidAmountShow = false;
  }

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // const title  [title, setTitle] = useState('');
  // const content  [content, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [emailId, setEmailId] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [supplierRef, setSupplierRef] = useState('');
  const [otherRef, setOtherRef] = useState('');
  const [buyersOrderNo, setBuyersOrderNo] = useState('');
  const [dispatchDocumentNo, setDispatchDocumentNo] = useState('');
  // const [deliveryNoteDate, setDeliveryNoteDate] = useState('');
  const [deliveryNoteDate, setStartDate] = useState(invoiceDate);
  const [dispatchedThrough, setDispatchedThrough] = useState('');
  const [destination, setDestination] = useState('');
  const [termsOfDelivery, setTermsOfDelivery] = useState('');
  const [srNo, setSRNumber] = useState('');
  const [disriptionOfGoods, setDisriptionOfGoods] = useState('');
  const [modelNo, setModelNo] = useState('');
  const [sirNo, setSirNo] = useState('');
  const [hsnsac, setHsnsac] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [per, setPer] = useState('');
  const [discount, setdDscount] = useState('');
  const [amount, setAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [totalAmountInWords, setTotalAmountInWords] = useState('');
  const [showPaidAmount, setShowPaidAmount] = useState(isPaidAmountShow);

  // "_id" : ObjectId("5ff3469568bcfb5d5e358834")

  const { loading, error, data } = useQuery(BUYER_QUERY, {
    variables: {
      _id: match.params.id,
    },
  });

  const [updateNote] = useMutation(UPDATE_INVOICE);

  if (loading) return <div>Fetching note</div>;
  if (error) return <div>Error fetching note</div>;

  // set the  result gotten from rhe GraphQL server into the note variable.

  const invoice = data.getJdentBuyer;
  console.log(invoice);

  let gstPercentage = invoice.content;

  function handleChange(event) {
    if (event.target.value === 'Credit') {
      setShowPaidAmount(true);
      setDeliveryNote(event.target.value);
    } else {
      setShowPaidAmount(false);
      setDeliveryNote(event.target.value);
    }
  }

  function onPaidChange(event) {
    var slectedAmt = parseInt(event.target.value);
    var existingAmount = parseInt(invoice.srNo);
    var totalAmount = parseInt(invoice.totalAmount);
    console.log(existingAmount);
    console.log(totalAmount);
    if (existingAmount <= totalAmount) {
      var updatedPaidAmount = existingAmount + slectedAmt;
      setSRNumber(JSON.stringify(updatedPaidAmount));
    }
  }

  return (
    <div className='container m-t-20'>
      <h1 className='page-title'>Edit Invoice</h1>

      <div className='newnote-page m-t-50'>
        <form
          onSubmit={(e) => {
            // Stop the form from submitting
            e.preventDefault();

            // set the title of the note to the title in the state, if not's available set to the original title gotten from the GraphQL server
            // set the content of the note to the content in the state, if not's available set to the original content gotten from the GraphQL server
            // pass the id, title and content as variables to the UPDATE_NOTE mutation.
            updateNote({
              variables: {
                _id: invoice._id,
                title: title ? title : invoice.title,
                content: content ? content : invoice.content,
                address: address ? address : invoice.address,
                emailId: emailId ? emailId : invoice.emailId,
                contactNo: contactNo ? contactNo : invoice.contactNo,
                invoiceNo: invoiceNo ? invoiceNo : invoice.invoiceNo,
                deliveryNote: deliveryNote
                  ? deliveryNote
                  : invoice.deliveryNote,
                supplierRef: supplierRef ? supplierRef : invoice.supplierRef,
                otherRef: otherRef ? otherRef : invoice.otherRef,
                buyersOrderNo: buyersOrderNo
                  ? buyersOrderNo
                  : invoice.buyersOrderNo,
                dispatchDocumentNo: dispatchDocumentNo
                  ? dispatchDocumentNo
                  : invoice.dispatchDocumentNo,
                deliveryNoteDate: deliveryNoteDate
                  ? deliveryNoteDate
                  : invoice.deliveryNoteDate,
                dispatchedThrough: dispatchedThrough
                  ? dispatchedThrough
                  : invoice.dispatchedThrough,
                destination: destination ? destination : invoice.destination,
                termsOfDelivery: termsOfDelivery
                  ? termsOfDelivery
                  : invoice.termsOfDelivery,
                srNo: srNo ? srNo : invoice.srNo,
                disriptionOfGoods: disriptionOfGoods
                  ? disriptionOfGoods
                  : invoice.disriptionOfGoods,
                modelNo: modelNo ? modelNo : invoice.modelNo,
                sirNo: sirNo ? sirNo : invoice.sirNo,
                hsnsac: hsnsac ? hsnsac : invoice.hsnsac,
                quantity: quantity ? quantity : invoice.quantity,
                rate: rate ? rate : invoice.rate,
                per: per ? per : invoice.per,
                discount: discount ? discount : invoice.discount,
                amount: amount ? amount : invoice.amount,
                totalAmount: totalAmount ? totalAmount : invoice.totalAmount,
                totalAmountInWords: totalAmountInWords
                  ? totalAmountInWords
                  : invoice.totalAmountInWords,
              },
            });

            history.push('/');
            // window.location.reload(false);
            notify.show('Invoice was edited successfully', 'success');
          }}
        >
          {/* column start here */}
          <div className='columns'>
            {/* 1 column start here */}
            <div className='column'>
              <div className='field'>
                <label className='label'>Buyer Name</label>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    name='title'
                    placeholder='Buyer Name'
                    defaultValue={invoice.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className='field'>
                <label className='label'>GST Percentage %</label>
                <div className='control'>
                  <select
                    name='content'
                    className='input'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  >
                    <option defaultValue={gstPercentage}>
                      {gstPercentage} %
                    </option>
                    <option value='5'>5 %</option>
                    <option value='18'>18 %</option>
                    <option value='28'>28 %</option>
                  </select>
                </div>
              </div>

              <div className='field'>
                <label className='label'>Invoice No</label>
                <div className='control'>
                  <input
                    className='input'
                    name='invoiceNo'
                    placeholder='invoiceNo'
                    defaultValue={invoice.invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>

            {/* 2 column start here */}

            <div className='column'>
              <div className='field'>
                <label className='label'>Address</label>
                <div className='control'>
                  <input
                    className='input'
                    name='content'
                    placeholder='Address '
                    defaultValue={invoice.address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </div>
              </div>

              {/* <div className='field'>
                <label className='label'>Mode / Terms of Payment</label>
                <div className='control'>
                  <select
                    name='deliveryNote'
                    className='input'
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                  >
                    <option defaultValue={modeOfPay}>{modeOfPay}</option>
                    <option value='Cash'>Cash</option>
                    <option value='Swipe'>Swipe</option>
                    <option value='Account Transfer by HDFC'>
                      Account Transfer by HDFC
                    </option>
                    <option value='Account Transfer by IDBI'>
                      Account Transfer by IDBI
                    </option>
                    <option value='HDFC BANK LTD'>HDFC BANK LTD</option>
                    <option value='Bajaj Finance'>Bajaj Finance</option>
                    <option value='TVS CREDIT SERVICES LTD'>
                      TVS CREDIT SERVICES LTD
                    </option>
                    <option value='Pine Lab Emi'>Pine Lab Emi</option>
                  </select>
                </div>
              </div> */}

              <div className='field'>
                <label className='label'>Mode / Terms of Payment</label>
                <div className='control'>
                  <select
                    name='deliveryNote'
                    className='input'
                    defaultValue={deliveryNote}
                    onChange={handleChange}
                    // onChange={(e) => setDeliveryNote(e.target.value)}
                  >
                    <option defaultValue={modeOfPay}>{modeOfPay}</option>
                    <option value='Credit'>Credit</option>
                    <option value='Cash'>Cash</option>
                    <option value='Swipe'>Swipe</option>
                    <option value='Account Transfer by HDFC'>
                      Account Transfer by HDFC
                    </option>
                    <option value='Account Transfer by IDBI'>
                      Account Transfer by IDBI
                    </option>
                    <option value='HDFC BANK LTD'>HDFC BANK LTD</option>
                    <option value='Bajaj Finance'>Bajaj Finance</option>
                    <option value='TVS CREDIT SERVICES LTD'>
                      TVS CREDIT SERVICES LTD
                    </option>
                    <option value='Pine Lab Emi'>Pine Lab Emi</option>
                  </select>
                </div>
              </div>

              <div className='field invisible'>
                <label className='label'>supplierRef</label>
                <div className='control'>
                  <input
                    className='input'
                    name='supplierRef'
                    placeholder='supplierRef'
                    defaultValue={invoice.supplierRef}
                    onChange={(e) => setSupplierRef(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field invisible'>
                <label className='label'>otherRef</label>
                <div className='control'>
                  <input
                    className='input'
                    name='otherRef'
                    placeholder='otherRef'
                    defaultValue={invoice.otherRef}
                    onChange={(e) => setOtherRef(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field invisible'>
                <label className='label'>buyersOrderNo</label>
                <div className='control'>
                  <input
                    className='input'
                    name='buyersOrderNo'
                    placeholder='buyersOrderNo'
                    defaultValue={invoice.buyersOrderNo}
                    onChange={(e) => setBuyersOrderNo(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field invisible'>
                <label className='label'>dispatchDocumentNo</label>
                <div className='control'>
                  <input
                    className='input'
                    name='dispatchDocumentNo'
                    placeholder='dispatchDocumentNo'
                    defaultValue={invoice.dispatchDocumentNo}
                    onChange={(e) => setDispatchDocumentNo(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field'>
                <label className='label'>DisriptionOfGoods</label>
                <div className='control'>
                  <input
                    className='input'
                    name='disriptionOfGoods'
                    placeholder='disriptionOfGoods'
                    defaultValue={invoice.disriptionOfGoods}
                    onChange={(e) => setDisriptionOfGoods(e.target.value)}
                  ></input>
                </div>
              </div>

              {/* <div className='field'>
            <label className='label'>deliveryNoteDate</label>
            <div className='control'>
              <input
                className='input'
                name='deliveryNoteDate'
                placeholder='deliveryNoteDate'
                defaultValue={invoice.deliveryNoteDate}
                onChange={(e) => setDeliveryNoteDate(e.target.value)}
              ></input>
            </div>
          </div> */}

              <div className='field invisible'>
                <label className='label'>dispatchedThrough</label>
                <div className='control'>
                  <input
                    className='input'
                    name='dispatchedThrough'
                    placeholder='dispatchedThrough'
                    defaultValue={invoice.dispatchedThrough}
                    onChange={(e) => setDispatchedThrough(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>

            {/* 3 column start here */}

            <div className='column '>
              <div className='field'>
                <label className='label'>Email Id</label>
                <div className='control'>
                  <input
                    className='input'
                    name='emailId'
                    placeholder='Email ID'
                    defaultValue={invoice.emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field invisible'>
                <label className='label'>destination</label>
                <div className='control'>
                  <input
                    className='input'
                    name='destination'
                    placeholder='destination'
                    defaultValue={invoice.destination}
                    onChange={(e) => setDestination(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field invisible'>
                <label className='label'>termsOfDelivery</label>
                <div className='control'>
                  <input
                    className='input'
                    name='termsOfDelivery'
                    placeholder='termsOfDelivery'
                    defaultValue={invoice.termsOfDelivery}
                    onChange={(e) => setTermsOfDelivery(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className='field'>
                <label className='label'> Date</label>
                <div className='control'>
                  <DatePicker
                    className='input'
                    dateFormat='dd/MM/yyy'
                    selected={deliveryNoteDate}
                    showMonthDropdown={true}
                    showYearDropdown={true}
                    scrollableYearDropdown={true}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
            </div>

            {/* 4 column start here */}

            <div className='column'>
              <div className='field'>
                <label className='label'>Contact No</label>
                <div className='control'>
                  <input
                    className='input'
                    name='contactNo'
                    placeholder='Contact No'
                    defaultValue={invoice.contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field'>
                <label className='label'>Serial No</label>
                <div className='control'>
                  <input
                    className='input'
                    name='sirNo'
                    placeholder='sirNo'
                    defaultValue={invoice.sirNo}
                    onChange={(e) => setSirNo(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field invisible'>
                <label className='label'>hsnsac</label>
                <div className='control'>
                  <input
                    className='input'
                    name='hsnsac'
                    placeholder='hsnsac'
                    defaultValue={invoice.hsnsac}
                    onChange={(e) => setHsnsac(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field invisible'>
                <label className='label'>quantity</label>
                <div className='control'>
                  <input
                    className='input'
                    name='quantity'
                    placeholder='quantity'
                    defaultValue={invoice.quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field invisible'>
                <label className='label'>rate</label>
                <div className='control'>
                  <input
                    className='input'
                    name='rate'
                    placeholder='rate'
                    defaultValue={invoice.rate}
                    onChange={(e) => setRate(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field invisible'>
                <label className='label'>per</label>
                <div className='control'>
                  <input
                    className='input'
                    name='per'
                    placeholder='per'
                    defaultValue={invoice.per}
                    onChange={(e) => setPer(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>

            {/* 5 column start here */}

            <div className='column'>
              <div className='field'>
                <label className='label'>Model No</label>
                <div className='control'>
                  <input
                    className='input'
                    name='modelNo'
                    placeholder='modelNo'
                    defaultValue={invoice.modelNo}
                    onChange={(e) => setModelNo(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field invisible'>
                <label className='label'>discount</label>
                <div className='control'>
                  <input
                    className='input'
                    name='discount'
                    placeholder='discount'
                    defaultValue={invoice.discount}
                    onChange={(e) => setdDscount(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field invisible'>
                <label className='label'>Amount</label>
                <div className='control'>
                  <input
                    className='input'
                    name='amount'
                    placeholder='amount'
                    defaultValue={invoice.amount}
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className='field'>
                <label className='label'>Total Amount</label>
                <div className='control'>
                  <input
                    className='input'
                    name='totalAmount'
                    placeholder='totalAmount'
                    defaultValue={invoice.totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='field invisible'>
                <label className='label'>totalAmountInWords</label>
                <div className='control'>
                  <input
                    className='input'
                    name='totalAmountInWords'
                    placeholder='totalAmountInWords'
                    defaultValue={totalAmountInWords}
                    onChange={(e) => setTotalAmountInWords(e.target.value)}
                  ></input>
                </div>
              </div>

              <div style={{ display: showPaidAmount ? 'block' : 'none' }}>
                <div className='field '>
                  <label className='label'>Paid Amount</label>
                  <div className='control'>
                    <input
                      className='input'
                      name='srNo'
                      placeholder='Paid Amount'
                      defaultValue={invoice.srNo}
                      // onChange={onPaidChange}
                      onKeyUp={onPaidChange}
                      // onChange={(e) => setSRNumber(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  columns END here */}
          <div className='field'>
            <div className='control-button'>
              <button className='button is-link'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInvoice;
