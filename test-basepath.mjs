const basePathEnv = 'http://localhost:3000/';
let basePath = basePathEnv;
if (basePathEnv.startsWith('http')) {
  try { basePath = new URL(basePathEnv).pathname.replace(/\/$/, ''); } catch { basePath = ''; }
}
console.log(`basePath: '${basePath}'`);
