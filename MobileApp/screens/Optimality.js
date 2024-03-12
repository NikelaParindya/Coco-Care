import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Vibration,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Galio components
import { Block, Text, theme, Button, Checkbox, Radio } from "galio-framework";
import { RadioButton, RadioButtonGroup } from "react-native-paper";

// Now UI themed components
import { nowTheme } from "../constants";
import { Icon, Input, Switch } from "../components";
import axios from "axios";
import * as Location from "expo-location";
import busfairs from "../constants/busfairs";
import Confirm from "./Confirm";
import { BACKEND_DOMAIN } from "../constants/config";
import { RadioGroup } from "react-native-radio-buttons-group";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

function Optimality({ route, navigation }) {
  const radioButtons = useMemo(
    () => [
      {
        id: "0", // acts as primary key, should be unique and non-empty string
        label: "Black Soil",
        value: "0",
      },
      {
        id: "1",
        label: "Yellow Soil",
        value: "1",
      },
      {
        id: "2",
        label: "Latarite Soil",
        value: "2",
      },
      {
        id: "3",
        label: "Peat Soil",
        value: "3",
      },
      {
        id: "4",
        label: "Cinder Soil",
        value: "4",
      },
    ],
    []
  );

  const [bug, setBug] = useState(0);
  const [N, setN] = useState(0);
  const [P, setP] = useState(0);
  const [K, setK] = useState(0);
  const [PH, setPH] = useState(0);

  const [selectedId, setSelectedId] = useState(0);
  const [primaryFocus, setPrimaryFocus] = useState(true);

  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [humidity, setHumidity] = useState("");

  const [modelshow, setModelshow] = useState(false);
  const [location, setLocation] = useState("");

  const setBugCount = (ckd) => {
    if (ckd) {
      setBug(bug + 1);
    } else {
      setBug(bug - 1);
    }
  };

  const npkset = () => {
    setSelectedId();
    calcNPK();
  };
  const calcNPK = () => {
    if (selectedId == "0") {
      setN(184);
      setP(27);
      setK(229);
      setPH(5.5);
    } else if (selectedId == "1") {
      setN(113);
      setP(40);
      setK(264);
      setPH(7.0);
    } else if (selectedId == "2") {
      setN(103);
      setP(13);
      setK(126);
      setPH(5.3);
    } else if (selectedId == "3") {
      setN(100);
      setP(10);
      setK(10);
      setPH(7.0);
    } else if (selectedId == "4") {
      setN(50);
      setP(100);
      setK(30);
      setPH(5.8);
    }
    console.log(N);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=a1c885abdacb4bbb92702244230309&q=${location.coords.latitude},${location.coords.longitude}aqi=no`
        )
        .then(async (res) => {
          setTemperature(res.data.current.temp_c);
          setRainfall(res.data.current.precip_mm);
          setHumidity(res.data.current.humidity);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  return (
    <Block flex center>
      <Confirm show={modelshow} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, width }}
      >
        <Block flex style={styles.group}>
          <View>
            <Text size={16} style={[styles.title, { marginTop: 50 }]}>
              Soil Type
            </Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={(val) => {
                setSelectedId(val);
                calcNPK();
              }}
              selectedId={selectedId}
            />
          </View>
          <Text size={16} style={styles.title}>
            Nutrient Content
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              type="number-pad"
              placeholder="N"
              value={JSON.stringify(N)}
              editable={false}
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
              shadowless
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              type="number-pad"
              placeholder="P"
              value={JSON.stringify(P)}
              editable={false}
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
              shadowless
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              type="number-pad"
              placeholder="K"
              value={JSON.stringify(K)}
              editable={false}
              shadowless
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              type="number-pad"
              placeholder="pH"
              value={JSON.stringify(PH)}
              editable={false}
              shadowless
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
            />
          </Block>

          <View
            style={{
              paddingHorizontal: 28,
              paddingTop: theme.SIZES.BASE,
              justifyContent: "center",
            }}
          >
            <Text>Latitude : {location?.coords?.latitude}</Text>
            <Text>Longitude : {location?.coords?.longitude}</Text>
          </View>

          <View>
            <Text size={16} style={[styles.title, { marginTop: 50 }]}>
              Temperature
            </Text>

            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                primary={primaryFocus}
                right
                editable={false}
                type="number-pad"
                value={`${JSON.stringify(temperature)}`}
                placeholder="Temperature"
                shadowless
                iconContent={
                  <Icon
                    size={11}
                    color={nowTheme.COLORS.ICON}
                    name="single"
                    family="NowExtra"
                  />
                }
              />
            </Block>
          </View>

          <View>
            <Text size={16} style={[styles.title, { marginTop: 50 }]}>
              Rainfall
            </Text>

            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                primary={primaryFocus}
                right
                editable={false}
                value={`${JSON.stringify(rainfall)}`}
                type="number-pad"
                placeholder="Rainfall"
                shadowless
                iconContent={
                  <Icon
                    size={11}
                    color={nowTheme.COLORS.ICON}
                    name="single"
                    family="NowExtra"
                  />
                }
              />
            </Block>
          </View>
          <View>
            <Text size={16} style={[styles.title, { marginTop: 50 }]}>
              Humidity
            </Text>

            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                primary={primaryFocus}
                right
                editable={false}
                type="number-pad"
                value={`${JSON.stringify(humidity)}`}
                placeholder="Humidity"
                shadowless
                iconContent={
                  <Icon
                    size={11}
                    color={nowTheme.COLORS.ICON}
                    name="single"
                    family="NowExtra"
                  />
                }
              />
            </Block>
          </View>

          <View
            style={{ alignItems: "center", marginTop: theme.SIZES.BASE * 5 }}
          >
            <Button
              color={nowTheme.COLORS.PRIMARY}
              onPress={() => {
                navigation.navigate("Registertwo", {
                  N: N,
                  P: P,
                  K: K,
                  PH: PH,
                  temperature: temperature,
                  rainfall: rainfall,
                  humidity: humidity,
                });
              }}
            >
              Predict
            </Button>
          </View>
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "montserrat-bold",
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 20,
    color: nowTheme.COLORS.HEADER,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
  },
  button: {
    width: theme.SIZES.BASE * 3,
    margin: 4,
  },
  textst: {
    fontWeight: "bold",
    marginTop: theme.SIZES.BASE * 2,
  },
});

export default Optimality;
