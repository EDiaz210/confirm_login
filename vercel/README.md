# Vercel Deployment para Login Pro

Este directorio contiene las páginas web que se despliegan en Vercel para manejar:
- Verificación de email
- Restablecimiento de contraseña

## Configuración

### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2. Actualizar variables
En ambos archivos HTML (`verify-email.html` y `reset-password.html`), actualiza:
- `YOUR_SUPABASE_URL` con tu URL de Supabase
- `YOUR_SUPABASE_ANON_KEY` con tu Anon Key de Supabase

### 3. Desplegar a Vercel
```bash
cd vercel
vercel login
vercel --prod
```

### 4. Configurar Supabase

Una vez desplegado, obtén tu URL de Vercel (ej: `https://tu-proyecto.vercel.app`) y configura en Supabase:

#### Authentication > URL Configuration:
- **Site URL**: `loginpro://`
- **Redirect URLs**:
  - `https://tu-proyecto.vercel.app/verify-email`
  - `https://tu-proyecto.vercel.app/reset-password`
  - `loginpro://verified`
  - `loginpro://password-reset-success`

#### Email Templates:
Actualiza las plantillas de email en Supabase para usar tus URLs de Vercel:

**Confirm signup:**
```html
<h2>Confirma tu email</h2>
<p>Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
<a href="https://tu-proyecto.vercel.app/verify-email?token={{ .Token }}&type=signup">Confirmar email</a>
```

**Reset password:**
```html
<h2>Restablecer contraseña</h2>
<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
<a href="https://tu-proyecto.vercel.app/reset-password?token={{ .Token }}&type=recovery">Restablecer contraseña</a>
```

## Funcionalidades

### verify-email.html
- Recibe el token de verificación de Supabase
- Muestra estado de carga mientras verifica
- Redirige a la app mediante deep link cuando es exitoso
- Muestra error si el enlace es inválido

### reset-password.html
- Permite al usuario ingresar nueva contraseña
- Valida requisitos de contraseña en tiempo real
- Actualiza la contraseña en Supabase
- Redirige a la app una vez completado

## Deep Links

Las páginas redirigen a la app usando:
- `loginpro://verified` - después de verificar email
- `loginpro://password-reset-success` - después de cambiar contraseña

Asegúrate de configurar estos deep links en tu app Flutter.
