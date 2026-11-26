# Automax — Sitio web de renta de automóviles

Proyecto Integrador del Segundo Parcial — Desarrollo Basado en Plataformas
Universidad Autónoma de Chihuahua · Facultad de Ingeniería · Ingeniería en Computación
Docente: Mtro. Luis Antonio Ramírez Martínez

## Integrantes
- Carlos Esteban Barragan Bernal (359299)
- Giovanna Paulina Hernandez Mendoza (377284)
- Mario Mendoza Anchondo (374296)
- Rafael Eduardo Acosta Navarro (374272)

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

## Estructura del proyecto

```text
Proyecto-integrador-del-segundo-parcial-equipo1/
├── public/
│   ├── css/style.css
│   ├── data/vehicles.json
│   ├── img/
│   ├── js/catalog.js
│   ├── 404.html
│   ├── about.html
│   ├── contact.html
│   ├── elaborado.html
│   ├── gracias.html
│   ├── index.html
│   ├── vehiculo1.html
│   ├── vehiculo2.html
│   └── vehiculo3.html
├── data/ (se crea automáticamente)
│   └── mensajes.txt
├── .gitignore
├── Dockerfile
├── package.json
├── README.md
└── server.js
```

El catálogo se encuentra en `public/data/vehicles.json`, mientras que los mensajes se guardan en `data/mensajes.txt`, fuera de la carpeta pública.

## Ejecución local
Requiere Git y Node.js. Se recomienda Node.js 20, la versión utilizada en el Dockerfile. No requiere instalar dependencias externas.
```bash
git clone https://github.com/a377284/Proyecto-integrador-del-segundo-parcial-equipo1.git
cd Proyecto-integrador-del-segundo-parcial-equipo1
npm start
```
Abrir http://localhost:8888. Los mensajes quedan en `data/mensajes.txt`.

## Ejecución con Docker
Requiere Docker instalado y en ejecución. Desde la carpeta del proyecto, construir localmente:
```bash
docker build -t automax .
docker run -p 8888:8888 automax
```
Para conservar los mensajes fuera del contenedor:
```bash
docker run -p 8888:8888 -v "$(pwd)/data:/app/data" automax
```

En Windows PowerShell también se puede utilizar:
```powershell
docker run -p 8888:8888 -v "${PWD}/data:/app/data" automax
```

Abrir http://localhost:8888.

## Imagen en Docker Hub
URL: https://hub.docker.com/r/a374272/proyecto-segundo-parcial-equipo1
```bash
docker pull a374272/proyecto-segundo-parcial-equipo1
docker run -p 8888:8888 a374272/proyecto-segundo-parcial-equipo1
```
Abrir http://localhost:8888 después de iniciar el contenedor. Los comandos de descarga utilizan la etiqueta `latest`.

Publicación (requiere permisos en el repositorio de Docker Hub):
```bash
docker login
docker build -t a374272/proyecto-segundo-parcial-equipo1:latest .
docker push a374272/proyecto-segundo-parcial-equipo1:latest
```
