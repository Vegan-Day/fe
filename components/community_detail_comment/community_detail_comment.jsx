import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const CommunityDetailComment = ({ comment }) => {
  const { cm, userName, writeDt } = comment;

  const date = moment(writeDt).format('MM/DD HH:mm');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.user}>{userName}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.cm}>{cm}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  content: {
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  user: {
    fontSize: 18,
    fontWeight: '500',
  },
  date: {
    color: 'grey',
  },
  cm: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default CommunityDetailComment;
