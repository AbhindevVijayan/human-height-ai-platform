from app.inference.model_loader import ModelLoader



loader = ModelLoader()


model = loader.get_model()


print(model)