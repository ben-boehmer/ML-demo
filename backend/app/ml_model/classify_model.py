# app/ml_model/classify_model.py

import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import io
from PIL import Image

# Modell laden
model = load_model("app/ml_model/hunde_katzen.h5")

# Bildvorverarbeitung
img_height, img_width = 128, 128

def preprocess_image(file: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(file)).convert("RGB")
    img = img.resize((img_width, img_height))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Batch-Dimension
    #img_array /= 255.0  # Normierung
    img_array = img_array.reshape(1, 128, 128, 3)
    return img_array

def classify_image(file: bytes) -> str:
    processed = preprocess_image(file)
    pred = model.predict(processed)[0]  # z. B. [0.97, 0.03]
    label = np.argmax(pred)  
    print(label)           # => 0 (für Klasse 0)
    return "Katze" if label == 0 else "Hund"