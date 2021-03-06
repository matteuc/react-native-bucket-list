import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import ThemedScreen from '../components/ThemedScreen';
import { WishForm } from '../constants';
import { useTheme } from '../context/ThemeProvider';
import { useWish } from '../context/WishProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    width: '100%',
    padding: '2%',
  },
  formField: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleFormField: {
    backgroundColor: 'transparent',
    fontSize: 30,
  },
  descriptionFormField: {
    backgroundColor: 'transparent',
    fontSize: 20,
  },
  button: {
    width: '100%',
  },
});

const CreateWishScreen: React.FC = () => {
  const initialForm = {
    name: '',
    description: '',
  };

  const [wish, setWish] = useState<WishForm>(initialForm);
  const [wishValid, setWishValid] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { handleCreateWish: createWish } = useWish();
  const navigation = useNavigation();
  const {
    customColors: { muted },
  } = useTheme();

  const handleCreateWish = async () => {
    setLoading(true);

    await createWish(wish);

    setLoading(false);

    navigation.goBack();
  };

  useEffect(() => {
    setWishValid(Boolean(wish.name.length && wish.description.length));
  }, [wish]);

  return (
    <>
      <ThemedScreen style={styles.container}>
        <ScrollView>
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
                onPress={handleCreateWish}
              >
                Create
              </Button>
            </View>
          </View>
        </ScrollView>
      </ThemedScreen>
    </>
  );
};

export default CreateWishScreen;
