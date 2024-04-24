import React, { useState } from 'react'
import Header from '../components/shared/Header';
import EntrySearch from '../components/search/EntrySearch';

const Home = () => {
  return (
    <div className='mx-auto'>
      <Header />
      <EntrySearch />
    </div>
  )
}

export default Home;