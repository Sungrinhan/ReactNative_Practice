import * as Location from 'expo-location';
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

const { width : SCREEN_WIDTH } = Dimensions.get("window");
console.log(SCREEN_WIDTH)

const API_KEY = "52a96d1f825d0c2ce0f96b61330e798d"

const icons = {
  Clouds : "cloudy",
  Clear : "day-sunny",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
}


export default function App() {
  const [city, setCity] = useState("Loading....");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const { granted } = await Location.requestForegroundPermissionsAsync(); // granted 는 유저 권한이 주어졌는지 여부를 알 수있다. 

    if(!granted){
      setOk(false);  // 유저 권한에 대해 물어봐서, granted 가 false 이면 setOk를 false 로 바꾼다.
    }

    const { coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5}) // getCurrentPositionAsync(accuracy 1~6 ) 까지, 위도 경도를 가져온다. 
    // console.log() 해보면 coords에 내용이 들어있다. 
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false}) // 위도경도를 통해 location의 정보를 알 수 있다. 
    // console.log() 해보면 location 에 대한 많은 정보를 알 수 있따. 
    setCity(location[0].city) // City 값을 
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={alerts}&appid=${API_KEY}&units=metric`)
    const json = await response.json();
    setDays(json.daily)
  }
  useEffect(() => {
    getWeather()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityname}>{city}</Text>
      </View>
      <ScrollView 
      horizontal 
      pagingEnabled 
      // indicatorStyle="white"   indicator 밑에 스크롤바.
      showsHorizontalScrollIndicator={false}
      contentContainerstyle={styles.weather}>
        {days.length === 0 ? (
        <View style={styles.day}>
          <ActivityIndicator 
          color="white" 
          style={{ marginTop : 10}} 
          size="large"/>
        </View>
        )  :  (
        days.map((day, index) => 
        <View key={index} style={styles.day}>
          <View style={styles.icons}>
            <Text style={styles.temp}>
              {parseFloat(day.temp.day).toFixed(1)}
            </Text>
            <Fontisto name={icons[day.weather[0].main]} size={68} color="white" />
          </View>
          <Text style={styles.description}>{day.weather[0].main}</Text>
          <Text style={styles.tinyText}>{day.weather[0].description}</Text>
        </View>
        )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityname:{
    fontSize: 68,
    fontWeight: "500",
    color: "white",
  },
  weather: {
    
    
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems:"flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
    fontSize: 179,
    color: "white",
  },
  icons:{
    flexDirection: "row", 
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
  tinyText: {
    marginTop: -5,
    fontSize: 25,
    color: "white",
    
  }
})
//display : flex, flex-direction: row or column  웹에서는 디스플레이 플렉스를 지정해줘야함
// 네이티브는 그럴필요가 없이 , 이미 flrx container 임 
// flex-direction 의 default 는 Column