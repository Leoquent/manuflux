import os
import re

def fix_mangled_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix onClick / onChange handlers
    # Pattern: onClick="{()" ==""> or onClick="{()" == ""> or onclick="{()" == "">
    content = re.sub(r'on[Cc]hange="\{\((.*?)\)"\s*==\s*""\s*>', r'onChange={(\1) => ', content)
    content = re.sub(r'on[Cc]lick="\{\(\)"\s*==\s*""\s*>', r'onClick={() => ', content)
    # Handle single quotes too
    content = re.sub(r"on[Cc]lick='\{\(\)'\s*==\s*''\s*>", r'onClick={() => ', content)

    # 2. Fix useState generics mangling
    # Pattern: useState<number |="" null="">
    # This usually looks like: <Type |="" OtherType="">
    def fix_generic(match):
        generic_content = match.group(1)
        # Clean up: |="" null=""> -> | null>
        cleaned = re.sub(r'=""\s*', '', generic_content)
        cleaned = re.sub(r'\s*""\s*', '', cleaned)
        return f'<{cleaned}'

    content = re.sub(r'<([A-Z][a-zA-Z0-9_\s\|]+)\s*=""\s*[^>]*>', fix_generic, content)
    # Specific fix for common types
    content = content.replace('|="" null="">', '| null>')
    content = content.replace('number |="" null="">', 'number | null>')

    # 3. Fix complex className mangling
    # Pattern: className="{`text-red-500" transition-transform="" ... }`}=""
    # This is basically template literals that got split into attributes
    def fix_complex_className(match):
        # This is very specific but common in these mangled files
        full_match = match.group(0)
        # Find the part between className="{` and `}"
        inner = re.search(r'className="\{`(.*?)`\}"', full_match)
        if inner:
            content_inner = inner.group(1)
            # Find all trailing attributes added by mangling
            # transition-transform="" duration-300="" ${="" activeindex="==" index="" ?="" 'rotate-180'="" :="" ''="" }
            # Actually, the template literal itself is mangled.
            
            # Let's try a different approach:
            # Reconstruct the template literal from the following "attributes"
            pass
        return full_match

    # Re-fix the template literal mangling more generally
    # Example: className="{`text-red-500" transition-transform="" ... }`}"
    # The mangler thought they were attributes.
    def fix_template_literal_attributes(content):
        # Find className="{`
        # Then consume everything until }`}" or }`}=""
        def replacer(match):
            mangled = match.group(1)
            # Reconstruct: transition-transform="" -> transition-transform
            # ${="" -> ${
            # activeindex="==" -> activeIndex === (wait, lowercase)
            # 'rotate-180'="" -> 'rotate-180'
            cleaned = mangled.replace('=""', '')
            cleaned = cleaned.replace('="=="', ' ===')
            cleaned = cleaned.replace('="', '=') # Just in case
            # Fix common cases
            cleaned = cleaned.replace('${=', '${')
            return f'className={{`{cleaned}}}`}}'
        
        return re.sub(r'className="\{`(.*?)\}`\}"', replacer, content)

    # Simple fix for the most common ones seen
    content = re.sub(r'className="\{`(.*?)\}`\}"\s*=""', r'className={`\1`}', content)
    content = re.sub(r'className="\{`(.*?)\}`\}"', r'className={`\1`}', content)
    
    # Clean up the `=""` left over from attributes that should have been part of the template literal
    # This is risky but let's try to target only those inside tags
    # We'll do it manually for the most egregious ones
    
    # 4. Fix specific tags as components (again, just to be sure)
    tags_to_fix = ['X', 'Menu', 'ChevronDown', 'Loader2', 'Send', 'MessageSquare']
    for tag in tags_to_fix:
        content = re.sub(rf'<({tag.lower()})\b', rf'<{tag}', content)
        content = re.sub(rf'</({tag.lower()})\b', rf'</{tag}', content)

    # 5. Fix HTML div element type mangling
    content = content.replace('htmldivelement', 'HTMLDivElement')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def run_fix():
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in root or '.next' in root:
            continue
        for file in files:
            if file.endswith('.tsx'):
                print(f"Fixing {os.path.join(root, file)}")
                fix_mangled_file(os.path.join(root, file))

if __name__ == "__main__":
    run_fix()
