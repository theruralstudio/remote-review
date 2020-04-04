import fetch from 'isomorphic-unfetch';
// import quotes from '../../quotes.json'; 
// ^ fetch this from github instead

export default async (req, res) => {
  const quoteRes = await fetch('https://raw.githubusercontent.com/zeit/next-learn-demo/master/7.2-api-routes/quotes.json');
  const allQuotes = await quoteRes.json();

  const { author } = req.query;
  let quotes = allQuotes;

  if (author) {
    quotes = quotes.filter(quote => quote.author.toLowerCase().includes(author.toLowerCase()));
  }
  if (!quotes.length) {
    quotes = allQuotes.filter(quote => quote.author.toLowerCase() === 'unknown');
  }

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  res.status(200).json(quote);
};