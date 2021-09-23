import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const NEW_NOTE = gql`
  mutation createNote($title: String!, $content: String!,$image:String!,$price:String!) {
    createNote(input: { title: $title, content: $content ,image:$image,price:$price}) {
      _id
      title
      content
      image
      price
      date
    }
  }
`;

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

const NewNote = withRouter(({ history }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const [createNote] = useMutation(NEW_NOTE, {
    update(
      cache,
      {
        data: { createNote }
      }
    ) {
      const { allNotes } = cache.readQuery({ query: NOTES_QUERY });

      cache.writeQuery({
        query: NOTES_QUERY,
        data: { allNotes: allNotes.concat([createNote]) }
      });
    }
  });

  return (
    <div className="container m-t-20">
      <h1 className="page-title">New Product</h1>

      <div className="newnote-page m-t-20">
        <form
          onSubmit={e => {
            e.preventDefault();

            createNote({
              variables: {
                title,
                content,
                image,
                price,
                date: Date.now()
              }
            });
            history.push("/");
          }}
        >
          <div className="field">
            <label className="label">Product Title</label>
            <div className="control">
              <input
                className="input"
                name="title"
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
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
                value={image}
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
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Product Content</label>
            <div className="control">
              <textarea
                className="textarea"
                name="content"
                rows="10"
                placeholder="Note Content here..."
                value={content}
                onChange={e => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="field">
            <label className="label">Date</label>
            <div className="control">
            
            </div>
          </div>


          <div className="field">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default NewNote;
