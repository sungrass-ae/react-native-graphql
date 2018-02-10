import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Platform
} from "react-native";
import { ApolloClient, createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";

export default class App extends React.Component {
  state = {
    username: ""
  };
  updateUsername = username => {
    this.setState({ username });
  };
  gotoUserDetails = () => {
    if (this.state.username && this.state.username.length > 0) {
      this.props.navigation.navigate("UserDetails", {
        username: this.state.username
      });
    }
  };
  static navigationOptions = {
    title: "GitHub"
  };
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("./img/cat.jpg")} style={styles.image} />
        <TextInput
          style={styles.input}
          placeholder="Enter your username here!"
          onChangeText={this.updateUsername}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.gotoUserDetails}
        >
          <Text style={styles.text}>Get Details</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 40,
    width: 175,
    marginTop: 20,
    borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
    borderColor: "rgb(140,209,234)"
  },
  button: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    backgroundColor: "rgb(140,209,234)"
  },
  text: { fontSize: 17, fontWeight: "400", color: "white" },
  image: { width: 300, height: 300 }
});
