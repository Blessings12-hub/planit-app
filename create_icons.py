from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    # Create image with purple background (#4F46E5)
    img = Image.new('RGB', (size, size), color=(79, 70, 229))
    draw = ImageDraw.Draw(img)
    
    # Add white "S" text in the center
    try:
        font = ImageFont.truetype("arial.ttf", size//3)
    except:
        font = ImageFont.load_default(size=size//3)
    
    # Get text bounding box and center it
    text_bbox = draw.textbbox((0, 0), 'S', font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    
    draw.text((x, y), 'S', font=font, fill='white')
    
    # Save the image
    img.save(filename)
    print(f'Created {filename} ({size}x{size})')

# Create both icons directly in public folder
create_icon(192, 'public/icon-192.png')
create_icon(512, 'public/icon-512.png')

print('\n✅ Icons created successfully in public folder!')