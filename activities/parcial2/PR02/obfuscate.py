import base64

with open('.quiz.source.js', 'r', encoding='utf-8') as f:
    source = f.read()

b64 = base64.b64encode(source.encode('utf-8')).decode('utf-8')

decoder_js = f"""
// === SECURE MODULE ===
// Anti-inspection obfuscation applied
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

print("Obfuscation complete.")
