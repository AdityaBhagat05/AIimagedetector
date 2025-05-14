import os
from PIL import Image
from concurrent.futures import ProcessPoolExecutor

input_folder = r'C:\Users\Aditya Bhagat\Desktop\ml\AIimagedetector\dataset\train\fake'
output_folder = r'C:\Users\Aditya Bhagat\Desktop\ml\AIimagedetector\datasetresized\train\fake'
os.makedirs(output_folder, exist_ok=True)

def resize_image(filename):
    try:
        if not filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            return
        img_path = os.path.join(input_folder, filename)
        out_path = os.path.join(output_folder, filename)

        with Image.open(img_path) as img:
            img = img.resize((224, 224), Image.LANCZOS)
            img.save(out_path)
    except Exception as e:
        print(f"Failed on {filename}: {e}")

if __name__ == "__main__":
    filenames = os.listdir(input_folder)
    with ProcessPoolExecutor() as executor:
        executor.map(resize_image, filenames)
