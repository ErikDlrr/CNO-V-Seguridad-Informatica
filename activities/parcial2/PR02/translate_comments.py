import re

with open('.quiz.source.js', 'r', encoding='utf-8') as f:
    code = f.read()

replacements = {
    '// quiz.js - Logic for PR02 Phishing Simulation': '// Lógica de Simulación de Phishing (PR02)',
    '// Spoofed': '// Dirección falsificada (Spoofing)',
    '// App State': '// Estado de la Aplicación',
    '// DOM Elements': '// Nodos del DOM',
    '// Start logic': '// Inicialización',
    '// Answer buttons': '// Eventos de Botones Principales',
    '// Slight delay for animation triggering': '// Retardo para activar las animaciones CSS',
    '// Tracker\n': '// Control de tiempo\n',
    '// Resets\n': '// Reiniciar vista para reciclar DOM\n',
    '// Progress\n': '// Actualizar progreso de la barra\n',
    '// Populate data\n': '// Inyectar metadatos del supuesto correo\n',
    '// Inject body and hook up hover events on fake links': '// Desplegar cuerpo y monitorear hover (análisis de URLs falsas)',
    '// Prevent default click': '// Evitar navegación real por los links peligrosos',
    '// Set class to overlay for absolute modal styling': '// Invocar el modal superpuesto (Overlay Mode)',
    '// Inject flags': '// Listar los indicadores de bandera roja explicados',
    '// Simulate initial database initialization if needed': '// Arranque simulado de base de datos remota',
    '// Process save and DB fetch': '// Subir datos y solicitar respuesta de validación',
    '// second fetch delay for realism': '// Retardo virtual para el realismo de la descarga',
    '// Order by Score (Descending), then Time (Ascending)': '// Ordenamiento global (Top Scores -> Mejor Tiempo)',
    '// Populate Table': '// Construir tabla visualmente',
    '// Analytics: Average Time': '// Operación Analítica: Tiempo Promedio de Respuesta',
    '// Analytics: Most Failed Scenario': '// Operación Analítica: Ataque Más Exitoso',
    '// Count failure frequencies': '// Conteo automatizado de fallas por ID de escenario',
    '// Find max': '// Evaluar ataque con mayor tasa de clics',
    '// Find scenario name': '// Identificar el nombre del remitente fatal',
    '// Inject dummy scores logic if DB is empty to simulate real traffic': '// Rellenar base de datos para dotar al scoreboard de tráfico orgánico y masivo',
    '// Highlight local user': '// Etiquetar explícitamente el registro de esta sesión local'
}

for k, v in replacements.items():
    code = code.replace(k, v)

with open('.quiz.source.js', 'w', encoding='utf-8') as f:
    f.write(code)
