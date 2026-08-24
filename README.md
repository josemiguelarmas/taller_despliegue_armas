# Calculadora Distribuida - Taller 2 DevOps

Implementación de la parte Dev: backend y frontend en Node.js para las HU1-HU5.

## Estructura

```
backend/    API REST (Express) con las operaciones y el historial
frontend/   Interfaz web (Express + HTML/JS) que consume el backend
```

## Backend

```
cd backend
npm install
PORT=5000 npm start
```

Endpoints:

- `POST /sum` `{ "a": number, "b": number }`
- `POST /subtract` `{ "a": number, "b": number }`
- `POST /multiply` `{ "a": number, "b": number }`
- `POST /divide` `{ "a": number, "b": number }` (400 si b es 0)
- `GET /history` últimas 5 operaciones
- `GET /health` estado, uptime, permisos de escritura

## Frontend

```
cd frontend
npm install
PORT=3000 BACKEND_URL=http://IP_DEL_BACKEND:5000 npm start
```

`BACKEND_URL` debe apuntar a la IP y puerto reales del PC donde corre el
backend en la red del laboratorio. Por defecto usa `http://localhost:5000`.

Endpoints propios:

- `GET /status` estado del frontend y de la conexión al backend
- `GET /config` expone la URL del backend al cliente web

## Despliegue manual (Fase 1)

1. Empaquetar cada carpeta (`backend`, `frontend`) en un `.zip`.
2. Entregarla a Ops junto con este README como instrucciones de despliegue.
3. Ops instala Node.js, corre `npm install` y `npm start` en cada PC,
   pasando `BACKEND_URL` con la IP real del PC del backend.

Nota: por indicación del equipo, esta implementación no configura reglas de
firewall; esa restricción de la guía original queda excluida a propósito.
