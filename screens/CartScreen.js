import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen({ navigation, cart, removeFromCart }) {
  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const deliveryFee = 2.99;
  const tax = calculateSubtotal() * 0.08;
  const total = calculateSubtotal() + deliveryFee + tax;

  const getOptionLabel = (item) => {
    const labels = [];
    if (item.product.options && item.product.options.length > 0) {
      item.product.options.forEach(option => {
        const selectedChoiceId = item.selectedOptions[option.id];
        const choice = option.choices.find(c => c.id === selectedChoiceId);
        if (choice) {
          labels.push(choice.name);
        }
      });
    }
    return labels.length > 0 ? labels.join(' • ') : '';
  };

  const getAddonsLabel = (item) => {
    if (!item.product.addons || item.selectedAddons.length === 0) {
      return '';
    }
    const addons = item.selectedAddons.map(addonId => {
      const addon = item.product.addons.find(a => a.id === addonId);
      return addon ? addon.name : '';
    }).filter(Boolean);
    return addons.length > 0 ? '+ ' + addons.join(', ') : '';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={{ width: 30 }} />
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {cart.map((item) => (
              <View key={item.cartId} style={styles.cartItem}>
                <Image source={{ uri: item.product.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.product.name}</Text>
                  {getOptionLabel(item) !== '' && (
                    <Text style={styles.itemOptions} numberOfLines={1}>{getOptionLabel(item)}</Text>
                  )}
                  {getAddonsLabel(item) !== '' && (
                    <Text style={styles.itemAddons} numberOfLines={2}>{getAddonsLabel(item)}</Text>
                  )}
                  <View style={styles.itemFooter}>
                    <View style={styles.quantityBadge}>
                      <Text style={styles.itemQuantity}>×{item.quantity}</Text>
                    </View>
                    <Text style={styles.itemPrice}>$ {item.totalPrice.toFixed(2)}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.cartId)}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>$ {calculateSubtotal().toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>$ {deliveryFee.toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax (8%)</Text>
                <Text style={styles.summaryValue}>$ {tax.toFixed(2)}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>$ {total.toFixed(2)}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    fontSize: 28,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 100,
    marginBottom: 20,
    opacity: 0.3,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 28,
    fontWeight: '500',
  },
  shopButton: {
    backgroundColor: '#7CB342',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#7CB342',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 2,
    position: 'relative',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 14,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
  },
  itemOptions: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  },
  itemAddons: {
    fontSize: 12,
    color: '#7CB342',
    marginBottom: 8,
    fontWeight: '500',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityBadge: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7CB342',
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 18,
    color: '#f44336',
    fontWeight: '600',
  },
  summarySection: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#666',
  },
  summaryValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#7CB342',
  },
  footer: {
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
  checkoutButton: {
    backgroundColor: '#7CB342',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#7CB342',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
