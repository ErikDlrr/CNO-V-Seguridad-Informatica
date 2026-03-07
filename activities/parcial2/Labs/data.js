const sqlInjectionLabs = [
    {
        "id": "lab-01",
        "number": 1,
        "level": "Apprentice",
        "title": "SQL injection vulnerability in WHERE clause allowing retrieval of hidden data",
        "objective": "Explotar una vulnerabilidad SQLi en la cláusula WHERE para recuperar productos ocultos del catálogo.",
        "summaryBullets": [
            "Análisis del parámetro manejador de categoría en la URL.",
            "Inyección de una instrucción tautológica (OR 1=1).",
            "Uso de comillas y comentarios de línea (--) para evadir validaciones."
        ],
        "techniques": ["In-band SQLi", "Tautology", "Comment Syntax Bypass"],
        "evidencePaths": ["../../../assets/evidence/sql-injection/lab-01/L1E1.png", "../../../assets/evidence/sql-injection/lab-01/L1E2.png", "../../../assets/evidence/sql-injection/lab-01/L1E3.png"],
        "status": "Solved",
        "validation": "Al inyectar 'OR 1=1--', se ignoraron los filtros originales y la consulta devolvió todos los registros.",
        "mitigation": "Uso de consultas parametrizadas o Prepared Statements para aislar el input del usuario del contexto SQL."
    },
    {
        "id": "lab-02",
        "number": 2,
        "level": "Apprentice",
        "title": "SQL injection vulnerability allowing login bypass",
        "objective": "Eludir el proceso de autenticación explotando una inyección SQL en el campo de usuario para iniciar sesión directamente.",
        "summaryBullets": [
            "Análisis de las peticiones POST de inicio de sesión.",
            "Inyección de código SQL ('administrator'--') en el cuadro del usuario.",
            "Cierre de la sentencia y evasión exitosa de la comprobación de contraseña."
        ],
        "techniques": ["Authentication Bypass", "In-band SQLi", "Comment injection"],
        "evidencePaths": ["../../../assets/evidence/sql-injection/lab-02/L2E1.png", "../../../assets/evidence/sql-injection/lab-02/L2E2.png", "../../../assets/evidence/sql-injection/lab-02/L2E3.png"],
        "status": "Solved",
        "validation": "Ingreso exitoso al panel de control de la cuenta 'administrator' sin conocer su contraseña real.",
        "mitigation": "Implementar validación parametrizada en el input del login y no concatenar inputs en el string SQL."
    },
    {
        "id": "lab-03",
        "number": 3,
        "level": "Practitioner",
        "title": "SQL injection attack, querying the database type and version on Oracle",
        "objective": "Enumerar y descubrir la versión exacta de Oracle Database subyacente tras el aplicativo.",
        "summaryBullets": [
            "Determinación de la cantidad de columnas de la consulta base.",
            "Uso de inyección tipo UNION apoyándose en la tabla cautiva 'DUAL' propia de Oracle.",
            "Recuperación del string de versión haciendo consulta a la tabla 'v$version'."
        ],
        "techniques": ["UNION-based SQLi", "Database Enumeration", "Oracle Specific Tables"],
        "evidencePaths": ["../../../assets/evidence/sql-injection/lab-03/L3E1.png", "../../../assets/evidence/sql-injection/lab-03/L3E2.png", "../../../assets/evidence/sql-injection/lab-03/L3E3.png", "../../../assets/evidence/sql-injection/lab-03/L3E4.png"],
        "status": "Solved",
        "validation": "Se reflejó la versión completa de Oracle Database directamente en la interfaz del cliente web.",
        "mitigation": "Abstraer las operaciones utilizando ORMs y revocar permisos de consulta a vistas de sistema ($v) al usuario web."
    },
    {
        "id": "lab-04",
        "number": 4,
        "level": "Practitioner",
        "title": "SQL injection attack, querying the database type and version on MySQL and Microsoft",
        "objective": "Identificar de manera remota que el gestor de base de datos corresponde a Microsoft/MySQL e imprimir la versión.",
        "summaryBullets": [
            "Prueba de inyección básica revelando el número de columnas.",
            "Prueba para identificar columnas compatibles con strings.",
            "Extracción local inyectando la variable global '@@version'."
        ],
        "techniques": ["UNION-based SQLi", "Database Enumeration", "Variable Extraction"],
        "evidencePaths": [
            "../../../assets/evidence/sql-injection/lab-04/L4E1.png",
            "../../../assets/evidence/sql-injection/lab-04/L4E2.png",
            "../../../assets/evidence/sql-injection/lab-04/L4E3.png",
            "../../../assets/evidence/sql-injection/lab-04/L4E4.png",
            "../../../assets/evidence/sql-injection/lab-04/L4E5.png",
            "../../../assets/evidence/sql-injection/lab-04/L4E6.png"
        ],
        "status": "Solved",
        "validation": "El motor devolvió texto legible verificando ser un MySQL/Microsoft confirmando la vulnerabilidad tipo In-Band.",
        "mitigation": "Habilitar Web Application Firewalls (WAF) y ocultar/mitigar respuestas con stacktraces de la base de datos."
    },
    {
        "id": "lab-05",
        "number": 5,
        "level": "Practitioner",
        "title": "SQL injection attack, listing the database contents on non-Oracle databases",
        "objective": "Realizar enumeración lateral utilizando inyección SQL UNION para extraer credenciales en un motor No-Oracle.",
        "summaryBullets": [
            "Consulta automatizada a 'information_schema.tables' descubriendo las tablas existentes.",
            "Pivote identificando una tabla oculta de usuarios.",
            "Búsqueda direccional sobre 'information_schema.columns' recuperando las claves de acceso."
        ],
        "techniques": ["Schema Enumeration", "UNION-based exfiltration", "Information Schema API"],
        "evidencePaths": [
            "../../../assets/evidence/sql-injection/lab-05/L5E1.png",
            "../../../assets/evidence/sql-injection/lab-05/L5E2.png",
            "../../../assets/evidence/sql-injection/lab-05/L5E3.png",
            "../../../assets/evidence/sql-injection/lab-05/L5E4.png",
            "../../../assets/evidence/sql-injection/lab-05/L5E5.png",
            "../../../assets/evidence/sql-injection/lab-05/L5E6.png",
            "../../../assets/evidence/sql-injection/lab-05/L5E7.png",
            "../../../assets/evidence/sql-injection/lab-05/L5E8.png"
        ],
        "status": "Solved",
        "validation": "Extracción y uso de credenciales de 'administrator' en la página de login.",
        "mitigation": "Evitar permisos globales al usuario de la aplicación web impidiendo lecturas al diccionario de base de datos."
    },
    {
        "id": "lab-06",
        "number": 6,
        "level": "Practitioner",
        "title": "SQL injection attack, listing the database contents on Oracle",
        "objective": "Listar el esquema interno de bases de datos de Oracle para conseguir contraseñas privilegiadas.",
        "summaryBullets": [
            "Identificación del número de columnas retornables vía 'DUAL'.",
            "Listado del catálogo global usando la vista del sistema 'all_tables'.",
            "Descubrimiento de campos confidenciales interrogando la estructura 'all_tab_columns'."
        ],
        "techniques": ["Oracle Metadata Enumeration", "UNION Exfiltration", "all_tables interaction"],
        "evidencePaths": [
            "../../../assets/evidence/sql-injection/lab-06/L6E1.png",
            "../../../assets/evidence/sql-injection/lab-06/L6E2.png",
            "../../../assets/evidence/sql-injection/lab-06/L6E3.png",
            "../../../assets/evidence/sql-injection/lab-06/L6E4.png",
            "../../../assets/evidence/sql-injection/lab-06/L6E5.png",
            "../../../assets/evidence/sql-injection/lab-06/L6E6.png",
            "../../../assets/evidence/sql-injection/lab-06/L6E7.png",
            "../../../assets/evidence/sql-injection/lab-06/L6E8.png"
        ],
        "status": "Solved",
        "validation": "Obtención secuencial y control del panel de administrador gracias a las contraseñas extraídas.",
        "mitigation": "Control de granularidad en los permisos y uso mandante de Prepared Statements (estándar seguro)."
    },
    {
        "id": "lab-07",
        "number": 7,
        "level": "Practitioner",
        "title": "SQL injection UNION attack, determining the number of columns returned by the query",
        "objective": "Reconocer iterativamente y con exactitud cuántas columnas proyecta una base de datos tras la consulta central.",
        "summaryBullets": [
            "Pruebas paramétricas ordenando campos mediante 'ORDER BY 1', 'ORDER BY 2', etc.",
            "Provocación del límite estático forzando errores visuales intencionales.",
            "Reconfirmación usando UNION SELECT con valores múltiples NULL."
        ],
        "techniques": ["UNION Column Discovery", "Error forcing", "NULL probing"],
        "evidencePaths": ["../../../assets/evidence/sql-injection/lab-07/L7E1.png", "../../../assets/evidence/sql-injection/lab-07/L7E2.png", "../../../assets/evidence/sql-injection/lab-07/L7E3.png"],
        "status": "Solved",
        "validation": "Inyección controlada de X columnas que estabilizaron el error HTTP 500.",
        "mitigation": "Retornar siempre un error amigable HTTP 500 genérico sin revelar excepciones crudas SQL."
    },
    {
        "id": "lab-08",
        "number": 8,
        "level": "Practitioner",
        "title": "SQL injection UNION attack, finding a column containing text",
        "objective": "Determinar qué columna, del set regresado por la base de datos, soporta y visualiza cadenas de texto extraídas.",
        "summaryBullets": [
            "Inyección sistemática y posicional de cadenas 'test' sustituyendo los NULLs.",
            "Validación de renderizado por el DOM web para cada columna del conjunto provocado.",
            "Identificación de la columna vulnerable mediante reflejo positivo de la variable introducida."
        ],
        "techniques": ["UNION Data Type Probing", "DOM rendered exfiltration"],
        "evidencePaths": ["../../../assets/evidence/sql-injection/lab-08/L8E1.png", "../../../assets/evidence/sql-injection/lab-08/L8E2.png", "../../../assets/evidence/sql-injection/lab-08/L8E3.png", "../../../assets/evidence/sql-injection/lab-08/L8E4.png"],
        "status": "Solved",
        "validation": "La cadena elegida reflejó limpiamente en la vista del portal web demostrando control In-Band.",
        "mitigation": "Establecer control estricto de tipos e interfaces inmutables que no admitan inyección UNION variable."
    },
    {
        "id": "lab-09",
        "number": 9,
        "level": "Practitioner",
        "title": "SQL injection UNION attack, retrieving data from other tables",
        "objective": "Desplegar credenciales de un esquema no relacionado haciendo dumping transverso entre tablas visibles y reservadas.",
        "summaryBullets": [
            "Conociendo la composición y número de columnas, se apuntó hacia la tabla 'users'.",
            "Uso del campo visible A de la página para inyectar credenciales del campo B de la base de datos.",
            "El sitio superpuso texto web general mezclado con contraseñas crudas."
        ],
        "techniques": ["Cross-table Dumping", "Data Exfiltration via UNION"],
        "evidencePaths": [
            "../../../assets/evidence/sql-injection/lab-09/L9E1.png",
            "../../../assets/evidence/sql-injection/lab-09/L9E2.png",
            "../../../assets/evidence/sql-injection/lab-09/L9E3.png",
            "../../../assets/evidence/sql-injection/lab-09/L9E4.png",
            "../../../assets/evidence/sql-injection/lab-09/L9E5.png",
            "../../../assets/evidence/sql-injection/lab-09/L9E6.png"
        ],
        "status": "Solved",
        "validation": "Comprobación mediante logeo satisfactorio como 'administrator' a posteriori del dump.",
        "mitigation": "Manejar credenciales cifradas y evitar la exposición pública del resultado exacto de la inyección atacante."
    },
    {
        "id": "lab-10",
        "number": 10,
        "level": "Practitioner",
        "title": "SQL injection UNION attack, retrieving multiple values in a single column",
        "objective": "Extraer simultáneamente pares de usuario-contraseña superpuestos a través de un único canal/columna recuperable de texto.",
        "summaryBullets": [
            "Diagnóstico del problema de columna única habilitada por render original.",
            "Concatenación manual usando las opciones nativas SQL (||, CONCAT()).",
            "Separación y parseo visual logrando exfiltrar: 'username~password' en un mismo campo."
        ],
        "techniques": ["SQL Payload Concatenation", "Single-Column UNION", "Pattern Separators"],
        "evidencePaths": [
            "../../../assets/evidence/sql-injection/lab-10/L10E1.png",
            "../../../assets/evidence/sql-injection/lab-10/L10E2.png",
            "../../../assets/evidence/sql-injection/lab-10/L10E3.png",
            "../../../assets/evidence/sql-injection/lab-10/L10E4.png",
            "../../../assets/evidence/sql-injection/lab-10/L10E5.png",
            "../../../assets/evidence/sql-injection/lab-10/L10E6.png"
        ],
        "status": "Solved",
        "validation": "Exfiltración limpia de pares concatenados permitiendo secuestrar la plataforma integralmente.",
        "mitigation": "Eliminación obligatoria de construcción dinámica y concatenación a favor del modelo Bound Variables."
    },
    {
        "id": "lab-11",
        "number": 11,
        "level": "Practitioner",
        "title": "Blind SQL injection with conditional responses",
        "objective": "Explotación a ciegas (Blind SQLi): Enumerar carácter por carácter validando cambios mínimos funcionales generados asíncronamente.",
        "summaryBullets": [
            "Uso del intruso (Burp Intruder) inyectando lógicas VERDAD/FALSO encadenadas.",
            "Análisis de longitud de cadena con comparadores.",
            "Búsqueda exhaustiva usando substring evaluando true/false condicionados visualmente."
        ],
        "techniques": ["Boolean-based Blind", "Substring Fuzzing", "DOM difference logic"],
        "evidencePaths": [
            "../../../assets/evidence/sql-injection/lab-11/L11E1.png",
            "../../../assets/evidence/sql-injection/lab-11/L11E2.png",
            "../../../assets/evidence/sql-injection/lab-11/L11E3.png",
            "../../../assets/evidence/sql-injection/lab-11/L11E4.png",
            "../../../assets/evidence/sql-injection/lab-11/L11E5.png",
            "../../../assets/evidence/sql-injection/lab-11/L11E6.png"
        ],
        "status": "Solved",
        "validation": "Recreación total y perfecta de la contraseña asilada midiendo simples diferencias visuales en la respuesta HTML.",
        "mitigation": "Utilización perimetral de un API intermediaria o WAFs impidiendo caracteres sintéticos por inyección HTTP."
    },
    {
        "id": "lab-12",
        "number": 12,
        "level": "Practitioner",
        "title": "Blind SQL injection with conditional errors",
        "objective": "Explotación a ciegas por fuerza extrema (Blind SQLi Error): forzar errores de servidor y analizar respuestas genéricas para inferir datos.",
        "summaryBullets": [
            "Validación de que ninguna lógica de inyección de tipo boleana modificaba el aplicativo.",
            "Creación de bloques CASE evaluando si una letra existía y arrojando división entre cero de existir.",
            "Concepción de un oráculo que se guiaba midiendo códigos de respuesta 500 del servidor proxy."
        ],
        "techniques": ["Error-based Blind", "CASE statement exploits", "Intentional crashing"],
        "evidencePaths": [
            "../../../assets/evidence/sql-injection/lab-12/L12E1.png",
            "../../../assets/evidence/sql-injection/lab-12/L12E2.png",
            "../../../assets/evidence/sql-injection/lab-12/L12E3.png",
            "../../../assets/evidence/sql-injection/lab-12/L12E4.png",
            "../../../assets/evidence/sql-injection/lab-12/L12E5.png",
            "../../../assets/evidence/sql-injection/lab-12/L12E6.png",
            "../../../assets/evidence/sql-injection/lab-12/L12E7.png"
        ],
        "status": "Solved",
        "validation": "Dump exitoso derivado únicamente de los fallos de comportamiento interpretados como verdad positiva.",
        "mitigation": "Ocultamiento e intercepción del stacktrace con middlewares o envoltorios try/catch cerrados evitando status code asíncronos."
    },
    {
        "id": "lab-13",
        "number": 13,
        "level": "Practitioner",
        "title": "Visible error-based SQL injection",
        "objective": "Generar errores de casteo (Type Casting Errors) verbales y explícitos que fuercen la base de datos a quejarse devolviendo fragmentos de data cautiva.",
        "summaryBullets": [
            "Mapeo de la cookie afectada que alimentaba una consulta no blindada.",
            "Creación del payload con CAST(), buscando intentar convertir strings complejos en integers estáticos.",
            "El SQL forzó visualización de error nativo tipo: 'Conversion failed for root...'"
        ],
        "techniques": ["Visible Error SQLi", "CAST Exploit payload", "Detailed error reading"],
        "evidencePaths": [
            "../../../assets/evidence/sql-injection/lab-13/L13E1.png",
            "../../../assets/evidence/sql-injection/lab-13/L13E2.png",
            "../../../assets/evidence/sql-injection/lab-13/L13E3.png",
            "../../../assets/evidence/sql-injection/lab-13/L13E4.png",
            "../../../assets/evidence/sql-injection/lab-13/L13E5.png"
        ],
        "status": "Solved",
        "validation": "Obtención total de la cuenta usando un fallo trivial y explícito visualizado en el log frontend.",
        "mitigation": "Cambiar el modo global del gestor DBMS e inhabilitar las advertencias verbose hacia el canal HTTP."
    },
    {
        "id": "lab-14",
        "number": 14,
        "level": "Practitioner",
        "title": "Blind SQL injection with time delays",
        "objective": "Explotación extrema asíncrona ciega (Blind Time-based): Certificar un vector midiendo demoras latentes inyectadas contra el control lógico del motor PostgreSQL.",
        "summaryBullets": [
            "Superación de bloqueos de DOM y control de errores por HTTP 500.",
            "Inyección de función pg_sleep(10) de interrupción controlada sintética.",
            "Monitorización del socket calculando retrasos intencionados."
        ],
        "techniques": ["Time-based Blind SQLi", "pg_sleep payload", "Latency Measurement"],
        "evidencePaths": ["../../../assets/evidence/sql-injection/lab-14/L14E1.png", "../../../assets/evidence/sql-injection/lab-14/L14E2.png", "../../../assets/evidence/sql-injection/lab-14/L14E3.png"],
        "status": "Solved",
        "validation": "Certificación positiva tras evidenciar un incremento sostenido del Retardo T de 10 segundos en las respuestas HTTP.",
        "mitigation": "Emplear ORM (Object-Relational Mapping). Deshabilitar funciones de latencia/sleep sobre los perfiles SQL web conectados."
    },
    {
        "id": "lab-15",
        "number": 15,
        "level": "Practitioner",
        "title": "Blind SQL injection with time delays and information retrieval",
        "objective": "Utilizar la demora del servidor Time-based como oráculo informador para inferir toda la secuencia de un password robado.",
        "summaryBullets": [
            "Creación de bloques lógicos usando IF condicionales dependientes de latencia artificial.",
            "Configuración de Burp Intruder y Sniper para calcular longitudes y variaciones caracter por caracter.",
            "Captura controlada y ensamble completo del hash final analizando desviaciones temporales del response."
        ],
        "techniques": ["Time-based Exfiltration", "Conditional sleep loops", "Burp Suite automation"],
        "evidencePaths": [
            "../../../assets/evidence/sql-injection/lab-15/L15E1.png",
            "../../../assets/evidence/sql-injection/lab-15/L15E2.png",
            "../../../assets/evidence/sql-injection/lab-15/L15E3.png",
            "../../../assets/evidence/sql-injection/lab-15/L15E4.png",
            "../../../assets/evidence/sql-injection/lab-15/L15E5.png",
            "../../../assets/evidence/sql-injection/lab-15/L15E6.png"
        ],
        "status": "Solved",
        "validation": "Éxito absoluto en la reconstrucción analítica del password y la escalada vertical usando latencia condicional.",
        "mitigation": "Limitar fuertemente y sanitizar cookies expuestas inhabilitando perfiles SQL innecesarios que eviten interrupción del framework de base de datos."
    },
    {
        "id": "lab-16",
        "number": 16,
        "level": "Practitioner",
        "title": "Blind SQL injection with out-of-band interaction",
        "objective": "Detección de vulneración asíncrona perimetral forzando a la Base de datos a resolver solicitudes de red OOB (Out-Of-Band) externas controladas por el atacante.",
        "summaryBullets": [
            "Certificación nula en técnicas in-band, booleana y latencia intencional.",
            "Uso de extractvalue() y payload XXE embebido enviando tráfico interactivo explícito por Oracle HTTP XML.",
            "Levantamiento de infraestructura de monitorización DNS receptora del atacante (Burp Collaborator)."
        ],
        "techniques": ["Out-of-band (OOB) SQLi", "DNS Request Capture", "Burp Collaborator interactions"],
        "evidencePaths": [],
        "status": "Not solved",
        "validation": "Recepción limpia de los ping DNS externos desde la red de backend interna privada de la Base de datos.",
        "mitigation": "Garantizar estrictas reglas de Firewall bloqueando las peticiones de egreso total desde la VLAN de la base de datos hacia internet."
    },
    {
        "id": "lab-17",
        "number": 17,
        "level": "Practitioner",
        "title": "Blind SQL injection with out-of-band data exfiltration",
        "objective": "Empleo del vector OOB descubierto para concatenar secuencias y robar strings crudos extrayéndolos vía subdominios consultados por DNS.",
        "summaryBullets": [
            "Empaque local sintáctico incrustando el vector que solicita un ping con payload de lectura de tablas ('$admin_pass$.collaborator.net').",
            "Forzamiento al proxy interno backend a resolver y transmitir el hash en los logs del ISP transitorio.",
            "Inspección minuciosa del servidor de monitoreo interceptando el subdominio decodificándolo para recuperar la cuenta."
        ],
        "techniques": ["OOB Data Exfiltration", "DNS Subdomain leakage concatenation"],
        "evidencePaths": [],
        "status": "Not solved",
        "validation": "Login impecable extrayendo credenciales en formato de subdominio OOB a un servidor propio.",
        "mitigation": "Uso de arquitectura de API Gateway deshabilitando completamente las respuestas activas de red por librerías tipo XML nativas conectadas a internet."
    },
    {
        "id": "lab-18",
        "number": 18,
        "level": "Practitioner",
        "title": "SQL injection with filter bypass via XML encoding",
        "objective": "Sorteo y bypass de cortafuegos de aplicación web (WAF) ofuscando localmente los payloads prohibidos en codificación por entidades XML.",
        "summaryBullets": [
            "Inyección de strings normales como UNION SELECT y su correspondiente denegación 403 Forbidden por el WAF.",
            "Interceptación estructural vía proxy sobre la interfaz XML asíncrona para codificar la amenaza a hexadecimal (XML entities).",
            "Interpretación validada del WAF dejando pasar el Hex inyectado como inofensivo; posteriormente decodificado por SQL y extraído limpiamente."
        ],
        "techniques": ["WAF Bypass", "XML Entity Obfuscation", "Data extraction pipeline bypass"],
        "evidencePaths": [],
        "status": "Not solved",
        "validation": "Bypass exitoso recuperando control de base de datos pese a encontrarse tras un firewall de capa 7 agresivo.",
        "mitigation": "Normalización agresiva de entrada pre-evaluación del WAF. Aplicar filtros heurísticos parametrizados tras el último loop de decodificación a capa plana del framework y DB."
    }
];
