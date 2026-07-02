from app.inference.predictor import HeightPredictor



predictor = HeightPredictor()



features = {

    "shoulder_width": 0.244539,

    "hip_width": 0.139360,

    "torso_length": 0.279147,

    "leg_length": 0.416516

}



result = predictor.predict(
    features
)


print(result)