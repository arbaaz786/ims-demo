import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { notify } from 'react-notify-toast';
import gql from 'graphql-tag';

const NOTE_QUERY = gql`
  query getNote($_id: ID!) {
    getNote(_id: $_id) {
      _id
      title
      content
      image
      price
      date
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation updateNote($_id: ID!, $title: String, $content: String, $image:String,$price:String) {
    updateNote(_id: $_id, input: { title: $title, content: $content, image:$image ,price:$price}) {
      _id
      title
      content
      image
      price
    }
  }
`;

const EditNote = ({ match }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const { loading, error, data } = useQuery(NOTE_QUERY, {
    variables: {
      _id: match.params.id,
    },
  });

  const [updateNote] = useMutation(UPDATE_NOTE);

  if (loading) return <div>Fetching product</div>;
  if (error) return <div>Error fetching product</div>;

  // set the  result gotten from rhe GraphQL server into the note variable.
  const note = data;

  return (
    <div className='container m-t-20'>
      <h1 className='page-title'>Edit Product</h1>

      <div className='newnote-page m-t-20'>
        <form
          onSubmit={(e) => {
            // Stop the form from submitting
            e.preventDefault();

            // set the title of the note to the title in the state, if not's available set to the original title gotten from the GraphQL server
            // set the content of the note to the content in the state, if not's available set to the original content gotten from the GraphQL server
            // pass the id, title and content as variables to the UPDATE_NOTE mutation.
            updateNote({
              variables: {
                _id: note.getNote._id,
                title: title ? title : note.getNote.title,
                content: content ? content : note.getNote.content,
                image:image ? image : note.getNote.image,
                price:price ? price : note.getNote.price,
              },
            });

            notify.show('Note was edited successfully', 'success');
          }}
        >
          <div className='field'>
            <label className='label'>Product Title</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='title'
                placeholder='Note Title'
                defaultValue={note.getNote.title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='field'>
            <label className='label'>Product Content</label>
            <div className='control'>
              <textarea
                className='textarea'
                rows='10'
                name='content'
                placeholder='Note Content here...'
                defaultValue={note.getNote.content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
          </div>

          <div className="field">
            <label className="label">Image Path</label>
            <div className="control">
              <input
                className="input"
                name="image"
                type="text"
                placeholder="Image Title"
                defaultValue={image}
                onChange={e => setImage(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Product Price</label>
            <div className="control">
              <input
                className="input"
                name="price"
                type="text"
                placeholder="Enter Price Here"
                defaultValue={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <button className='button is-link'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
