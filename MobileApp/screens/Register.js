import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Block,
  Checkbox,
  Text,
  Button as GaButton,
  theme,
  Toast,
} from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, nowTheme } from "../constants";
import axios from "axios";

const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function Register({ route, navigation }) {
  const [predict, setPredict] = useState(0);

  const { N, P, K, PH, temperature, rainfall, bug, productivity } =
    route.params;

  useEffect(() => {
    let data = {
      n: [N],
      p: [P],
      k: [K],
      temperature: [temperature],
      ph: [PH],
      rainfall: [rainfall],
      bug: [bug],
      productivity: [productivity],
    };
    console.log(data);
    axios
      .post("http://172.28.17.166:5000/getPredictionOutput", data)
      .then((res) => setPredict(res.data.predict[0][0]))
      .catch((e) => console.log(e));
  }, []);

  return (
    <DismissKeyboard>
      <Block flex middle>
        <ImageBackground
          source={Images.Pro}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}
        >
          <Block flex={1} middle>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.2} middle>
                  <Block middle>
                    <Text
                      style={{
                        fontFamily: "montserrat-regular",
                        textAlign: "center",
                      }}
                      color="#333"
                      size={24}
                    >
                      Predicted Growth
                    </Text>
                  </Block>
                </Block>

                <Block flex={0.5} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Text style={{ alignSelf: "center", fontSize: 50 }}>
                          {predict.toFixed(2)}%{" "}
                        </Text>
                      </Block>
                      <Block center flex={0.2}>
                        <Button
                          color="primary"
                          round
                          style={styles.createButton}
                          onPress={() =>
                            navigation.navigate("GrowthPrediction")
                          }
                        >
                          <Text
                            style={{ fontFamily: "montserrat-bold" }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Go Again
                          </Text>
                        </Button>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.5 : height * 0.4,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 21.5,
  },
  createButton: {
    width: width * 0.5,
    marginBottom: 40,
  },
});

export default Register;
