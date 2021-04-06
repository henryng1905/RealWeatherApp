import  axios from  'axios';

const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/',
    timeout: 2000,
    
  });
instance.defaults.params = {
    appid:'38c4c80ddecf566d5a1e7eeceba736ab',
    lang:'en'
}
export const getWeather = (params) =>{
    return instance.get('weather',params)
}
