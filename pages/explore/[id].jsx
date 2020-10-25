import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';

export default function View() {
  const router = useRouter();
  return (
    <div className='main-container'>
      <Header />
      <div className='container mx-auto px-4'>
        
      </div>
    </div>
  );
}
