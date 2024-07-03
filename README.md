# Calendar Backend

Esta API proporciona un conjunto de endpoints para el manejo de usuarios, incluyendo registro, inicio de sesión, renovación de tokens y operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

### Instalación

Clona el repositorio y navega hasta el directorio:

```bash
git clone https://github.com/StefanoP21/calendar-backend.git
```

### Instala las dependencias:

```bash
npm install
```

### Variables de Entorno

Cree un archivo .env en la carpeta raíz de su proyecto y añada sus variables. Consulte .env.template para obtener ayuda.

### Ejecución en modo de desarrollo

Para iniciar la aplicación en modo de desarrollo, ejecuta:

```bash
npm run dev
```

## API Endpoints

| HTTP Verbs | Endpoints       | Action                                   |
| ---------- | --------------- | ---------------------------------------- |
| POST       | /api/auth/new   | Para crear una nueva cuenta de usuario   |
| POST       | /api/auth       | Para acceder a una cuenta existente      |
| GET        | /api/auth/renew | Para generar un nuevo token de usuario   |
| POST       | /api/events/new | Para crear un nuevo evento de calendario |
| GET        | /api/events     | Para obtener todos los eventos           |
| PUT        | /api/events/:id | Para editar la información de un evento  |
| DELETE     | /api/events/:id | Para eliminar un único evento            |

### Tecnologías

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [JWT](https://jwt.io/)

### Autor

- [Stefano Palomino](https://github.com/StefanoP21)

### Licencia

Este proyecto está disponible para su uso bajo la Licencia MIT.
