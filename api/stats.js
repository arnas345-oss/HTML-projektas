module.exports = async (req, res) => {

  try {

    const response = await fetch(
      "https://api.cloudflare.com/client/v4/radar/attacks/layer3/timeseries?range=1d",
      {
        headers: {
          Authorization: `Bearer ${process.env.CF_API_KEY}`
        }
      }
    );

    const json = await response.json();

    console.log(json);

    // IMPORTANT: safely extract data
    let attacks = 0;

    if (json.success && json.result?.timeseries) {

      attacks = json.result.timeseries.reduce((sum, item) => {
        return sum + (item.value || 0);
      }, 0);

    }

    res.status(200).json({ attacks });

  } catch (err) {

    res.status(500).json({
      error: err.toString()
    });

  }

};
