// Servidor HTTP de Automax (sin dependencias externas). Puerto 8888.
const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = process.env.PORT || 8888;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'mensajes.txt');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

function send(res, status, type, body) {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

function serveStatic(req, res) {
  const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const rel = pathname === '/' ? '/index.html' : pathname;
  const file = path.normalize(path.join(PUBLIC_DIR, rel));
  if (!file.startsWith(PUBLIC_DIR)) return send(res, 403, 'text/plain', 'Prohibido');
  fs.readFile(file, (err, data) => {
    if (err) {
      return fs.readFile(path.join(PUBLIC_DIR, '404.html'), (e2, page) =>
        send(res, 404, 'text/html; charset=utf-8', e2 ? 'Página no encontrada' : page));
    }
    send(res, 200, MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', data);
  });
}

function handleContact(req, res) {
  let body = '';
  req.on('data', c => { body += c; if (body.length > 1e5) req.destroy(); });
  req.on('end', () => {
    const f = querystring.parse(body);
    const clean = s => String(s || '').replace(/[\r\n]+/g, ' ').trim();
    const { nombre, correo, telefono, mensaje } = Object.fromEntries(
      ['nombre', 'correo', 'telefono', 'mensaje'].map(k => [k, clean(f[k])]));
    if (!nombre || !correo || !telefono || !mensaje || !/^\S+@\S+\.\S+$/.test(correo)) {
      return send(res, 400, 'text/html; charset=utf-8',
        '<p>Datos incompletos o inválidos. <a href="/contact.html">Volver</a></p>');
    }
    const line = `[${new Date().toISOString()}] Nombre: ${nombre} | Correo: ${correo} | Teléfono: ${telefono} | Mensaje: ${mensaje}\n`;
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.appendFile(MESSAGES_FILE, line, err => {
      if (err) return send(res, 500, 'text/plain', 'Error al guardar el mensaje');
      res.writeHead(303, { Location: '/gracias.html' });
      res.end();
    });
  });
}

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/contact') return handleContact(req, res);
  if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res);
  send(res, 405, 'text/plain', 'Método no permitido');
}).listen(PORT, () => console.log(`Automax en http://localhost:${PORT}`));
