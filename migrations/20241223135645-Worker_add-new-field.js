module.exports = {
  async up(db) {
    // 1. Додавання нового поля `Position` у `workers` (значення за замовчуванням: 0)
    await db.collection('workers').updateMany({}, { $set: { Position:"Worker"} });
  },

  async down(db) {
    // 1. Видалення поля `Position`
    await db.collection('workers').updateMany({}, { $unset: { Position: '' } });
  },
};
