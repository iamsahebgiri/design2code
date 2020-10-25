import React from 'react';
import Link from 'next/link';
import Sun from './icons/sun';
import Moon from './icons/moon';
import useTheme from '../utils/theme';
import useMounted from '../utils/use-mounted';

export default function Header() {
  const isMounted = useMounted();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className='container mx-auto px-4'>
      <div className='w-full h-24 flex items-center justify-between'>
        <Link href='/'>
          <a>
            {isMounted &&
              (theme === 'light' ? (
                <img src='/svg/d2c_light.svg' className='w-40' width='200' />
              ) : (
                <img src='/svg/d2c_dark.svg' className='w-40' width='200' />
              ))}
          </a>
        </Link>
        <button
          className='focus:outline-none darkmode-btn'
          onClick={toggleTheme}
          aria-label='Toggle Theme'
        >
          {isMounted &&
            (theme === 'light' ? (
              <Moon color='var(--fg)' size={30} key='icon-light' />
            ) : (
              <Sun color='var(--fg)' size={30} key='icon-dark' />
            ))}
        </button>
      </div>
    </div>
  );
}
