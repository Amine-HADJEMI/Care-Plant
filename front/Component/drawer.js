import React, { useState } from 'react';
import { View, Text, TouchableOpacity, DrawerLayoutAndroid } from 'react-native';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const drawerContent = () => (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>Menu Item 1</Text>
      <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>Menu Item 2</Text>
      <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>Menu Item 3</Text>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      drawerWidth={250}
      drawerPosition={'left'}
      renderNavigationView={drawerContent}
      onDrawerOpen={toggleDrawer}
      onDrawerClose={toggleDrawer}
      drawerBackgroundColor="#ccc"
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Text>Open Drawer</Text>
        </TouchableOpacity>
        <Text>Main Content</Text>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default BurgerMenu;