# 🎓 Taller Práctico: Sistema de Autenticación con Flutter y Supabase

## 📚 Descripción del Taller

En este taller aprenderás a configurar y desplegar una aplicación Flutter completa con autenticación usando Supabase como backend y Vercel para el manejo de recuperación de contraseñas.

### 🎯 Objetivos de Aprendizaje

Al finalizar este taller, serás capaz de:

- ✅ Configurar un proyecto Flutter con arquitectura limpia
- ✅ Integrar Supabase para autenticación
- ✅ Manejar variables de entorno de forma segura
- ✅ Desplegar páginas web en Vercel con funciones serverless
- ✅ Configurar Deep Links en Android
- ✅ Implementar flujos completos de autenticación (login, registro, recuperación de contraseña)

### ⏱️ Duración Estimada

- **Configuración inicial**: 30 minutos
- **Configuración de Supabase**: 20 minutos
- **Pruebas locales**: 20 minutos
- **Deployment en Vercel**: 20 minutos
- **Pruebas finales**: 10 minutos
- **Total**: ~2 horas

---

## 📋 Pre-requisitos

### Software Necesario

- [ ] Flutter SDK 3.6.2 o superior ([Descargar](https://flutter.dev/docs/get-started/install))
- [ ] Android Studio o VS Code con extensiones de Flutter
- [ ] Git instalado ([Descargar](https://git-scm.com/downloads))
- [ ] Node.js 18+ ([Descargar](https://nodejs.org/))
- [ ] Un dispositivo Android físico o emulador configurado

### Cuentas Requeridas

- [ ] Cuenta de GitHub ([Registrarse](https://github.com/signup))
- [ ] Cuenta de Supabase ([Registrarse](https://supabase.com/dashboard))
- [ ] Cuenta de Vercel ([Registrarse](https://vercel.com/signup))

### Conocimientos Previos

- Conceptos básicos de Flutter y Dart
- Conocimiento básico de Git
- Fundamentos de autenticación (opcional pero recomendado)

---

## 🚀 Parte 1: Configuración Inicial del Proyecto

### Paso 1.1: Clonar el Repositorio

```bash
# Clona el repositorio del taller
git clone [URL-DEL-REPOSITORIO]

# Navega a la carpeta del proyecto
cd login_pro

# Verifica que estás en la rama correcta
git branch
```

### Paso 1.2: Verificar la Estructura del Proyecto

Familiarízate con la estructura del proyecto:

```
login_pro/
├── lib/
│   ├── core/                    # Configuración y utilidades
│   │   ├── config/
│   │   ├── constants/
│   │   └── theme/
│   ├── features/                # Características de la app
│   │   └── auth/               # Módulo de autenticación
│   │       ├── data/           # Fuentes de datos y modelos
│   │       ├── domain/         # Lógica de negocio
│   │       └── presentation/   # UI y BLoC
│   └── main.dart               # Punto de entrada
├── android/                     # Configuración Android
├── vercel/                      # Deployment de recuperación de contraseña
│   ├── api/
│   └── public/
├── .env.example                 # Plantilla de variables de entorno
├── pubspec.yaml                # Dependencias del proyecto
└── TALLER_PRACTICO.md          # Este archivo
```

### Paso 1.3: Instalar Dependencias de Flutter

```bash
# Asegúrate de estar en la raíz del proyecto
flutter pub get
```

**Resultado esperado:**
```
Running "flutter pub get" in login_pro...
Resolving dependencies... (X.Xs)
Got dependencies!
```

### ✅ Checkpoint 1

- [ ] Proyecto clonado correctamente
- [ ] Estructura del proyecto revisada
- [ ] Dependencias instaladas sin errores

---

## 🗄️ Parte 2: Configuración de Supabase (Backend)

### Paso 2.1: Crear Proyecto en Supabase

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Haz clic en **"New Project"**
3. Completa el formulario:
   - **Name**: `login-pro-taller` (o el nombre que prefieras)
   - **Database Password**: Genera una contraseña segura y **guárdala**
   - **Region**: Selecciona la región más cercana a ti
   - **Pricing Plan**: Free (suficiente para el taller)
4. Haz clic en **"Create new project"**
5. Espera 2-3 minutos mientras Supabase configura tu proyecto

### Paso 2.2: Obtener Credenciales de Supabase

Una vez creado el proyecto:

1. En el dashboard, ve a **Settings** (⚙️) en el menú lateral
2. Haz clic en **API**
3. Copia los siguientes valores (los necesitarás pronto):

   ```
   Project URL: https://[tu-proyecto-id].supabase.co
   anon/public key: eyJhbGci...
   ```

   > 💡 **Tip**: Abre un archivo de texto temporal para guardar estas credenciales

### Paso 2.3: Configurar Políticas de Seguridad (RLS)

Por defecto, Supabase bloquea todo acceso a las tablas. Para este taller, configuraremos el acceso básico:

1. En el dashboard de Supabase, ve a **Authentication** en el menú lateral
2. Ve a **Policies**
3. Por ahora, el sistema de autenticación funcionará sin tablas adicionales
4. Supabase maneja automáticamente la tabla `auth.users`

> 📚 **Para Aprender Más**: Investiga sobre Row Level Security (RLS) en la [documentación de Supabase](https://supabase.com/docs/guides/auth/row-level-security)

### Paso 2.4: Configurar Redirect URLs

1. En el dashboard de Supabase, ve a **Authentication** → **URL Configuration**
2. En **Redirect URLs**, añade las siguientes URLs (por ahora añade la de desarrollo):

   ```
   http://localhost:3000/*
   loginpro://callback
   ```

   > ⚠️ **Nota**: Más adelante añadiremos la URL de producción de Vercel

3. Haz clic en **Save**

### Paso 2.5: Personalizar Email Templates (Opcional)

1. Ve a **Authentication** → **Email Templates**
2. Selecciona **"Reset Password"**
3. Observa cómo está configurado el template
4. Por ahora déjalo como está (lo configuraremos después de desplegar en Vercel)

### ✅ Checkpoint 2

- [ ] Proyecto de Supabase creado
- [ ] Credenciales copiadas (URL y Anon Key)
- [ ] Redirect URLs configuradas
- [ ] Email templates revisados

---

## 🔐 Parte 3: Configuración de Variables de Entorno

### Paso 3.1: Entender las Variables de Entorno

Las variables de entorno nos permiten:
- 🔒 Mantener credenciales sensibles fuera del código
- 🌍 Usar diferentes configuraciones para desarrollo y producción
- 🚫 Evitar subir secretos a GitHub

### Paso 3.2: Crear el Archivo .env

```bash
# Desde la raíz del proyecto
cp .env.example .env
```

### Paso 3.3: Configurar las Variables

Abre el archivo `.env` que acabas de crear y reemplaza los valores:

```env
# Supabase Configuration
SUPABASE_URL=https://[tu-proyecto-id].supabase.co
SUPABASE_ANON_KEY=eyJhbGci...tu-anon-key-completa

# Vercel Configuration (por ahora deja este valor temporal)
VERCEL_BASE_URL=http://localhost:3000
```

> ⚠️ **IMPORTANTE**:
> - Reemplaza `[tu-proyecto-id]` con el ID de TU proyecto de Supabase
> - Pega la Anon Key completa (es un JWT largo)
> - NO compartas este archivo `.env` con nadie

### Paso 3.4: Verificar .gitignore

Verifica que el archivo `.env` esté en `.gitignore`:

```bash
# Ver contenido del .gitignore
cat .gitignore | grep -A 3 "# Environment variables"
```

**Deberías ver:**
```
# Environment variables
.env
.env.local
.env.*.local
```

### ✅ Checkpoint 3

- [ ] Archivo `.env` creado
- [ ] Variables configuradas con TUS credenciales de Supabase
- [ ] Verificado que `.env` está en `.gitignore`

---

## 🧪 Parte 4: Pruebas Locales de la Aplicación Flutter

### Paso 4.1: Verificar la Configuración

```bash
# Verifica que Flutter puede detectar dispositivos
flutter devices
```

**Deberías ver al menos un dispositivo disponible** (emulador o físico)

### Paso 4.2: Ejecutar la Aplicación

```bash
# Ejecuta en modo debug
flutter run
```

**Proceso esperado:**
1. ⏳ Compilación (puede tardar 2-3 minutos la primera vez)
2. 🚀 La app se instala en tu dispositivo/emulador
3. 📱 Se abre la pantalla de login

### Paso 4.3: Probar Registro de Usuario

En la aplicación:

1. Haz clic en **"¿No tienes cuenta? Regístrate"**
2. Completa el formulario:
   - **Email**: tu-email@ejemplo.com
   - **Contraseña**: Minimo123 (mínimo 6 caracteres)
   - **Confirmar contraseña**: Minimo123
3. Haz clic en **"Registrarse"**

**Resultado esperado:**
- ✅ Se crea el usuario en Supabase
- ✅ Recibes un email de verificación
- ✅ Se redirige a la pantalla de bienvenida

> 📧 **Nota**: Revisa tu bandeja de entrada (y spam) para el email de verificación

### Paso 4.4: Verificar Usuario en Supabase

1. Ve al dashboard de Supabase
2. Navega a **Authentication** → **Users**
3. Deberías ver tu nuevo usuario en la lista

### Paso 4.5: Probar Login

1. En la app, haz clic en **"Cerrar Sesión"**
2. Ingresa las credenciales que usaste para registrarte
3. Haz clic en **"Iniciar Sesión"**

**Resultado esperado:**
- ✅ Login exitoso
- ✅ Redirige a pantalla de bienvenida con tu email

### Paso 4.6: Explorar la Aplicación

Toma unos minutos para explorar:

- 🎨 El diseño de la UI
- 🔄 Las validaciones de formularios
- ⚡ Los estados de carga
- 📱 Las transiciones entre pantallas

### ✅ Checkpoint 4

- [ ] App ejecutándose sin errores
- [ ] Usuario registrado exitosamente
- [ ] Login funciona correctamente
- [ ] Usuario visible en Supabase Dashboard

---

## 🌐 Parte 5: Deployment en Vercel (Password Reset)

### Paso 5.1: Instalar Vercel CLI

```bash
# Instala Vercel CLI globalmente
npm install -g vercel

# Verifica la instalación
vercel --version
```

### Paso 5.2: Login en Vercel

```bash
vercel login
```

Sigue las instrucciones para autenticarte (se abrirá tu navegador)

### Paso 5.3: Preparar el Proyecto para Deployment

```bash
# Navega a la carpeta vercel
cd vercel

# Verifica el contenido
ls -la
```

Deberías ver:
```
api/          # Funciones serverless
public/       # Archivos HTML estáticos
README.md
```

### Paso 5.4: Deploy a Vercel

```bash
# Desde la carpeta vercel/
vercel
```

**Proceso interactivo:**

1. **Set up and deploy?** → `Y` (Yes)
2. **Which scope?** → Selecciona tu cuenta personal
3. **Link to existing project?** → `N` (No)
4. **What's your project's name?** → `login-pro-taller` (o el nombre que prefieras)
5. **In which directory is your code located?** → `.` (punto)
6. **Want to modify these settings?** → `N` (No)

⏳ Espera mientras Vercel despliega tu proyecto (30-60 segundos)

**Resultado esperado:**
```
✅  Production: https://login-pro-taller.vercel.app [copied to clipboard]
```

> 💡 **Guarda esta URL**, la necesitarás en los siguientes pasos

### Paso 5.5: Configurar Variables de Entorno en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto (`login-pro-taller`)
3. Ve a **Settings** → **Environment Variables**
4. Añade las siguientes variables:

   **Variable 1:**
   - Key: `SUPABASE_URL`
   - Value: `https://[tu-proyecto-id].supabase.co`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Key: `SUPABASE_ANON_KEY`
   - Value: `eyJhbGci...` (tu anon key completa)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

5. Haz clic en **Save** para cada variable

### Paso 5.6: Redeploy con Variables de Entorno

```bash
# Redeploy para que tome las nuevas variables
vercel --prod
```

### Paso 5.7: Probar la Función Serverless

Abre en tu navegador:

```
https://[tu-proyecto].vercel.app/api/config
```

**Deberías ver un JSON como:**
```json
{
  "supabaseUrl": "https://tu-proyecto.supabase.co",
  "supabaseAnonKey": "eyJhbGci..."
}
```

✅ Si ves esto, ¡las funciones serverless están funcionando!

### ✅ Checkpoint 5

- [ ] Vercel CLI instalado
- [ ] Proyecto desplegado en Vercel
- [ ] Variables de entorno configuradas
- [ ] API `/api/config` responde correctamente

---

## 🔗 Parte 6: Configuración de Deep Links y URLs

### Paso 6.1: Actualizar .env Local con URL de Vercel

Abre tu archivo `.env` en la raíz del proyecto Flutter y actualiza:

```env
# Cambia esto:
VERCEL_BASE_URL=http://localhost:3000

# Por esto:
VERCEL_BASE_URL=https://[tu-proyecto].vercel.app
```

Guarda el archivo.

### Paso 6.2: Actualizar AndroidManifest.xml

Abre el archivo: `android/app/src/main/AndroidManifest.xml`

Busca la línea (alrededor de la línea 43):

```xml
<data android:scheme="https"
      android:host="enlaces-seven.vercel.app"/>
```

Cámbiala por:

```xml
<data android:scheme="https"
      android:host="[tu-proyecto].vercel.app"/>
```

> ⚠️ **Importante**: Reemplaza `[tu-proyecto]` con el nombre real de tu deployment de Vercel

### Paso 6.3: Actualizar Redirect URLs en Supabase

1. Ve al dashboard de Supabase
2. **Authentication** → **URL Configuration**
3. En **Redirect URLs**, añade:

   ```
   https://[tu-proyecto].vercel.app/*
   loginpro://callback
   ```

4. **Save**

### Paso 6.4: Actualizar Email Template en Supabase

1. En Supabase, ve a **Authentication** → **Email Templates**
2. Selecciona **"Reset Password"**
3. Cambia la URL de confirmación:

   **Encuentra:**
   ```
   {{ .ConfirmationURL }}
   ```

   **Reemplaza con:**
   ```
   https://[tu-proyecto].vercel.app/reset-password?token={{ .Token }}&type=recovery
   ```

4. **Save**

### Paso 6.5: Reconstruir la App con Nueva Configuración

```bash
# Regresa a la raíz del proyecto
cd ..

# Limpia el build anterior
flutter clean

# Reinstala dependencias
flutter pub get

# Ejecuta nuevamente
flutter run
```

### ✅ Checkpoint 6

- [ ] `.env` actualizado con URL de Vercel
- [ ] `AndroidManifest.xml` actualizado
- [ ] Redirect URLs configuradas en Supabase
- [ ] Email template actualizado
- [ ] App reconstruida

---

## 🔑 Parte 7: Probar Recuperación de Contraseña (Flow Completo)

### Paso 7.1: Solicitar Recuperación de Contraseña

1. En la app, ve a la pantalla de login
2. Haz clic en **"¿Olvidaste tu contraseña?"**
3. Ingresa el email que registraste anteriormente
4. Haz clic en **"Enviar"**

**Resultado esperado:**
- ✅ Mensaje: "Se ha enviado un enlace a tu correo"
- ✅ No hay errores en consola

### Paso 7.2: Revisar Email

1. Abre tu correo electrónico
2. Busca el email de Supabase (revisa spam si no lo ves)
3. Deberías ver un email con asunto: **"Reset Password"**

### Paso 7.3: Abrir el Enlace de Recuperación

1. Haz clic en el enlace del email
2. **Deberías ser redirigido a**: `https://[tu-proyecto].vercel.app/reset-password`
3. Verás un formulario para establecer nueva contraseña

### Paso 7.4: Establecer Nueva Contraseña

1. Ingresa una nueva contraseña (mínimo 6 caracteres)
2. Confirma la contraseña
3. Haz clic en **"Cambiar Contraseña"**

**Resultado esperado:**
- ✅ Mensaje: "Contraseña actualizada exitosamente"
- ✅ Botón para abrir la aplicación

### Paso 7.5: Regresar a la App y Probar Login

1. Haz clic en **"Ir a la Aplicación"** (o abre la app manualmente)
2. Ingresa tu email
3. Ingresa la **nueva contraseña** que acabas de establecer
4. Haz clic en **"Iniciar Sesión"**

**Resultado esperado:**
- ✅ Login exitoso con la nueva contraseña
- ✅ Redirige a pantalla de bienvenida

### ✅ Checkpoint 7

- [ ] Email de recuperación recibido
- [ ] Enlace de Vercel funciona correctamente
- [ ] Contraseña actualizada exitosamente
- [ ] Login funciona con nueva contraseña

---

## 🎨 Parte 8: Exploración del Código (Análisis Técnico)

### Paso 8.1: Arquitectura del Proyecto

Este proyecto usa **Clean Architecture** con las siguientes capas:

```
Feature (Auth)
├── Presentation Layer (UI + BLoC)
│   ├── Pages (LoginPage, RegisterPage, WelcomePage)
│   └── BLoC (AuthBloc, AuthEvent, AuthState)
│
├── Domain Layer (Business Logic)
│   ├── Entities (User)
│   ├── Repositories (AuthRepository - Interface)
│   └── Use Cases (LoginUseCase, RegisterUseCase, etc.)
│
└── Data Layer (External Data)
    ├── Models (UserModel)
    ├── Repositories (AuthRepositoryImpl)
    └── Data Sources (AuthRemoteDataSource)
```

### Paso 8.2: Flujo de Datos en Login

Abre y analiza estos archivos en orden:

1. **UI** → `lib/features/auth/presentation/pages/login_page.dart`
   - ¿Cómo se capturan los datos del formulario?
   - ¿Cómo se dispara el evento de login?

2. **BLoC** → `lib/features/auth/presentation/bloc/auth_bloc.dart`
   - ¿Qué eventos maneja?
   - ¿Qué estados emite?

3. **Use Case** → `lib/features/auth/domain/usecases/login_usecase.dart`
   - ¿Cuál es su responsabilidad?
   - ¿Qué devuelve?

4. **Repository** → `lib/features/auth/data/repositories/auth_repository_impl.dart`
   - ¿Cómo maneja errores?
   - ¿Qué hace con los datos del data source?

5. **Data Source** → `lib/features/auth/data/datasources/auth_remote_data_source.dart`
   - ¿Cómo se comunica con Supabase?
   - ¿Qué métodos expone?

### Paso 8.3: Dependency Injection con GetIt

Abre: `lib/injection_container.dart`

**Preguntas para reflexionar:**
- ¿Cómo se registran las dependencias?
- ¿Qué es `@injectable` y `@lazySingleton`?
- ¿Por qué es útil la inyección de dependencias?

### Paso 8.4: Manejo de Variables de Entorno

Abre: `lib/core/constants/app_constants.dart`

**Observa:**
```dart
static String get supabaseUrl => dotenv.env['SUPABASE_URL'] ?? '';
```

**Preguntas:**
- ¿Por qué usar `dotenv.env` en lugar de constantes hardcodeadas?
- ¿Qué pasa si la variable no existe? (nota el `?? ''`)

### Paso 8.5: Función Serverless de Vercel

Abre: `vercel/api/config.js`

**Analiza:**
- ¿Por qué es necesaria esta función?
- ¿Cómo accede a las variables de entorno?
- ¿Qué headers CORS se configuran y por qué?

### ✅ Checkpoint 8

- [ ] Arquitectura del proyecto comprendida
- [ ] Flujo de datos analizado
- [ ] Inyección de dependencias revisada
- [ ] Manejo de env variables entendido

---

## 🐛 Parte 9: Debugging y Troubleshooting

### Problema 1: "No such file or directory: .env"

**Causa**: El archivo `.env` no existe

**Solución**:
```bash
cp .env.example .env
# Luego edita .env con tus credenciales
```

### Problema 2: "Supabase URL is empty"

**Causa**: Las variables de entorno no se cargaron correctamente

**Solución**:
1. Verifica que `.env` existe en la raíz del proyecto
2. Verifica que las variables están bien escritas (sin espacios extras)
3. Haz `flutter clean && flutter pub get`
4. Reinicia la app

### Problema 3: Login falla con error de red

**Causa**: URL o Anon Key incorrectos

**Solución**:
1. Verifica las credenciales en Supabase Dashboard
2. Copia nuevamente la URL y Anon Key
3. Actualiza `.env`
4. Reinicia la app

### Problema 4: Email de reset no llega

**Posibles causas y soluciones**:

1. **Email en spam** → Revisa carpeta de spam
2. **Email template mal configurado** → Verifica en Supabase: Authentication → Email Templates
3. **Redirect URL incorrecta** → Verifica en Supabase: Authentication → URL Configuration

### Problema 5: Vercel API retorna error 500

**Causa**: Variables de entorno no configuradas en Vercel

**Solución**:
1. Ve a Vercel Dashboard → Settings → Environment Variables
2. Verifica que `SUPABASE_URL` y `SUPABASE_ANON_KEY` estén configuradas
3. Haz `vercel --prod` para redeploy

### Problema 6: Deep Link no funciona

**Causa**: AndroidManifest no actualizado o mal configurado

**Solución**:
1. Verifica `android/app/src/main/AndroidManifest.xml`
2. Asegúrate que `android:host` tiene tu URL de Vercel correcta
3. Reconstruye: `flutter clean && flutter run`

---

## 🏆 Parte 10: Retos Adicionales (Opcional)

Una vez que todo funciona, intenta estos retos para profundizar tu aprendizaje:

### Reto 1: Agregar Validación de Email ⭐

**Objetivo**: Forzar que los usuarios verifiquen su email antes de poder hacer login

**Pistas**:
- Investiga `email_confirmed` en Supabase
- Modifica `AuthRemoteDataSourceImpl.signIn()`

### Reto 2: Implementar "Recordarme" ⭐⭐

**Objetivo**: Mantener la sesión del usuario aunque cierre la app

**Pistas**:
- Supabase ya maneja tokens automáticamente
- Investiga `supabase.auth.onAuthStateChange`
- Ya está parcialmente implementado, analiza el código

### Reto 3: Agregar Autenticación con Google ⭐⭐⭐

**Objetivo**: Permitir login con cuenta de Google

**Pistas**:
- Documéntate en: https://supabase.com/docs/guides/auth/social-login/auth-google
- Necesitarás configurar OAuth en Google Cloud Console
- Usa `supabase.auth.signInWithOAuth()`

### Reto 4: Implementar Dark Mode ⭐⭐

**Objetivo**: Agregar tema oscuro a la aplicación

**Pistas**:
- Revisa `lib/core/theme/app_theme.dart`
- Crea `darkTheme`
- Usa `ThemeMode` en `MaterialApp`

### Reto 5: Agregar Tests Unitarios ⭐⭐⭐

**Objetivo**: Escribir tests para los use cases y repositorios

**Pistas**:
- Crea carpeta `test/`
- Usa `flutter_test` package
- Mockea las dependencias con `mocktail`

### Reto 6: Agregar Perfil de Usuario ⭐⭐⭐

**Objetivo**: Permitir al usuario editar su nombre y foto

**Pistas**:
- Crea tabla `profiles` en Supabase
- Implementa `UpdateProfileUseCase`
- Añade página de perfil en la app

---

## 📊 Parte 11: Entregables del Taller

### Qué Debes Entregar

1. **Screenshot de Supabase Dashboard** mostrando:
   - Tu proyecto creado
   - Al menos 1 usuario registrado

2. **URL de tu deployment en Vercel**:
   - Link funcionando a: `https://[tu-proyecto].vercel.app/reset-password`

3. **Video corto (2-3 minutos)** o **Screenshots** demostrando:
   - ✅ Login exitoso
   - ✅ Registro de nuevo usuario
   - ✅ Recuperación de contraseña funcionando end-to-end

4. **Respuestas a las siguientes preguntas** (en un archivo `RESPUESTAS.md`):
   - ¿Qué es Clean Architecture y cuáles son sus ventajas?
   - ¿Por qué es importante NO subir el archivo `.env` a GitHub?
   - ¿Qué diferencia hay entre `anon key` y `service_role key` en Supabase?
   - Explica el flujo completo de recuperación de contraseña (desde que el usuario hace clic en "Olvidé mi contraseña" hasta que cambia la contraseña)

### Formato de Entrega

Crea un documento (PDF, Word, o Google Docs) con:

```
Nombre: [Tu Nombre]
Fecha: [Fecha]

--- LINKS ---
URL Vercel: https://...
Repositorio GitHub: https://... (si hiciste fork)

--- SCREENSHOTS ---
[Pega aquí tus capturas]

--- RESPUESTAS ---
1. Clean Architecture...
2. Variables de entorno...
3. Anon key vs Service role key...
4. Flujo de recuperación de contraseña...

--- RETOS COMPLETADOS (opcional) ---
- [x] Reto 1
- [ ] Reto 2
...
```

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [Flutter Docs](https://docs.flutter.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [BLoC Library](https://bloclibrary.dev/)

### Tutoriales Recomendados

- [Clean Architecture en Flutter](https://resocoder.com/2019/08/27/flutter-tdd-clean-architecture-course-1-explanation-project-structure/)
- [Supabase Auth con Flutter](https://supabase.com/docs/guides/getting-started/tutorials/with-flutter)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

### Videos (YouTube)

- "Flutter Clean Architecture" - Reso Coder
- "Supabase Full Course" - Fireship
- "BLoC State Management" - Flutter Official

---

## 💬 Soporte y Preguntas

### Durante el Taller

- 🙋 Levanta la mano si tienes dudas
- 💬 Usa el chat del grupo para preguntas rápidas
- 🤝 Ayuda a tus compañeros si ves que tienen dificultades

### Después del Taller

- 📧 Email del instructor: [tu-email@ejemplo.com]
- 💬 Grupo de Telegram/Discord: [link]
- 🐛 Reporta bugs en: [Issues del repositorio]

---

## ✅ Checklist Final

Antes de dar por terminado el taller, verifica:

### Configuración
- [ ] Proyecto clonado y dependencias instaladas
- [ ] Variables de entorno configuradas correctamente
- [ ] Archivo `.env` NO está en Git (verificar con `git status`)

### Supabase
- [ ] Proyecto creado en Supabase
- [ ] Al menos 1 usuario registrado
- [ ] Redirect URLs configuradas
- [ ] Email template actualizado

### Vercel
- [ ] Proyecto desplegado en Vercel
- [ ] Variables de entorno configuradas en Vercel Dashboard
- [ ] API `/api/config` responde correctamente

### Funcionalidad
- [ ] Registro de usuario funciona
- [ ] Login funciona
- [ ] Logout funciona
- [ ] Recuperación de contraseña funciona end-to-end
- [ ] Email de reset llega correctamente
- [ ] Deep link abre la app después de resetear contraseña

### Entregables
- [ ] Screenshots tomados
- [ ] Respuestas a preguntas completadas
- [ ] Documento de entrega preparado

---

## 🎓 Conclusión

¡Felicidades por completar el taller! 🎉

Has aprendido a:
- ✅ Configurar un backend completo con Supabase
- ✅ Implementar autenticación en Flutter
- ✅ Manejar variables de entorno de forma segura
- ✅ Desplegar funciones serverless en Vercel
- ✅ Configurar deep links en Android
- ✅ Integrar sistemas de recuperación de contraseñas

### Próximos Pasos

1. **Explora el código**: Tómate tiempo para leer y entender cada archivo
2. **Haz los retos**: Profundiza tu aprendizaje con los desafíos opcionales
3. **Personaliza**: Cambia colores, agrega funcionalidades, hazlo tuyo
4. **Comparte**: Muestra tu proyecto en LinkedIn/Twitter

### Feedback

Tu opinión es importante. Por favor completa la [encuesta de feedback](#) para ayudarnos a mejorar futuros talleres.

---

## 📄 Licencia

Este proyecto es con fines educativos. Siéntete libre de usarlo, modificarlo y compartirlo.

---

**¡Gracias por participar en el taller! 🚀**

*Desarrollado con ❤️ para enseñar Flutter y Supabase*
