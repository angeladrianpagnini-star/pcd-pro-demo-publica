# PCD Pro Demo Publica

Demo estatica de portfolio para PCD Pro.

## Ejecutar local

```powershell
npm.cmd install
npm.cmd run dev:demo
```

## Build publico

```powershell
npm.cmd run build:demo
```

## Publicacion

GitHub Pages usa el workflow incluido en `.github/workflows/pages-demo.yml`.

Netlify:

- Build command: `npm run build:demo`
- Publish directory: `dist`

Esta demo no incluye backend, base de datos, credenciales reales ni datos sensibles.
