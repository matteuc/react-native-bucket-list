import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, BackHandler, ScrollView } from 'react-native';
import {
  Button,
  Caption,
  IconButton,
  Text,
  TextInput,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import TimeAgo from 'react-native-timeago';
import ThemedScreen from '../components/ThemedScreen';
import { AppScreens, AppScreenParamList, WishForm } from '../constants';
import { useWish } from '../context/WishProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    width: '100%',
  },
  formField: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  textField: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  captionField: {
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 10,
  },
  button: {
    width: '100%',
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});

enum ViewEditScreens {
  VIEW = 'View',
  EDIT = 'Edit',
}

type ScreenInfo = {
  name: ViewEditScreens;
  component: () => JSX.Element;
  showHeader: boolean;
};

type ViewEditWishScreenRouteProp = RouteProp<
  AppScreenParamList,
  AppScreens.VIEW_EDIT_WISH
>;

const EditWishScreen: React.FC = () => {
  const initialForm = {
    name: '',
    description: '',
  };

  const [initialWish, setInitialWish] = useState<WishForm>(initialForm);
  const [wish, setWish] = useState<WishForm>(initialForm);

  const [wishValid, setWishValid] = useState<boolean>(false);

  const { handleUpdateWish: updateWish, getWish } = useWish();
  const navigation = useNavigation();
  const {
    params: { wishId },
  } = useRoute<ViewEditWishScreenRouteProp>();

  const handleUpdateWish = async () => {
    await updateWish(wishId, wish);

    navigation.goBack();
  };

  useEffect(() => {
    setWishValid(
      !(
        wish.name === initialWish.name &&
        wish.description === initialWish.description
      )
    );
  }, [wish, initialWish]);

  useEffect(() => {
    const thisWish = getWish(wishId);

    if (!thisWish) return;

    const thisWishForm = {
      name: thisWish.name,
      description: thisWish.description,
    };

    setWish(thisWishForm);

    setInitialWish(thisWishForm);
  }, [wishId, getWish]);

  useEffect(() => {
    function handleBackButtonClick() {
      if (!wishValid) {
        navigation.goBack();
      } else {
        console.log('SHOW UNSAVED CHANGES');
      }

      return true;
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick
      );
    };
  }, [wish, navigation, wishValid]);

  return (
    <ThemedScreen style={{ height: '100%' }}>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formField}>
            <TextInput
              placeholder="Title"
              underlineColor="transparent"
              underlineColorAndroid="transparent"
              style={{ backgroundColor: 'transparent', fontSize: 30 }}
              theme={{
                colors: {
                  primary: '#C0C0C0',
                },
              }}
              value={wish.name}
              onChangeText={(name) =>
                setWish({
                  ...wish,
                  name,
                })
              }
            />
          </View>
          <View style={styles.formField}>
            <TextInput
              placeholder="I want to..."
              multiline
              underlineColor="transparent"
              underlineColorAndroid="transparent"
              style={{ backgroundColor: 'transparent', fontSize: 20 }}
              theme={{
                colors: {
                  primary: '#C0C0C0',
                },
              }}
              value={wish.description}
              onChangeText={(description) =>
                setWish({
                  ...wish,
                  description,
                })
              }
            />
          </View>
          <View style={styles.formField}>
            <Button
              disabled={!wishValid}
              mode="contained"
              style={styles.button}
              onPress={handleUpdateWish}
            >
              Update
            </Button>
          </View>
          <View style={styles.formField}>
            <Button
              mode="contained"
              color="#CDCDCD"
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              Cancel
            </Button>
          </View>
        </View>
      </ScrollView>
    </ThemedScreen>
  );
};

const ViewWishScreen: React.FC = () => {
  const navigation = useNavigation();
  const { handleMarkWish, getWish } = useWish();
  const {
    params: { wishId },
  } = useRoute<ViewEditWishScreenRouteProp>();
  const [wishCompleted, setWishCompleted] = useState(
    getWish(wishId)?.completed
  );

  const wish = getWish(wishId);

  const handleCompleteWish = async () => {
    setWishCompleted(!wishCompleted);
    await handleMarkWish(wishId, !wishCompleted);
  };

  return (
    <ThemedScreen style={{ height: '100%' }}>
      <>
        <View style={styles.row}>
          <TouchableRipple
            style={{ flex: 1 }}
            onPress={() => {}}
            onLongPress={() => navigation.navigate(ViewEditScreens.EDIT)}
          >
            <View style={styles.textField}>
              <Title
                numberOfLines={1}
                style={{
                  fontSize: 30,
                  textDecorationLine: wishCompleted ? 'line-through' : 'none',
                }}
              >
                {wish?.name}
              </Title>
            </View>
          </TouchableRipple>
          <IconButton
            onPress={handleCompleteWish}
            color={wishCompleted ? 'green' : '#CDCDCD'}
            icon="check-circle"
          />
        </View>

        <View style={styles.captionField}>
          <Caption>
            {wishCompleted ? 'Completed' : 'Created'}{' '}
            {wish ? (
              <TimeAgo
                time={wishCompleted ? wish.completedAt : wish.createdAt}
              />
            ) : (
              ''
            )}
          </Caption>
        </View>

        <TouchableRipple
          onPress={() => {}}
          onLongPress={() => navigation.navigate(ViewEditScreens.EDIT)}
        >
          <View style={styles.textField}>
            <Text style={{ fontSize: 20 }}>{wish?.description}</Text>
          </View>
        </TouchableRipple>
      </>
    </ThemedScreen>
  );
};

const viewEditScreens = [
  {
    name: ViewEditScreens.VIEW,
    component: ViewWishScreen,
    showHeader: false,
  },
  {
    name: ViewEditScreens.EDIT,
    component: EditWishScreen,
    showHeader: false,
  },
] as Array<ScreenInfo>;

const ViewEditStack = createStackNavigator();

const ViewEditWishScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    params: { wishId },
  } = useRoute<ViewEditWishScreenRouteProp>();

  useEffect(() => {
    function handleBackButtonClick() {
      navigation.goBack();
      return true;
    }
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick
      );
    };
  }, [navigation]);

  return (
    <>
      <ThemedScreen style={styles.container}>
        <NavigationContainer independent>
          <ViewEditStack.Navigator initialRouteName={ViewEditScreens.VIEW}>
            {viewEditScreens.map(({ name, component, showHeader }) => (
              <ViewEditStack.Screen
                options={{
                  headerShown: showHeader,
                }}
                key={`screen-${name}`}
                name={name}
                component={component}
                initialParams={{ wishId }}
              />
            ))}
          </ViewEditStack.Navigator>
        </NavigationContainer>
      </ThemedScreen>
    </>
  );
};

export default ViewEditWishScreen;
