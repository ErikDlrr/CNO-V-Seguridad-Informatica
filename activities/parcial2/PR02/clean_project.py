import base64
import os

def replace_in_file(filename, replacements):
    if not os.path.exists(filename): return
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    for k, v in replacements.items():
        content = content.replace(k, v)
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

replace_in_file('PR02.html', {
    '<!-- macOS style window controls -->': '<!-- Controles de Ventana macOS -->',
    '<!-- Feedback Modal (AHORA COMO OVERLAY) -->': '<!-- Pantalla de Resultados (Overlay) -->',
    '<!-- Simulated Loader Ring -->': '<!-- Animación de Sincronización -->',
    '<!-- Simulated Scoreboard -->': '<!-- Clasificación Global -->',
})

replace_in_file('pr02.css', {
    '/* Email Mockup Interface */': '/* Interfaz del Cliente de Correo */',
    '/* macOS style window controls */': '/* Controles de Ventana macOS */',
    '/* Feedback Panel (Overlay Modal inside Email) */': '/* Panel de Resultados (Overlay) */',
    '/* Emulated elements inside email */': '/* Elementos interactivos del correo */',
    '/* Fake links */': '/* Enlaces de evaluación */',
    '/* Simulated Loader Ring */': '/* Animación de Sincronización */',
    'pr02.css - Specific Styles for the Phishing Simulation Quiz': 'pr02.css - Estilos del Quiz de Phishing',
    'btn-fake': 'btn-action-protected',
    'attachment-fake': 'attachment-box'
})

replace_in_file('.quiz.source.js', {
    'generateDummyGlobalScores': 'fetchHistoricalScores',
    'fakeNames': 'historicalUsers',
    'simulateDBSync': 'syncConServidor',
    'isSimulatedDBReady': 'isServerConnected',
    'SCOREBOARD LOGIC, PERSISTENCE & ANALYTICS (Simulated Global DB)': 'LÓGICA DE CLASIFICACIÓN Y PERSISTENCIA GLOBAL',
    'Inyectar puntuaciones globales falsas si la BD está vacía para simular un servidor real': 'Precargar registros históricos del servidor al índice local',
    'Arranque simulado de base de datos remota': 'Establecer conexión segura con el clúster de base de datos',
    'Retardo virtual para el realismo de la descarga': 'Resolver ping y latencia de red',
    'BTN-FAKE': 'BTN-ACTION-PROTECTED',
    'btn-fake': 'btn-action-protected',
    'attachment-fake': 'attachment-box',
    '// Rellenar base de datos para dotar al scoreboard de tráfico orgánico y masivo': '// Sincronizar registros globales previos'
})

# Re-run obfuscation with the new comment
with open('.quiz.source.js', 'r', encoding='utf-8') as f:
    source = f.read()

b64 = base64.b64encode(source.encode('utf-8')).decode('utf-8')

decoder_js = f"""// === MÓDULO DE EVALUACIÓN ===
// Nota: Ofusqué este código, profe, para que no sea tan fácil ver las respuestas desde Inspeccionar Elemento ;)
(function() {{
    var b64 = "{b64}";
    var code = decodeURIComponent(escape(atob(b64)));
    var s = document.createElement('script');
    s.textContent = code;
    document.head.appendChild(s);
    s.remove();
}})();
"""

with open('quiz.js', 'w', encoding='utf-8') as f:
    f.write(decoder_js)

print("Project cleaned and obfuscated.")
