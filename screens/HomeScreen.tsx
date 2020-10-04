import React, { createRef, useEffect, useState } from 'react';
import { Platform, StatusBar, StyleProp, StyleSheet, View } from 'react-native';
import {
  Appbar,
  Avatar,
  Caption,
  List,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { SwipeRow } from 'react-native-swipe-list-view';
import TimeAgo from 'react-native-timeago';
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons as MCIcon } from '@expo/vector-icons';
import ThemedScreen from '../components/ThemedScreen';
import { AppScreens } from '../constants';
import Fab from '../components/Fab';
import { useTheme, ThemeContextProps } from '../context/ThemeProvider';
import { useAuth } from '../context/AuthProvider';
import { useWish } from '../context/WishProvider';
import { useNetwork } from '../context/NetworkStatusProvider';

const useStyles = StyleSheet.create(
  ({ colors, customColors }: ThemeContextProps) => ({
    container: {
      flex: 1,
      alignItems: 'center',
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
      backgroundColor: customColors.success,
    },
    right: {
      flex: 1,
      backgroundColor: customColors.danger,
    },
    nav: {
      backgroundColor: colors.primary,
    },
    listItem: {
      backgroundColor: colors.surface,
    },
    listItemSection: {
      height: '100%',
      flex: 1,
    },
    listItemSectionIcon: {
      height: '100%',
      width: 75,
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftListItemSection: {
      backgroundColor: customColors.success,
      alignItems: 'flex-start',
    },
    rightListItemSection: {
      backgroundColor: customColors.danger,
      alignItems: 'flex-end',
    },
    listSection: {
      width: '100%',
      height: '100%',
    },
    emptyCaption: {
      fontSize: 20,
      marginBottom: 15,
    },
    emptyView: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    strikeThrough: {
      textDecorationLine: 'line-through',
    },
  })
);

const Nav: React.FC = () => {
  const theme = useTheme();

  const { handleToggleTheme, isDark } = theme;
  const styles = useStyles(theme);
  const { signOut, user } = useAuth();

  return (
    <Appbar.Header
      style={styles.nav}
      statusBarHeight={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
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
  const { callNetworkAction } = useNetwork();
  const { wishes, handleMarkWish, handleDeleteWish } = useWish();
  const theme = useTheme();

  const styles: StyleProp<any> = useStyles(theme);

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

  const handleActionTap = (id: string, action?: Function) =>
    callNetworkAction(() => {
      swipeRowRefs[id].current?.closeRow();
      if (action) action();
    })();

  return (
    <>
      <Nav />
      <ThemedScreen style={styles.container}>
        <Fab
          icon="add"
          onPress={callNetworkAction(() =>
            navigation.navigate(AppScreens.CREATE_WISH)
          )}
        />
        {wishes.length ? (
          <View style={styles.listSection}>
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
                      style={StyleSheet.flatten([
                        styles.listItemSection,
                        styles.leftListItemSection,
                      ])}
                    >
                      <TouchableRipple
                        onPress={() =>
                          handleActionTap(wish.id, () =>
                            handleMarkWish(wish.id, !wish.completed)
                          )
                        }
                      >
                        <View style={styles.listItemSectionIcon}>
                          <MCIcon
                            name={
                              wish.completed
                                ? 'check-circle'
                                : 'check-circle-outline'
                            }
                            size={25}
                            color="white"
                          />
                        </View>
                      </TouchableRipple>
                    </View>
                    <View
                      style={StyleSheet.flatten([
                        styles.listItemSection,
                        styles.rightListItemSection,
                      ])}
                    >
                      <TouchableRipple
                        onPress={() =>
                          handleActionTap(wish.id, () =>
                            handleDeleteWish(wish.id)
                          )
                        }
                      >
                        <View style={styles.listItemSectionIcon}>
                          <Icon name="delete" color="white" />
                        </View>
                      </TouchableRipple>
                    </View>
                  </View>
                  <List.Item
                    style={styles.listItem}
                    onPress={() =>
                      navigation.navigate(AppScreens.VIEW_EDIT_WISH, {
                        wishId: wish.id,
                      })
                    }
                    title={
                      <Text
                        style={wish.completed ? styles.strikeThrough : null}
                      >
                        {wish.name}
                      </Text>
                    }
                    description={
                      <TimeAgo
                        time={
                          wish.completed ? wish.completedAt : wish.createdAt
                        }
                      />
                    }
                    left={(props) => <List.Icon {...props} icon="star" />}
                  />
                </SwipeRow>
              ))}
            </List.Section>
          </View>
        ) : (
          <View style={styles.emptyView}>
            <Caption style={styles.emptyCaption}>
              Nothing yet. Add a wish!
            </Caption>
            <Icon name="star" color="grey" size={50} />
          </View>
        )}
      </ThemedScreen>
    </>
  );
};

export default HomeScreen;
