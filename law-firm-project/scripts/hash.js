import bcrypt from 'bcrypt'


(async () => {
const password = process.argv[2];
if (!password) {
console.error('Usage: node scripts/hash-password.js <PLAINTEXT_PASSWORD>');
process.exit(1);
}
const hash = await bcrypt.hash(password, 10);
console.log('Hash:', hash);
})();