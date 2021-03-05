import React from 'react';
import BookList from './components/BookList';
import { ApolloClient, InMemoryCache, gql, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    // fetchOptions: {
    //     mode: 'no-cors',
    // },
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className='App' id='main'>
                <h1>Book List</h1>
                <BookList />
            </div>
        </ApolloProvider>
    );
}

export default App;
