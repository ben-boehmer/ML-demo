from sklearn.tree import DecisionTreeClassifier
import numpy as np

model = DecisionTreeClassifier()
X = np.array([[25, 2], [40, 15], [60, 40], [30, 10], [50, 30]])
y = ["nein", "nein", "ja", "nein", "ja"]
model.fit(X, y)

def predict_retirement_age(age: int, years_worked: int) -> str:
    return model.predict([[age, years_worked]])[0]
