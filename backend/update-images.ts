import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const imagesMap: { [key: string]: string } = {
  'Nike Air Zoom Pegasus 41': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800',
  'Adidas Ultraboost 24': 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800',
  'Nike Air Jordan 1 Retro High OG': 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800',
  'Adidas Dame 8': 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=800',
  'Nike Air Force 1 07': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800',
  'New Balance 574 Core': 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800',
  'Nike Metcon 9': 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800',
  'Adidas Powerlift 5': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800'
};

async function updateImages() {
  const { data: products, error } = await supabase.from('products').select('id, name');
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${products.length} products to check.`);

  for (const product of products) {
    const url = imagesMap[product.name];
    if (url) {
      console.log(`Updating ${product.name} with URL: ${url}`);
      const { error: updateError } = await supabase
        .from('products')
        .update({ image_url: url })
        .eq('id', product.id);

      if (updateError) {
        console.error(`Error updating product ${product.name}:`, updateError);
      } else {
        console.log(`Successfully updated ${product.name}`);
      }
    } else {
      console.log(`No image mapped for product: ${product.name}`);
    }
  }
}

updateImages();
