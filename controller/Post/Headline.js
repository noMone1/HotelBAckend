const NodeCache = require('node-cache');
const axios = require('axios');
const cache = new NodeCache({ stdTTL: 14400 });

async function fetchDataFromThirdPartyAPI() {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=ad33701786fa4006afddfc9ff0a07578&pageSize=80');
      cache.set('headlines', response.data);
      return response.data
    } catch (error) {
        console.log("==============",error)
      throw new Error('Failed to fetch data from the third-party API');
    }
  }

const Headlines = async (req,res,next)=>{
    try {
        const cachedData = cache.get('headlines');
        if (cachedData) {
          console.log('Data retrieved from cache');
          return res.status(200).json(cachedData);
        }
        else{
            const respDta = await fetchDataFromThirdPartyAPI();
            return res.status(200).json(respDta)
        }
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
      }
};

module.exports = Headlines;