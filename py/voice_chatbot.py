import streamlit as st
import pandas as pd
import speech_recognition as sr
import openai
from apikey import openai_key
from api import create_consult
import json

openai.api_key = openai_key

st.set_page_config(
    page_title="Nirogya",
    page_icon="🎙️",
    layout="wide",
    initial_sidebar_state="auto",
)


def get_audio_input():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        st.write("State your illness")
        audio = r.listen(source)
        st.write("Analyzing your data...")
    try:
        text = r.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        st.write("you are not clear")
        return ""
    except sr.RequestError as e:
        st.write(f"Could not request results; {e}")
        return ""


def get_completion(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0,
    )
    return response.choices[0].message["content"]


def main():
    st.title("welcome to Nirogya User")
    
    voice_input = get_audio_input()

    if voice_input:
        st.write(f"Voice input: {voice_input}")
        
        prompt = f"""extract the key points that describe the illness with a specialist recommendation in {{
        patient_id:,
        description:,
        symptoms:[],
        concern:[]
        }} format from this phrase '{voice_input}'. Generate the patient_id randomly """
        response = get_completion(prompt)
        #st.write(f"Chatbot Response: {response}")
        # json_str = response["Chatbot Response"]
        # json_array = json.loads(json_str)
        st.write(f"Chatbot Response: {response}")
        
        
        
        
        st.write("Response Table:")
        st.write({"Voice Input": [voice_input], "Chatbot Response": [response]})
        
        try:
            patient_data = pd.read_json(response, typ='series')
            st.sidebar.title("Patient Information")
            st.sidebar.table(patient_data)
            patient_data=patient_data.to_json()
            patient_data = json.loads(patient_data)
            create_consult(patient_data)
        
            if st.sidebar.button("Consult Doctor", key="consult_doctor_button"):
                st.write("Consulting doctor...")
                st.markdown(
                    """[Click here to consult the doctor](https://www.google.com)""",
                    unsafe_allow_html=True,
                )
        except Exception as e:
            st.sidebar.error(f"Error parsing patient data: {e}")

if __name__ == "__main__":
    main()
