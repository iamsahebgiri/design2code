import React from 'react';
import Link from 'next/link';
import Shot from './Shot';
import Sun from './icons/sun';
import Moon from './icons/moon';
import useTheme from '../utils/theme';
import useMounted from '../utils/use-mounted';
import data from '../data/data.json';

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
                <img src='./svg/d2c_light.svg' className='w-40' width='200' />
              ) : (
                <img src='./svg/d2c_dark.svg' className='w-40' width='200' />
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
      <div className='mt-12 text-center'>
        <h1 className='heading font-heading font-bold text-4xl tracking-tight sm:text-4xl md:text-5xl xl:text-5xl leading-tight'>
          Send us your design,
          <span className='block text-4xl tracking-tight sm:text-4xl md:text-5xl xl:text-5xl leading-tight gradient-shift'>
            we will code for you
          </span>
        </h1>
        <div className='w-full mt-6 px-2 flex items-center justify-center'>
          <p className='leading-relaxed max-w-md text-gray-600'>
            Plug and play UI design for beautiful interface. Crafted and curated
            by developers and designer all over the globe.
          </p>
        </div>
        <div className='flex mt-10 justify-center'>
          <Link href='/explore'>
            <a className='rounded-md px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-primary-1 hover:bg-primary-2 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md'>
              Get Started
            </a>
          </Link>
          <a
            href='#contribute'
            className='ml-4 rounded-md px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-white hover:bg-gray-200 md:text-lg xl:text-base text-gray-800 font-semibold leading-tight shadow-md'
          >
            Contribute
          </a>
        </div>
      </div>
      <div className='py-32 grid  gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {data.map((shot) => (
          <Shot key={shot.id} shot={shot} />
        ))}
      </div>
    </div>
  );
}
