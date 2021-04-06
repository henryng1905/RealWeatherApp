import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const Aboutus = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> About Us</Text>
      </View>
      <ScrollView>
        <Text  style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          hendrerit lobortis lacus a dictum. In feugiat interdum felis, vel
          hendrerit risus cursus ac. Quisque ac tincidunt sapien. Duis aliquam
          dui a leo rutrum, ac bibendum lacus ornare. Nunc sit amet pretium
          ligula. Proin sed semper turpis. Vivamus in luctus felis. Duis feugiat
          augue quam, ut scelerisque nisl scelerisque a. Nulla vitae sapien at
          sem lobortis dapibus non et sapien. Quisque erat est, luctus congue
          laoreet quis, convallis eu metus. Proin a felis et sapien porttitor
          faucibus id quis elit. Ut dui quam, consequat et magna tincidunt,
          pellentesque condimentum nibh. Duis tempor tempor dolor, at dictum
          turpis dictum id. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas. Suspendisse vel dui in
          turpis fermentum sagittis eu id purus. Nullam metus erat, hendrerit
          sed sapien pellentesque, aliquet posuere nunc. Duis eu sapien nec mi
          accumsan varius nec eget lacus. Morbi mollis consectetur condimentum.
          Quisque eget vulputate tellus. Proin nec maximus quam. Phasellus
          gravida nisl at erat sodales, non venenatis urna tempor. Mauris
          elementum ante odio, vel vehicula est dictum eu. Nulla mollis pretium
          porta. Fusce tortor tellus, ultrices eget nisi eu, vehicula
          ullamcorper enim. Nulla dolor diam, ornare ut mauris convallis,
          ultricies sollicitudin tortor. Sed quis orci lacus. Suspendisse id
          dolor dolor. Fusce facilisis tempus orci id ullamcorper. Sed convallis
          nulla vel justo maximus ornare ut quis justo. In tristique nibh
          imperdiet lacus mattis viverra. Aliquam finibus urna a commodo
          vehicula. Sed facilisis eros quam, nec iaculis nunc pulvinar vitae.
          Mauris a lacus ut augue maximus hendrerit. Duis faucibus ex diam, id
          elementum turpis aliquam eu. Fusce dapibus neque in interdum bibendum.
          Cras semper orci tincidunt nisl feugiat, eu semper mi auctor. Sed id
          condimentum dolor, eu mollis ex. Aliquam convallis diam sit amet
          lobortis lobortis. Quisque sed risus nisl. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed
          tortor mauris, pharetra eu lectus eget, finibus tincidunt turpis.
          Vestibulum pharetra neque quis felis semper lobortis. Quisque
          convallis velit sit amet ultrices mollis. Proin dignissim, massa eu
          mollis pellentesque, leo purus aliquam lorem, et malesuada erat felis
          sit amet tortor. Etiam sit amet diam dictum, imperdiet magna ultrices,
          vehicula sem. Nulla bibendum diam tortor. Sed dignissim gravida
          tempor. Vestibulum elementum rhoncus dolor sed tempor. Pellentesque
          nec pretium lectus, quis consequat erat. In vehicula, metus eget
          placerat commodo, justo erat condimentum tortor, et viverra felis nisl
          ac dolor. Proin ac ante ac neque suscipit pharetra in eu felis.
          Suspendisse volutpat dignissim gravida. Quisque accumsan eget metus
          euismod lacinia. Cras eu sem in turpis pellentesque tincidunt
          ullamcorper in augue. Ut in vehicula velit. Phasellus tempor bibendum
          imperdiet. Sed volutpat risus vitae nisl scelerisque ultrices.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Aboutus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 80,
    paddingTop: 40,
    backgroundColor: 'coral',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text:{
      
  }
});
