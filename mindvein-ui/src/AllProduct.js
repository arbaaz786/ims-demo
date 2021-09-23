import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { notify } from 'react-notify-toast';
import productimg from './images/sugarfree.png';


const NOTES_QUERY = gql`
  {
    allNotes {
      title
      content
      image
      price
      _id
      date
    }
  }
`;

const DELETE_NOTE_QUERY = gql`
  mutation deleteNote($_id: ID!) {
    deleteNote(_id: $_id) {
      title
      content
      image
      price
      _id
      date
    }
  }
`;

const AllProducts = () => {
  const { loading, error, data } = useQuery(NOTES_QUERY);

  const [deleteNote] = useMutation(DELETE_NOTE_QUERY, {
    update(cache, { data: { deleteNote } }) {
      const { allNotes } = cache.readQuery({ query: NOTES_QUERY });
      const newNotes = allNotes.filter((note) => note._id !== deleteNote._id);

      cache.writeQuery({
        query: NOTES_QUERY,
        data: { allNotes: newNotes },
      });
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log("data---->", data);
  return (
    <div className='container m-t-20'>
      <h1 className='page-title'>All Products</h1>

      <div className='allnotes-page'>
        <div className='columns is-multiline'>
          {data.allNotes.map((note) => (

            <div className='column is-one-third' key={note._id}>
              {JSON.stringify(note.image)}
              <div className='card'>
                <header className='card-header'>
                  <p className='card-header-title'>{note.title}</p>
                </header>
                <div className='card-content'>
                  <img src={productimg} className='product' alt={'logo'} />
                  <div className='content'>
                    {note.content}
                    <br />
                    {note.price}
                  </div>
                  <div className='content'>
                    {new Date(note.date).toString()}
                    <br />
                  </div>
                </div>
                <footer className='card-footer'>
                  <Link to={`note/${note._id}`} className='card-footer-item'>
                    Edit
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteNote({ variables: { _id: note._id } });
                      notify.show('Note was deleted successfully', 'success');
                    }}
                    className='card-footer-item'
                  >
                    Delete
                  </button>
                  <button>
                    <a href={`productdetails/${note._id}`}>
                      <i className='fas fa-print'></i>
                    </a>
                  </button>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
