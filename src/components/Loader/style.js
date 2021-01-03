import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999
    },
    insideContainer: {
        width: 70,
        height: 70,
        borderRadius: 5,
        backgroundColor: "#fff"
    }
});

export default style;

