import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import connectDb from '../config/db.js';
import Product from '../model/productModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedProducts = async () => {
  try {
    await connectDb();
    const dataPath = path.resolve(__dirname, '../data/products.json');
    if (!fs.existsSync(dataPath)) {
      console.error('products.json not found at', dataPath);
      process.exit(1);
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const products = JSON.parse(rawData);

    const force = process.argv.includes('--force');
    const count = await Product.countDocuments();

    if (count > 0 && !force) {
      console.log(`Database already has ${count} products. Use --force to replace.`);
      process.exit(0);
    }

    if (force) {
      console.log('Clearing existing products...');
      await Product.deleteMany({});
    }

    // Strip original _id, createdAt, updatedAt, __v to allow clean recreation
    const sanitized = products.map(({ _id, createdAt, updatedAt, __v, ...rest }) => ({
      ...rest,
      date: rest.date || Date.now()
    }));

    const inserted = await Product.insertMany(sanitized);
    console.log(`Successfully seeded ${inserted.length} products into the database!`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding products:', err);
    process.exit(1);
  }
};

seedProducts();
