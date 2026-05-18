import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// 1. Conectar usando SERVICE ROLE KEY (ya la tienes en tu .env)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 2. ID del usuario al que quieres asignar el rol
const userId = 'dd72c398-f0c6-4c60-9eb2-3a81dc55b58f'; // <-- reemplaza esto

async function run() {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    app_metadata: { role: 'admin' }
  });

  console.log('DATA:', data);
  console.log('ERROR:', error);
}

run();
