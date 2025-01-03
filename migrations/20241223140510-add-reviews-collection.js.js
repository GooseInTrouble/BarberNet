module.exports = {
  async up(db) {
    // 5. Створення нової колекції `reviews`
    await db.createCollection('reviews');
  },

  async down(db) {
    // Видалення колекції `reviews`
    await db.collection('reviews').drop();
  },
};
