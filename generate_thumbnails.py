import os
from PIL import Image
from psd_tools import PSDImage

THUMBNAIL_SIZE = (256, 256)

def generate_thumbnail(input_path, output_path):
    try:
        with PSDImage.open(input_path) as psd:
            merged_image = psd.composite()
            thumbnail = merged_image.thumbnail(THUMBNAIL_SIZE)
            thumbnail.save(output_path, "JPEG")  # Save as JPEG for better compatibility
    except Exception as e:
        print(f"Error generating thumbnail for {input_path}: {e}")

def generate_thumbnails(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith(".psd"):
            input_path = os.path.join(folder_path, filename)
            thumbnail_path = os.path.join(folder_path, f"{filename}.jpg")
            generate_thumbnail(input_path, thumbnail_path)

if __name__ == "__main__":
    folder_path = "COMM"  # Your folder containing PSD files
    generate_thumbnails(folder_path)
