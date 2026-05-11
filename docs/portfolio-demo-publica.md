# Portfolio y demo publica

## Estrategia recomendada

Separar el proyecto en dos repositorios:

1. `pcd-pro-demo-publica`
   - Demo estatica para portfolio.
   - Sin backend obligatorio.
   - Sin datos reales.
   - Sin credenciales reales.
   - Apta para GitHub Pages o Netlify.

2. `pcd-pro-privado`
   - Version operativa.
   - Backend Node.
   - Base demo/local o futura PostgreSQL.
   - Login configurable.
   - Documentacion completa.

## Que publicar en la demo publica

Se puede publicar:

- `src/`
- `index.html`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `.env.demo`
- `.github/workflows/pages-demo.yml`
- `README.md`
- docs de portfolio

No publicar datos sensibles:

- `.env`
- credenciales reales
- bases reales
- documentos privados
- datos de jugadores reales
- convenios, sponsors o contratos reales

## Modo demo

El modo demo se activa con:

```powershell
npm.cmd run build:demo
```

o para verlo local:

```powershell
npm.cmd run dev:demo
```

Este modo:

- entra como `Visitante Demo`,
- usa datos sanitizados embebidos,
- no requiere API,
- permite probar altas en `localStorage`,
- sirve para portfolio publico.

## GitHub Pages

El workflow `.github/workflows/pages-demo.yml` construye la demo con:

```text
npm run build:demo
```

Luego publica `dist` en GitHub Pages.

En GitHub, activar Pages desde:

```text
Settings > Pages > Source: GitHub Actions
```

## Netlify

Configuracion recomendada:

```text
Build command: npm run build:demo
Publish directory: dist
```

Variable opcional:

```text
VITE_DEMO_MODE=true
```
