import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from "react-native";
import { ApolloClient, createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { StackNavigator } from "react-navigation";
import Config from "./config";

import UserDetails from "./src/UserDetails";
import Home from "./src/Home";

const RootStack = StackNavigator(
  {
    Home: { screen: Home },
    UserDetails: { screen: UserDetails }
  },
  { initialRouteName: "Home" }
);

const networkInterface = createNetworkInterface({
  uri: "https://api.github.com/graphql"
});
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers.authorization = `Bearer ${Config.GITHUB_TOKEN}`;
      next();
    }
  }
]);
const client = new ApolloClient({
  networkInterface
});

export default (ApolloApp = () => (
  <ApolloProvider client={client}>
    <RootStack />
  </ApolloProvider>
));
