import React, {useState,useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Button, Alert } from 'react-native';
import axios from 'axios';



export default function App() {
  const [pokeList, setpokeList]= useState([]);
  const [loading, setloading] = useState(true);
  const fetchPokemon = async ()=>{
  setloading(true);
  try{
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
    setpokeList(response.data.results);
  }catch(error){
    console.error(error); 
  }
  finally{
    setloading(false);
  }
};




useEffect(()=>{ 
  fetchPokemon();
  },[]);
  if (loading){
    return <ActivityIndicator size='large' style ={styles.loader} />
    
  }
  return (
    <View style ={styles.container}>
      <Text style = {styles.header}>
        Pokemon List
      </Text>
      <FlatList
      data = {pokeList}
      keyExtractor={(item)=> item.name}
      renderItem= {({item})=> (
        <View style = {styles.item}>
          <Button title={item.name} onPress={() =>
          {console.log('pressed');
            Alert.alert('You clicked!!!', `${item.name}`);
          }} />

        </View>
        )}
        />
        

    
        
   </View>
  
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: 'blue',
    padding: 8,
  },
  loader :{
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    color: 'black',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 5,
  },

});
