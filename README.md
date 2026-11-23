# Automax — Sitio web de renta de automóviles

Proyecto Integrador del Segundo Parcial — Desarrollo Basado en Plataformas
Universidad Autónoma de Chihuahua · Facultad de Ingeniería · Ingeniería en Computación
Docente: Mtro. Luis Antonio Ramírez Martínez

## Integrantes
- Carlos Esteban Barragan Bernal (359299)
- _(agregar demás integrantes del equipo)_

## Descripción general
Sitio web para Automax, empresa de renta de automóviles. Incluye un servidor HTTP en Node.js (sin dependencias) que atiende en el puerto **8888**, una landing page con catálogo de 25 vehículos, páginas de contacto y "Acerca de nosotros", detalle de los tres primeros vehículos y un formulario de contacto que guarda los mensajes en un archivo de texto. El diseño usa HTML y CSS propios, sin frameworks de estilos.

## Funcionamiento
| Ruta | Contenido |
|---|---|
| `/` | Landing page y catálogo (marca, modelo, año, precio por día), cargado desde `/data/vehicles.json` con `js/catalog.js` |
| `/vehiculo1.html`, `/vehiculo2.html`, `/vehiculo3.html` | Detalle de los tres primeros vehículos |
| `/about.html` | Acerca de nosotros (descripción, misión, visión, valores) |
| `/contact.html` | Dirección, teléfono, correo, horarios y formulario |
| `POST /contact` | Valida y guarda el mensaje en `data/mensajes.txt`; redirige a `/gracias.html` |

Estructura: `server.js` (servidor), `public/` (HTML, CSS, JS, imágenes, datos), `data/` (mensajes), `Dockerfile`.

## Ejecución local
Requiere Node.js 18+.
```bash
git clone <URL-DEL-REPOSITORIO>
cd automax
node server.js
```
Abrir http://localhost:8888. Los mensajes quedan en `data/mensajes.txt`.

## Ejecución con Docker
Construir localmente:
```bash
docker build -t automax .
docker run -p 8888:8888 automax
```
Para conservar los mensajes fuera del contenedor:
```bash
docker run -p 8888:8888 -v "$(pwd)/data:/app/data" automax
```

## Imagen en Docker Hub
URL: https://hub.docker.com/r/USUARIO/automax   _(reemplazar USUARIO)_
```bash
docker pull USUARIO/automax
docker run -p 8888:8888 USUARIO/automax
```
Publicación:
```bash
docker login
docker build -t USUARIO/automax:latest .
docker push USUARIO/automax:latest
```
