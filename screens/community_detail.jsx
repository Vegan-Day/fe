import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { URL } from '@env';
import axios from 'axios';
import CommunityDetailBoard from '../components/community_detail_board/community_detail_board';

const CommunityDetail = ({ route }) => {
  const [board, setBoard] = useState([]);

  const bid = route.params.bid;
  const onContent = async () => {
    try {
      const response = await axios.get(`${URL}/community/${bid}/board`);
      const data = response.data.data;
      setBoard(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onContent();
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
        <View>
          <CommunityDetailBoard board={board} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default CommunityDetail;
