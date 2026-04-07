import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PizzaLogo from '../components/PizzaLogo';
import { SearchIcon, InfoIcon, StoreIcon, CartIcon, OrdersIcon, UserIcon, ClockIcon, ShoppingBagIcon, StarIcon, BackIcon } from '../components/Icons';
import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';

export default function HomeScreen({ navigation, cart }) {
  const [selectedCategory, setSelectedCategory] = useState('1');

  const filteredProducts = productsData.filter(
    product => product.categoryId === selectedCategory
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity>
          <BackIcon size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <SearchIcon size={22} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <InfoIcon size={22} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.restaurantCard}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200' }} 
            style={styles.logoImage}
          />
        </View>
        <View style={styles.restaurantInfo}>
          <View style={styles.categoryBadges}>
            <Text style={styles.categoryBadge}>Pizza</Text>
            <Text style={styles.categoryBadgeDot}>•</Text>
            <Text style={styles.categoryBadge}>Pasta</Text>
            <Text style={styles.categoryBadgeDot}>•</Text>
            <Text style={styles.categoryBadge}>Burgers</Text>
          </View>
          <Text style={styles.restaurantName}>Pizza$O</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starsRow}>
              <StarIcon size={16} color="#FFC107" filled />
              <StarIcon size={16} color="#FFC107" filled />
              <StarIcon size={16} color="#FFC107" filled />
              <StarIcon size={16} color="#FFC107" filled />
              <StarIcon size={16} color="#FFC107" filled />
            </View>
            <Text style={styles.reviewCount}>358</Text>
          </View>
          <View style={styles.statusRow}>
            <View style={styles.openBadge}>
              <ShoppingBagIcon size={16} color="#fff" />
              <Text style={styles.openText}>Open</Text>
            </View>
            <View style={styles.timeBadge}>
              <ClockIcon size={16} color="#fff" />
              <Text style={styles.timeText}>25 Mins</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.categoryScrollContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryScrollContent}
        >
          {categoriesData.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                selectedCategory === category.id && styles.categoryTabActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.productsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {filteredProducts.map(product => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => navigation.navigate('Order', { product })}
              activeOpacity={0.7}
            >
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.productPrice}>$ {product.basePrice.toFixed(2)}</Text>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => navigation.navigate('Order', { product })}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <StoreIcon size={24} color="#7CB342" />
          <Text style={styles.navTextActive}>Stores</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Cart')}
        >
          <View style={styles.navIconContainer}>
            <CartIcon size={24} color="#999" />
            {cart.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cart.length}</Text>
              </View>
            )}
          </View>
          <Text style={styles.navText}>Basket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <OrdersIcon size={24} color="#999" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Account')}
        >
          <UserIcon size={24} color="#999" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 12,
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#7CB342',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  restaurantInfo: {
    alignItems: 'center',
    width: '100%',
  },
  categoryBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    fontSize: 12,
    color: '#666',
  },
  categoryBadgeDot: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 6,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  statusRow: {
    flexDirection: 'row',
    gap: 12,
  },
  openBadge: {
    backgroundColor: '#7CB342',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeBadge: {
    backgroundColor: '#9E9E9E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  openText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  timeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  categoryScrollContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
  categoryScrollContent: {
    paddingHorizontal: 12,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  categoryTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#7CB342',
  },
  categoryText: {
    fontSize: 15,
    color: '#666',
  },
  categoryTextActive: {
    color: '#7CB342',
    fontWeight: '600',
  },
  productsContainer: {
    flex: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: '1%',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImage: {
    width: '100%',
    height: 130,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    minHeight: 36,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#7CB342',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#7CB342',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomPadding: {
    height: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navIconContainer: {
    position: 'relative',
    marginBottom: 2,
  },
  navText: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  navTextActive: {
    fontSize: 11,
    color: '#7CB342',
    fontWeight: '600',
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#f44336',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
