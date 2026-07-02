from app.inference.model_loader import ModelLoader
import pandas as pd



class HeightPredictor:


    def __init__(self):

        self.loader = ModelLoader()

        self.model = self.loader.get_model()



    def predict(
        self,
        features
    ):

        data = pd.DataFrame(
            [
                features
            ]
        )


        prediction = self.model.predict(
            data
        )


        return {
            "height_cm": round(
                float(prediction[0]),
                2
            ),

            "model": self.loader.model_name
        }