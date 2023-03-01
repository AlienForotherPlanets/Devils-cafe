import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

export default (HomePreview = ({item, imageKey, onPress, active, local}) => {
  
  const WindowSize = Dimensions.get('window').width*0.95; 

  return (
    <TouchableOpacity
        style={[styles.ImageContainer]}
        onPress={() => onPress(item)}>
    
        <View style={[styles.ImagePressableLayout]}>
    
            <Image
                style={[styles.ProductImage, active ? {} : {height: 165, width:WindowSize}]}
                source={{uri: item[imageKey]}}
            />
    
        </View>
  
    </TouchableOpacity>
  );

});

const styles = StyleSheet.create({
    ImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: "auto",
        marginRight: "auto"
    },

    ImagePressableLayout: {
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: "auto",
        marginRight: "auto", 
        width: '100%'
    },

    ProductImage: {
        height: 165,
        borderRadius: 8,
        borderTopRightRadius: 8 , 
        resizeMode: 'contain',
        marginLeft: "auto", 
        marginRight:"auto"
  },
  
});