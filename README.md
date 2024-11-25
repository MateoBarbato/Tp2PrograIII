### **Descripción del Proyecto**

**Proyecto:**  TP2 Programación III - Sistema de Gestión de desarrolladores y Juegos

Este proyecto es una API RESTful diseñada para gestionar desarrolladores de videojuegos y sus juegos asociados. Proporciona endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) tanto para desarrolladores como para juegos. La API permite manejar relaciones entre desarrolladores y juegos, así como soportar funcionalidades avanzadas como paginación, ordenamiento y filtrado de resultados.

### **TP2 Programación III**

----------

### **Herramientas Utilizadas**

#### **Frameworks y Librerías**

-   **Express-generator**: Utilizado para generar la estructura mínima del proyecto y agilizar el desarrollo.
-   **Express-validator**: Herramienta para validar los datos enviados en las solicitudes HTTP.
-   **Sequelize-ORM**: Mapeo Objeto-Relacional (ORM) para interactuar con la base de datos MySQL.
-   **MySQL**: Sistema de gestión de bases de datos relacional (RDBMS) utilizado para almacenar los datos del proyecto.
    **Transacciones**:  Permite realizar operaciones de escritura (insertar, actualizar, eliminar) en la base de datos manteniendo atomicidad, asegurando la integridad de los datos.
#### **Utilidades**

-   **Nodemon**: Herramienta para reiniciar automáticamente el servidor durante el desarrollo cuando se detectan cambios en los archivos.
-   **Sequelize-CLI**: Utilizado para manejar migraciones y seeders, facilitando la creación de esquemas y la popularización de la base de datos.

----------

### **Enlaces Relacionados**

-   **[Documentación del Proyecto](https://github.com/MateoBarbato/Tp2PrograIII/blob/main/Documentacion.md)**: Guía detallada sobre los endpoints y funcionalidades del proyecto.
-   **[Script SQL](https://github.com/MateoBarbato/Tp2PrograIII/blob/main/DumpProgra3%20con%20data) : Creacion de schema y carga de datos.
----------

### **Características Principales**

1.  **Gestión de desarrolladores:**
    
    -   Crear nuevas desarrolladores.
    -   Leer todas las desarrolladores con soporte para filtros y ordenamiento.
    -   Leer una desarrolladora específica por su ID.
    -   Eliminar desarrolladores.
2.  **Gestión de Juegos:**
    
    -   Crear nuevos juegos asociados a una desarrolladora.
    -   Leer todos los juegos con soporte para filtros avanzados, paginación y ordenamiento.
    -   Leer detalles de un juego específico por su ID.
    -   Actualizar juegos existentes.
    -   Eliminar juegos.
3.  **Relaciones:**
    
    -   Los juegos están asociados a una desarrolladora.
    -   Al obtener juegos, se incluye información sobre la desarrolladora asociada.
4.  **Funcionalidades Avanzadas:**
    
    -   **Paginación:**  Permite limitar el número de resultados y navegar entre páginas.
    -   **Ordenamiento:**  Ordenar resultados por fecha de creación (`createdAt`) en orden ascendente o descendente.
    -   **Filtrado:**  Filtrar resultados por tipo (`type`), estado (`status`), entre otros parámetros.

----------

### **Tecnologías Utilizadas**

1.  **Backend:**
    
    -   Node.js
    -   Express.js
    -   Sequelize (ORM para gestionar la base de datos)
2.  **Base de Datos:**
    
    -   MySQL
3.  **Documentación y Pruebas:**
    
    -   Postman (convertido a Markdown para compartir).

----------

### **Endpoints**

La API está dividida en dos colecciones principales:

-   **Developers:**  Endpoints para manejar las desarrolladores.
-   **Games:**  Endpoints para manejar los juegos y sus relaciones con las desarrolladores.

----------

### **Uso Típico**

1.  **Crear desarrolladores y Juegos:**
    
    -   Primero, se crean las desarrolladores a través del endpoint  `/developers/create`.
    -   Luego, se asocian juegos a estas desarrolladores mediante  `/games/create`.
2.  **Consultar Juegos con Filtros:**
    
    -   Utiliza  `/games/getAll`  con parámetros como  `page`,  `limit`,  `type`,  `status`  para obtener resultados específicos.
3.  **Gestión Completa:**
    
    -   Los juegos y desarrolladores se pueden actualizar o eliminar según sea necesario utilizando sus respectivos endpoints.

----------

### **Ejemplo de Caso de Uso**

Un administrador de videojuegos puede usar esta API para:

-   Agregar nuevas desarrolladores a su sistema.
-   Registrar los juegos asociados con cada desarrolladora.
-   Consultar juegos activos, paginados y ordenados por fecha de creación.
-   Mantener el catálogo actualizado mediante actualizaciones y eliminaciones.
