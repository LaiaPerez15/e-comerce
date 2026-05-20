import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const usersToReset = [
  {
    id: '184c144e-5844-4e59-87cd-cb2fc36464ce',
    email: 'admin@test.com',
    password: 'admin123'
  },
  {
    id: 'eec2a904-a2a0-4206-8b32-db27b77b86cf',
    email: 'user@test.com',
    password: 'user123'
  },
  {
    id: '0e03eba1-9677-4984-8828-d2f9b4a04ee9',
    email: 'laiaperez0612@gmail.com',
    password: 'laia123'
  }
];

async function reset() {
  console.log('Resetting user passwords...');
  for (const user of usersToReset) {
    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: user.password }
    );
    if (error) {
      console.error(`Error updating password for ${user.email}:`, error.message);
    } else {
      console.log(`Successfully updated password for ${user.email} to: ${user.password}`);
    }
  }
}

reset();
