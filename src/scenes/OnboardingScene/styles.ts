import {Dimensions, StyleSheet} from 'react-native';
import colors from '@colors';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const isSmallScreen = screenHeight < 700;
const imageWidth = screenWidth * 0.92;
// preserve original 382:346 aspect ratio
const imageHeight = imageWidth * (346 / 382);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  skipText: {
    color: colors.white,
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  containerStyles: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainerStyles: {
    paddingBottom: 0,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
  },
  title: {
    marginTop: isSmallScreen ? 16 : 28,
    marginBottom: isSmallScreen ? 8 : 16,
    fontWeight: '700',
    fontSize: isSmallScreen ? 20 : 24,
    textAlign: 'center',
    color: colors.white,
    paddingHorizontal: 20,
  },
  description: {
    textAlign: 'center',
    color: colors.white,
    fontSize: isSmallScreen ? 13 : 14,
    lineHeight: isSmallScreen ? 20 : 22,
    paddingHorizontal: 24,
  },
  nextButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 7,
    height: 7,
    borderRadius: 8,
    backgroundColor: colors.gray['4'],
    marginRight: 7,
  },
  activeIndicator: {
    width: 19,
    backgroundColor: colors.white,
  },
  rightIcon: {
    width: 62,
    height: 62,
  },
});

export default styles;
