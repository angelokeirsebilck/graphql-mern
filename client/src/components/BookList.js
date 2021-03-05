import React from 'react';
import { useQuery, gql } from '@apollo/client';

const BOOKS_QUERY = gql`
    query GetBooks {
        books {
            name
            genre
        }
    }
`;

const BookList = () => {
    const { data } = useQuery(BOOKS_QUERY);
    console.log(data);
    return (
        <div>
            <ul id='book-list'>
                <li>Book Number 1</li>
            </ul>
        </div>
    );
};

export default BookList;
