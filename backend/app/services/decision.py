def predict(data):
    age = data.get("age", 0)
    years = data.get("years_worked", 0)
    if age >= 63 and years >= 35:
        return {"result": "Rentennah"}
    return {"result": "Noch nicht rentennah"}
