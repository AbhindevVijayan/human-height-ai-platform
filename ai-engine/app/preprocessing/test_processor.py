from image_processor import ImageProcessor


processor = ImageProcessor()


result = processor.process(
    "test_images/person.jpeg"
)


print(result)