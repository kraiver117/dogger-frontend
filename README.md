# Dogger

Aplicación para conectar "Dueños" de perros con "Paseadores.

## Bibliotecas y tecnologías utilizadas

**Frontend:**
- **React:**  diseño de interfaces de usuario.
- **Redux:** para hacer el estado global y facilitar el acceso a información desde cualquier componente de la aplicación.
- **React-bootstrap:**  aplicación de css en los componentes y vistas de la aplicación.
- **Axios:** realizar peticiones HTTP de manera fácil y rápida.

**Backend:**
- **Django rest framework:** para el desarrollo de API.
- **Django rest-knox:** autenticación por manejo de tokens.
- **Django cors-headers:** manejo de headers requeridos para Cross-Origin.

## Proceso de desarrollo
1. Primero comprendí los requerimentos de la aplicación y tome en cuenta el tiempo para implementar las funcionalidades.
2. Antes de empezar a programar, diseñé un diagrama E-R para crear las tablas en mi base de datos.
- Un **Paseador** puede tener varios horarios para pasear cierto tipo de tamaño de perros y además puede tener varios paseos.
- Un **Dueño** Puede tener múltiples mascotas y realizar varias peticiones de paseo.
- Más de una **Mascota** puede estar en un paseo y varias mascotas pueden pertenecer a un **Dueño**.
- Un paseo puede tener solamente un **Paseador** y **Dueño** a la vez, pero puede tener múltiples **Mascotas**.

![dogger-E-R](https://i.ibb.co/Q9dFp7L/Dogger-E-R.png)

3. Empecé con el desarrollo de mi backend con Django configurando las librerías que previamente había seleccionado, además de crear las aplicaciones correspondientes para el diseño de mi backend `python manage.py startapp NAME_APP`,  en total creé 6 aplicaciones:
- **accounts**: para el manejo de autenticación dentro de mi aplicación tomando en cuenta dos tipos de roles "Dueño" y "Paseador".
- **pets**: para realizar CRUD de mascotas tomando en cuenta que 1 usuario tipo "Dueño" puede tener diferentes mascotas.
- **schedules**: para definir un horario a cada usuario de tipo "Paseador" tomando en cuenta el tamaño de la mascota para definir horario.
- **users**: definí como usuarios al tipo de usuario "Dueño" para que pudiera realizar CRUD de mascotas y poder solicitar un paseo a un usuario de tipo "Paseador".
- **walkers**: usuario tipo "Paseador" su función en procesar peticiones de paseo y definir horarios para paseos.
- **walks**: para definir un paseo tomando en cuenta las mascotas, los dueños y paseadores, todos relacionados en esta tabla.

Para cada una de las aplicaciones se definieron las rutas para los endpoints, controladores, datos de modelos y serializers.

Los endpoints fueron testeados usando **POSTMAN**.

4. Una vez implementado mi Backend y conociendo la estructura de mis datos, procedí a realizar el frontend. Definí la estructura de carpetas de mi aplicación y configuré **Redux** además de instalar librerías como **React Bootstrap** para agilizar la aplicación de estilos y el uso de componentes propios de la librería.
- Para cada una de las vistas creé un flujo de interacción usando **Redux** usando los actions y dispatchers propios de la libreria, en los actions implementé **axios** para realizar las peticiones HTTP a mis endpoints en el backend. Cada una de las peticiones que se hicieron se manejaron los 3 posibles estados: Cuando una petición se realiza, cuando se obtiene una respuesta éxitosa y cuando ocurre algún error.

## Backend

Para el consumo de servicios se utilizó una API creada en django rest framework.

[Link de repositorio Backend](https://github.com/kraiver117/dogger-backend)

## Funcionalidades alcanzadas
- Registro de Dueño y Paseador en la app.
- Listado de todos usuario con rol dueño y paseador.
- Cada dueño puede registrar una mascota de un tamaño en particular.
- Un dueño puede realizar un petición a un paseador con multiples mascotas.
- Límite de mascotas por paseo a 3.
- Paseador puede aceptar o rechazar una petición, además de decidir cuando terminar un paseo.

## Autor
- #### [José Ángel](https://github.com/kraiver117)