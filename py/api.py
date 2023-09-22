import requests

def create_consult(params):
    url="http://192.168.137.1:8000/api/consult"
    print("\ndata to send\n")
    print(type(params))
    data=params
    result=requests.post(url, json=data)

