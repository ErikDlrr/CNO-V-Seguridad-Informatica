// Lógica de Simulación de Phishing (PR02)

const scenarios = [
    {
        id: 1,
        senderName: "Soporte de TI",
        senderEmail: "admin@it-helpdesk-empresa.com", // Dirección falsificada (Spoofing)
        subject: "⚠ Acción Requerida: Su contraseña expira en 2 horas",
        body: `
            <p>Estimado usuario,</p>
            <p>Le informamos que de acuerdo a las políticas de seguridad, su contraseña corporativa expirará en 2 horas.</p>
            <p>Para mantener el acceso a sus servicios y evitar el bloqueo de su cuenta, por favor valide sus credenciales actuales y establezca una nueva contraseña inmediatamente.</p>
            <a href="#" class="email-link btn-fake" data-url="http://login-empresa-update.com/auth">Actualizar Contraseña Ahora</a>
            <p>Atentamente,<br>El equipo de Seguridad e Infraestructura</p>
        `,
        isPhishing: true,
        explanation: "Este es un ataque clásico de recolección de credenciales.",
        flags: [
            "Dominio del remitente sospechoso (it-helpdesk-empresa.com en lugar de @empresa.com).",
            "Sentido de urgencia ('expira en 2 horas') para forzar la acción rápida.",
            "El enlace apunta a un dominio HTTP no seguro y externo (login-empresa-update.com)."
        ]
    },
    {
        id: 2,
        senderName: "Recursos Humanos",
        senderEmail: "rrhh@empresa.com",
        subject: "Actualización de Políticas de Vacaciones 2026",
        body: `
            <p>Hola a todos,</p>
            <p>A partir del 1 de abril, entran en vigor las nuevas reformas de días de descanso aprobadas por la junta directiva.</p>
            <p>Hemos actualizado el manual del empleado en la intranet. Por favor revisen los cambios para coordinar sus próximas solicitudes.</p>
            <a href="#" class="email-link" data-url="https://intranet.empresa.com/docs/RH_Vacaciones_2026.pdf">Ver nuevo manual (PDF)</a>
            <p>Saludos cordiales,<br>Dirección de Talento y Cultura</p>
        `,
        isPhishing: false,
        explanation: "Este es un correo corporativo legítimo e informativo.",
        flags: [
            "El dominio del remitente es el interno correcto (@empresa.com).",
            "No solicita credenciales ni información confidencial.",
            "El enlace dirige a la intranet segura (https://intranet.empresa.com/...) y es coherente."
        ]
    },
    {
        id: 3,
        senderName: "Dropbox Notificaciones",
        senderEmail: "no-reply@dropb0x-alerts.com",
        subject: "Erik De La Rosa te ha compartido un documento vital",
        body: `
            <p>Hola,</p>
            <p>Erik De La Rosa ha compartido de forma segura el documento <strong>"Presupuesto_Q3_Confidencial.xlsx"</strong> contigo a través de Dropbox Web.</p>
            <div class="attachment-fake email-link" data-url="https://dropb0x-alerts.com/view/72hd9">
                <span style="font-size: 1.5rem">📊</span>
                <div>
                    <strong>Presupuesto_Q3_Confidencial.xlsx</strong><br>
                    <span class="muted tiny">1.2 MB</span>
                </div>
            </div>
            <p>Haz clic en el archivo para visualizarlo. Tendrás que iniciar sesión con tu cuenta de Microsoft Office 365 para verificar tu identidad.</p>
            <p>— El equipo de Dropbox</p>
        `,
        isPhishing: true,
        explanation: "Este correo busca robar credenciales de Office 365 ocultándose tras un servicio de terceros.",
        flags: [
            "Uso de un dominio Typosquatting ('dropb0x' con cero en vez de 'o').",
            "Solicita iniciar sesión de un servicio distinto (Microsoft 365) para ver algo de Dropbox.",
            "Utiliza nombres de colegas (probablemente del organigrama/LinkedIn) para generar confianza."
        ]
    },
    {
        id: 4,
        senderName: "Amazon Prime",
        senderEmail: "auto-confirm@amazon.com.mx",
        subject: "Confirmación de pedido: Apple iPhone 15 Pro Max",
        body: `
            <p>Hola,</p>
            <p>Gracias por tu compra. Tu pedido de <strong>Apple iPhone 15 Pro Max (256 GB) - Titanio Natural</strong> se procesó correctamente por un total de <strong>$23,999.00 MXN</strong>.</p>
            <p>Se realizará el cargo a la tarjeta terminada en **4921.</p>
            <p>Si no autorizaste esta compra, por favor cancela el pedido inmediatamente desde el centro de resoluciones:</p>
            <a href="#" class="email-link" data-url="http://amazon-centro-resoluciones.info/cancel?id=10293123">Cancelar este pedido</a>
            <p>Gracias por preferir Amazon.</p>
        `,
        isPhishing: true,
        explanation: "Es una técnica de extorsión psicológica ('Fear-based').",
        flags: [
            "Mensaje diseñado para generar pánico sobre un cargo no reconocido alto.",
            "La urgencia por entrar al 'centro de resoluciones'.",
            "La URL de cancelación no pertenece a Amazon (amazon-centro-resoluciones.info)."
        ]
    },
    {
        id: 5,
        senderName: "Slack Integrations",
        senderEmail: "notifications@slack.com",
        subject: "Nueva integración añadida al workspace",
        body: `
            <p>Hola,</p>
            <p>Un administrador ha instalado una nueva integración <strong>"Trello Connector"</strong> en tu espacio de trabajo de Slack.</p>
            <p>Para ver los detalles de los permisos concedidos a esta app, visita el portal de gestión de aplicaciones del equipo en Slack.</p>
            <a href="#" class="email-link" data-url="https://slack.com/apps/manage/T023K4/trello-connector">Ver permisos de integración</a>
            <p>Si crees que esto es un error, contacta a tu administrador.</p>
        `,
        isPhishing: false,
        explanation: "Correo automático legítimo de una plataforma SaaS.",
        flags: [
            "Dominio de origen comprobado (slack.com).",
            "No solicita acciones directas ni credenciales, sólo es informativo.",
            "El enlace dirige al dominio oficial seguro (https://slack.com/)."
        ]
    },
    {
        id: 6,
        senderName: "LinkedIn Connect",
        senderEmail: "messages-noreply@linkedin.com",
        subject: "Tienes 1 nuevo mensaje de un reclutador",
        body: `
            <p>Un reclutador en <strong>Google Mexico</strong> te ha enviado un mensaje sobre una oportunidad laboral confidencial que encaja con tu perfil.</p>
            <p><em>"Hola, vi tu experiencia en ciberseguridad y creo que eres un fit perfecto para esta vacante..."</em></p>
            <p>Para leer el mensaje completo y responder, haz click abajo:</p>
            <a href="#" class="email-link btn-fake" style="background:#0a66c2;" data-url="http://linkedIn-message-portal.net/login?redirect=MSG-39201">Leer Mensaje</a>
        `,
        isPhishing: true,
        explanation: "Ataque hiper-dirigido (Spear Phishing) basado expetativas profesionales.",
        flags: [
            "El remitente original podría estar falseado o el subject es común.",
            "El enlace apunta a 'linkedIn-message-portal.net' (sitio fraudulento) y carece de HTTPS.",
            "Aprovecha el deseo psicológico natural de una mejor oportunidad laboral."
        ]
    },
    {
        id: 7,
        senderName: "Microsoft Outlook",
        senderEmail: "quarentine@office365.com",
        subject: "3 Mensajes retenidos en cuarentena",
        body: `
            <p>Protección contra amenazas avanzada de Microsoft ha retenido 3 mensajes nuevos por políticas de spam del equipo.</p>
            <p>Puedes revisar los mensajes bloqueados y liberarlos a tu bandeja de entrada si consideras que son seguros:</p>
            <ul>
                <li><strong>Asunto:</strong> Factura pendiente FEB-2026. (Retenido por filtro heurístico).</li>
                <li><strong>Asunto:</strong> Cotización Proyecto X. (Retenido por adjunto sospechoso).</li>
            </ul>
            <a href="#" class="email-link btn-fake" style="background:#ea4335;" data-url="https://protection.office.com/quarantine">Revisar Cuarentena</a>
        `,
        isPhishing: false,
        explanation: "Es una notificación administrativa estándar de Microsoft 365 Defender.",
        flags: [
            "URL apunta al panel real de Microsoft (protection.office.com).",
            "Mantiene tono empresarial neutro, sin urgencia extrema.",
            "El dominio de correo concuerda con los servicios técnicos de Microsoft."
        ]
    },
    {
        id: 8,
        senderName: "DHL Express",
        senderEmail: "tracking@dh1-express-delivery.com",
        subject: "Entrega fallida: Su paquete está retenido en la aduana",
        body: `
            <p>Estimado cliente,</p>
            <p>No pudimos entregar su paquete (Guía #88392010A) el día de hoy porque requiere el pago de impuestos de importación aduanales.</p>
            <p>El importe pendiente es de <strong>$49.50 MXN</strong>.</p>
            <p>Por favor, pague la pequeña tarifa para liberar el paquete y reprogramar su entrega para mañana:</p>
            <a href="#" class="email-link btn-fake" style="background:#d40511;" data-url="https://pagos-aduanales-dhl.net/checkout">Pagar Impuestos Ahora</a>
            <p>Si no completa el pago en las próximas 48 horas, devolvérselo al remitente.</p>
        `,
        isPhishing: true,
        explanation: "Phishing clásico de paquetería para robo financiero directo.",
        flags: [
            "Domino falso 'dh1-express' (con número 1) y página de pago falsa 'pagos-aduanales-dhl.net'.",
            "Solicita un pago mínimo (gancho económico) para robar los datos de toda la tarjeta de crédito.",
            "Típica excusa de aduana y presión temporal (48 horas)."
        ]
    },
    {
        id: 9,
        senderName: "CEO / Director General",
        senderEmail: "ceo.director@yahoo.com",
        subject: "URGENTE: Necesito tu ayuda confidencial",
        body: `
            <p>Hola, ¿estás disponible en la oficina?</p>
            <p>Necesito que me ayudes con una tarea urgente y confidencial. Estoy en una reunión importante ahora mismo y no puedo hacer llamadas telefónicas.</p>
            <p>Necesito adquirir rápidamente 5 tarjetas de regalo de Apple de $100 dólares para unos clientes. Por favor, cómpralas de tu cuenta y envíame los códigos raspados físicos respondiendo a este correo. Te lo reembolsaré como gasto de representación esta misma tarde.</p>
            <p>Cuento contigo de manera discreta.</p>
            <br>
            <p>Saludos,<br>Director General</p>
        `,
        isPhishing: true,
        explanation: "Conocido como Fraude del CEO (Business Email Compromise - BEC).",
        flags: [
            "Uso de una cuenta gratuita (@yahoo.com) aparentando ser una cuenta personal del jefe.",
            "Ataque basado puramente en texto sin enlaces (evade defensas simples).",
            "Presión de autoridad, exigencia de secreto comercial y solicitud de bienes no rastreables (Gift Cards)."
        ]
    },
    {
        id: 10,
        senderName: "GitHub Security",
        senderEmail: "noreply@github.com",
        subject: "[GitHub] Se ha añadido una nueva clave SSH o token a su cuenta",
        body: `
            <p>Hola @maizimo,</p>
            <p>Se ha añadido una nueva clave SSH pública a su cuenta desde una dirección IP no reconocida (192.145.2.1 - Russia).</p>
            <p>Si fuiste tú o conoces esta acción, puedes ignorar el correo.</p>
            <p>Si NO autorizaste este acceso, por favor elimina la clave inmediatamente desde tu panel de seguridad para prevenir la modificación o lectura de tu código fuente privado:</p>
            <a href="#" class="email-link" data-url="https://github.com/settings/keys">Auditar mis claves y revocar</a>
            <p>Gracias,<br>El equipo de seguridad de GitHub.</p>
        `,
        isPhishing: false,
        explanation: "Aviso de seguridad rutinario y legítimo de GitHub.",
        flags: [
            "Dominio de remitente y URL verificados como auténticos (@github.com).",
            "Proporciona información técnica útil para validación (IP).",
            "Da la opción clara de no hacer nada si el usuario fue el autor de la acción."
        ]
    }
];

// Estado de la Aplicación
let currentStep = 0;
let score = 0;

// Variables adiciones para Scoreboard y Tracker
let currentAlias = "";
let scenarioStartTime = 0;
let sessionLog = [];
let totalSessionTime = 0;

// Variables adiciones para Scoreboard y Tracker
let isSimulatedDBReady = false;

// Nodos del DOM
const panels = {
    start: document.getElementById('quizStartPanel'),
    main: document.getElementById('quizMainPanel'),
    result: document.getElementById('quizResultPanel'),
    loading: document.getElementById('quizLoadingPanel'),
    scoreboard: document.getElementById('quizScoreboardPanel')
};

const dom = {
    progressFill: document.getElementById('progressFill'),
    currentScenario: document.getElementById('currentScenario'),
    currentScore: document.getElementById('currentScore'),
    uiSubject: document.getElementById('uiSubject'),
    uiSenderName: document.getElementById('uiSenderName'),
    uiSenderEmail: document.getElementById('uiSenderEmail'),
    uiDate: document.getElementById('uiDate'),
    uiBody: document.getElementById('uiBody'),
    linkInspector: document.getElementById('linkInspector'),
    inspectorUrl: document.getElementById('inspectorUrl'),
    quizActions: document.getElementById('quizActions'),
    feedbackPanel: document.getElementById('feedbackPanel'),
    feedbackIcon: document.getElementById('feedbackIcon'),
    feedbackTitle: document.getElementById('feedbackTitle'),
    feedbackText: document.getElementById('feedbackText'),
    feedbackFlags: document.getElementById('feedbackFlags'),
    btnNext: document.getElementById('btnNext'),
    finalScore: document.getElementById('finalScore'),
    resultAnalysis: document.getElementById('resultAnalysis'),

    // Nodos nuevos de Scoreboard
    tableBody: document.querySelector('#scoreboardTable tbody')
};

// Inicialización
document.getElementById('btnStartQuiz').addEventListener('click', () => {
    const aliasInput = document.getElementById('userAlias');
    const aliasError = document.getElementById('aliasError');

    if (!aliasInput.value.trim()) {
        aliasError.style.visibility = 'visible';
        return;
    }

    aliasError.style.visibility = 'hidden';
    currentAlias = aliasInput.value.trim();
    sessionLog = [];
    totalSessionTime = 0;

    switchPanel('main');
    loadScenario();
});

document.getElementById('btnRestart').addEventListener('click', () => {
    currentStep = 0;
    score = 0;
    updateScoreUI();
    switchPanel('main');
    loadScenario();
});

// Eventos de Botones Principales
document.getElementById('btnPhish').addEventListener('click', () => handleAnswer(true));
document.getElementById('btnLegit').addEventListener('click', () => handleAnswer(false));
dom.btnNext.addEventListener('click', () => {
    currentStep++;
    if (currentStep >= scenarios.length) {
        showResults();
    } else {
        loadScenario();
    }
});

function switchPanel(panelName) {
    Object.values(panels).forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });
    panels[panelName].style.display = 'block';

    // Retardo para activar las animaciones CSS
    setTimeout(() => {
        panels[panelName].classList.add('active');
    }, 50);
}

function loadScenario() {
    const s = scenarios[currentStep];

    // Control de tiempo
    scenarioStartTime = Date.now();

    // Reiniciar vista para reciclar DOM
    dom.quizActions.style.display = 'flex';
    dom.feedbackPanel.style.display = 'none';
    dom.linkInspector.style.display = 'none';

    // Actualizar progreso de la barra
    dom.currentScenario.textContent = currentStep + 1;
    dom.progressFill.style.width = `${((currentStep) / scenarios.length) * 100}%`;

    // Inyectar metadatos del supuesto correo
    dom.uiSubject.textContent = s.subject;
    dom.uiSenderName.textContent = s.senderName;
    dom.uiSenderEmail.textContent = `<${s.senderEmail}>`;

    // Desplegar cuerpo y monitorear hover (análisis de URLs falsas)
    dom.uiBody.innerHTML = s.body;

    const links = dom.uiBody.querySelectorAll('.email-link');
    links.forEach(l => {
        l.addEventListener('mouseenter', (e) => {
            const url = e.target.getAttribute('data-url');
            if (url) {
                dom.inspectorUrl.textContent = url;
                dom.linkInspector.style.display = 'block';
            }
        });
        l.addEventListener('mouseleave', () => {
            dom.linkInspector.style.display = 'none';
        });
        // Evitar navegación real por los links peligrosos
        l.addEventListener('click', e => e.preventDefault());
    });
}

function handleAnswer(userSaidPhishing) {
    const s = scenarios[currentStep];
    const isCorrect = (userSaidPhishing === s.isPhishing);

    // Trackear tiempo intermedio
    const timeSpentMs = Date.now() - scenarioStartTime;
    const timeSpentSeconds = parseFloat((timeSpentMs / 1000).toFixed(1));
    totalSessionTime += timeSpentSeconds;

    sessionLog.push({
        id: s.id,
        passed: isCorrect,
        timeSpent: timeSpentSeconds,
        flags: s.flags.length
    });

    if (isCorrect) {
        score += 10;
        updateScoreUI();
    }

    showFeedback(isCorrect, s);
}

function updateScoreUI() {
    dom.currentScore.textContent = score;
}

function showFeedback(isCorrect, scenario) {
    dom.quizActions.style.display = 'none';

    // Invocar el modal superpuesto (Overlay Mode)
    dom.feedbackPanel.className = `feedback-panel overlay ${isCorrect ? 'success' : 'error'}`;
    dom.feedbackIcon.textContent = isCorrect ? '✔️' : '❌';
    dom.feedbackTitle.textContent = isCorrect
        ? '¡Excelente deducción!'
        : (scenario.isPhishing ? '¡Cuidado! Eras la víctima.' : '¡Era un correo seguro!');

    dom.feedbackText.textContent = scenario.explanation;

    // Listar los indicadores de bandera roja explicados
    let listHTML = '<ul>';
    scenario.flags.forEach(f => {
        listHTML += `<li>${f}</li>`;
    });
    listHTML += '</ul>';
    dom.feedbackFlags.innerHTML = listHTML;

    dom.feedbackPanel.style.display = 'flex';
    dom.progressFill.style.width = `${((currentStep + 1) / scenarios.length) * 100}%`;

    // Desplazar automáticamente para que el modal se vea perfecto
    setTimeout(() => {
        document.getElementById('quizContainer').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function showResults() {
    switchPanel('result');
    dom.finalScore.textContent = score;

    let analysisText = "";
    if (score === 100) {
        analysisText = "Excepcional. Tienes un instinto agudo para la detección de engaños digitales. Tu Risk Score es mínimo, representas un activo fuerte para la organización y podrías gestionar campañas internas de concientización.";
        document.getElementById('resultRune').textContent = '🛡️';
    } else if (score >= 80) {
        analysisText = "Muy buen desempeño. Identificas la mayoría de los vectores de ataque. Solo necesitas mayor atención al detalle en escenarios hiper-dirigidos o ataques BEC (Business Email Compromise).";
        document.getElementById('resultRune').textContent = '✅';
    } else if (score >= 60) {
        analysisText = "Rendimiento promedio. Tienes nociones básicas pero los atacantes lograron engañarte varias veces. Es recomendable tomar una capacitación de refuerzo sobre vectores de ingeniería social.";
        document.getElementById('resultRune').textContent = '⚠️';
    } else {
        analysisText = "Alto Riesgo. Caíste en tácticas estándar y avanzadas de suplantación. Urge participar en el módulo intensivo de Security Awareness Training antes de manejar datos confidenciales corporativos.";
        document.getElementById('resultRune').textContent = '🚨';
    }

    dom.resultAnalysis.textContent = analysisText;
}

// ==========================================
// SCOREBOARD LOGIC, PERSISTENCE & ANALYTICS (Simulated Global DB)
// ==========================================

function generateDummyGlobalScores(db) {
    if (db.length > 5) return db; // Ya hay datos suficientes
    
    const fakeNames = ["Marta G.", "Carlos Ruiz", "Ana_Cyber", "L.Fer", "DevTeam_Alex", "Security_Juan", "D.Cortez"];
    fakeNames.forEach((name, i) => {
        db.push({
            alias: name,
            score: Math.floor(Math.random() * 4) * 10 + 60, // 60 a 90
            time: parseFloat((Math.random() * 40 + 30).toFixed(1)), // 30 a 70 segundos
            date: new Date(Date.now() - Math.random() * 100000000).toISOString(),
            details: []
        });
    });
    return db;
}

async function simulateDBSync() {
    return new Promise(resolve => {
        setTimeout(resolve, 1500 + Math.random() * 1000);
    });
}

async function saveScoreboardDataAsync() {
    const sessionData = {
        alias: currentAlias,
        score: score,
        time: parseFloat(totalSessionTime.toFixed(1)),
        date: new Date().toISOString(),
        details: sessionLog,
        isCurrentUser: true // Etiquetar explícitamente el registro de esta sesión local
    };

    let db = JSON.parse(localStorage.getItem('pr02_phishing_ranking')) || [];
    
    // Rellenar base de datos para dotar al scoreboard de tráfico orgánico y masivo
    db = generateDummyGlobalScores(db);
    
    db.push(sessionData);
    localStorage.setItem('pr02_phishing_ranking', JSON.stringify(db));
}

function renderScoreboard() {
    let db = JSON.parse(localStorage.getItem('pr02_phishing_ranking')) || [];

    // Ordenamiento global (Top Scores -> Mejor Tiempo)
    db.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return a.time - b.time;
    });

    // Construir tabla visualmente
    if (dom.tableBody) {
        dom.tableBody.innerHTML = '';

        if (db.length === 0) {
            dom.tableBody.innerHTML = '<tr><td colspan="5" class="text-center muted">Todavía no hay registros de evaluación.</td></tr>';
        } else {
            db.forEach((entry, idx) => {
                const dateObj = new Date(entry.date);
                const dateFormatted = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const tr = document.createElement('tr');
                let isTop3 = idx < 3;
                let bgStyle = '';

                if (entry.isCurrentUser) {
                    bgStyle = 'background: rgba(var(--accent-rgb), 0.15); border-left: 3px solid var(--accent);';
                } else if (idx === 0) {
                    bgStyle = 'background: rgba(255, 215, 0, 0.08);';
                } else if (idx === 1) {
                    bgStyle = 'background: rgba(192, 192, 192, 0.08);';
                } else if (idx === 2) {
                    bgStyle = 'background: rgba(205, 127, 50, 0.08);';
                }

                if (bgStyle) tr.style.cssText = bgStyle;

                tr.innerHTML = `
                    <td style="font-weight: bold; color: ${isTop3 ? 'var(--fg)' : 'var(--muted)'}">#${idx + 1}</td>
                    <td style="font-weight: bold;">
                        ${entry.alias} 
                        ${entry.isCurrentUser ? '<span class="tag" style="margin-left:8px; font-size:0.7rem; padding:2px 6px;">TÚ</span>' : ''}
                    </td>
                    <td class="glow">${entry.score} pts</td>
                    <td>${entry.time}s</td>
                    <td class="muted tiny">${dateFormatted}</td>
                `;
                dom.tableBody.appendChild(tr);
            });
        }
    }

    // Operación Analítica: Tiempo Promedio de Respuesta
    const statAvgTime = document.getElementById('statAvgTime');
    if (statAvgTime && db.length > 0) {
        const totalSysTime = db.reduce((acc, curr) => acc + curr.time, 0);
        statAvgTime.textContent = (totalSysTime / db.length).toFixed(1) + 's / intento';
    } else if (statAvgTime) {
        statAvgTime.textContent = '-';
    }

    // Operación Analítica: Ataque Más Exitoso
    const statMostFailed = document.getElementById('statMostFailed');
    if (statMostFailed && db.length > 0) {
        let failsMap = {};

        // Conteo automatizado de fallas por ID de escenario
        db.forEach(session => {
            if (session.details && session.details.length > 0) {
                session.details.forEach(detail => {
                    if (!detail.passed) {
                        failsMap[detail.id] = (failsMap[detail.id] || 0) + 1;
                    }
                });
            }
        });

        // Evaluar ataque con mayor tasa de clics
        let maxFails = -1;
        let mostFailedId = null;

        for (const [id, fails] of Object.entries(failsMap)) {
            if (fails > maxFails) {
                maxFails = fails;
                mostFailedId = parseInt(id);
            }
        }

        if (maxFails > 0) {
            // Identificar el nombre del remitente fatal
            const sDef = scenarios.find(x => x.id === mostFailedId);
            const badgeName = sDef ? sDef.senderName : `Escenario ${mostFailedId}`;
            statMostFailed.textContent = `[${maxFails} fallos] ${badgeName}`;
        } else {
            statMostFailed.textContent = "Ningún Fallo Registrado";
            statMostFailed.style.color = "var(--accent)";
        }
    } else if (statMostFailed) {
        statMostFailed.textContent = '-';
    }
}

// SCOREBOARD EVENT LISTENERS 
document.getElementById('btnViewScoreboard')?.addEventListener('click', async () => {
    switchPanel('loading');
    document.getElementById('loadingTitle').textContent = "Cargando Ranking...";
    document.getElementById('loadingText').textContent = "Recuperando datos desde el servidor central...";
    
    // Arranque simulado de base de datos remota
    let db = JSON.parse(localStorage.getItem('pr02_phishing_ranking')) || [];
    db = generateDummyGlobalScores(db);
    localStorage.setItem('pr02_phishing_ranking', JSON.stringify(db));

    await simulateDBSync();
    switchPanel('scoreboard');
    renderScoreboard();
});

document.getElementById('btnGoToScoreboard')?.addEventListener('click', async () => {
    switchPanel('loading');
    document.getElementById('loadingTitle').textContent = "Sincronizando";
    document.getElementById('loadingText').textContent = "Enviando resultados al servidor de evaluación...";
    
    // Subir datos y solicitar respuesta de validación
    await saveScoreboardDataAsync();
    
    document.getElementById('loadingTitle').textContent = "Conectado";
    document.getElementById('loadingText').textContent = "Descargando ranking global actualizado...";
    await simulateDBSync(); // Retardo virtual para el realismo de la descarga

    switchPanel('scoreboard');
    renderScoreboard();
});

document.getElementById('btnClearScoreboard')?.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas reiniciar todos los datos estadísticos y rankings de la base de datos? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('pr02_phishing_ranking');
        renderScoreboard();
    }
});


document.getElementById('btnBackToStart')?.addEventListener('click', () => {
    switchPanel('start');
});

// ==========================================
// AUTO-HIDE STICKY NAVBAR ON QUIZ SECTION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const quizSection = document.getElementById('quiz');
    const stickyNav = document.querySelector('.sticky-nav-wrapper');

    if (quizSection && stickyNav) {
        // Observador que dispara cuando el quiz entra a la zona visible (viewport)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // El quiz es visible, ocultar la barra suavemente
                    stickyNav.style.opacity = '0';
                    stickyNav.style.pointerEvents = 'none';
                    stickyNav.style.transform = 'translateY(-20px)';
                } else {
                    // El quiz no es visible (estamos arriba), restaurar la barra
                    stickyNav.style.opacity = '1';
                    stickyNav.style.pointerEvents = 'none'; // Recordando el CSS base
                    stickyNav.style.transform = 'translateY(0)';
                }
            });
        }, {
            // Se activa en cuanto el 15% superior del quiz entra en pantalla
            rootMargin: '0px',
            threshold: 0.15
        });

        observer.observe(quizSection);
    }
});

