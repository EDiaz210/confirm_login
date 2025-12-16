# 🔧 Configuración del Proyecto

Este proyecto usa variables de entorno para proteger las credenciales sensibles de Supabase.

## 📋 Requisitos Previos

- Flutter SDK
- Cuenta de Supabase
- Cuenta de Vercel (para deployment del password reset)

## 🚀 Configuración Inicial

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd login_pro
```

### 2. Configurar Variables de Entorno

#### Para la App Flutter:

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y reemplaza los valores:
   ```env
   SUPABASE_URL=https://tu-proyecto-id.supabase.co
   SUPABASE_ANON_KEY=tu-anon-key-aqui
   VERCEL_BASE_URL=https://tu-deployment.vercel.app
   ```

3. **Obtener las credenciales de Supabase:**
   - Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
   - Navega a **Settings** → **API**
   - Copia el `Project URL` → `SUPABASE_URL`
   - Copia el `anon/public key` → `SUPABASE_ANON_KEY`

#### Para Vercel (Password Reset):

**Nota**: Vercel NO usa archivos `.env` locales. Las variables se configuran directamente en el Dashboard de Vercel (ver sección de Deployment más abajo).

### 3. Instalar Dependencias

```bash
flutter pub get
```

## 🌐 Deployment en Vercel

### Paso 1: Deploy Inicial

1. Instala Vercel CLI (si no lo tienes):
   ```bash
   npm install -g vercel
   ```

2. Deploy desde la carpeta `vercel/`:
   ```bash
   cd vercel
   vercel --prod
   ```

3. Sigue las instrucciones del CLI para vincular tu proyecto

### Paso 2: Configurar Variables de Entorno en Vercel

⚠️ **IMPORTANTE**: Vercel lee las variables de entorno desde su Dashboard, NO desde archivos `.env` locales.

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.app)
2. Navega a **Settings** → **Environment Variables**
3. Añade las siguientes variables:

   | Variable | Valor | Environments |
   |----------|-------|--------------|
   | `SUPABASE_URL` | `https://tu-proyecto.supabase.co` | Production, Preview, Development |
   | `SUPABASE_ANON_KEY` | `tu-anon-key` | Production, Preview, Development |

4. Haz **Redeploy** después de añadir las variables:
   ```bash
   vercel --prod
   ```

### Paso 3: Configurar URLs en Supabase y Flutter

Una vez desplegado, copia la URL de Vercel (ej: `https://tu-proyecto.vercel.app`) y actualiza:

1. **En el archivo `.env` de Flutter**:
   ```env
   VERCEL_BASE_URL=https://tu-proyecto.vercel.app
   ```

2. **En Supabase Dashboard**:
   - Ve a **Authentication** → **URL Configuration**
   - Añade a **Redirect URLs**:
     - `https://tu-proyecto.vercel.app/*`
     - `loginpro://callback`

3. **En AndroidManifest.xml** (si cambió tu URL de Vercel):
   ```xml
   <data android:scheme="https"
         android:host="tu-proyecto.vercel.app"/>
   ```

