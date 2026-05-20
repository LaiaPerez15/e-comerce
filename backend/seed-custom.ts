import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const categories = [
  {
    id: 'b3017e09-1cd9-4718-9d87-69aae1ffa1f0',
    name: 'Running',
    slug: 'running',
    description: 'Zapatillas para correr'
  },
  {
    id: '1f96a607-7e07-4ff5-b4e4-aef831f3d9bc',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Zapatillas casuales'
  },
  {
    id: '85eff643-1876-4f49-a44b-2c164b7758cf',
    name: 'Training',
    slug: 'training',
    description: 'Zapatillas para entrenar'
  },
  {
    id: '18733bbd-ff0f-442a-b179-599acafcace6',
    name: 'Basketball',
    slug: 'basketball',
    description: 'Zapatillas de baloncesto'
  }
];

const products = [
  {
    category_id: 'b3017e09-1cd9-4718-9d87-69aae1ffa1f0',
    name: 'New Balance 530 Mujer - Rosa',
    slug: 'new-balance-530-mujer-Rosa',
    description: 'Zapatilla retro con tonos crema y estética clásica. Comodidad ligera y estilo versátil para uso diario.',
    price: 119.99,
    stock: 25,
    image_url: 'https://res.cloudinary.com/dldmiairc/image/upload/v1779307048/nb-u530-22q_001.jpg_notkpx.webp',
    brand: 'New Balance',
    sizes: ['36', '37', '38', '39', '40'],
    is_active: true
  },
  {
    category_id: 'b3017e09-1cd9-4718-9d87-69aae1ffa1f0',
    name: 'Nike Air Max Moto 2K Mujer - Rosa',
    slug: 'nike-air-max-moto-2k-mujer-Rosa',
    description: 'Diseño futurista con amortiguación Air Max y estética chunky moderna.',
    price: 159.99,
    stock: 20,
    image_url: 'https://res.cloudinary.com/dldmiairc/image/upload/v1779307182/001607311_101.jpg_tjbmzn.avif',
    brand: 'Nike',
    sizes: ['36', '37', '38', '39', '40', '41'],
    is_active: true
  },
  {
    category_id: 'b3017e09-1cd9-4718-9d87-69aae1ffa1f0',
    name: 'ASICS Gel-Kayano 14 Mujer - Rosa',
    slug: 'asics-gel-kayano-14-mujer-Rosa',
    description: 'Modelo técnico con amortiguación GEL y estética retro-running.',
    price: 149.99,
    stock: 18,
    image_url: 'https://res.cloudinary.com/dldmiairc/image/upload/v1779307242/21240496_51073472_1000.jpg_quy96o.webp',
    brand: 'ASICS',
    sizes: ['36', '37', '38', '39', '40'],
    is_active: true
  },
  {
    category_id: '1f96a607-7e07-4ff5-b4e4-aef831f3d9bc',
    name: 'Adidas Samba OG Mujer - Rosa',
    slug: 'adidas-samba-og-mujer-Rosa',
    description: 'Clásico absoluto con suela gum y diseño minimalista.',
    price: 119.99,
    stock: 35,
    image_url: 'https://res.cloudinary.com/dldmiairc/image/upload/v1779307396/512XzYBFuRL._AC_UY900__z4wtko.jpg',
    brand: 'Adidas',
    sizes: ['36', '37', '38', '39', '40'],
    is_active: true
  },
  {
    category_id: '1f96a607-7e07-4ff5-b4e4-aef831f3d9bc',
    name: 'New Balance 9060 Mujer - Rosa',
    slug: 'new-balance-9060-mujer-Rosa',
    description: 'Silueta moderna con suela exagerada y estética futurista.',
    price: 159.99,
    stock: 22,
    image_url: 'https://res.cloudinary.com/dldmiairc/image/upload/v1779307528/pc9060be_nb_02_i_m23r2t.webp',
    brand: 'New Balance',
    sizes: ['36', '37', '38', '39', '40', '41'],
    is_active: true
  },
  {
    category_id: '1f96a607-7e07-4ff5-b4e4-aef831f3d9bc',
    name: 'New Balance 740 Mujer - Rosa',
    slug: 'new-balance-740-mujer-Rosa',
    description: 'Diseño retro con tonos neutros y comodidad acolchada.',
    price: 129.99,
    stock: 15,
    image_url: 'https://res.cloudinary.com/dldmiairc/image/upload/v1779307612/New-Balance-740-atmos-Pink-Vacation.jpg_bkmm3a.avif',
    brand: 'New Balance',
    sizes: ['36', '37', '38', '39', '40'],
    is_active: true
  },
  {
    category_id: '85eff643-1876-4f49-a44b-2c164b7758cf',
    name: 'Salomon XT-6 Mujer - Rosa',
    slug: 'salomon-xt6-mujer-rosa',
    description: 'Zapatilla técnica con sujeción avanzada y estética trail moderna.',
    price: 179.99,
    stock: 12,
    image_url: 'https://res.cloudinary.com/dldmiairc/image/upload/v1779307701/30618089_61769080_1000.jpg_cl9lw3.webp',
    brand: 'Salomon',
    sizes: ['36', '37', '38', '39', '40'],
    is_active: true
  },
  {
    category_id: '85eff643-1876-4f49-a44b-2c164b7758cf',
    name: 'ASICS Gel-1130 Mujer - Rosa',
    slug: 'asics-gel-1130-mujer-Rosa',
    description: 'Running retro con amortiguación GEL y soporte estable.',
    price: 99.99,
    stock: 28,
    image_url: 'https://res.cloudinary.com/dldmiairc/image/upload/v1779307754/71qSqlySuKL._AC_UY900__dy02oe.jpg',
    brand: 'ASICS',
    sizes: ['36', '37', '38', '39', '40'],
    is_active: true
  },
  {
    category_id: '85eff643-1876-4f49-a44b-2c164b7758cf',
    name: 'ASICS Gel-1130 Mujer - Rosa (Variante)',
    slug: 'asics-gel-1130-mujer-Rosa-variante',
    description: 'Versión alternativa del modelo Gel-1130 con detalles actualizados.',
    price: 99.99,
    stock: 20,
    image_url: 'https://res.cloudinary.com/dldmiairc/image/upload/v1779307838/ASICS-Gel-1130-Neon-Pack-Pink-Product.jpg_bpk3wj.avif',
    brand: 'ASICS',
    sizes: ['36', '37', '38', '39', '40'],
    is_active: true
  },
  {
    category_id: '18733bbd-ff0f-442a-b179-599acafcace6',
    name: 'Converse Chuck Taylor Throwback Low Mujer - Rosa',
    slug: 'converse-chuck-taylor-throwback-low-mujer-Rosa',
    description: 'Clásico low-top con estética vintage y color Rosa vibrante.',
    price: 79.99,
    stock: 40,
    image_url: 'https://res.cloudinary.com/dldmiairc/image/upload/v1779307838/ASICS-Gel-1130-Neon-Pack-Pink-Product.jpg_bpk3wj.avif',
    brand: 'Converse',
    sizes: ['36', '37', '38', '39', '40', '41'],
    is_active: true
  },
  {
    category_id: '18733bbd-ff0f-442a-b179-599acafcace6',
    name: 'New Balance 204L Mujer - Rosa',
    slug: 'new-balance-204l-mujer-Rosa',
    description: 'Diseño minimalista con tonos tierra y comodidad ligera.',
    price: 89.99,
    stock: 18,
    image_url: 'https://res.cloudinary.com/dldmiairc/image/upload/v1779307958/New-Balance-204L-Pastel-Pink-2_2048x_xmkelo.webp',
    brand: 'New Balance',
    sizes: ['36', '37', '38', '39', '40'],
    is_active: true
  },
  {
    category_id: '18733bbd-ff0f-442a-b179-599acafcace6',
    name: 'Nike Air Max Moto 2K Mujer - Rosa (Variante)',
    slug: 'nike-air-max-moto-2k-mujer-Rosa-variante',
    description: 'Versión alternativa del modelo Moto 2K con detalles actualizados.',
    price: 159.99,
    stock: 22,
    image_url: 'https://res.cloudinary.com/dldmiairc/image/upload/v1779308006/Nike-Air-Max-Moto-2K-Black-Fire-Pink-Womens.jpg_ujvjsx.avif',
    brand: 'Nike',
    sizes: ['36', '37', '38', '39', '40', '41'],
    is_active: true
  }
];

async function seed() {
  console.log('Cleaning up database...');
  
  // Truncate tables in order of dependency
  await supabase.from('order_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  console.log('Inserting categories...');
  const { error: catError } = await supabase.from('categories').insert(categories);
  if (catError) {
    console.error('Error inserting categories:', catError);
    return;
  }
  console.log('Categories inserted successfully.');

  console.log('Inserting products...');
  const { error: prodError } = await supabase.from('products').insert(products);
  if (prodError) {
    console.error('Error inserting products:', prodError);
    return;
  }
  console.log('Products inserted successfully.');
}

seed();
