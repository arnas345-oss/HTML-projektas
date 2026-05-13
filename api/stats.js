module.exports = async (req, res) => {
  try {
    const url = new URL(
      "https://api.cloudflare.com/client/v4/radar/attacks/layer3/timeseries"
    );

    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    url.searchParams.append("dateStart", oneDayAgo.toISOString());
    url.searchParams.append("dateEnd", now.toISOString());

    console.log("Request URL:", url.toString());

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.CF_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const json = await response.json();
    console.log(JSON.stringify(json, null, 2));

    if (!json.success) {
      return res.status(500).json(json);
    }

    const values = json.result?.serie_0?.values || [];
    const attacks = (values || []).reduce(
  (sum, v) => sum + (Number(v ?? 0)),
  0
);

    res.status(200).json({ attacks });

  } catch (err) {
    res.status(500).json({
      error: err.toString()
    });
  }
};
