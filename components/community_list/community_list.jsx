import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommunityList = ({ list, navigation }) => {
  const { title, userName, writeDt, hit, comment, imagePath } = list;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation();
      }}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.user}>
            <Text style={styles.text}>{userName}</Text>
            <Text style={styles.text}>{writeDt}</Text>
          </View>
          <View style={styles.user}>
            <Ionicons name='eye-outline' size={24} color='grey' />
            <Text style={styles.hit}> {hit} </Text>
            <Ionicons name='chatbox-outline' size={20} color='grey' />
            <Text style={styles.comment}> {comment} </Text>
          </View>
        </View>
        <View>
          <Image
            style={styles.image}
            source={{ uri: imagePath ? imagePath : null }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  user: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'grey',
    marginRight: 40,
  },
  content: {
    flex: 1,
  },
  hit: {
    marginRight: 30,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default CommunityList;
