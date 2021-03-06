import fetch from 'isomorphic-unfetch';


// lists all projects in the source repository
export default (req, res) => {
  const endpoint = process.env.BUCKETENDPOINT
  const bucketName = process.env.BUCKETNAME
  const publicKey = process.env.BUCKETPUBLICKEY
  const secretKey = process.env.BUCKETSECRETKEY
  // const querytitle = req.query.title

  const url = `https://${endpoint}/${bucketName}/text/students.json`
  console.log(url)

  fetch(url)
    .then( r => r.json() )
    .then( data => {
      res.status(200).json(data)
    })
    .catch(err => alert(err))
}
