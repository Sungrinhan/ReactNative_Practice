import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  TextInput,  
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from "./colors"
import {react, useState, useEffect} from 'react'

const STORAGE_KEY = "@toDos"

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    // toDos 를 스트링파이 해주고 저장한다.
    try{
      const s = JSON.stringify(toSave);
      await AsyncStorage.setItem(STORAGE_KEY, s);
    } catch(e) {
      alert(e);
    }
  }
  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      // console.log(s);
      setToDos(JSON.parse(s));
    } catch(e){
      alert(e);
    }
  }
  useEffect(() => {
    loadToDos()
  }, []);
  const addToDo = async () => {
    if(text === ""){
      return 
    }
    // save ToDo 추가해야할 function
    const newToDos = Object.assign(
      {}, 
      toDos, 
      {[Date.now()] : {text: text, working: working}
    });
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText(""); 
  }
  // console.log(toDos)
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{
            ...styles.btnText, 
            color: working ? "white" : theme.grey
            }}
          >
              Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{
            ...styles.btnText, 
            color: working ? theme.grey : "white"
            }}
          >
              Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput 
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        returnKeyType="done"
        value={text}
        // multiline
        placeholder={working ? "Add a To Do" : "Where Do You Want to Go?"} 
        style={styles.input} 
      />
      <ScrollView>
        {Object.keys(toDos).map((key) => (
          toDos[key].working === working ? <View style={styles.toDo} key={key}>
            <Text style={styles.toDoText}>
              {toDos[key].text}
            </Text> 
          </View> : null
        ))

        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20 ,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 44,
    
    fontWeight: "600"
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20 ,
    fontSize: 18
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20, 
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  }
});
