import data from '../data/data.json';
import Shot from '../components/Shot';
import Header from '../components/Header';
import Hero from '../components/Hero';

export default function IndexPage() {
  return (
    <>
      <div className='main-container'>
        <Header />
        <Hero />
        <div className='container mx-auto px-4 py-32 grid  gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data.map((shot) => (
            <Shot key={shot.id} shot={shot} />
          ))}
        </div>
      </div>
    </>
  );
}
