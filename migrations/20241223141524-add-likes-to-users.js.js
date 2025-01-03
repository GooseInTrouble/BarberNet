module.exports = {
  async up(db, client) {
    // Додаємо нове поле "isActive" до всіх користувачів
    await db.collection("users").updateMany({}, { $set: { isActive: true } });
  },

  async down(db, client) {
    // Видаляємо поле "isActive" у всіх користувачів
    await db.collection("users").updateMany({}, { $unset: { isActive: "" } });
  },
};
