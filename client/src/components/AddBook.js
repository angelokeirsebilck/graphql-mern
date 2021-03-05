import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

const AUTHORS_QUERY = gql`
    query GetAuthors {
        authors {
            name
            id
        }
    }
`;

const ADD_BOOK = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`;

const AddBook = () => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const [addBook] = useMutation(ADD_BOOK);

    const { loading, error, data } = useQuery(AUTHORS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const submitForm = (e) => {
        e.preventDefault();
        addBook({
            variables: { name, genre, authorId },
            refetchQueries: [
                {
                    query: gql`
                        query GetBooks {
                            books {
                                name
                                id
                            }
                        }
                    `,
                },
            ],
        });
        // console.log(name, genre, authorId);
        setName('');
        setGenre('');
        setAuthorId('');
    };

    return (
        <form id='add-book' onSubmit={(e) => submitForm(e)}>
            <div className='field'>
                <label>Book name:</label>
                <input value={name} type='text' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='field'>
                <label>Genre:</label>
                <input
                    type='text'
                    value={genre}
                    type='text'
                    onChange={(e) => setGenre(e.target.value)}
                />
            </div>
            <div className='field'>
                <label>Author:</label>
                <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select author</option>
                    {data.authors.map((author) => {
                        return (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <button>+</button>
        </form>
    );
};

export default AddBook;
