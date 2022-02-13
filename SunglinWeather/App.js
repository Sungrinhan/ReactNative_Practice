import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';

const { width : SCREEN_WIDTH } = Dimensions.get("window");
console.log(SCREEN_WIDTH)

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityname}>Seoul</Text>
      </View>
      <ScrollView 
      horizontal 
      pagingEnabled 
      // indicatorStyle="white"   indicator 밑에 스크롤바.
      showsHorizontalScrollIndicator={false}
      contentContainerstyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
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
    fontWeight: "500"
  },
  weather: {
    
    
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 179
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  }
})
//display : flex, flex-direction: row or column  웹에서는 디스플레이 플렉스를 지정해줘야함
// 네이티브는 그럴필요가 없이 , 이미 flrx container 임 
// flex-direction 의 default 는 Column