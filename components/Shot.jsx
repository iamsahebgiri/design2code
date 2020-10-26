import clsx from 'clsx';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Shot({ shot }) {
  const { link_to_img, title, developer, slug } = shot;
  const orginal_img = link_to_img.split('?')[0];

  const [isSmallImgLoaded, setIsSmallImgLoaded] = useState(false);
  const [isLargeImgLoaded, setIsLargeImgLoaded] = useState(false);

  useEffect(() => {
    // small image
    const img = new Image();
    img.src = `${orginal_img}?compress=1&resize=12x9`;
    img.onload = () => {
      setIsSmallImgLoaded(true);
    };

    // large image
    const img_large = new Image();
    img_large.src = `${orginal_img}?compress=1&resize=800x600`;
    img_large.onload = () => {
      setIsLargeImgLoaded(true);
    };
  }, []);

  return (
    <div>
      <Link href={`/explore/${slug}`}>
        <a>
          <div
            className='placeholder rounded bg-gray-200 relative bg-cover bg-no-repeat overflow-hidden'
            data-large={`${orginal_img}?compress=1&resize=1200x900`}
          >
            <img
              src={`${orginal_img}?compress=1&resize=12x9`}
              alt={title}
              className={clsx('img-small', isSmallImgLoaded && 'loaded')}
            />
            <img
              src={`${orginal_img}?compress=1&resize=800x600`}
              alt={title}
              className={clsx('img-large', isLargeImgLoaded && 'loaded')}
            />
            <div className='intrinsic-placeholder' />
          </div>
        </a>
      </Link>
      <div className='flex items-center justify-between'>
        <p className='heading py-2 font-semibold text-sm'>{developer}</p>
      </div>
    </div>
  );
}
