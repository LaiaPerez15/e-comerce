import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// 1. Conectar usando SERVICE ROLE KEY (ya la tienes en tu .env)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 2. ID del usuario al que quieres asignar el rol
const userId = '3afe15be-97e9-49c6-a906-7a7ec86aa068'; // <-- reemplaza esto

async function run() {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    app_metadata: { role: 'user' }
  });

  console.log('DATA:', data);
  console.log('ERROR:', error);
}

run();
