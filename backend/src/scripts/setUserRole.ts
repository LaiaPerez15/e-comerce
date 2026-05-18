import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const userId = '3afe15be-97e9-49c6-a906-7a7ec86aa068';

async function run() {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    app_metadata: { role: 'user' },
    user_metadata: { full_name: 'User Test' }
  });

  console.log('DATA:', data);
  console.log('ERROR:', error);
}

run();
