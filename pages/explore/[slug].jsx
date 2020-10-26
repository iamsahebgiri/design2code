import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Designer from '../../components/icons/designer';
import Developer from '../../components/icons/developer';
import getPosts from '../../lib/get-posts';
import renderMarkdown from './../../lib/render-markdown';
import Highlight, { defaultProps } from 'prism-react-renderer';

const Tab = ({ isActive, name, onClickTab }) => (
  <button className='mr-5 focus:outline-none' onClick={onClickTab}>
    <span className='font-semibold text-sm text'>{name}</span>
    {isActive && (
      <div className='tab-border-bottom h-1 bg-primary-1 rounded-t-lg'></div>
    )}
  </button>
);

const Code = ({ code, language }) => {
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const ExplorePage = (props) => {
  const { developer, designer, title, code } = props;
  const [activeTab, setActiveTab] = useState('HTML');
  const tabs = ['HTML', 'CSS', 'JAVASCRIPT', 'OUTPUT'];
  const allCode = code.split('__escape__');
  const srcDoc = `
                  <html>
                    <body>${allCode[0]}</body>
                    <style>${allCode[1]}</style>
                    <script>${allCode[2]}</script>
                  </html>
                `;

  const onClickTab = (e) => {
    setActiveTab(e.target.textContent);
  };
  return (
    <div className='main-container'>
      <Header />
      <div className='container mx-auto px-4 pb-8'>
        <div className='shot-details-container flex flex-col md:items-center md:flex-row justify-between'>
          <div>
            <h1 className='heading mt-2 text-2xl font-heading leading-8 tracking-normal font-bold font-display '>
              {title}
            </h1>
            <div className='flex mt-2'>
              <Developer color='var(--svg-color)' />
              <div className='flex'>
                <p className='subtle-text mr-8 ml-2'>{developer}</p>
              </div>
              <div className='flex'>
                <Designer color='var(--svg-color)' />
                <p className='subtle-text mr-8 ml-2 '>{designer}</p>
              </div>
            </div>
          </div>
          <div>
            <button className='rounded-md mt-8 w-full px-4 md:mt-0 focus:outline-none md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-primary-1 hover:bg-primary-2 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md;'>
              {activeTab === 'OUTPUT' ? 'View design' : `Copy ${activeTab}`}
            </button>
          </div>
        </div>
        <div className='tabs-container mt-6 '>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              name={tab}
              onClickTab={onClickTab}
              isActive={tab === activeTab}
            />
          ))}
        </div>
        {activeTab === 'HTML' ? <Code language='html' code={allCode[0]} /> : ''}
        {activeTab === 'CSS' ? <Code language='css' code={allCode[1]} /> : ''}
        {activeTab === 'JAVASCRIPT' ? (
          <Code language='js' code={allCode[2]} />
        ) : (
          ''
        )}
        {activeTab === 'OUTPUT' ? (
          <div className='border border-gray-400 rounded mt-2'>
            <iframe
              srcDoc={srcDoc}
              title='output'
              sandbox='allow-scripts allow-same-origin'
              frameBorder='0'
              width='100%'
              height='100%'
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export const getStaticProps = ({ params: { slug } }) => {
  const posts = getPosts();
  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex];
  const { body, ...rest } = post;

  return {
    props: {
      previous: posts[postIndex - 1] || null,
      next: posts[postIndex + 1] || null,
      ...rest,
      code: renderMarkdown(body),
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: getPosts().map((p) => `/explore/${p.slug}`),
    fallback: false,
  };
};

export default ExplorePage;
