import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/redux/store';
import { fetchUsrsRequest } from 'app/redux/actions/userAction';
import UserCard from 'app/components/UserCard';
import { COLORS } from 'app/utils/color';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector(state => state?.users);
  const { users, loading, error, total } = usersList;
  const [page, setPage] = useState(1);


  useEffect(() => {
    dispatch(fetchUsrsRequest(page, 10)); // Fetch the initial page of users
  }, [dispatch, page]);

  const loadMoreUsers = useCallback(() => {
    const nextPage = page + 1;
    if (nextPage <= Math.ceil(total / 10)) {
      setPage(nextPage);
    }
  }, [page, users]);

  if (loading && page === 1) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}

        />
      </View>
    );
  }

  if (error && page === 1) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 15, color: COLORS.secondary }}> {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      horizontal={false}
      // showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item.id + '_' + index}
      numColumns={2}
      renderItem={({ item }) => <UserCard item={item} />}
      onEndReached={loadMoreUsers}
      onEndReachedThreshold={0.5} // Load more users when reaching 50% of the list
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;