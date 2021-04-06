import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import * as Api from '../Constants/Api';
import list from '../Constants/City';
import moment from 'moment';
import { Modalize } from 'react-native-modalize';
import { TextInput } from 'react-native';
import LottieView from 'lottie-react-native';
const windowWidth = Dimensions.get('window').width;
const timezoneDefault = 25200; //Ha Noi
const checkDay = (timezone = timezoneDefault) => {
  let time = moment().utcOffset(timezone / 60)
  return time.hour() > 6 && time.hour() < 19
}

function HomeScreen() {
  const [timeZone, setTimezone] = useState(timezoneDefault);
  const [currentTime, setCurrentTime] = useState(moment());
  const day = useMemo(() => {
    return checkDay(timeZone)
  }, [timeZone])
  const updateTime = useMemo(() => {
    return currentTime.utcOffset(timeZone / 60).format('MMMM Do YYYY, h:mm:ss a')
  }, [timeZone, currentTime])

  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const [listCity, setListCity] = useState(list);
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const updateSearch = (search) => {
    setSearch(search);
    let newList = list.filter(function (item) {
      return item.name ? item.name.includes(search) : false;
    });
    setListCity(newList);
  };

  const convertSRSS = (date) => {
    let dateN = new Date(date * 1000);
    let hours = dateN.getHours();
    let minutes = dateN.getMinutes();
    return `${hours}h${minutes}m VNT`;
  };

  const convertKtoC = (temp) => {
    return Math.floor(temp - 273.15);
  };

  const renderItem = ({ item }) => (
    <View style={{width: 340, flexDirection:'row', alignItems: 'center', marginBottom:5, justifyContent:'space-between' }}>
      <TouchableOpacity
        style={{ marginVertical: 9 }}
        onPress={() => {
          fetch(item.name);
          onClose();
        }}>
        <Text style={{ fontSize: 18, fontFamily: 'Barlow-Regular', color: '#444444' }}>
          {item.name}, {item.country}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <LottieView style={{width: 18, height: 18,alignItems:'center', }} autoSize source={require('../assets/lottie/star-inactive.json')} autoPlay loop />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    fetch('Hanoi');
  }, []);
  useEffect(()=>{
    if(day){
      StatusBar.setBarStyle('dark-content',true)
    }else{
      StatusBar.setBarStyle('light-content',true)
    }
  },[day]);
  const fetch = (city) => {
    let params = {
      params: {
        q: city,
      },
    };
    Api.getWeather(params).then(
      (res) => {
        console.log("res",res);
        setData(res.data);
        setTimezone(res.data.timezone);
      },
      (error) => {
        console.log(error.toJSON());
      },
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: day ? 'white' : '#13133a' }}>
      {data ? (
        <View>

          <Image
            style={style.imageContainer}
            source={
              day
                ? require('../assets/images/day.png')
                : require('../assets/images/night.png')
            }
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: day ? 'white' : '#13133a',
              marginTop: -20,
            }}>
            <Text style={[style.dateText, { color: day ? 'black' : 'white' }]}>
              {updateTime}
            </Text>
            <TouchableOpacity onPress={onOpen}>
              <View
                style={{
                  height: 48,
                  marginLeft: 10,
                  backgroundColor: 'rgba(13, 160, 234, 0.08)',
                  flexDirection: 'row',
                  paddingLeft: 24,
                  paddingRight: 18,
                  alignItems: 'center',
                  borderTopRightRadius: 30,
                  borderBottomLeftRadius: 30,
                }}>
                <Text
                  style={{
                    color: '#0DA0EA',
                    marginRight: 4,
                    fontFamily: 'Barlow-Regular',
                  }}>
                  {data.name}, {data.sys.country}
                </Text>
                <Image
                  source={require('../assets/images/location.png')}></Image>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 45,
              justifyContent: 'space-between',
              marginTop: 24,
            }}>
            <View>
              <LottieView style={{ width: 90, height: 90,alignItems:'center',justifyContent:'flex-end' }} autoSize source={require('../assets/lottie/weather.json')} autoPlay loop >
              <Text style={{ color: day ? 'black' : 'white' }}>
                {data.weather[0].main}
              </Text>
              </LottieView>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 64,
                  color: day ? 'black' : 'white',
                }}>
                {convertKtoC(data.main.feels_like)}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  color: day ? 'black' : 'white',
                }}>
                °C
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                <Text style={{ marginRight: 2, color: day ? 'black' : 'white' }}>
                  {Math.floor(data.main.temp_max - 273.15)} °C
                </Text>
                <Image source={require('../assets/images/up.png')} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 2, color: day ? 'black' : 'white' }}>
                  {Math.floor(data.main.temp_min - 273.15)} °C
                </Text>
                <Image source={require('../assets/images/down.png')} />
              </View>
            </View>
          </View>
          <View style={style.bigView2}>
            <View style={style.littleView}>
              <Image
                style={style.detailImage}
                source={require('../assets/images/humidity.png')}
              />
              <Text
                style={[style.detailBigText, { color: day ? 'black' : 'white' }]}>
                {data.main.humidity}%
              </Text>
              <Text
                style={
                  [style.detailTinyText, { color: day ? 'black' : 'white' }]
                }>
                Humidity
              </Text>
            </View>
            <View style={style.littleView}>
              <Image
                style={style.detailImage}
                source={require('../assets/images/pressure.png')}
              />
              <Text
                style={[style.detailBigText, { color: day ? 'black' : 'white' }]}>
                {data.main.pressure}mBar
              </Text>
              <Text
                style={
                  [style.detailTinyText, { color: day ? 'black' : 'white' }]
                }>
                Pressure
              </Text>
            </View>
            <View style={style.littleView}>
              <Image
                style={style.detailImage}
                source={require('../assets/images/wind.png')}
              />
              <Text
                style={[style.detailBigText, { color: day ? 'black' : 'white' }]}>
                {data.wind.speed} km/h
              </Text>
              <Text
                style={
                  [style.detailTinyText, { color: day ? 'black' : 'white' }]
                }>
                Wind
              </Text>
            </View>
          </View>
          <View style={style.bigView2}>
            <View style={style.littleView}>
              <Image
                style={style.detailImage}
                source={require('../assets/images/sunrise.png')}
              />
              <Text
                style={[style.detailBigText, { color: day ? 'black' : 'white' }]}>
                {convertSRSS(data.sys.sunrise)}
              </Text>
              <Text
                style={
                  [style.detailTinyText, { color: day ? 'black' : 'white' }]
                }>
                Sunrise
              </Text>
            </View>
            <View style={style.littleView}>
              <Image
                style={style.detailImage}
                source={require('../assets/images/sunset.png')}
              />
              <Text
                style={[style.detailBigText, { color: day ? 'black' : 'white' }]}>
                {convertSRSS(data.sys.sunset)}
              </Text>
              <Text
                style={
                  [style.detailTinyText, { color: day ? 'black' : 'white' }]
                }>
                Sunset
              </Text>
            </View>
            <View style={style.littleView}>
              <Image
                style={style.detailImage}
                source={require('../assets/images/daytime.png')}
              />
              <Text
                style={[style.detailBigText, { color: day ? 'black' : 'white' }]}>
                {data.timezone / 60 / 60}
              </Text>
              <Text
                style={
                  [style.detailTinyText, { color: day ? 'black' : 'white' }]
                }>
                UTC
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text>Error</Text>
      )
      }
      <Modalize
        ref={modalizeRef}
        childrenStyle={{
          paddingVertical: 16,
          paddingHorizontal: 10,
          paddingBottom: 120
        }}
        modalStyle={{
          marginTop: 100
        }}
        flatListProps={{
          data: listCity,
          renderItem: renderItem,
          keyExtractor: (item, index) => index.toString(),
          showsVerticalScrollIndicator: false,
        }}
        HeaderComponent={<View style={{
          paddingHorizontal: 10,
          paddingTop: 12
        }}>
          <Text style={style.modalText}>Location</Text>
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#F3F3F3',
            height: 40,
            borderRadius: 4,
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 12,
            alignItems: 'center'
          }}>
            <TextInput
              placeholder='Search location'
              style={{
                flex: 1,
                height: '100%',
                marginRight: 12
              }}
              onChangeText={updateSearch}
              value={search}
            />
            <Image
              source={require('../assets/images/ic_location.png')}
            />
          </View></View>}
      >
      </Modalize>
    </View >
  );
}

const style = StyleSheet.create({
  imageContainer: {
    height: 300,
    width: windowWidth,
  },
  dateText: {
    width: 0.6 * windowWidth,
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Barlow-Regular',
    marginLeft: 16,
  },
  detailBigText: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Barlow-Regular',
  },
  detailImage: {
    width: 24,
    height: 24,
    marginBottom: 12,
  },
  detailTinyText: {
    fontSize: 8,
    alignItems: 'center',
    color: '#999999',
    fontFamily: 'Barlow-Regular',
  },
  bigView2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
    justifyContent: 'space-between',
    marginTop: 40,
  },
  littleView: {
    height: 69,
    width: windowWidth / 3,
    alignItems: 'center',
    marginLeft: -20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Barlow-Regular',
  },
  modalText: {
    color: '#999999',
    marginBottom: 27,
    fontSize: 16,
    fontFamily: 'Barlow-Regular',
    alignSelf: 'center'
  },
});

export default HomeScreen;
