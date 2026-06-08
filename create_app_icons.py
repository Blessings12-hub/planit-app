from PIL import Image, ImageDraw, ImageFont
import os

# Create public directory if needed
os.makedirs('public', exist_ok=True)

# Create 3 sizes: 192x192, 512x512, and 1024x1024
sizes = [192, 512, 1024]

for size in sizes:
    # Create image with white background
    img = Image.new('RGB', (size, size), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    # Purple rounded square background
    purple = (79, 70, 229)  # #4F46E5
    padding = size // 10
    
    # Draw rounded square (approximate with rectangle)
    draw.rectangle([padding, padding, size-padding, size-padding], fill=purple)
    
    # White calendar icon
    white = (255, 255, 255)
    
    # Calendar body
    body_padding = size // 6
    draw.rectangle([body_padding, body_padding*2, size-body_padding, size-body_padding], fill=white)
    
    # Calendar top bar
    draw.rectangle([body_padding, body_padding, size-body_padding, body_padding*2], fill=white)
    
    # Calendar lines (days)
    line_thickness = size // 64
    line_spacing = (size - 2*body_padding) // 4
    
    for i in range(3):
        y = body_padding*2 + line_spacing + i * line_spacing
        draw.line([(body_padding + size//8, y), (size - body_padding - size//8, y)], fill=purple, width=line_thickness)
    
    # Calendar side markers
    marker_width = size // 32
    draw.line([(body_padding, body_padding), (body_padding, body_padding*2)], fill=purple, width=marker_width*2)
    draw.line([(size-body_padding, body_padding), (size-body_padding, body_padding*2)], fill=purple, width=marker_width*2)
    
    # Save
    filename = f'public/icon-{size}.png'
    img.save(filename, 'PNG')
    print(f'Created {filename}')

# Also create the logo file
print('\n✅ Professional icons created!')
print('Files created:')
print('  - public/icon-192.png (for PWA)')
print('  - public/icon-512.png (for PWA and Android)')
print('  - public/icon-1024.png (high-res for iOS)')