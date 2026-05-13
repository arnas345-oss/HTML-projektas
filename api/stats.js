export default async function handler(req, res) {

  // fake number for now
  const attacks =
    Math.floor(Math.random() * 50000) + 150000;

  res.status(200).json({
    attacks
  });
}