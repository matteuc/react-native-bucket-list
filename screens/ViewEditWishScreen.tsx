import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import {
  Button,
  Caption,
  IconButton,
  Snackbar,
  Text,
  TextInput,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import TimeAgo from 'react-native-timeago';
import ThemedScreen from '../components/ThemedScreen';
import { AppScreens, AppScreenParamList, WishForm } from '../constants';
import { useTheme } from '../context/ThemeProvider';
import { useWish } from '../context/WishProvider';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  root: {
    height: '100%',
    position: 'relative',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    width: '100%',
    height: '100%',
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
  titleFormField: {
    backgroundColor: 'transparent',
    fontSize: 30,
  },
  descriptionFormField: {
    backgroundColor: 'transparent',
    fontSize: 20,
  },
  titleSection: {
    fontSize: 30,
  },
  descriptionSection: {
    fontSize: 20,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
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
  const {
    customColors: { muted, secondaryAction },
  } = useTheme();

  const navigation = useNavigation();

  const {
    params: { wishId },
  } = useRoute<ViewEditWishScreenRouteProp>();

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackBarOpen] = useState(false);

  const handleUpdateWish = async () => {
    setLoading(true);

    await updateWish(wishId, wish);

    setLoading(false);

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

  function goBack() {
    if (!wishValid) {
      navigation.goBack();
    } else {
      setSnackBarOpen(true);
    }

    return true;
  }

  useEffect(() => {
    function handleBackButtonClick() {
      if (!wishValid) {
        navigation.goBack();
      } else {
        setSnackBarOpen(true);
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

  useEffect(() => {
    setSnackBarOpen(false);
  }, [wish]);

  return (
    <ThemedScreen style={styles.root}>
      <Snackbar
        visible={snackbarOpen}
        onDismiss={() => {}}
        action={{
          label: 'Yes',
          onPress: () => {
            navigation.goBack();
          },
        }}
      >
        Leave with unsaved changes?
      </Snackbar>

      <View style={styles.form}>
        <View style={styles.formField}>
          <TextInput
            placeholder="Title"
            underlineColor="transparent"
            underlineColorAndroid="transparent"
            style={styles.titleFormField}
            theme={{
              colors: {
                primary: muted,
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
            style={styles.descriptionFormField}
            theme={{
              colors: {
                primary: muted,
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
            disabled={!wishValid || loading}
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
            color={secondaryAction}
            style={styles.button}
            onPress={goBack}
          >
            Cancel
          </Button>
        </View>
      </View>
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

  const {
    customColors: { success, secondaryAction },
  } = useTheme();

  return (
    <ThemedScreen style={styles.root}>
      <>
        <View style={styles.row}>
          <TouchableRipple
            style={styles.flex}
            onPress={() => {}}
            onLongPress={() => navigation.navigate(ViewEditScreens.EDIT)}
          >
            <View style={styles.textField}>
              <Title
                numberOfLines={1}
                style={StyleSheet.flatten([
                  styles.titleSection,
                  wishCompleted ? styles.strikeThrough : {},
                ])}
              >
                {wish?.name}
              </Title>
            </View>
          </TouchableRipple>
          <IconButton
            onPress={handleCompleteWish}
            color={wishCompleted ? success : secondaryAction}
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
            <Text style={styles.descriptionSection}>{wish?.description}</Text>
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
