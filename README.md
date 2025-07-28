# AI-Generated Image Classifier using ResNet-18


This project aims to detect AI-generated images using a Convolutional Neural Network (CNN) based on ResNet-18 architecture. By training on a combination of diverse datasets—including Kaggle datasets, custom-curated images, and the OV7 dataset—the model achieves a strong 91% classification accuracy.

## Motivation
With the rapid rise of generative models like DALL·E, MidJourney, and Stable Diffusion, distinguishing real from AI-generated images has become increasingly difficult—and increasingly important. This project was built to explore how deep learning can help in identifying synthetic content with a high level of confidence.

## Features
**Multi-source training:** Combines datasets from Kaggle, OV7, and hand-curated image sets to improve generalization.
**ResNet-18 backbone:** Lightweight but powerful CNN architecture fine-tuned for this task.
**91% accuracy:** Achieved through extensive data preprocessing, augmentation, and hyperparameter tuning.
**Modular & scalable codebase:**:  Easy to plug in new datasets or swap architectures.

## Datasets Used
1.Kaggle AI-generated image datasets
2.OV7 synthetic image dataset
3.Custom real & fake image collection (web-scraped and verified)
4.Balanced to reduce bias across generators and image types

## Model Architecture
We use ResNet-18, a residual network that helps avoid vanishing gradients and accelerates training. It’s fine-tuned using transfer learning techniques on our custom dataset blend.

## Results
Achieves **91%** accuracy across test and validation data.

## Installation
In terminal,use the command-
git clone https://github.com/AdityaBhagat05/AIimagedetector.git
cd AIimagedetector
to install dependencies,type-
pip install -r requirements.txt
