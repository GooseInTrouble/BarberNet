module.exports = {
  async up(db) {
    // 1. Додавання нового поля `averageRating` у `salons` (значення за замовчуванням: 0)
    await db.collection('salons').updateMany({}, { $set: { averageRating: 0 } });
  },

  async down(db) {
    // 1. Видалення поля `averageRating`
    await db.collection('salons').updateMany({}, { $unset: { averageRating: '' } });
  },
};
