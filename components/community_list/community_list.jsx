import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CommunityList = ({ list, navigation }) => {
  const { title, userId, writeDt, hit, comment } = list;

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
            <Text style={styles.text}>{userId}</Text>
            <Text style={styles.text}>{writeDt}</Text>
          </View>
          <View style={styles.user}>
            <Text style={styles.text}>조회 {hit}</Text>
            <Text style={styles.text}>댓글 {comment}</Text>
          </View>
        </View>
        <View style={styles.comments}></View>
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
  },
  text: {
    color: 'grey',
    marginRight: 20,
  },
  content: {
    flex: 1,
  },
});

export default CommunityList;
