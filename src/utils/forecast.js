const request = require('request')

var options = {
    json: true,
    proxy: 'http://proxy-iil.intel.com:911'
}

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=91a66a63cbd9ab31fa83fd9037243806&query=' + lat + ',' + long
    options.url = url;
    request(options, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined);
        } else if(body.error) {
            callback(body.error.info)
        } else {
            const c = body.current;

            callback(undefined, c.weather_descriptions[0] + '. It is currently ' + c.temperature + ' degress out. It feels like ' + c.feelslike + ' degress out.')
        }
    })
}

module.exports = forecast