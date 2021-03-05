import React from 'react';
import { useQuery, gql } from '@apollo/client';

const BOOKS_QUERY = gql`
    query GetBooks {
        books {
            name
            id
        }
    }
`;

const BookList = () => {
    const { loading, error, data } = useQuery(BOOKS_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <ul id='book-list'>
                {data.books &&
                    data.books.map((book) => {
                        return <li key={book.id}>{book.name}</li>;
                    })}
            </ul>
        </div>
    );
};

export default BookList;
