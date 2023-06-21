async function existingUser(email) {
  await new Promise((resolve, reject) => {
    db.all('SELECT * FROM users WHERE email = ?', [email], 
      (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
} 

export default {
  existingUser
}