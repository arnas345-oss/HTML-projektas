module.exports = async (req, res) => {

  try {

    const end = new Date();
    const start = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const url =
      `https://api.cloudflare.com/client/v4/radar/attacks/layer3/timeseries` +
      `?start=${start.toISOString()}` +
      `&end=${end.toISOString()}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.CF_API_KEY}`
      }
    });

    const json = await response.json();

    console.log(JSON.stringify(json, null, 2));

    if (!json.success) {
      return res.status(500).json(json);
    }

    const values = json.result?.serie_0?.values || [];

    const attacks = values.reduce(
      (sum, v) => sum + (v || 0),
      0
    );

    res.status(200).json({ attacks });

  } catch (err) {

    res.status(500).json({
      error: err.toString()
    });

  }

};
