import { supabase } from './supabaseClient'

// Helper function to create entity operations
const createEntity = (tableName) => ({
  async list() {
    const { data, error } = await supabase.from(tableName).select('*')
    if (error) throw error
    return data || []
  },

  async get(id) {
    const { data, error } = await supabase.from(tableName).select('*').eq('id', id).single()
    if (error) throw error
    return data
  },

  async create(record) {
    const { data, error } = await supabase.from(tableName).insert(record).select().single()
    if (error) throw error
    return data
  },

  async update(id, updates) {
    const { data, error } = await supabase.from(tableName).update(updates).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase.from(tableName).delete().eq('id', id)
    if (error) throw error
    return true
  },

  async filter(filters) {
    let query = supabase.from(tableName).select('*')
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    const { data, error } = await query
    if (error) throw error
    return data || []
  }
})

// Export all entities
export const User = createEntity('users')
export const JewelryItem = createEntity('jewelry_items')
export const ClothingItem = createEntity('clothing_items')
export const Outfit = createEntity('outfits')
export const Collection = createEntity('collections')
export const TryOnSession = createEntity('try_on_sessions')
export const Order = createEntity('orders')
export const SharedLook = createEntity('shared_looks')
export const Brand = createEntity('brands')
export const Stylist = createEntity('stylists')
export const StyleProfile = createEntity('style_profiles')
export const WardrobeItem = createEntity('wardrobe_items')
export const LookbookEntry = createEntity('lookbook_entries')
export const ProductReview = createEntity('product_reviews')
export const Notification = createEntity('notifications')
export const BrandPartnership = createEntity('brand_partnerships')
export const Creator = createEntity('creators')