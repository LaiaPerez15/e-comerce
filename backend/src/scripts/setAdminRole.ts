import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const userId = 'dd72c398-f0c6-4c60-9eb2-3a81dc55b58f';

async function run() {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    app_metadata: { role: 'admin' },
    user_metadata: { full_name: 'Admin' }
  });

  console.log('DATA:', data);
  console.log('ERROR:', error);
}

run();
