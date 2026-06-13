# Video de presentacion
https://www.youtube.com/watch?v=6nvQ_jmSeCI&feature=youtu.be&themeRefresh=1

# Productivity Dashboard

Proyecto full stack para visualizar métricas de desarrollo con un frontend en React y un backend en Spring Boot.

## Resumen

La aplicación muestra métricas de productividad por desarrollador y por día. El frontend permite cambiar entre métricas como commits, bugs resueltos, tareas y story points. El backend expone la información desde una base de datos H2 en memoria y la devuelve como JSON para pintar el dashboard.

## Estructura general

- `gitFinalFrontProgramacionWeb/productivity-dashboard/`: frontend en React.
- `backFinalProgramacionWeb/demo/`: backend en Spring Boot.

## Frontend

### Componentes principales

- `src/App.jsx`: controla la métrica seleccionada y conecta la barra de navegación con el dashboard.
- `src/components/NavBar.jsx`: renderiza los botones para cambiar entre métricas.
- `src/components/Dashboard.jsx`: consulta los datos al backend, calcula indicadores y dibuja la gráfica.
- `src/services/metricsService.js`: centraliza la llamada HTTP al backend.

### Flujo funcional

1. El usuario elige una métrica desde la barra superior.
2. `App.jsx` guarda la selección en estado.
3. `Dashboard.jsx` llama a `getMetrics()` con la métrica elegida.
4. El servicio hace `fetch` a `http://localhost:8080/metrics/{metric}` o a la URL definida en `VITE_API_URL`.
5. Con la respuesta se calculan total, promedio y máximo.
6. La información se pinta en tarjetas y en la gráfica.

### Mejoras de interfaz aplicadas

- Ajuste del diseño para que contraste bien en modo claro y oscuro.
- Cambio de la visualización principal a una gráfica de barras tipo histograma.
- Uso de estados visuales para errores y carga.

## Backend

### Componentes principales

- `src/main/java/com/exampleback/demo/controller/MetricsController.java`: expone el endpoint REST `/metrics/{metric}`.
- `src/main/java/com/exampleback/demo/service/MetricsService.java`: valida la métrica solicitada y transforma entidades a DTOs.
- `src/main/java/com/exampleback/demo/repository/DeveloperMetricRepository.java`: acceso a datos con Spring Data JPA.
- `src/main/java/com/exampleback/demo/model/DeveloperMetric.java`: entidad JPA que representa las métricas.
- `src/main/java/com/exampleback/demo/DataInitializer.java`: carga datos de ejemplo al iniciar la aplicación.
- `src/main/java/com/exampleback/demo/config/GlobalExceptionHandler.java`: convierte errores en respuestas JSON legibles.

### Flujo funcional

1. El frontend solicita `/metrics/commits`, `/metrics/bugs`, `/metrics/tasks` o `/metrics/storyPoints`.
2. El controlador delega en el servicio.
3. El servicio valida que la métrica exista.
4. Si la métrica es inválida, se lanza `IllegalArgumentException` y el handler responde con HTTP 400.
5. Si todo es correcto, el repositorio obtiene los registros desde H2.
6. El servicio transforma cada entidad en `MetricResponseDTO` con `label` y `value`.

## Base de datos

El proyecto usa H2 en memoria para desarrollo. La configuración está en `src/main/resources/application.properties`.

Características relevantes:

- Base de datos temporal en memoria.
- Creación automática de esquema con JPA.
- Datos iniciales cargados por `DataInitializer`.
- Consola H2 habilitada para inspección manual.

## Cómo ejecutar el proyecto

### Backend

```bash
cd backFinalProgramacionWeb/demo
./mvnw spring-boot:run
```

### Frontend

```bash
cd gitFinalFrontProgramacionWeb/productivity-dashboard
npm install
npm run dev
```

Si necesitas apuntar el frontend a otra API, define:

```bash
VITE_API_URL=http://localhost:8080
```