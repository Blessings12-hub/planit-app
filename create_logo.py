from PIL import Image, ImageDraw, ImageFont
import os

# Create public directory if it doesn't exist
os.makedirs('public', exist_ok=True)

# Create logo image (400x400 pixels)
logo_size = 400
img = Image.new('RGB', (logo_size, logo_size), color=(255, 255, 255))
draw = ImageDraw.Draw(img)

# Purple circle background
purple_color = (79, 70, 229)  # #4F46E5
draw.ellipse([20, 20, 380, 380], fill=purple_color)

# White calendar icon (simple design)
white_color = (255, 255, 255)

# Calendar rectangle body
draw.rectangle([100, 120, 300, 300], fill=white_color)

# Calendar top bar
draw.rectangle([100, 90, 300, 120], fill=white_color)

# Calendar lines (days)
draw.line([130, 150, 270, 150], fill=purple_color, width=3)
draw.line([130, 180, 270, 180], fill=purple_color, width=3)
draw.line([130, 210, 270, 210], fill=purple_color, width=3)

# Calendar side markers
draw.line([110, 90, 110, 150], fill=purple_color, width=4)
draw.line([290, 90, 290, 150], fill=purple_color, width=4)

# Text "Schedora" below calendar
try:
    font = ImageFont.truetype("arial.ttf", 40)
except:
    font = ImageFont.load_default()

# Center the text
text = "Schedora"
text_bbox = draw.textbbox((0, 0), text, font=font)
text_width = text_bbox[2] - text_bbox[0]
text_x = (logo_size - text_width) // 2
text_y = 320

draw.text((text_x, text_y), text, font=font, fill=purple_color)

# Save the logo
logo_path = 'public/schedora-logo.png'
img.save(logo_path, 'PNG')

print(f'✅ Logo created successfully!')
print(f'📁 File: {logo_path}')
print(f'📏 Size: {logo_size}x{logo_size} pixels')