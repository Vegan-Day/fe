import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../color';
import AutoHeightImage from 'react-native-auto-height-image';

const CommunityDetailBoard = ({ board }) => {
  const { userName, title, writeDt, cn, hit, comment, attachfile } = board[0];

  const date = moment(writeDt).format('YYYY/MM/DD HH:mm');
  const imagePath = attachfile === null ? null : attachfile['filepath'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name='leaf'
            size={36}
            color={theme.mainColor}
          />
        </View>
        <View style={styles.userDate}>
          <Text style={styles.user}>{userName}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cn}>{cn}</Text>
        <View style={styles.contentImage}>
          <AutoHeightImage
            width={250}
            source={{
              uri: `${imagePath}`,
            }}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Ionicons name='eye-outline' size={24} color='grey' />
        <Text style={styles.hit}> {hit} </Text>
        <Ionicons name='chatbox-outline' size={20} color='grey' />
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
    flexDirection: 'row',
    marginTop: 20,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 0.5,
    width: 50,
    height: 50,
    marginRight: 10,
  },
  user: {
    fontSize: 20,
    fontWeight: '500',
  },
  date: {
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
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  hit: {
    marginRight: 20,
  },
  contentImage: {
    padding: 0,
    marginTop: 20,
  },
});
export default CommunityDetailBoard;
