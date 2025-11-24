// remove-avatar-url.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase URL or Service Role Key in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function removeAvatarUrl(userId) {
  try {
    console.log(`🔄 Attempting to remove avatar_url for user: ${userId}`);
    
    // First, get the current user data to verify the user exists
    const { data: userData, error: fetchError } = await supabase.auth.admin.getUserById(userId);
    
    if (fetchError) {
      throw new Error(`Failed to fetch user: ${fetchError.message}`);
    }
    
    console.log('👤 Current user metadata:', userData.user.user_metadata);
    
    // Update the user's metadata to remove the avatar_url
    const { data, error } = await supabase.auth.admin.updateUserById(
      userId,
      {
        user_metadata: {
          ...userData.user.user_metadata, // Keep existing metadata
          avatar_url: null // Remove the avatar_url
        }
      }
    );

    if (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }

    console.log('✅ Successfully removed avatar_url from user metadata');
    console.log('🔄 Updated user metadata:', data.user.user_metadata);
  } catch (error) {
    console.error('❌ An error occurred:', error.message);
    process.exit(1);
  }
}

// Replace this with the actual user ID from your database
// For example, from your image, the 'sub' field is "101f09d9-f355-4d6a-8e44-280eale80823"
const userId = '101f09d9-f355-4d6a-8e44-280eale80823';

// Run the function
removeAvatarUrl(userId);