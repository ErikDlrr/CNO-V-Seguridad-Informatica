import os

html_path = '/Users/erikdlr/Documents/CNO_V_SI/CNO-V-Seguridad-Informatica/activities/parcial2/Act10/act10.html'
js_path = '/Users/erikdlr/Documents/CNO_V_SI/CNO-V-Seguridad-Informatica/activities/parcial2/Act10/act10.js'

with open(html_path, 'r', encoding='utf-8') as f:
    html_lines = f.readlines()

with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Find the script tag line
new_html = []
for line in html_lines:
    if '<script type="text/babel" data-type="module" src="./act10.js"></script>' in line:
        new_html.append('    <script type="text/babel" data-type="module">\n')
        new_html.append(js_content)
        new_html.append('\n    </script>\n')
    else:
        new_html.append(line)

with open(html_path, 'w', encoding='utf-8') as f:
    f.writelines(new_html)

print("act10.html updated successfully with inline JS.")
