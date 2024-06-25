/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import type {PropsWithChildren} from 'react';
import { Audio } from 'expo-av';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Sound from 'react-native-sound';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



type EarTestProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const EarTestScreen: React.FC<EarTestProps> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [leftEar, setLeftEar] = React.useState<any>([]);
  const [rightEar, setRightEar] = React.useState<any>([]);
  const [isLeft, setIsLeft] = React.useState<boolean>(true);
  const [dbList, setDbList] = React.useState<any>([20,30,28,45,50,45]);
  const [stepsHz, setStepsHz] = React.useState<any>([250, 500, 1000, 2000, 4000, 8000]);
  const [weight, setWeight] = React.useState<any>([100, 70, 60, 40, 20, 10]);
  const [score, setScore] = React.useState<number>(100);
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [earData, setEarData] = React.useState<any>([{
    labels: ["250Hz", "500Hz", "1000Hz", "2000Hz", "4000Hz", "8000Hz"],
    datasets: [
      {
        data: [0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      },
      {
          data: [0],
          color: (opacity = 1) => `rgba(134, 60, 200, ${opacity})`, // optional
          strokeWidth: 2 // optional
      }
    ],
    legend: ["순음 테스트 결과"] // optional
  }]);

  const screenWidth = Dimensions.get("window").width;

  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  React.useEffect(() => {
      Sound.setCategory('Playback');
      return () => {
      };
    }, []);

    const playSound = (hz: string) => {
        const sound = new Sound(`eartest${hz}hz.mp3`, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
            sound.play((success) => {
                if (success) {
                    console.log('Successfully finished playing');
                } else {
                    console.log('Playback failed due to audio decoding errors');
                }
                sound.release();
            });
        });
    };

    const markChart = (isLeft: boolean, dbNum: number) => {
        if (isLeft) {
            if (dbNum === 0) {
                setScore((prevState:number) => prevState - weight[currentStep]);
            }
            setLeftEar([...leftEar, dbNum]);
            setEarData([{
                labels: ["250Hz", "500Hz", "1000Hz", "2000Hz", "4000Hz", "8000Hz"],
                datasets: [
                    {
                        data: [...leftEar, dbNum],
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    },
                    {
                        data: rightEar,
                        color: (opacity = 1) => `rgba(100, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    }
                ],
                legend: ["순음 테스트 결과"] // optional
            }])
        } else {
            if (dbNum === 0) {
                setScore((prevState:number) => prevState - weight[currentStep]);
            }
            setRightEar([...rightEar, dbNum]);
            setEarData([{
                labels: ["250Hz", "500Hz", "1000Hz", "2000Hz", "4000Hz", "8000Hz"],
                datasets: [
                    {
                        data: leftEar,
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    },
                    {
                        data: [...rightEar, dbNum],
                        color: (opacity = 1) => `rgba(100, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    }
                ],
                legend: ["순음 테스트 결과"] // optional
            }])
        }
    }

    const goNextStep = () => {
        if (isLeft) {
            setIsLeft(false);
        } else {
            setIsLeft(true);
            setCurrentStep((prevState: number) => prevState + 1);
        }
    }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };
  const buttonStyle = {
    display: 'flex', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 100,
    justifyContent: 'center', backgroundColor: '#8180F9', color: '#ffffff',
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{flex: 1, paddingBottom: 20, borderRadius: 30, width: '100%'}}>

        <LineChart
            data={earData[0]}
            width={screenWidth}
            height={256}
            verticalLabelRotation={30}
            chartConfig={{
                backgroundColor: "#d5c7c2",
                backgroundGradientFrom: "#d5c7c2",
                backgroundGradientTo: "#d5c7c2",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#000000"
                }
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
        />

          {
              currentStep === 6 ?
                  <View style={{width: '250', height: 250, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        marginVertical={7} marginHorizontal={15}>
                      <Text style={styles.normalText} paddingVertical={3}>테스트 완료</Text>
                      <Text style={styles.titleCenteredBoldText} paddingVertical={7}>
                          {score === 100 && "정상 청력"}
                          {score < 100 && score >= 80 && "가벼운 청력 손실"}
                          {score < 80 && score >= 50 && "보통 청력 손실"}
                          {score < 50 && score >= 30 && "심한 청력 손실"}
                          {score < 30 && "귀가 먹음"}
                      </Text>
                      <Text style={styles.normalCenteredText} paddingVertical={3} marginVertical={10}>
                          {score === 100 && "모든 순음이 들리며, 청력에 이상이 없습니다."}
                          {score < 100 && score >= 80 && "일부 순음이 들리지 않는 것으로 보입니다. 일상 생활에는 지장이 없지만 병원을 방문하십시오."}
                          {score < 80 && score >= 50 && "일상 생활에 지장이 있는 수준입니다. 빠른 시일 내에 병원을 방문하세요."}
                          {score < 50 && score >= 30 && "들려야 할 순음이 들리지 않으며, 일상 생활이 거의 불가능한 수준입니다. 빠른 시일 내에 병원을 방문하세요."}
                          {score < 30 && "일상 생활이 불가능한 수준입니다. 병원을 방문하세요."}
                      </Text>
                      <TouchableOpacity style={buttonStyle} onPress={() => navigation.navigate('Home')}>
                          <Text style={{color: 'white', fontSize: 17}}>홈으로 돌아가기</Text>
                      </TouchableOpacity>
                  </View>
                  :
                  <>
                      <View style={{width: '250', height: 150, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                            marginVertical={7} marginHorizontal={15}>
                          <Text style={styles.normalText} paddingVertical={3}>{stepsHz[currentStep]}Hz 테스트 중 - {currentStep+1} / {stepsHz.length}</Text>
                          <Text style={styles.titleCenteredBoldText} paddingVertical={7}>{isLeft ? "왼쪽" : "오른쪽"} 귀에 주목하세요</Text>
                          <TouchableOpacity style={buttonStyle} onPress={() => playSound(stepsHz[currentStep])}>
                              <Text style={{color: 'white', fontSize: 17}}>재생</Text>
                          </TouchableOpacity>
                      </View>

                      <View style={{flexDirection: 'column', padding: 0, alignItems: 'center', justifyContent: 'center', gap: 5}}>
                          <TouchableOpacity style={buttonStyle} onPress={() => {
                              markChart(isLeft, dbList[currentStep]);
                              goNextStep();
                          }}>
                              <Text style={{color: 'white', fontSize: 17}}>
                                  들려요
                              </Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={buttonStyle} onPress={() => {
                              markChart(isLeft, 0);
                              goNextStep();
                          }}>
                              <Text style={{color: 'white', fontSize: 17}}
                              >
                                  들리지 않아요
                              </Text>
                          </TouchableOpacity>
                      </View>
                  </>
          }


      </ScrollView>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  normalText: {
    fontSize: 16, // 텍스트 크기를 16으로 설정
    fontWeight: 'normal', // 일반 굵기 설정
  },
    normalCenteredText: {
        textAlign: 'center',
        fontSize: 16, // 텍스트 크기를 16으로 설정
        fontWeight: 'normal', // 일반 굵기 설정
    },
  boldText: {
    fontSize: 16, // 텍스트 크기를 16으로 설정
    fontWeight: 'bold', // 굵은 텍스트 설정
  },
  largeText: {
    fontSize: 24, // 텍스트 크기를 24로 설정
    fontWeight: 'normal', // 일반 굵기 설정
  },

  normalTextWhite: {
      fontSize: 16, // 텍스트 크기를 16으로 설정
      fontWeight: 'normal', // 일반 굵기 설정
      color: '#ffffff'
    },
    boldTextWhite: {
      fontSize: 16, // 텍스트 크기를 16으로 설정
      fontWeight: 'bold', // 굵은 텍스트 설정
      color: '#ffffff'
    },
    largeTextWhite: {
      fontSize: 22, // 텍스트 크기를 24로 설정
      fontWeight: 'normal', // 일반 굵기 설정
      color: '#ffffff'
    },
    largeTextWhiteBold: {
          fontSize: 22, // 텍스트 크기를 24로 설정
          fontWeight: 'bold', // 일반 굵기 설정
          color: '#ffffff'
        },

  titleNormalText: {
    fontSize: 30, // 텍스트 크기를 16으로 설정
    fontWeight: 'light', // 일반 굵기 설정
  },
  titleBoldText: {
    fontSize: 30, // 텍스트 크기를 16으로 설정
    fontWeight: 'bold', // 굵은 텍스트 설정
  },
  titleCenteredNormalText: {
      fontSize: 30, // 텍스트 크기를 16으로 설정
      fontWeight: 'light', // 일반 굵기 설정
      textAlign: 'center'
  },
  titleCenteredBoldText: {
    fontSize: 30, // 텍스트 크기를 16으로 설정
    fontWeight: 'bold', // 굵은 텍스트 설정
    textAlign: 'center',
    width: '100%'
  },
});

export default EarTestScreen;
