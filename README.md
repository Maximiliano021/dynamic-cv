# Dynamic CV (Astro + TypeScript)

CV dinámico y reutilizable con soporte Español/Inglés, enlaces directos a plataformas (email, GitHub, LinkedIn y teléfono) y listo para imprimir en A4. Ideal para reclutadores, auto-uso y desarrolladores que quieran tener su portafolio personal con mínimos cambios.

![image](https://github.com/user-attachments/assets/fb283f0e-f40e-4be9-b378-c0dbb8dbe686)

- Demo: https://maximiliano021.github.io/dynamic-cv/
- Stack: Astro, TypeScript, Tailwind CSS

## Características
- Multilenguaje (ES/EN) con selector de idioma.
- Datos externos vía JSON: edición rápida sin tocar el código.
- Enlaces directos a Email, Teléfono, GitHub y LinkedIn.
- Estilos de impresión preparados para A4 (guardar como PDF).
- Deploy sencillo en GitHub Pages (configurado para subcarpeta `dynamic-cv`).
- Alias `@` apuntando a `src/` para imports más limpios.

## Requisitos
- Node.js 22.18 o LTS recomendado
- npm (o pnpm/yarn si prefieres)

## Instalación y ejecución
```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev
# Abre http://localhost:4321

# Build de producción
npm run build

# Previsualización del build
npm run preview
```

## Datos e i18n
El contenido del CV se define en dos archivos JSON:
- Español: [cv.json](cv.json)
- Inglés: [cv-en.json](cv-en.json)

Estructura mínima (ejemplo abreviado):
```json
{
	"cv": {
		"lang": "es",
		"basics": {
			"name": "Nombre Apellido",
			"label": "Rol/Título",
			"email": "correo@dominio.com",
			"phone": "+549...",
			"url": "https://linkedin.com/in/usuario",
			"summary": "Resumen breve...",
			"location": { "city": "Ciudad", "region": "País" },
			"profiles": [
				{ "network": "LinkedIn", "username": "usuario", "url": "https://..." },
				{ "network": "GitHub", "username": "usuario", "url": "https://..." }
			]
		},
		"work": [ { "name": "Empresa", "position": "Rol", "startDate": "YYYY-MM-DD" } ],
		"education": [ { "institution": "Institución", "area": "Carrera" } ],
		"projects": [ { "name": "Proyecto", "url": "https://..." } ],
		"skills": [ { "name": "Tecnología", "level": "Nivel" } ]
	}
}
```

- La raíz `/` sirve contenido en Español y `/en` en Inglés.
- El componente `LanguageSwitcher` permite alternar rápidamente.

## Imagen de perfil
Coloca la imagen en `src/assets` y usa import de Astro/Vite para que el `base` se aplique automáticamente.
- Archivo: [src/assets/img.jpeg](src/assets/img.jpeg)
- Uso en el componente: [src/components/sections/Hero.astro](src/components/sections/Hero.astro)

Ejemplo dentro del componente:
```astro
---
import heroImage from '@/assets/img.jpeg'
---
<img
	class="w-32 object-cover rounded-2xl aspect-square"
	src={heroImage.src}
	width={heroImage.width}
	height={heroImage.height}
	alt={name}
/>
```

Consejos:
- Si decides usar archivos en `public/`, recuerda que con `base` debes referenciarlos con el prefijo (por ejemplo: `/dynamic-cv/img.jpeg`) o usar `${import.meta.env.BASE_URL}`.
- Recomendado: `src/assets` + import para que Astro/Vite gestionen la URL.

## Impresión en A4
- Abre el sitio y usa la opción del navegador "Imprimir".
- Configura:
	- Tamaño: A4
	- Márgenes: estándar o estrechos
	- Incluir gráficos de fondo: activado (para estilos)
	- Encabezado/pie del navegador: desactivado (opcional)
- El layout está preparado para evitar cortes y mantener legibilidad.

## Deploy en GitHub Pages
Configuración ya preparada para publicar bajo `https://<usuario>.github.io/dynamic-cv/`.

1) Configurar `site` y `base` en Astro:
- Archivo: [astro.config.mjs](astro.config.mjs)
```js
export default defineConfig({
	site: "https://<usuario>.github.io",
	base: "/dynamic-cv",
});
```

2) Workflow de deploy:
- Archivo: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- Debe incluir `environment: { name: github-pages }` en el job de `deploy`.
- Un push a `main` dispara el build y la publicación.

3) Habilitar Pages en GitHub:
- Settings → Pages → Source: GitHub Actions.

## Troubleshooting
- La imagen no aparece en producción:
	- Si está en `public/`, usa `src="/dynamic-cv/tu-imagen.ext"` o `src={`${import.meta.env.BASE_URL}tu-imagen.ext`}`.
	- Preferible moverla a `src/assets` y usar import (`heroImage.src`).
- Error "Missing environment" en Actions:
	- Asegúrate de tener `environment: name: github-pages` en el job de deploy del workflow.
- Caché del navegador:
	- Forzar recarga dura (Cmd+Shift+R) si cambiaste rutas o imágenes.

## Alias de paths
- Definido en [tsconfig.json](tsconfig.json):
```json
{"compilerOptions":{"paths":{"@/*":["src/*"]}}}
```
- Importa componentes e iconos desde `@/`.

## Estructura del proyecto (abreviado)
```
public/
	robots.txt
src/
	assets/
		img.jpeg
	components/
		sections/
			Hero.astro
	pages/
		index.astro
		en/
			index.astro
astro.config.mjs
cv.json
cv-en.json
```

## Autor
- Maximiliano Escudero — Demo: https://maximiliano021.github.io/dynamic-cv/
