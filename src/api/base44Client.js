import { supabase } from './supabaseClient'

// Compatibility layer for base44 API
export const base44 = {
  auth: {
    async me() {
      // Return null since we don't have auth yet
      return null;
    },
    async login() {
      return null;
    },
    async logout() {
      return null;
    }
  },
  entities: {
    User: createEntity('users'),
    JewelryItem: createEntity('jewelry_items'),
    ClothingItem: createEntity('clothing_items'),
    Outfit: createEntity('outfits'),
    Collection: createEntity('collections'),
    TryOnSession: createEntity('try_on_sessions'),
    Order: createEntity('orders'),
    SharedLook: createEntity('shared_looks'),
    Brand: createEntity('brands'),
    Stylist: createEntity('stylists'),
    StyleProfile: createEntity('style_profiles'),
    WardrobeItem: createEntity('wardrobe_items'),
    LookbookEntry: createEntity('lookbook_entries'),
    ProductReview: createEntity('product_reviews'),
    Notification: createEntity('notifications'),
    BrandPartnership: createEntity('brand_partnerships'),
    Creator: createEntity('creators'),
  }
}

function createEntity(tableName) {
  return {
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

    async filter(filters, orderBy) {
      let query = supabase.from(tableName).select('*')
      if (filters && typeof filters === 'object') {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }
      if (orderBy) {
        const desc = orderBy.startsWith('-')
        const field = desc ? orderBy.slice(1) : orderBy
        query = query.order(field, { ascending: !desc })
      }
      const { data, error } = await query
      if (error) throw error
      return data || []
    }
  }
}

export default base44