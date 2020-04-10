import Layout from '../layouts/Layout';
import useSWR from 'swr';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Index() {
  
  const { data, error } = useSWR('/api/randomQuote', fetcher);

  // The following line has optional chaining, added in Next.js v9.1.5,
  // is the same as `data && data.author`
  // const author = data?.author;
  // let quote = data?.quote;

  // if (!data) quote = 'Loading...';
  // if (error) quote = 'Failed to fetch the quote.';

  return (
    <div>
      <Layout>
        <p>This component will display a landing page.</p>
        {/* <h2>a quote</h2>
        <div className="quote">{quote}</div>
        {author && <span className="author">- {author}</span>} */}
      </Layout>
      <style jsx>{`
        p,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }    
      `}</style>   
    </div>
  );
}