import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TabBarIOS } from 'react-native';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from './components/signup/SignUp';
import Start from './components/home/Start';
import BoxInput from './components/RecipeBoxes/BoxTextInput';
import BoxItem from './components/RecipeBoxes/BoxItem';
import ProfileCard from './components/profilecard/ProfileCard';
import RecipesList from './components/recipes/RecipesList';


export default function App() {
  const [items, setItems] = useState([]);

const addItemHandler = (itemTitle) => {
  setItems((currentItems) => [
    ...items, 
    { uid: Math.random().toString(), value: itemTitle },
  ]);
};

const removeItemHandler = (itemId) => {
  setItems((currentItems) => {
    return currentItems.filter((item) => item.uid !== itemId);
  });
};

function HomeScreen({navigation}) {
  return (
    <View style={styles.container} >
        <Start/>
        <Button
        title="Add Recipe Box"
        onPress={() => navigation.navigate('AddBox')}
      />

      <FlatList 
        keyExtractor={(item, index) => item.uid}
        data={items} 
        renderItem={(itemData) => (
          <BoxItem 
            id = {itemData.item.uid}
            onDelete={removeItemHandler.bind(this, itemData.item.uid)}
            title={itemData.item.value} 
          /> 
        )} 
      />

      <View style={styles.profile}>
        <Button
          title= "View Profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
        
    </View>
  );
}

function Recipes({navigation}) {
  return (
    <View style={styles.container} >
        <RecipesList/>
        <Button
        title="Add Recipe"
        onPress={() => navigation.navigate('AddRecipe')}
      />

      <FlatList 
        keyExtractor={(item, index) => item.uid}
        data={items} 
        renderItem={(itemData) => (
          <BoxItem 
            id = {itemData.item.uid}
            onDelete={removeItemHandler.bind(this, itemData.item.uid)}
            title={itemData.item.value} 
          /> 
        )} 
      />
        
    </View>
  );
}

function Profile({navigation}) {
  return (
    <View style={styles.container} >
        <ProfileCard/>

        
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen 
          name="Home" component={HomeScreen} 
          options={{
            title: 'Recipe Box',
            headerStyle: {
              backgroundColor: '#ff8c00',
            },
            headerTitleStyle: {
              fontFamily: 'Marker Felt, Arial, sans-serif',
              fontSize: 36,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
            },
          }}
        />
      <HomeStack.Screen 
          name="AddBox" component={AddBox} 
          options={{
            title: 'Add a Recipe Box',
          }}
        />
        <HomeStack.Screen
          name="Profile" component={ProfileCard}
          options={{
            title: 'Profile'
          }}
        />
      
    </HomeStack.Navigator>
  )
}

const RecipeStack = createStackNavigator();

function RecipeStackScreen() {
  return(
    <RecipeStack.Navigator>
      <RecipeStack.Screen 
          name="Recipes" component={Recipes} 
          options={{
            title: 'Recipe Box',
            headerStyle: {
              backgroundColor: '#ff8c00',
            },
            headerTitleStyle: {
              fontFamily: 'Marker Felt, Arial, sans-serif',
              fontSize: 36,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
            },
          }}
        />
      <RecipeStack.Screen 
          name="AddRecipe" component={AddRecipe} 
          options={{
            title: 'Add a Recipe',
          }}
        />
      
      
    </RecipeStack.Navigator>
  )
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return(
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
          name="Profile" component={Profile} 
          options={{
            title: 'Recipe Box',
            headerStyle: {
              backgroundColor: '#ff8c00',
            },
            headerTitleStyle: {
              fontFamily: 'Marker Felt, Arial, sans-serif',
              fontSize: 36,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
            },
          }}
        />
      
      
    </ProfileStack.Navigator>
  )
}

function AddBox() {
  return (
    <View style={styles.container} >
      <BoxInput onAddBox = {addItemHandler} />
    </View>
  );
}

function AddRecipe() {
  return (
    <View style={styles.container} >
      <BoxInput onAddBox = {addItemHandler} />
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Recipe Boxes" component={HomeStackScreen} />
        <Tab.Screen name="Recipes" component={RecipeStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
      
        

    </NavigationContainer>

      
      
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },

  header: {
    backgroundColor: 'orange',
    paddingBottom: 20,
    paddingTop: 20,
  },

  profile: {
    marginBottom: 30,
  }
});
