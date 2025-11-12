-- ============================================
-- 🗄️ SCHEMA COMPLETO DE BASE DE DATOS COCOIN
-- ============================================
-- Este script crea todas las tablas necesarias para el dashboard de COCOIN
-- Ejecuta este script completo en el SQL Editor de Supabase
-- ============================================

-- ============================================
-- 1. TABLAS PRINCIPALES (Usadas por el código actual)
-- ============================================

-- 📚 Tabla: clases_tomadas
-- Almacena las clases educativas que cada usuario ha completado
CREATE TABLE IF NOT EXISTS clases_tomadas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  clase_id TEXT NOT NULL,
  clase_titulo TEXT NOT NULL,
  clase_contenido TEXT,
  fecha_tomada TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Evitar duplicados: un usuario no puede tomar la misma clase dos veces
  UNIQUE(user_id, clase_id)
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_clases_user_id ON clases_tomadas(user_id);
CREATE INDEX IF NOT EXISTS idx_clases_fecha ON clases_tomadas(fecha_tomada DESC);
CREATE INDEX IF NOT EXISTS idx_clases_clase_id ON clases_tomadas(clase_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE clases_tomadas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Users can view their own classes" ON clases_tomadas;
CREATE POLICY "Users can view their own classes"
  ON clases_tomadas FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own classes" ON clases_tomadas;
CREATE POLICY "Users can insert their own classes"
  ON clases_tomadas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own classes" ON clases_tomadas;
CREATE POLICY "Users can update their own classes"
  ON clases_tomadas FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================

-- 🎯 Tabla: retos_completados
-- Almacena los retos que cada usuario ha completado
CREATE TABLE IF NOT EXISTS retos_completados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reto_id TEXT NOT NULL,
  reto_titulo TEXT NOT NULL,
  reto_descripcion TEXT,
  recompensa TEXT,
  fecha_completado TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Evitar duplicados: un usuario no puede completar el mismo reto dos veces
  UNIQUE(user_id, reto_id)
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_retos_user_id ON retos_completados(user_id);
CREATE INDEX IF NOT EXISTS idx_retos_fecha ON retos_completados(fecha_completado DESC);
CREATE INDEX IF NOT EXISTS idx_retos_reto_id ON retos_completados(reto_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE retos_completados ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Users can view their own retos" ON retos_completados;
CREATE POLICY "Users can view their own retos"
  ON retos_completados FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can view retos for ranking" ON retos_completados;
CREATE POLICY "Anyone can view retos for ranking"
  ON retos_completados FOR SELECT
  USING (true); -- Permitir ver todos los retos para el ranking

DROP POLICY IF EXISTS "Users can insert their own retos" ON retos_completados;
CREATE POLICY "Users can insert their own retos"
  ON retos_completados FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================

-- 🎵 Tabla: cantos_diarios
-- Almacena los cantos diarios (pensamientos, aprendizajes) de cada usuario
CREATE TABLE IF NOT EXISTS cantos_diarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  canto_texto TEXT NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_cantos_user_id ON cantos_diarios(user_id);
CREATE INDEX IF NOT EXISTS idx_cantos_fecha ON cantos_diarios(fecha DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE cantos_diarios ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Users can view their own cantos" ON cantos_diarios;
CREATE POLICY "Users can view their own cantos"
  ON cantos_diarios FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own cantos" ON cantos_diarios;
CREATE POLICY "Users can insert their own cantos"
  ON cantos_diarios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own cantos" ON cantos_diarios;
CREATE POLICY "Users can delete their own cantos"
  ON cantos_diarios FOR DELETE
  USING (auth.uid() = user_id);

-- Habilitar Realtime para cantos_diarios
ALTER PUBLICATION supabase_realtime ADD TABLE cantos_diarios;

-- ============================================

-- 👥 Tabla: comunidad_publicaciones
-- Almacena las publicaciones públicas de la comunidad
CREATE TABLE IF NOT EXISTS comunidad_publicaciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contenido TEXT NOT NULL,
  fecha_publicacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_comunidad_fecha ON comunidad_publicaciones(fecha_publicacion DESC);
CREATE INDEX IF NOT EXISTS idx_comunidad_user_id ON comunidad_publicaciones(user_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE comunidad_publicaciones ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Anyone can view publicaciones" ON comunidad_publicaciones;
CREATE POLICY "Anyone can view publicaciones"
  ON comunidad_publicaciones FOR SELECT
  USING (true); -- Muro público, todos pueden ver

DROP POLICY IF EXISTS "Authenticated users can insert publicaciones" ON comunidad_publicaciones;
CREATE POLICY "Authenticated users can insert publicaciones"
  ON comunidad_publicaciones FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own publicaciones" ON comunidad_publicaciones;
CREATE POLICY "Users can delete their own publicaciones"
  ON comunidad_publicaciones FOR DELETE
  USING (auth.uid() = user_id);

-- Habilitar Realtime para comunidad_publicaciones
ALTER PUBLICATION supabase_realtime ADD TABLE comunidad_publicaciones;

-- ============================================
-- 2. TABLAS ADICIONALES (Para expansión futura)
-- ============================================

-- 🎓 Tabla: clases
-- Catálogo de clases disponibles (opcional, para gestión de clases)
CREATE TABLE IF NOT EXISTS clases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  usuario_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  activa BOOLEAN DEFAULT true,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_clases_activa ON clases(activa);
CREATE INDEX IF NOT EXISTS idx_clases_orden ON clases(orden);

-- Habilitar Row Level Security (RLS)
ALTER TABLE clases ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Anyone can view active clases" ON clases;
CREATE POLICY "Anyone can view active clases"
  ON clases FOR SELECT
  USING (activa = true);

DROP POLICY IF EXISTS "Admins can manage clases" ON clases;
CREATE POLICY "Admins can manage clases"
  ON clases FOR ALL
  USING (false); -- Por ahora, solo lectura. Configurar según necesidad

-- ============================================

-- 🎯 Tabla: retos
-- Catálogo de retos disponibles (opcional, para gestión de retos)
CREATE TABLE IF NOT EXISTS retos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descripcion TEXT NOT NULL,
  estado BOOLEAN DEFAULT true,
  recompensa TEXT,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  tipo TEXT DEFAULT 'general', -- 'general', 'semanal', 'especial'
  fecha_inicio TIMESTAMP WITH TIME ZONE,
  fecha_fin TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_retos_estado ON retos(estado);
CREATE INDEX IF NOT EXISTS idx_retos_tipo ON retos(tipo);

-- Habilitar Row Level Security (RLS)
ALTER TABLE retos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Anyone can view active retos" ON retos;
CREATE POLICY "Anyone can view active retos"
  ON retos FOR SELECT
  USING (estado = true);

-- ============================================

-- 🎵 Tabla: cantos
-- Versión alternativa de cantos (si prefieres este nombre)
CREATE TABLE IF NOT EXISTS cantos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contenido TEXT NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_cantos_usuario_id ON cantos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_cantos_fecha ON cantos(fecha DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE cantos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Users can view their own cantos" ON cantos;
CREATE POLICY "Users can view their own cantos"
  ON cantos FOR SELECT
  USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Users can insert their own cantos" ON cantos;
CREATE POLICY "Users can insert their own cantos"
  ON cantos FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

-- Habilitar Realtime para cantos
ALTER PUBLICATION supabase_realtime ADD TABLE cantos;

-- ============================================

-- 👥 Tabla: comunidad
-- Versión alternativa de comunidad (si prefieres este nombre)
CREATE TABLE IF NOT EXISTS comunidad (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mensaje TEXT NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_comunidad_fecha ON comunidad(fecha DESC);
CREATE INDEX IF NOT EXISTS idx_comunidad_usuario_id ON comunidad(usuario_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE comunidad ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Anyone can view comunidad" ON comunidad;
CREATE POLICY "Anyone can view comunidad"
  ON comunidad FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert comunidad" ON comunidad;
CREATE POLICY "Authenticated users can insert comunidad"
  ON comunidad FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

-- Habilitar Realtime para comunidad
ALTER PUBLICATION supabase_realtime ADD TABLE comunidad;

-- ============================================

-- 🔥 Tabla: reto_corral
-- Retos especiales del corral (retos semanales, especiales)
CREATE TABLE IF NOT EXISTS reto_corral (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descripcion TEXT NOT NULL,
  completado BOOLEAN DEFAULT false,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reto_id TEXT, -- ID del reto (ej: 'reto-semanal-1')
  fecha_completado TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(usuario_id, reto_id) -- Un usuario no puede completar el mismo reto dos veces
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_reto_corral_usuario_id ON reto_corral(usuario_id);
CREATE INDEX IF NOT EXISTS idx_reto_corral_completado ON reto_corral(completado);
CREATE INDEX IF NOT EXISTS idx_reto_corral_reto_id ON reto_corral(reto_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE reto_corral ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Users can view their own reto_corral" ON reto_corral;
CREATE POLICY "Users can view their own reto_corral"
  ON reto_corral FOR SELECT
  USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Anyone can view reto_corral for ranking" ON reto_corral;
CREATE POLICY "Anyone can view reto_corral for ranking"
  ON reto_corral FOR SELECT
  USING (true); -- Para ranking

DROP POLICY IF EXISTS "Users can insert their own reto_corral" ON reto_corral;
CREATE POLICY "Users can insert their own reto_corral"
  ON reto_corral FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Users can update their own reto_corral" ON reto_corral;
CREATE POLICY "Users can update their own reto_corral"
  ON reto_corral FOR UPDATE
  USING (auth.uid() = usuario_id);

-- ============================================

-- 🏆 Tabla: ranking
-- Ranking de usuarios más activos del corral
CREATE TABLE IF NOT EXISTS ranking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  puntos INTEGER DEFAULT 0,
  retos_completados INTEGER DEFAULT 0,
  cantos_guardados INTEGER DEFAULT 0,
  clases_tomadas INTEGER DEFAULT 0,
  publicaciones INTEGER DEFAULT 0,
  ultima_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para ranking rápido
CREATE INDEX IF NOT EXISTS idx_ranking_puntos ON ranking(puntos DESC);
CREATE INDEX IF NOT EXISTS idx_ranking_retos ON ranking(retos_completados DESC);
CREATE INDEX IF NOT EXISTS idx_ranking_usuario_id ON ranking(usuario_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE ranking ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Anyone can view ranking" ON ranking;
CREATE POLICY "Anyone can view ranking"
  ON ranking FOR SELECT
  USING (true); -- Ranking público

DROP POLICY IF EXISTS "Users can update their own ranking" ON ranking;
CREATE POLICY "Users can update their own ranking"
  ON ranking FOR UPDATE
  USING (auth.uid() = usuario_id);

-- Habilitar Realtime para ranking
ALTER PUBLICATION supabase_realtime ADD TABLE ranking;

-- ============================================

-- 🔗 Tabla: referidos
-- Sistema de referidos (códigos de invitación)
CREATE TABLE IF NOT EXISTS referidos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referido_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  fecha_referido TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_referidos_codigo ON referidos(codigo);
CREATE INDEX IF NOT EXISTS idx_referidos_usuario_id ON referidos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_referidos_referido_por ON referidos(referido_por);

-- Habilitar Row Level Security (RLS)
ALTER TABLE referidos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Users can view their own referidos" ON referidos;
CREATE POLICY "Users can view their own referidos"
  ON referidos FOR SELECT
  USING (auth.uid() = usuario_id OR auth.uid() = referido_por);

DROP POLICY IF EXISTS "Users can insert their own referidos" ON referidos;
CREATE POLICY "Users can insert their own referidos"
  ON referidos FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

-- ============================================

-- 🎁 Tabla: recompensas
-- Sistema de recompensas y redenciones
CREATE TABLE IF NOT EXISTS recompensas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  fecha_redencion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tipo TEXT DEFAULT 'badge', -- 'badge', 'frase', 'icono', 'nft', 'token'
  valor TEXT, -- Valor de la recompensa (ej: "🏆", "Frase especial", etc.)
  activa BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_recompensas_usuario_id ON recompensas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_recompensas_tipo ON recompensas(tipo);
CREATE INDEX IF NOT EXISTS idx_recompensas_activa ON recompensas(activa);

-- Habilitar Row Level Security (RLS)
ALTER TABLE recompensas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Users can view their own recompensas" ON recompensas;
CREATE POLICY "Users can view their own recompensas"
  ON recompensas FOR SELECT
  USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Users can insert their own recompensas" ON recompensas;
CREATE POLICY "Users can insert their own recompensas"
  ON recompensas FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

-- ============================================

-- 👤 Tabla: user_profiles (Recomendada)
-- Perfiles extendidos de usuarios
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT,
  role TEXT DEFAULT 'Gallina del corral',
  puntos INTEGER DEFAULT 0,
  retos_completados_count INTEGER DEFAULT 0,
  clases_tomadas_count INTEGER DEFAULT 0,
  cantos_guardados_count INTEGER DEFAULT 0,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_profiles_username ON user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_puntos ON user_profiles(puntos DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON user_profiles(role);

-- Habilitar Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Anyone can view profiles" ON user_profiles;
CREATE POLICY "Anyone can view profiles"
  ON user_profiles FOR SELECT
  USING (true); -- Perfiles públicos para ranking

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. FUNCIONES AUXILIARES (Opcionales)
-- ============================================

-- Función para actualizar el ranking automáticamente
-- (Puedes llamar esta función cuando un usuario complete un reto, tome una clase, etc.)
CREATE OR REPLACE FUNCTION update_ranking()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO ranking (usuario_id, puntos, retos_completados, cantos_guardados, clases_tomadas, publicaciones)
    VALUES (
        NEW.user_id,
        0,
        (SELECT COUNT(*) FROM retos_completados WHERE user_id = NEW.user_id),
        (SELECT COUNT(*) FROM cantos_diarios WHERE user_id = NEW.user_id),
        (SELECT COUNT(*) FROM clases_tomadas WHERE user_id = NEW.user_id),
        (SELECT COUNT(*) FROM comunidad_publicaciones WHERE user_id = NEW.user_id)
    )
    ON CONFLICT (usuario_id) DO UPDATE SET
        retos_completados = (SELECT COUNT(*) FROM retos_completados WHERE user_id = NEW.user_id),
        cantos_guardados = (SELECT COUNT(*) FROM cantos_diarios WHERE user_id = NEW.user_id),
        clases_tomadas = (SELECT COUNT(*) FROM clases_tomadas WHERE user_id = NEW.user_id),
        publicaciones = (SELECT COUNT(*) FROM comunidad_publicaciones WHERE user_id = NEW.user_id),
        puntos = (
            (SELECT COUNT(*) FROM retos_completados WHERE user_id = NEW.user_id) * 10 +
            (SELECT COUNT(*) FROM cantos_diarios WHERE user_id = NEW.user_id) * 2 +
            (SELECT COUNT(*) FROM clases_tomadas WHERE user_id = NEW.user_id) * 5 +
            (SELECT COUNT(*) FROM comunidad_publicaciones WHERE user_id = NEW.user_id) * 3
        ),
        ultima_actualizacion = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- ✅ VERIFICACIÓN FINAL
-- ============================================

-- Verificar que todas las tablas se crearon correctamente
DO $$
DECLARE
    tabla_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO tabla_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name IN (
        'clases_tomadas',
        'retos_completados',
        'cantos_diarios',
        'comunidad_publicaciones',
        'clases',
        'retos',
        'cantos',
        'comunidad',
        'reto_corral',
        'ranking',
        'referidos',
        'recompensas',
        'user_profiles'
    );
    
    RAISE NOTICE '✅ Se crearon % tablas correctamente', tabla_count;
END $$;

-- ============================================
-- 🎉 ¡ESQUEMA COMPLETO!
-- ============================================
-- Todas las tablas están listas para usar
-- Recuerda verificar las políticas RLS según tus necesidades
-- ============================================

