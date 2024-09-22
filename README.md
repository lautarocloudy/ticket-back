Cómo clonar e instalar el proyecto backend con Node.js

Requisitos previos
Node.js: Asegúrate de tener instalado Node.js. Si no lo tienes, puedes descargarlo desde aquí.
MySQL: Necesitas tener MySQL corriendo en tu máquina. Puedes usar XAMPP para gestionar fácilmente MySQL y Apache.
XAMPP: Descarga e instala XAMPP y asegúrate de que el módulo de MySQL esté corriendo.

Pasos para clonar e instalar el proyecto

1. Clona el repositorio:
    git clone https://github.com/usuario/nombre-del-repositorio.git

2. Navega al directorio del proyecto:
    cd nombre-del-repositorio

3. Instala las dependencias necesarias:
    npm install

4. Configurar variables de entorno:
    En el directorio raíz del proyecto, encontrarás un archivo llamado .env.example. Debes copiar este archivo y renombrarlo como .env
    Ajusta los datos del archivo .env de acuerdo con tu configuración de MySQL en XAMPP.
    Notas:
        DB_HOST: Mantén localhost si estás trabajando localmente.
        DB_USER y DB_PASS: Asegúrate de ajustar estos valores según tu usuario y contraseña de MySQL en XAMPP. El valor por defecto en XAMPP es root sin contraseña.
        DB_PORT: El puerto por defecto de MySQL en XAMPP es 3306. Cambia este valor si tu MySQL está corriendo en otro puerto.
        PORT: Este es el puerto donde se ejecutará el backend. Por defecto es 3000. Puedes cambiarlo si estás ejecutando otro servicio en ese puerto.

5.Configuración de la base de datos MySQL con XAMPP:
    Abre el panel de control de XAMPP.
    Activa el módulo MySQL.
    Abre phpMyAdmin (desde XAMPP) y crea una base de datos con el nombre definido en el archivo .env (en este caso, tickets). se adjunta un backup de la base de datos.

6.Ejecuta el servidor:
    npm start
    El backend se ejecutará en http://localhost:3000 (o el puerto que hayas configurado en el archivo .env).


