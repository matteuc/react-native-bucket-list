import React, { createRef, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Appbar,
  Avatar,
  List,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { SwipeRow } from 'react-native-swipe-list-view';
import TimeAgo from 'react-native-timeago';
import { Icon } from 'react-native-elements';
import ThemedScreen from '../components/ThemedScreen';
import { AppScreens } from '../constants';
import Fab from '../components/Fab';
import { useTheme } from '../context/ThemeProvider';
import { useAuth } from '../context/AuthProvider';
import { useWish } from '../context/WishProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 15,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    backgroundColor: 'green',
  },
  right: {
    flex: 1,
    backgroundColor: 'red',
  },
});

const Nav: React.FC = () => {
  const {
    handleToggleTheme,
    colors: { primary },
    isDark,
  } = useTheme();
  const { signOut, user } = useAuth();

  return (
    <Appbar.Header
      style={{
        backgroundColor: primary,
      }}
    >
      <Avatar.Image
        source={{
          uri: user?.image,
        }}
        size={35}
      />
      <Appbar.Content
        title={user?.name}
        subtitle={user?.email}
        titleStyle={styles.title}
      />
      <Appbar.Action
        icon={isDark ? 'white-balance-sunny' : 'weather-night'}
        onPress={handleToggleTheme}
      />
      <Appbar.Action icon="exit-run" onPress={() => signOut()} />
    </Appbar.Header>
  );
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { wishes, handleMarkWish, handleDeleteWish } = useWish();
  const {
    colors: { surface },
  } = useTheme();

  type RefMap = {
    [id: string]: React.RefObject<SwipeRow<any>>;
  };

  const [swipeRowRefs, setSwipeRowRefs] = useState<RefMap>({});

  useEffect(() => {
    // add or remove refs
    setSwipeRowRefs((refMap) =>
      wishes.reduce<RefMap>(
        (prevMap, wish) => ({
          ...prevMap,
          [wish.id]: refMap[wish.id] || createRef(),
        }),
        {}
      )
    );
  }, [wishes]);

  const handleActionTap = (id: string, action?: Function) => {
    swipeRowRefs[id].current?.closeRow();
    if (action) action();
  };

  return (
    <>
      <Nav />
      <ThemedScreen style={styles.container}>
        <Fab
          icon="add"
          onPress={() => navigation.navigate(AppScreens.CREATE_WISH)}
        />
        <View style={{ width: '100%' }}>
          <List.Section>
            {wishes.map((wish) => (
              <SwipeRow
                ref={swipeRowRefs[wish.id]}
                key={`wish-${wish.name}`}
                leftOpenValue={75}
                rightOpenValue={-75}
                stopLeftSwipe={100}
                stopRightSwipe={-100}
              >
                <View style={styles.rowBack}>
                  <View
                    style={{
                      height: '100%',
                      flex: 1,
                      backgroundColor: 'green',
                      alignItems: 'flex-start',
                    }}
                  >
                    <TouchableRipple
                      onPress={() =>
                        handleActionTap(wish.id, () =>
                          handleMarkWish(wish.id, true)
                        )
                      }
                    >
                      <View
                        style={{
                          height: '100%',
                          width: 75,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon name="check" color="white" />
                      </View>
                    </TouchableRipple>
                  </View>
                  <View
                    style={{
                      height: '100%',
                      flex: 1,
                      backgroundColor: 'red',
                      alignItems: 'flex-end',
                    }}
                  >
                    <TouchableRipple
                      onPress={() =>
                        handleActionTap(wish.id, () =>
                          handleDeleteWish(wish.id)
                        )
                      }
                    >
                      <View
                        style={{
                          height: '100%',
                          width: 75,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon name="delete" color="white" />
                      </View>
                    </TouchableRipple>
                  </View>
                </View>
                <List.Item
                  style={{ backgroundColor: surface }}
                  onPress={() => {}}
                  title={
                    <Text
                      style={
                        wish.completed
                          ? {
                              textDecorationLine: 'line-through',
                              textDecorationStyle: 'solid',
                            }
                          : null
                      }
                    >
                      {wish.name}
                    </Text>
                  }
                  description={
                    <TimeAgo
                      time={wish.completed ? wish.completedAt : wish.createdAt}
                    />
                  }
                  left={(props) => <List.Icon {...props} icon="star" />}
                />
              </SwipeRow>
            ))}
          </List.Section>
        </View>
      </ThemedScreen>
    </>
  );
};

export default HomeScreen;
