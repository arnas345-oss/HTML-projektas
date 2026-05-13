module.exports = async (req, res) => {

  try {

    const response = await fetch(
      "https://api.cloudflare.com/client/v4/radar/attacks/layer3/timeseries?range=1d&format=json",
      {
        headers: {
          Authorization: `Bearer ${process.env.CF_API_KEY}`
        }
      }
    );

    const json = await response.json();

    console.log(json);

    // ✅ FIXED PATH
    const values = json.result?.serie_0?.values || [];

    // sum all values
    const attacks = values.reduce((sum, v) => sum + (v || 0), 0);

    res.status(200).json({
      attacks
    });

  } catch (err) {

    res.status(500).json({
      error: err.toString()
    });

  }

};
