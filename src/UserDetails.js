import gql from "graphql-tag";
import { graphql } from "react-apollo";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView
} from "react-native";

const UserDetailsQuery = gql`
  query($login: String!) {
    user(login: $login) {
      avatarUrl
      bio
      name
      repositories(last: 20) {
        edges {
          node {
            id
            name
            primaryLanguage {
              name
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

class UserDetails extends React.Component {
  static navigationOptions = {
    title: "User Details"
  };
  render() {
    console.log(this.props);
    const { loading, user } = this.props.data;
    return (
      <View style={styles.container}>
        {loading === true && (
          <ActivityIndicator size="large" color="rgb(140,209,234)" />
        )}
        {user && (
          <View style={styles.container}>
            <Text style={styles.text}>{user.name}</Text>
            <Image style={styles.image} source={{ uri: user.avatarUrl }} />
            <ScrollView style={styles.scrollview}>
              {user.repositories.edges.map((repo, index) => (
                <View style={styles.repo} key={index}>
                  <Text style={styles.repono}>{index + 1}</Text>
                  <Text style={styles.reponame}>{repo.node.name}</Text>
                  <Text style={styles.repostar}>
                    {repo.node.stargazers.totalCount}
                  </Text>
                  <Text style={styles.repolanguage}>
                    {repo.node.primaryLanguage
                      ? repo.node.primaryLanguage.name
                      : ""}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
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
  text: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgb(140,209,234)",
    marginTop: 15,
    marginBottom: 15
  },
  image: {
    width: 200,
    height: 200,
    borderWidth: 10,
    borderColor: "rgb(140,209,234)",
    borderRadius: 3,
    marginBottom: 25
  },
  scrollview: { width: 300 },
  repo: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 15
  },
  repono: {
    fontSize: 15,
    fontWeight: "400",
    width: 30,
    color: "#54a3ff"
  },
  reponame: {
    fontSize: 15,
    fontWeight: "400",
    width: 125,
    color: "#54a3ff"
  },
  repostar: {
    fontSize: 15,
    fontWeight: "400",
    width: 50,
    color: "#54a3ff"
  },
  repolanguage: {
    fontSize: 15,
    fontWeight: "400",
    width: 75,
    color: "#54a3ff"
  }
});

export default (UserDetailsMapped = graphql(UserDetailsQuery, {
  options: props => ({
    variables: { login: props.navigation.state.params.username }
  })
})(UserDetails));
