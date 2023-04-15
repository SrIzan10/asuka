import speech_recognition as sr
import os

os.environ['PYALSA_DEBUG'] = '0'

# Initialize recognizer
r = sr.Recognizer()

# Use the default microphone as the audio source
with sr.Microphone() as source:
    print("Speak something...")
    audio = r.listen(source, phrase_time_limit = 2)

try:
    # Use Google Speech Recognition to transcribe the audio
    text = r.recognize_google(audio)
    print(text)
except sr.UnknownValueError:
    print("SpeechToTextError")
except sr.RequestError:
    print("SpeechToTextError")