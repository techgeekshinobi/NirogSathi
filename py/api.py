import requests

def create_consult(params):
    url="https://nirog-sathi-5xcq.onrender.com/api/consult"
    print("\ndata to send\n")
    print(type(params))
    data=params
    result=requests.post(url, json=data)

