import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseIcon, MinusIcon, PlusIcon } from '../components/Icons';

export default function OrderScreen({ route, navigation, addToCart }) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const defaultOptions = {};
    if (product.options && product.options.length > 0) {
      product.options.forEach(option => {
        if (option.choices && option.choices.length > 0) {
          defaultOptions[option.id] = option.choices[0].id;
        }
      });
    }
    setSelectedOptions(defaultOptions);
  }, [product]);

  useEffect(() => {
    calculateTotal();
  }, [selectedOptions, selectedAddons, quantity]);

  const calculateTotal = () => {
    let price = 0;

    if (product.options && product.options.length > 0) {
      product.options.forEach(option => {
        const selectedChoiceId = selectedOptions[option.id];
        const choice = option.choices.find(c => c.id === selectedChoiceId);
        if (choice) {
          if (option.id === 'size') {
            price = choice.price;
          } else {
            price += choice.price;
          }
        }
      });
    }

    if (product.addons && selectedAddons.length > 0) {
      selectedAddons.forEach(addonId => {
        const addon = product.addons.find(a => a.id === addonId);
        if (addon) {
          price += addon.price;
        }
      });
    }

    setTotalPrice(price * quantity);
  };

  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleAddToCart = () => {
    const orderItem = {
      product,
      quantity,
      selectedOptions,
      selectedAddons,
      totalPrice,
    };
    addToCart(orderItem);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <CloseIcon size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        {product.options && product.options.map(option => (
          <View key={option.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{option.name}</Text>
            {option.choices && option.choices.map(choice => (
              <TouchableOpacity
                key={choice.id}
                style={styles.optionRow}
                onPress={() => setSelectedOptions({ ...selectedOptions, [option.id]: choice.id })}
                activeOpacity={0.7}
              >
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radio,
                    selectedOptions[option.id] === choice.id && styles.radioSelected
                  ]}>
                    {selectedOptions[option.id] === choice.id && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.optionText}>{choice.name}</Text>
                </View>
                <Text style={styles.optionPrice}>$ {choice.price.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {product.addons && product.addons.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Add Ons</Text>
            {product.addons.map(addon => (
              <TouchableOpacity
                key={addon.id}
                style={styles.optionRow}
                onPress={() => toggleAddon(addon.id)}
                activeOpacity={0.7}
              >
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.checkbox,
                    selectedAddons.includes(addon.id) && styles.checkboxSelected
                  ]}>
                    {selectedAddons.includes(addon.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.optionText}>{addon.name}</Text>
                </View>
                <Text style={styles.optionPrice}>$ {addon.price.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.quantitySection}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            activeOpacity={0.7}
          >
            <MinusIcon size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
            activeOpacity={0.7}
          >
            <PlusIcon size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart} activeOpacity={0.8}>
          <Text style={styles.addButtonText}>Add ($ {totalPrice.toFixed(2)})</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    height: 280,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 24,
  },
  section: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#7CB342',
    borderWidth: 2,
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#7CB342',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#7CB342',
    borderColor: '#7CB342',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  optionPrice: {
    fontSize: 15,
    color: '#7CB342',
    fontWeight: '700',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#424242',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 16,
    minWidth: 30,
    textAlign: 'center',
    color: '#333',
  },
  bottomSpacing: {
    height: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#7CB342',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#7CB342',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
