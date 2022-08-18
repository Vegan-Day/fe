import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { URL } from '@env';
import axios from 'axios';
import CommunityDetailBoard from '../components/community_detail_board/community_detail_board';
import CommunityDetailComment from '../components/community_detail_comment/community_detail_comment';
import { Feather } from '@expo/vector-icons';
import { theme } from '../color';

const CommunityDetail = ({ route }) => {
  const [board, setBoard] = useState([]);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const comment = {
    writeDt: new Date(),
    cid: Date.now(),
    cm: text,
    userId: 'test',
  };

  const bid = route.params.bid;
  const onBoard = async () => {
    try {
      const response = await axios.get(`${URL}/community/${bid}/board`);
      const data = response.data.data;
      setBoard(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onComment = async () => {
    try {
      const response = await axios.get(`${URL}/community/${bid}/comment`);
      const data = response.data.data;
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onWrite = async () => {
    try {
      const response = await axios.post(`${URL}/community/comment`, {
        bid: bid,
        cm: text,
        userId: 'test',
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = () => {
    if (text === '') {
      return;
    }

    const newComments = [...comments, comment];
    setComments(newComments);
    onWrite();
    setText('');
  };

  useEffect(() => {
    onBoard();
    onComment();
  }, []);

  return (
    <View style={styles.container}>
      {board.length === 0 ? (
        <View style={{ justifyContent: 'center' }}>
          <ActivityIndicator
            color='black'
            style={{ marginTop: 10 }}
            size='large'
          />
        </View>
      ) : (
        <View style={styles.main}>
          <CommunityDetailBoard board={board} />
          <ScrollView>
            {comments.map((comment) => (
              <CommunityDetailComment key={comment.cid} comment={comment} />
            ))}
          </ScrollView>
        </View>
      )}
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
          onSubmitEditing={onSubmit}
        />
        <View style={styles.send}>
          <TouchableOpacity onPress={onSubmit}>
            <Feather name='send' size={30} color={theme.mainColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    maxHeight: '85%',
  },
  input: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 18,
    width: 300,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    flexDirection: 'row',
  },
  send: {
    paddingHorizontal: 10,
  },
});
export default CommunityDetail;
