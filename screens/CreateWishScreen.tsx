import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import ThemedScreen from '../components/ThemedScreen';
import { WishForm } from '../constants';

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
  button: {
    width: '100%',
  },
});

const CreateWishScreen: React.FC = () => {
  const [wish, setWish] = React.useState<WishForm>({
    name: '',
    description: '',
  });

  return (
    <>
      <ThemedScreen style={styles.container}>
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.formField}>
              <TextInput
                label="Name"
                placeholder="The name of my wish"
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
                label="Description"
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
              <Button mode="contained" style={styles.button} onPress={() => {}}>
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
