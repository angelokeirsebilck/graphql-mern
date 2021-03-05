import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import BookDetails from './BookDetails';

const BOOKS_QUERY = gql`
    query GetBooks {
        books {
            name
            id
        }
    }
`;

const BookList = () => {
    const [id, setId] = useState(null);
    const { loading, error, data } = useQuery(BOOKS_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <ul id='book-list'>
                {data.books &&
                    data.books.map((book) => {
                        return (
                            <li onClick={() => setId(book.id)} key={book.id}>
                                {book.name}
                            </li>
                        );
                    })}
            </ul>
            <BookDetails id={id} />
        </div>
    );
};

export default BookList;
