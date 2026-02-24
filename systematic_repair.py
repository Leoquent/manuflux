import os
import re

def systematic_repair(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fundamental JSX cleanup - common casing and spelling
    content = content.replace('classname=', 'className=')
    content = content.replace('suppresshydrationwarning=', 'suppressHydrationWarning=')
    content = content.replace('strokewidth=', 'strokeWidth=')
    content = content.replace('referrerpolicy=', 'referrerPolicy=')
    content = content.replace('rotatex:', 'rotateX:')
    content = content.replace('rotatey:', 'rotateY:')
    content = content.replace('cursorx', 'cursorX')
    content = content.replace('cursory', 'cursorY')
    content = content.replace('zindex:', 'zIndex:')
    content = content.replace('htmldivelement', 'HTMLDivElement')

    # 2. Fix Event Handlers (The most common build-breaker)
    # Pattern: onClick="{()" == """>  or onClick="{()" =="">
    content = re.sub(r'on[Cc]lick="\{\(\)"\s*==+\s*""\s*>', r'onClick={() => ', content)
    content = re.sub(r'on[Cc]lick="\{\(\)"\s*==+\s*""\s*\}">', r'onClick={() => ', content)
    content = re.sub(r'on[Cc]hange="\{\((.*?)\)"\s*==+\s*""\s*>', r'onChange={(\1) => ', content)
    content = re.sub(r'on[Ss]ubmit="\{\((.*?)\)"\s*==+\s*""\s*>', r'onSubmit={(\1) => ', content)
    
    # 3. Fix React generic type mangling
    def fix_hook_generics(text):
        def repl(m):
            inner = m.group(1).replace('=""', '').replace('"', '').replace('=', '')
            inner = inner.replace('|', ' | ').replace(',', ', ')
            inner = re.sub(r'\s+', ' ', inner).strip()
            return f'<{inner}>'
        text = re.sub(r'useState<([^>]+)>', lambda m: f'useState{repl(m)}', text)
        text = re.sub(r'useRef<([^>]+)>', lambda m: f'useRef{repl(m)}', text)
        text = re.sub(r'React\.useState<([^>]+)>', lambda m: f'React.useState{repl(m)}', text)
        text = re.sub(r'React\.useRef<([^>]+)>', lambda m: f'React.useRef{repl(m)}', text)
        return text
    content = fix_hook_generics(content)

    content = content.replace('| undefined>', '| undefined>') # just in case
    content = content.replace('| null>', '| null>')

    # 4. Reconstruct mangled className template literals
    # Pattern: className="{`text-base" ... }`}=""
    def fix_classname_template(match):
        mangled = match.group(1)
        # Reconstruct: text-red-500" transition-transform="" -> text-red-500 transition-transform
        # Clean up internal "attributes" that were actually part of the template literal
        cleaned = mangled.replace('" ', ' ')
        cleaned = re.sub(r'(\S+)=""', r'\1', cleaned)
        cleaned = re.sub(r'(\S+)="', r'\1=', cleaned)
        # Fix logic: ${="" activeindex="==" index="" ?="" 'rotate-180'="" :="" ''="" }
        cleaned = cleaned.replace('${=', '${')
        cleaned = cleaned.replace('===', ' === ') # normalization
        cleaned = re.sub(r'\s+', ' ', cleaned).strip()
        return f'className={{`{cleaned}}}`}}'

    content = re.sub(r'className="\{`(.*?)\}`\}"\s*=""', fix_classname_template, content)
    content = re.sub(r'className="\{`(.*?)\}`\}"', fix_classname_template, content)
    
    # Fix the trailing ="" that often follows a closing brace in mangled code
    content = content.replace('}`}=""', '}`}')
    content = content.replace('}}=""', '}}')
    
    # 5. Fix Motion component props mangling
    # motion.div initial="{{" opacity:="" 0="" }}
    def fix_motion_props(match):
        prop_name = match.group(1)
        prop_body = match.group(2)
        # Cleanup: opacity:="" 0="" -> opacity: 0
        cleaned = re.sub(r'(\w+):=""\s*(-?\d+\.?\d*)=""', r'\1: \2', prop_body)
        cleaned = re.sub(r'(\w+):=""\s*\'(.*?)\'=""', r"\1: '\2'", cleaned)
        cleaned = re.sub(r'(\w+):=""', r'\1:', cleaned)
        cleaned = cleaned.replace('=""', '')
        return f'{prop_name}={{{{{cleaned}}}}}'

    content = re.sub(r'\b(initial|animate|whileHover|whileInView|exit|transition|viewport)="\{\{(.*?)\}\}"', fix_motion_props, content)

    # 6. Component Casing Fixes (Icons, specific components)
    components = [
        'Navbar', 'Hero', 'Mission', 'Services', 'Portfolio', 'Process', 'FAQ', 'ContactCTA', 'Footer', 'Chatbot',
        'Image', 'Link', 'AnimatePresence', 'SmoothScroll', 'CustomCursor', 'ArrowRight', 'ChevronDown', 'Globe', 
        'Zap', 'Mail', 'MessageSquare', 'Search', 'Share2', 'ShieldCheck', 'Star', 'Cpu', 'Loader2', 'Send', 'X', 'Menu', 'MapPin', 'Phone'
    ]
    for comp in components:
        # Match <comp and </comp but avoid matching if it's already CorrectCase
        content = re.sub(rf'<({comp.lower()})\b', f'<{comp}', content)
        content = re.sub(rf'</({comp.lower()})\b', f'</{comp}', content)

    # 7. Final Polish: Ensure double-equals isn't messed up inside template literals
    # (The script above handles most, but let's be safe)
    content = content.replace(' ====', ' ===')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def run():
    print("Starting systematic repair...")
    for root, dirs, files in os.walk('.'):
        if any(x in root for x in ['node_modules', '.next', '.git']):
            continue
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                print(f"Repairing: {os.path.join(root, file)}")
                systematic_repair(os.path.join(root, file))
    print("Repair complete.")

if __name__ == "__main__":
    run()
