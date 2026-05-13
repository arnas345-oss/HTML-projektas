module.exports = async (req, res) => {

  try {

    const response = await fetch(
      "https://api.cloudflare.com/client/v4/radar/attacks/layer3/timeseries",
      {
        headers: {
          Authorization: `Bearer ${process.env.CF_API_KEY}`
        }
      }
    );

    const json = await response.json();

    // inspect returned data
    console.log(json);

    // temporary example value
    let attacks = 0;

    if (
      json.result &&
      json.result.length > 0
    ) {
      attacks = json.result[0].value || 0;
    }

    res.status(200).json({
      attacks
    });

  } catch (error) {

    res.status(500).json({
      error: error.toString()
    });

  }

};
