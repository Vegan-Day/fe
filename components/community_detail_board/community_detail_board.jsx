import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { URL } from '@env';

const CommunityDetailBoard = ({ board }) => {
  console.log(board);
  const { userId, title, writeDt, cn, hit, comment } = board[0];

  const year = new Date(writeDt).toISOString().slice(0, 10);
  const time = new Date(writeDt).toISOString().slice(11, 16);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.user}>{userId}</Text>
        <Text style={styles.date}>{year + ' ' + time}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cn}>{cn}</Text>
      </View>
      <View style={styles.footer}>
        <AntDesign name='eyeo' size={24} color='black' />
        <Text style={styles.hit}> {hit} </Text>
        <EvilIcons name='comment' size={24} color='black' />
        <Text style={styles.comment}> {comment} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
  },
  user: {
    fontSize: 20,
    fontWeight: '500',
  },
  date: {
    fontSize: 18,
    color: 'grey',
  },
  content: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  cn: {
    marginTop: 5,
    fontSize: 20,
  },
  footer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  hit: {
    marginRight: 20,
  },
});
export default CommunityDetailBoard;
