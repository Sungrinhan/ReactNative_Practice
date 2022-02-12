import React from "react";
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex:1, backgroundColor: "tomato"}}></View>
      <View style={{ flex:1, backgroundColor: "teal"}}></View>
      <View style={{ flex:1, backgroundColor: "orange"}}></View>
    </View>
  );
}


//display : flex, flex-direction: row or column  웹에서는 디스플레이 플렉스를 지정해줘야함
// 네이티브는 그럴필요가 없이 , 이미 flrx container 임 
// flex-direction 의 default 는 Column