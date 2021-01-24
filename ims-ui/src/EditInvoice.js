import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { notify } from 'react-notify-toast';
import gql from 'graphql-tag';

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

const UPDATE_INVOICE = gql`
  mutation updateBuyer(
    $_id: ID!
    $title: String!
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
    $dispatchedThrough: String!
    $destination: String
    $termsOfDelivery: String
    $srNo: String
    $disriptionOfGoods: String
    $modelNo: String
    $sirNo: String
    $hsnsac: String!
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

const EditInvoice = ({ match }) => {
  console.log(match.params.id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [address, setAddress] = useState('');
  const [emailId, setEmailId] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  // const [date, setDate] = useState('');
  const [supplierRef, setSupplierRef] = useState('');
  const [otherRef, setOtherRef] = useState('');
  const [buyersOrderNo, setBuyersOrderNo] = useState('');
  const [dispatchDocumentNo, setDispatchDocumentNo] = useState('');
  const [deliveryNoteDate, setDeliveryNoteDate] = useState('');
  const [dispatchedThrough, setDispatchedThrough] = useState('');
  const [destination, setDestination] = useState('');
  const [termsOfDelivery, setTermsOfDelivery] = useState('');
  const [srNo, setSrNo] = useState('');
  const [disriptionOfGoods, setDisriptionOfGoods] = useState('');
  const [modelNo, setModelNo] = useState('');
  const [sirNo, setSerialNo] = useState('');
  const [hsnsac, setHsnsac] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [per, setPer] = useState('');
  const [discount, setDiscount] = useState('');
  const [amount, setAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [totalAmountInWords, setTotalAmountInWords] = useState('');

  const { loading, error, data } = useQuery(BUYER_QUERY, {
    variables: {
      _id: match.params.id,
    },
  });

  const [updateBuyer] = useMutation(UPDATE_INVOICE);

  if (loading) return <div>Fetching invoice</div>;
  if (error) return <div>Error fetching invoice</div>;

  // set the  result gotten from rhe GraphQL server into the invoice variable.
  console.log('data', data);
  const invoice = data;

  // var netPrice = parseInt(data.getJdentBuyer.totalAmount);
  // var originalCost =parseInt(data.getJdentBuyer.amount);
  // var gstAmount =  netPrice.toFixed(2)-originalCost.toFixed(2);
  // console.log("gstAmount",gstAmount.toFixed(2));
  // const SGSTAmount= gstAmount/2;
  // const CGSTAmount= gstAmount/2;
  // var GST_Percentage = (gstAmount * 100)/ originalCost;

  // console.log("netPrice",netPrice);
  // console.log("originalCost",originalCost);
  // console.log("SGSTAmount",SGSTAmount);
  // console.log("CGSTAmount",CGSTAmount);
  // console.log("GST_Percentage",GST_Percentage);
  // const GSTper=GST_Percentage/2;
  // console.log("GSTper",GSTper);

  return (
    <div className='container m-t-20'>
      <h1 className='page-title'>Edit Invoice</h1>
      <div className='newnote-page m-t-20'>
        <form
          onSubmit={(e) => {
            // Stop the form from submitting
            e.preventDefault();
            console.log('ON SUBMIT ---------->', invoice);

            updateBuyer({
              variables: {
                _id: invoice.getJdentBuyer._id,
                title: title ? title : invoice.getJdentBuyer.title,

                address: address ? address : invoice.getJdentBuyer.address,
                emailId: emailId ? emailId : invoice.getJdentBuyer.emailId,
                contactNo: contactNo
                  ? contactNo
                  : invoice.getJdentBuyer.contactNo,
                date: Date.now(), // edit date
                invoiceNo: invoiceNo
                  ? invoiceNo
                  : invoice.getJdentBuyer.invoiceNo, // edit invoice no
                deliveryNote: deliveryNote
                  ? deliveryNote
                  : invoice.getJdentBuyer.deliveryNote,
                supplierRef: supplierRef
                  ? supplierRef
                  : invoice.getJdentBuyer.supplierRef,
                otherRef: otherRef ? otherRef : invoice.getJdentBuyer.otherRef,
                buyersOrderNo: buyersOrderNo
                  ? buyersOrderNo
                  : invoice.getJdentBuyer.buyersOrderNo,
                dispatchDocumentNo: dispatchDocumentNo
                  ? dispatchDocumentNo
                  : invoice.getJdentBuyer.dispatchDocumentNo,
                deliveryNoteDate: deliveryNoteDate
                  ? deliveryNoteDate
                  : invoice.getJdentBuyer.deliveryNoteDate,
                dispatchedThrough: dispatchedThrough
                  ? dispatchedThrough
                  : invoice.getJdentBuyer.dispatchedThrough,
                destination: destination
                  ? destination
                  : invoice.getJdentBuyer.destination,
                termsOfDelivery: termsOfDelivery
                  ? termsOfDelivery
                  : invoice.getJdentBuyer.termsOfDelivery,
                srNo: srNo ? srNo : invoice.getJdentBuyer.srNo,
                disriptionOfGoods: disriptionOfGoods
                  ? disriptionOfGoods
                  : invoice.getJdentBuyer.disriptionOfGoods,
                modelNo: modelNo ? modelNo : invoice.getJdentBuyer.modelNo,
                sirNo: sirNo ? sirNo : invoice.getJdentBuyer.sirNo,
                hsnsac: hsnsac ? hsnsac : invoice.getJdentBuyer.hsnsac,
                quantity: quantity ? quantity : invoice.getJdentBuyer.quantity,
                rate: rate ? rate : invoice.getJdentBuyer.rate,
                per: per ? per : invoice.getJdentBuyer.per,
                discount: discount ? discount : invoice.getJdentBuyer.discount,
                amount: amount ? amount : invoice.getJdentBuyer.amount,
                totalAmount: totalAmount
                  ? totalAmount
                  : invoice.getJdentBuyer.totalAmount,
                content: content ? content : invoice.getJdentBuyer.content,
                totalAmountInWords: totalAmountInWords
                  ? totalAmountInWords
                  : invoice.getJdentBuyer.totalAmountInWords,
              },
            });

            notify.show('Invoice was edited successfully', 'success');
          }}
        >
          <div className='field'>
            <label className='label'>Buyer Name</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='title'
                placeholder='Buyer Name'
                defaultValue={invoice.getJdentBuyer.title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Note Content</label>
            <div className='control'>
              <textarea
                className='textarea'
                rows='10'
                name='content'
                placeholder='Note Content here...'
                defaultValue={invoice.getJdentBuyer.content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Address</label>
            <div className='control'>
              <input
                className='input'
                name='address'
                type='text'
                placeholder='Address'
                defaultValue={invoice.getJdentBuyer.address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Email Id</label>
            <div className='control'>
              <input
                className='input'
                name='emailId'
                type='text'
                placeholder='Email Id'
                defaultValue={invoice.getJdentBuyer.emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Contact No </label>
            <div className='control'>
              <input
                className='input'
                name='contactNo'
                type='text'
                placeholder='Contact No'
                defaultValue={invoice.getJdentBuyer.contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Invoice No</label>
            <div className='control'>
              <input
                className='input'
                name='invoiceNo'
                type='text'
                placeholder='invoiceNo'
                defaultValue={invoice.getJdentBuyer.invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>DeliveryNote </label>
            <div className='control'>
              <input
                className='input'
                name='deliveryNote'
                type='text'
                placeholder='Delivery Note'
                defaultValue={invoice.getJdentBuyer.deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
              />
            </div>
          </div>
          {/* <div className='field'>
            <label className='label'> Date</label>
            <div className='control'>
              <input
                className='input'
                name='date'
                type='text'
                placeholder='Delivery Note Date'
                defaultValue={invoice.getJdentBuyer.date.toLocaleString()}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div> */}
          <div className='field'>
            <label className='label'>Supplier Ref.</label>
            <div className='control'>
              <input
                className='input'
                name='supplierRef'
                type='text'
                placeholder='Supplier Ref.'
                defaultValue={invoice.getJdentBuyer.supplierRef}
                onChange={(e) => setSupplierRef(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Other Ref </label>
            <div className='control'>
              <input
                className='input'
                name='otherRef'
                type='text'
                placeholder='Other Ref'
                defaultValue={invoice.getJdentBuyer.otherRef}
                onChange={(e) => setOtherRef(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Buyers Order No.</label>
            <div className='control'>
              <input
                className='input'
                name='buyersOrderNo'
                type='text'
                placeholder='Buyers Order No.'
                defaultValue={invoice.getJdentBuyer.buyersOrderNo}
                onChange={(e) => setBuyersOrderNo(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Dispatch Document No</label>
            <div className='control'>
              <input
                className='input'
                name='dispatchDocumentNo'
                type='text'
                placeholder='Dispatch Document No'
                defaultValue={invoice.getJdentBuyer.dispatchDocumentNo}
                onChange={(e) => setDispatchDocumentNo(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Delivery Note Date</label>
            <div className='control'>
              <input
                className='input'
                name='deliveryNoteDate'
                type='text'
                placeholder='Delivery Note Date'
                defaultValue={invoice.getJdentBuyer.deliveryNoteDate}
                onChange={(e) => setDeliveryNoteDate(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Dispatched Through </label>
            <div className='control'>
              <input
                className='input'
                name='dispatchedThrough'
                type='text'
                placeholder='Dispatched Through'
                defaultValue={invoice.getJdentBuyer.dispatchedThrough}
                onChange={(e) => setDispatchedThrough(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Destination </label>
            <div className='control'>
              <input
                className='input'
                name='destination'
                type='text'
                placeholder='Destination'
                defaultValue={invoice.getJdentBuyer.destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Terms Of Delivery</label>
            <div className='control'>
              <input
                className='input'
                name='termsOfDelivery'
                type='text'
                placeholder='Terms Of Delivery'
                defaultValue={invoice.getJdentBuyer.termsOfDelivery}
                onChange={(e) => setTermsOfDelivery(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Sr. No.</label>
            <div className='control'>
              <input
                className='input'
                name='srNo'
                type='number'
                placeholder='Sr.No'
                defaultValue={invoice.getJdentBuyer.srNo}
                onChange={(e) => setSrNo(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Disription Of Goods</label>
            <div className='control'>
              <input
                className='input'
                name='disriptionOfGoods'
                type='text'
                placeholder='Disription Of Goods'
                defaultValue={invoice.getJdentBuyer.disriptionOfGoods}
                onChange={(e) => setDisriptionOfGoods(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Model No. </label>
            <div className='control'>
              <input
                className='input'
                name='modelNo'
                type='text'
                placeholder='Model No'
                defaultValue={invoice.getJdentBuyer.modelNo}
                onChange={(e) => setModelNo(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>SIR No.</label>
            <div className='control'>
              <input
                className='input'
                name='sirNo'
                type='text'
                placeholder='SIR No'
                defaultValue={invoice.getJdentBuyer.sirNo}
                onChange={(e) => setSerialNo(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>HSN/SAC</label>
            <div className='control'>
              <input
                className='input'
                name='hsnsac'
                type='text'
                placeholder='HSN/SAC'
                defaultValue={invoice.getJdentBuyer.hsnsac}
                onChange={(e) => setHsnsac(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Quantity</label>
            <div className='control'>
              <input
                className='input'
                name='quantity'
                type='number'
                placeholder='Quantity'
                defaultValue={invoice.getJdentBuyer.quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Rate</label>
            <div className='control'>
              <input
                className='input'
                name='rate'
                type='number'
                placeholder='Rate'
                defaultValue={invoice.getJdentBuyer.rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Per</label>
            <div className='control'>
              <input
                className='input'
                name='per'
                type='number'
                placeholder='Per'
                defaultValue={invoice.getJdentBuyer.per}
                onChange={(e) => setPer(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Discount</label>
            <div className='control'>
              <input
                className='input'
                name='discount'
                type='text'
                placeholder='discount'
                defaultValue={invoice.getJdentBuyer.discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Amount</label>
            <div className='control'>
              <input
                className='input'
                name='amount'
                type='number'
                placeholder='amount'
                defaultValue={invoice.getJdentBuyer.amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Total Amount</label>
            <div className='control'>
              <input
                className='input'
                name='totalAmount'
                type='number'
                placeholder='Total Amount'
                defaultValue={invoice.getJdentBuyer.totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>GST Percentage %</label>
            <div className='control'>
              <input
                className='input'
                name='content'
                type='text'
                placeholder='content'
                defaultValue={invoice.getJdentBuyer.content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          {/* <div className='field'>
            <label className='label'>GST Percentage %</label>
            <div className='control'>
              <select
                name='content'
                defaultValue={invoice.getJdentBuyer.content}
                onChange={(e) => setContent(e.target.value)}
              >
                <option value=''>Choose your option</option>
                <option value='14'>14 %</option>
                <option value='18'>18 %</option>
                <option value='28'>28 %</option>
              </select>
            </div>
          </div> */}
          <div className='field'>
            <label className='label'>Total Amount In Words</label>
            <div className='control'>
              <input
                className='input'
                name='totalAmountInWords'
                type='text'
                placeholder='Total Amount In Words'
                defaultValue={invoice.getJdentBuyer.totalAmountInWords}
                onChange={(e) => setTotalAmountInWords(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>&nbsp;</label>
            <div className='control'>
              <button className='button is-link'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInvoice;
