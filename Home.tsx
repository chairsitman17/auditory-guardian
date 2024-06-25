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
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

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

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

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
        style={{flex: 1, paddingBottom: 20, borderRadius: 30}}>
        <View style={{paddingBottom: 45}}>
          <Section style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={styles.titleNormalText}>안녕하세요!{"\n"}</Text>
            <Text style={styles.titleBoldText}>오늘도 건강한{"\n"}하루 되세요</Text>
          </Section>
        </View>

        <TouchableOpacity style={{width: 'calc(100% - 30)', borderRadius: 20, backgroundColor: '#8180F9', padding: 15, margin: 5}}
              marginVertical={7} marginHorizontal={15} onPress={() => navigation.navigate('EarTest')}
        >
          <Text style={styles.normalTextWhite} paddingVertical={3}>새로 시작하기</Text>
          <Text style={styles.largeTextWhiteBold} paddingVertical={7}>청력 검사를 시작해볼까요?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{width: '100% - 30', borderRadius: 20, backgroundColor: '#BFBEFF', padding: 15, margin: 5}}
                          marginVertical={7} marginHorizontal={15} onPress={() => navigation.navigate('AiChat')}>
          <Text style={styles.normalTextWhite} paddingVertical={3}>AI 상담</Text>
          <Text style={styles.largeTextWhiteBold} paddingVertical={7}>AI 상담을 이용해서 청력에 대한 인사이트를 얻어보세요!</Text>
        </TouchableOpacity>


      </ScrollView>

      {/*<View style={{backgroundColor: '#E5E4FF', height: 60, flexDirection: 'row', padding: 0, alignItems: 'flex-end', justifyContent: 'center'}}>*/}
      {/*  <Section style={{alignItems: 'space-between', margin: 'auto', }}>*/}
      {/*      <TouchableOpacity style={buttonStyle} onPress={() => navigation.navigate('Home')}>*/}
      {/*          <Text style={{color: 'white', fontSize: 17}}>홈</Text>*/}
      {/*      </TouchableOpacity>*/}

      {/*      <TouchableOpacity style={buttonStyle} onPress={() => navigation.navigate('AiChat')}>*/}
      {/*          <Text style={{color: 'white', fontSize: 17}}>AI 상담</Text>*/}
      {/*      </TouchableOpacity>*/}
      {/*  </Section>*/}
      {/*</View>*/}

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
});

export default HomeScreen;
